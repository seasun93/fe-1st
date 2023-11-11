import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Page from '../Layout/Page';


function Board() {
  const params = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  //로그인 유무
  const user = useSelector((state)=> state.user);
  // const list = useSelector((state)=> state.post);
  //리스트 출력하기
  const [list, setList] = useState([]);
  // const [page, setPage] = useState(params.page);
  const [total, setTotal] = useState('');
  const limit = 5;
  const type = 'board';
  
  useEffect(() => {
    listData();
  },[params.page])
  
  const listData = async()=>{
    const result = await axios.get(`/api/board/list/${params.page}`).then((res)=>{
      setTotal(res.data.length);
      setList(res.data.data);
    })
    return result
  }

  //리스트 클릭시 링크 이동
  const address = (id) => {
    navigate(`/board/view/${id}`);
  }

  return (
    <div className="board-wrap">
      <div className="board-top">
        <h1>게시판</h1>
        <span></span>
      </div>
      <div className="board-mid">
        {/* <span>총 <em>{list.length}</em>개</span> */}
      </div>
      <div className="board-btm" >
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>View</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {
              list.map((el)=>{
                const date = el.newDate
                // console.log(date)
                const KST = new Date(date);
                const creatYear = KST.getFullYear();
                const creatMonth = KST.getMonth();
                const creatDay = KST.getDate();
                const creatHour = KST.getHours();
                const creatMinute = KST.getMinutes();
                const currentTime = new Date();
                const currentYear = currentTime.getFullYear();
                const currentMonth = currentTime.getMonth();
                const currentDay = currentTime.getDate();
                const currentHour = currentTime.getHours();
                const currentMinute = currentTime.getMinutes();
                let time = '';

                if(currentMinute - creatMinute < 1 && currentHour == creatHour) {
                  //시간이 현재시간과 작성시간이 일치하면서 분 차이가 안나는 경우
                  time = 'new'
                } else if(currentMinute - creatMinute >= 1 && currentHour - creatHour < 1) {
                  time = `${currentMinute - creatMinute}분 전`
                } else if(currentHour - creatHour >= 1 && currentDay - creatDay < 1) {
                  time = `${currentHour - creatHour}시간 전`
                } else if(currentDay - creatDay >= 1  && currentYear - creatYear < 1){
                  time = `${creatMonth}-${creatDay}`
                } else {
                  time = `${currentYear - creatYear}년 전`
                }
                return(
                  <tr key={el.boardNum} onClick={()=>address(el.boardNum)}>
                    <td>{el.boardNum}</td>
                    <td>{el.boardTitle}</td>
                    <td>{el.author}</td>
                    <td>{el.view}</td>
                    <td>{time}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Page total={total} limit={limit} page={params.page} type={type} />
        <div className="button-wrap">
          {(user.isLoggedIn) && <Link to="/board/write">글쓰기</Link>}
        </div>
      </div>
    </div>
  )
}

export default Board