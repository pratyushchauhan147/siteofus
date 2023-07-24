
import { Inter } from 'next/font/google'
import {  getSession,useSession } from 'next-auth/react'
import { Login } from '@/components/Login'
const inter = Inter({ subsets: ['latin'] })
import { LeftSideBar } from '@/components/LeftSideBar'

import { Feed } from '@/components/Feed'

import Modal from '@/components/Modal'
import React, { useState,  } from 'react';

export default function Home() {
 const {data: session} = useSession()

 const [cont, setcont] = useState({});
 const changes =(value)=>{
   console.log("yes")
   setcont(value)
   
 }
 
 if(!session) return <Login></Login>

  return (
  <div class="Index">
    <div className="color c1">h</div>
    <div className="color c2">h</div>
    <div className="color c3">h</div>
    <LeftSideBar></LeftSideBar>

    
<Feed cont={changes}></Feed>
{console.log('this', cont.post)}
{cont?.isModalOpen && <Modal appContext={cont} setAppcontext={setcont} setcont={changes} />}

  </div>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}