import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs"
import Input from './Input';
import Post from './Post'
import { onSnapshot, collection, query, orderBy, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from 'next/router';
import Comment from './Comment';
import Moment from 'react-moment';
 const Singlepost = () => {

    const [post, setPost] = useState([])
    const router = useRouter()
    const { id } = router.query;
    const [comments, setComments] = useState([])

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    )

    return (
        <div className='postlist w-full flex-col'>
           {console.log("This is singlkr p ",id,post)}
          
           <div className="fullPostbox w-full flex-col">

           <div className='blur-back flex-col'>
                <div className='user-info blur-back flex-col'>
            
                <img className='profilepiconpost' src={post.userImg} alt="" />
                        <div className="user-info-area">
                        <h4 className='usertag' >@{post.tag}</h4>
                        <p className='color-gray'>{post.username}</p>
                        <p><Moment fromNow>{post?.timestamp?.toDate()}</Moment ></p>
                        <hr />
                        </div>
                </div>
           
           
                </div>
 
                <div>
           { post?.image &&(<div className="fullpostimagearea">
                  <img className='fullpostimage' src={post?.image} alt="" srcset="" />
                </div>)}
                { post?.text &&(
                  <div className='fullposttext blur-back'>
                  <p>{post?.text}</p>
                </div>

                )} 
                </div> 
        <div className="imagepost">

        </div>
        </div>
        </div>
    )
}

export default Singlepost
