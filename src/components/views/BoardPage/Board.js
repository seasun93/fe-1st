import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Board() {

  //로그인 유무
  const user = useSelector((state)=> state.user);

  const data = axios.get('/api/boards/post');

  return (
    <div className="board-wrap">
      <div className="board-top">
        <h1>게시판</h1>
        <span></span>
      </div>
      <div className="board-btm">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <div className="button-wrap">
          {(user.isLoggedIn) && <Link to="/board/write">글쓰기</Link>}
          
        </div>
      </div>
    </div>
  )
}

export default Board