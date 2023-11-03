import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const [Id, setId] = useState('');
    const [Pw, setPw] = useState('');
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const onIdHandler = (e) => {
        setId(e.currentTarget.value.replace(/[^a-zA-Z0-9]/gi, ''))
    }
    const onPwHandler = (e) => {
        setPw(e.currentTarget.value);
    }

    if(user.isLoggedIn) {
        navigate('/');
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            id : Id,
            pw : Pw,
        }

        axios.post('/api/users/login', data)
            .then((res)=>{
                const result = res.data.loginSuccess;
                if(!result.success){
                    //로그인 실패
                    alert(result.msg);
                    return
                }
                alert('로그인되었습니다.');
                navigate(-1);
            })
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler} method='post' action ="login">
                <label>
                    <span>아이디</span>
                    <input type="text" id="userId" value={Id} onChange={onIdHandler} name="userId" />
                </label>
                <br/>
                <label>
                    <span>비밀번호</span>
                    <input type="password" id="userPw" value={Pw} onChange={onPwHandler} name="userPw" />
                </label>
                <br/>
                <button>로그인</button>
            </form>
        </div>
    )
}

export default Login