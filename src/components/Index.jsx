import { collection, getDocs, query, orderBy, limit } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './Index.css'

const Index = () => {
  const [postList, setPostList] = useState([]);

  //Firebaseから投稿した直近の3件のデータを取得
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, "posts"), orderBy("postTime", "desc"), limit(3)));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <div className="postHeader">
              <h2>{post.language}</h2>
            </div>
            <div className="postTextContainer">
              <h3>学んだこと</h3>
              {post.postText}
            </div>
            <div className="postTextContainer">
              <h3>疑問点</h3>
              {post.postQuestion}
            </div>
            <div className="nameAndDeleteButton">
              <h3>{post.postTimeToString}</h3>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Index