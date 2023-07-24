import React from 'react'
import { AiFillHome } from  'react-icons/ai'

export const Sidebarlinks = ({text,Icon}) => {
   
  return (
    <div className='sidebarlink'>
        <div className="icon">{}</div>
        <span className='linktext'><h3>{text}</h3></span>        
    </div>
    
  )
}
