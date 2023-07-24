import React, { useContext, useState,useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSession } from "next-auth/react";

import { onSnapshot, query, orderBy, doc } from "firebase/firestore";
import Moment from "react-moment";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

const Modal = ({ appContext, setcont, setAppContext }) => {
  const [input, setInput] = useState("");
  //const [appContext, setAppContext] = useContext(AppContext)
  const { data: session } = useSession();
  const router = useRouter();
 
    const { id } = router.query;
  const closeModal = () => {
    setcont({ ...appContext, isModalOpen: false });
  };



  const post = appContext.post;
  const [comments, setComments] = useState([])
  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", appContext.postId, "comments"), {
      comment: input,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setcont({ ...appContext, isModalOpen: false });
    setInput("");

    router.push(`/${appContext.postId}`);
  };

  



  return (
    <div className="modal postlist" onClick={closeModal}>
      <div className="modalinner" onClick={(e) => e.stopPropagation()}>
        <MdClose className="text-[22px] cursor-pointer" onClick={closeModal} />

        <div className="whiter">
          <div className="flex-row smfl-col ">
            <div className="flex-col w-350 d-none">
              <div className="user-info small-font">
                <div>
                  <img
                    className="profilepiconpost"
                    src={post?.userImg}
                    alt=""
                  />
                </div>

                <div className="user-info-area smuserinfoarea small-font ">
                  <div className="usertag  small-font">
                    <h1>{post?.username}</h1>
                    <h2 className="text-gray-500">
                      <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="Postbox h-m w-100 m-10 flex-col d-none">
                <div className="postimagearea m-10 ">
                  <img src={post?.image} className="postimage m-10" alt="" />
                </div>
                <div className="posttext blur-back">
                  <p className="commposttext">{post?.text}</p>
                </div>
              </div>
            </div>
<div className="flex-col">
            <div className="flex-row w-350 w-100 j-center">
              <img
                className="profilepicsmid"
                src={session?.user?.image}
                alt=""
              />
              <textarea
                className="textarea w-100 "
                rows="4"
                placeholder="Tweet your reply"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="commentArea">
              <div className="mt-4 aa">
                <div className="upiconlist">
                  <div className="upiconlist">
                    <BsImage className="gifbtn" />

                    <div className="gifbtn">
                      <AiOutlineGif className="gifbtn"/>
                    </div>
                    <RiBarChart2Line className="gifbtn" />
                    <BsEmojiSmile  className="gifbtn"/>
                    <IoCalendarNumberOutline className="hidden md:block" />
                    <HiOutlineLocationMarker className="hidden md:block" />
                  </div>

                  <button
                    className="btn"
                    disabled={!input.trim()}
                    onClick={sendComment}
                  >
                    comment
                  </button>
                </div>
              </div>
            </div>
            <div className="cc">
            </div>
            </div>
          </div>
          {/* <p className='mt-4 text-gray-500'>Replying to: <span className='text-[#1d9bf0]'>@{post?.tag}</span></p> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
