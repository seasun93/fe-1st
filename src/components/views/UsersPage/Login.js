import axios from 'axios';
import React, { useState } from 'react';

function Login() {

    const [Id, setId] = useState('');
    const [Pw, setPw] = useState('');

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const onPwHandler = (e) => {
        setPw(e.currentTarget.value);
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = {
            id : Id,
            pw : Pw,
        }
        axios.get('/api/users/login').then((res)=>{console.log(res.data)})

        axios.post('/api/users/login', data)
        .then((res)=>{console.log(res.data)})
        .catch((err)=>{
            console.error(err);
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