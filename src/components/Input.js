import React, { useState } from 'react'
import { BsImage, BsEmojiSmile } from "react-icons/bs"
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai"

import { useSession } from 'next-auth/react'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'


 export const Input = () => {

    const { data: session } = useSession()
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)


    const addImageToPost = (e) => {

        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }

    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-")
        let codesArray = []
        sym.forEach((el) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    const sendPost = async () => {
        if (loading)
            return

        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            console.log("inside stage 1")
            await uploadString(imageRef, selectedFile, "data_url")
                .then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL,
                    })
                    console.log("inside stage 2")
                })
                console.log("inside stage 3")
        }

        setLoading(false)
        setInput("")
        setSelectedFile(null)
        console.log("inside stage 4")
        setShowEmojis(false)

    }

    return (
        <div className={`mt-4 px-4 ${loading && "opacity-60"}`}>

            <div className='uploadArea'>

                <div>
                    <img className='profilepicsmid' src={session?.user?.image} alt="" />
                </div>

                <div className='inputarea'>
                    <textarea
                        className='textarea'
                        rows="2"
                        placeholder="What's Happening?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} />
                        
                    

                     
               


                    {!loading && (
                        <div className='uploaderbox'>

                            <div className='upiconlist'>

                                <label htmlFor="file">
                                    <BsImage className='cursor-pointer iconbtn' />
                                </label>

                                <input id="file" type="file"
                                    hidden
                                    onChange={addImageToPost}
                                />

                                <div className='gifbtn iconbtn'>
                                    <AiOutlineGif />
                                </div>
                                <BsEmojiSmile className='cursor-pointer iconbtn' onClick={() => setShowEmojis(!showEmojis)} />
                               
                            
                            </div>

                            <button
                                className="btn"
                                disabled={!input.trim() && !selectedFile}
                                onClick={sendPost} >
                                Post
                            </button>

                        </div>
                    )}
                    {showEmojis && (
                        <div className='showemoji'>
                            <Picker
                                onEmojiSelect={addEmoji}
                                data={data}

                                theme="dark"
                            />
                        </div>
                    )}
                    
                    {selectedFile && (

<div className="selectImagebox ">
    <div className='sel-div2' onClick={() => setSelectedFile(null)}>
        <AiOutlineClose className='text-white h-5' />
    </div>

    <img
        src={selectedFile}
        alt=""
        className='selectImage' />

</div>

)}

                </div>

            </div>
            {loading &&( <h2>
                   Uploading data ....do not refresh else image will not be uploaded
                </h2>)}

        </div>
    )
}

export default Input