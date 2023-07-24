import React from 'react'
import {FcGoogle}  from  "react-icons/fc"
import {signIn} from 'next-auth/react'
export const Login = () => {
  return (
    <div className='Login'>
        <div className="login-centerbox">
            <div className="tinybox" onClick={()=>{
                signIn('google')
            }}>
            <FcGoogle className='google-icon'>
              
            </FcGoogle>
            <h5>SIGN IN WITH GOOGLE</h5>
            </div>
            

        </div>


    </div>
  )
}
