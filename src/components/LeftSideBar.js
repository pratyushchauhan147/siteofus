import React from 'react'
import { Sidebarlinks } from './Sidebarlinks'
import {AiFillHome} from  'react-icons/ai'

import { signOut, useSession } from 'next-auth/react'
export const LeftSideBar = () => {
    const {data: session} = useSession()
  return (
    <div className='   LeftSideBar'>
        <div className="heading">
            <h1>The Site Of Us</h1>
        </div>
        <div className="side-bar-links">
        <a href="/"><Sidebarlinks text="HOME" Icon={<AiFillHome/>}/></a>
        <Sidebarlinks text="ABOUT" Icon={<AiFillHome/>}/>



        </div>
        <button type="button" className='sidebarlink tweetbtn'>Thought</button>
        <button type="button" className='sidebarlink tweetbtnsmall'>T</button>

<div className="userinfo">
    <h3>{session?.user.name}</h3>
    <h3>@{session?.user?.tag}</h3>
    </div>
        <div className="logoutArea">
            <img className='profilepicsmall' src={session?.user.image} onClick={signOut} alt="" />
            <button className='logoutbtn  ' onClick={signOut}>Logout</button>

        </div>
       
    </div>
    
  )
}
