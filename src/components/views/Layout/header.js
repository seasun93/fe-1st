import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../_reducers/authSlice';

function Header() {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const user = useSelector((state) => state.user);

        // 로그아웃 작업
        const onLogoutHandler = (e) => {
            // e.preventDefault();

            const sendUser = {
                id : user.user.id
            }

            axios.post('/api/users/logout',sendUser)
                .then((res)=>{
                    //로그아웃 후 상태 변환해주기
                    dispatch(logout());
                    alert('로그아웃 되었습니다.')
                    navigate('/');
                })
            
        }

    return (
        <div className='header'>
            <div className="nav">
                <div className="nav-top">
                    {user.isLoggedIn ? (
                        <p>어서오세요 <em>{user.user.name}</em>님</p> ): ''}
                    <ul>
                        {user.isLoggedIn === false ? (<>
                            <li><Link to="/register"> SIGN UP </Link></li>
                            <li><Link to="/login"> SIGN IN </Link></li>
                        </>)
                        :  <>
                            <li><Link to="/mypage"> MYPAGE </Link></li>
                            <li><button onClick={onLogoutHandler}>LOGOUT</button></li>
                        </>
                        }
                        {(user.isLoggedIn && user.user.isAdmin ) && <li><Link to="/admin">관리자모드</Link></li>}
                    </ul>
                </div>
                <div className="nav-btm">
                    <ul>
                        <li><Link to="/"> Home </Link></li>
                        <li><Link to="/portfolio">PORTFOLIO</Link></li>
                        <li><Link to="/board">게시판</Link></li>
                    </ul>
                </div>
            </div>        
        </div>
    )
}

export default Header