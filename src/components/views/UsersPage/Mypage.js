import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Side from '../Layout/mypageSide';

function Mypage() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();


  return (
    <div>
        마이페이지
        <Side />
    </div>
  )
}

export default Mypage