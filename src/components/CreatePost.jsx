import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router';

const CreatePost = ({ isAuth }) => {
  const [language, setLanguage] = useState();
  const [postText, setPostText] = useState();
  const [postQuestion, setPostQuestion] = useState();
  const [postTime, setPostTime] = useState();
  const [postTimeToString, setPostTimeToString] = useState();

  const navigate = useNavigate();

  //Firebaseに投稿している
  //TODO 本来はpostTimeからToStringを作った方が良い、DBの節約になるから、どうすれば良いのだろう
  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      language: language,
      postText: postText,
      postQuestion: postQuestion || null,
      postTime: postTime,
      postTimeToString: postTimeToString,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    })
    navigate('/Home');
  };

  //投稿の時間をゲットするため
  useEffect(() => {
    const now = new Date();
    const time = `${now.getFullYear()}年 ${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${now.getMinutes()}分`;
    setPostTime(now);
    setPostTimeToString(time);
  }, [])

  //認証されているかどうかのチェック
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
        <p>{postTimeToString}</p>
        <div className="inputPost">
          <select id="language-select" onChange={selectLanguage}>
            <option value="">言語を選択してください</option>
            <option value="React">React</option>
            <option value="Java">Java</option>
            <option value="Others">その他</option>
          </select>
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea placeholder="学んだことを記入"
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <textarea placeholder="疑問点を記入"
            onChange={(e) => setPostQuestion(e.target.value)}
          ></textarea>
        </div>
        <button className="postButton" onClick={createPost}>投稿する</button>
      </div>
    </div>
  )
}

export default CreatePost