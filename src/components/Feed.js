import React, { useEffect, uposttopseState,useState } from 'react'

import { Input } from './Input';
import { Post } from './Post';
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const Feed = (props) => {


  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
          console.log(snapshot.docs)
        }
      ),
   
      [db]
  )
  return (
<section className="Feed postlist">
    
      

        <Input/>
        {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} cont={props.cont} />
      ))}
      
    </section>
  )
}


