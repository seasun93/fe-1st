import React from 'react';
import { Link } from 'react-router-dom';

function mypageSide() {
    const onCancleHandler = (e) => {
        console.log(e);
    }

  return (
    <div className="side-menu">
        <ul>
            <li><Link to="/edit">회원정보수정</Link></li>
            <li><button onClick={onCancleHandler}>회원탈퇴</button></li>
        </ul>
    </div>
  )
}

export default mypageSide