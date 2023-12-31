import { collection, deleteDoc, doc, getDocs, query, orderBy } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import './Home.css'

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState("All");

  //Firebaseからデータを降順で取得している
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, "posts"), orderBy("postTime", "desc")));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts();
    console.log(postList);
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id))
    window.location.href = '/Home'
  }

  const handleSelectLanguage = (e) => setSelectLanguage(e.target.value);

  return (
    <div className="homePage">
      <div className="selectPost">
        <select id="language-select" onChange={handleSelectLanguage}>
          <option value="" disabled>言語を選択してください</option>
          <option value="All">全言語</option>
          <option value="React">React</option>
          <option value="Java">Java</option>
          <option value="Others">その他</option>
        </select>
      </div>
      {/* 全てを表示させるか言語別に表示させるかを三項演算子で表現している */}
      {selectLanguage === "All" ?
        postList.map((post) => {
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
                {post.author.id === auth.currentUser?.uid && (<button onClick={() => handleDelete(post.id)}>削除</button>)}
              </div>
            </div>
          );
        })
        :
        postList.filter((post) => {
          return post.language === selectLanguage;
        }).map((post) => {
          return (
            <div className="postContents" key={post.id}>
              <div className="postHeader">
                <h2>{post.language}</h2>
              </div>
              <div className="postTextContainer">
                {post.postText}
              </div>
              <div className="postTextContainer">
                {post.postQuestion}
              </div>
              <div className="nameAndDeleteButton">
                <h3>{post.postTimeToString}</h3>
                {post.author.id === auth.currentUser?.uid && (<button onClick={() => handleDelete(post.id)}>削除</button>)}
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default Home