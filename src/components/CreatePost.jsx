import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router';

const CreatePost = ({ isAuth }) => {
  const [language, setLanguage] = useState();
  const [postText, setPostText] = useState();
  const [postTime, setPostTime] = useState();

  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      language: language || null,
      postText: postText,
      postTime: postTime,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    })
    navigate('/Home');
  };

  useEffect(() => {
    const now = new Date();
    const time = `${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${now.getMinutes()}分`;
    setPostTime(time);
  }, [])

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate])

  const selectLanguage = (e) => setLanguage(e.target.value);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>投稿する</h1>
        <p>{postTime}</p>
        <div className="inputPost">
          <select id="language-select" onChange={selectLanguage}>
            <option value="">言語を選択してください</option>
            <option value="React">React</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea placeholder="投稿内容を記入"
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <button className="postButton" onClick={createPost}>投稿する</button>
      </div>
    </div>
  )
}

export default CreatePost