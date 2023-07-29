import { useRouter} from 'next/router'
import React, {  useEffect, useState } from 'react'
import { useContext } from 'react'
import Moment from 'react-moment'
import { BsChat } from "react-icons/bs"
import { FaRetweet } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Comment from './Comment';
import { db } from "../firebase"

import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { useSession } from "next-auth/react"



export const Post = ({post,id,cont}) => {


  const { data: session } = useSession()
  const router = useRouter()
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])
  

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(() =>
    setLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    ), [likes]
  )

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  }

  const openModal = () => {
    cont({
      isModalOpen: true,
      post,
      postId: id
    })

    console.log('opening model ');
  }




  return (
   
    <div className='post1 '>
      {console.log(post)}
         <div className="Postbox" onClick={()=>{ router.push(`/${id}`)
            
         }}>
            
            <div className='blur-back flex-col'>
                <div className='user-info blur-back'>
            
                <img className='profilepiconpost' src={post.userImg} alt="" />
                        <div className="user-info-area">
                        <h4 className='usertag' >@Anomynous</h4>
                        <p className='color-gray'>A User</p>
                        <p><Moment fromNow>{post?.timestamp?.toDate()}</Moment ></p>
                        <hr />
                        </div>
                </div>
                
                <div>
                { post?.image &&(<div className="postimagearea">
                  <img className='postimage' src={post?.image} alt="" srcset="" />
                </div>)}
                { post?.text &&(
                  <div className=' blur-back posttext'>
                  <p>{post?.text}</p>
                </div>

                )} 
                </div>


                <div className='action'>
                  
            <div className='flex gap-1 items-center'>

              <BsChat className='actionbtn' onClick={(e) => {
                e.stopPropagation()
               openModal()
              }} />
             {comments.length > 0 && (<span className='text-sm'>{comments.length}</span>)} 
            </div>

            {session.user.uid !== post?.id ? (
              <FaRetweet className='actionbtn' />
            ) : (
              <RiDeleteBin5Line className='actionbtn'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "posts", id));
                }} />
            )}


            <div className='flex gap-1 items-center'
              onClick={(e) => {
                e.stopPropagation()
                likePost()
              }}>
              {liked ? <AiFillHeart className='actionbtn' />
                : <AiOutlineHeart className='actionbtn' />}

              {likes.length > 0 && (<span className={`${liked && "text-pink-700"} actionbtn`}>{likes.length}</span>)}
            </div>

            
           </div>
       

              
                
            </div>

         </div>
         <div className="cc">
            <div className='border-t border-gray-700'>
                {comments.length > 0 && (
                    <div className="pb-72">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                comment={comment.data()}
                            />
                        ))}
                        
                    </div>
                )}
                {comments.length ==0 &&(
                          <div className='nocom'>
                            No comment

                          </div>
                        )}
            </div>
            </div>
    </div>
  )
}
