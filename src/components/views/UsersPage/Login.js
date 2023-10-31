import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../../_reducers/userSlice";

function Login() {

    const [Id, setId] = useState('');
    const [Pw, setPw] = useState('');
    const dispatch = useDispatch();
    const Navigate = useNavigate();

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
        dispatch(loginUser(data))
        .then((res)=>{
            const result = res.payload.result.data.loginSuccess
            // console.log(result)
            if(!result.success) {
                alert(result.msg);
            } else {
                alert('로그인 완료!')
                Navigate('/')
            }
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