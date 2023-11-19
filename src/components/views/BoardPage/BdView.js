import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function BdView() {
  const user = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const location = useLocation()

  const [post, setPost] = useState('');
  const path = location.pathname.split('/');
  const boardType = path[1];
  const postNum = path[3];

  useEffect(() => {
    viewData();
  },[postNum])

  const tagArr = [];
  const tag = post.boardTag
  const tagList =  String(tag).split(',');
  tagArr.push(tagList)

  
  const viewData = async (e) => {
    const result = await axios.get(`/api/board/view/${postNum}`).then((res)=>{
      setPost(res.data.data[0])
    })
    return result;
  }

  const onDeleteHandler = (e) => {
    axios.delete(`/api/${boardType}/delete/${postNum}`).then((res)=>{
      if(res.data.success){
        alert(res.data.msg)
        navigate(-1);
        return
      }
      alert(res.data.msg)
    })
  }

  return (
    <div className="viewer">
      <div className="viewer-top">
        <ul>
          <li>{post.boardTitle}</li>
          <li>{post.author}</li>
          <li>{post.view}</li>
        </ul>
      </div>
      <div className="markdownDiv viewer-mid" data-color-mode="light" style={{padding:15}}>
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source={post.boardContent}
          />
      </div>
      <div className="viewer-btm">
        <div className="tag-list">
          {
            tagArr[0].map((el,i)=>{
              return (
                <span key={i} className={el == 'react' ? 'code-react' : (el == 'node' ? 'code-node' : (el == 'javascript' ? 'code-javascript' : 'code-etc') )}>{el}</span>
              )
            })
          }
        </div>
        <div className="viewer-btn">
          {user.isLoggedIn &&  user.user.name == post.author?(
            <>
            <button type="button" onClick={onDeleteHandler}>삭제</button>
            <a href={`/${boardType}/update/${postNum}`}>수정</a>
            </>
          ) : ''}
        </div>
      </div>
    </div>
  )
}

export default BdView