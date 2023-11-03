import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { edit } from '../../../_reducers/authSlice';

function Edit(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [Pw, setPw] = useState('');
    const [PwCk, setPwCk] = useState('');
    const [Nm, setNm] = useState(user.user.name);

    const inputId = useRef(null);
    const inputPw = useRef(null);
    const inputPwCk = useRef(null);
    const inputNm = useRef(null);
    const checkMsg = useRef(null);

    

    const onPwHandler = (e)=>{
        setPw(e.target.value);
    }
    const onPwCkHandler = (e)=>{
        setPwCk(e.target.value);
        const checkPw = e.currentTarget.value;
        if(Pw !== checkPw) {
            checkMsg.current.innerText = "비밀번호를 확인해주세요."
        }
        if(Pw === checkPw) {
            checkMsg.current.innerText = "비밀번호가 일치합니다."
        }
    }
    const onNmHandler = (e)=>{
        // console.log(e.target.value)
        setNm(e.target.value)

        
    }
    const onCancleHandler = (e)=>{
        e.preventDefault();
        navigate(-1, {props : props})
    }

    
    const onSubmitHandler = (e)=>{
        e.preventDefault();

        // 비밀번호 체크
        if(!Pw){
            alert('비밀번호를 입력하세요')
            return inputPw.current.focus();
        }
        // 비밀번호 확인 체크
        if(!PwCk){
            alert('비밀번호 확인을 입력하세요')
            return inputPwCk.current.focus();
        }
        if(Pw !== PwCk){
            alert("비밀번호가 일치하지 않습니다.")
            return inputPwCk.current.focus();
        }
        if(inputNm.current.value.length === 0 || inputNm.current.value === undefined){
            alert('이름을 입력하세요')
            return inputNm.current.focus();
        }
        console.log(inputNm.current.value)
        if(inputId.current.value !== null && Pw !== null && PwCk == Pw && inputNm.current.value !== null){
            const data = {
                id : inputId.current.value,
                pw : Pw,
                name : inputId.current.value,
            }
    
            axios.post('/api/users/edit', data).then((res)=>{
                if(res.data.success){
                    alert('수정이 완료되었습니다. 다시 로그인 하세요.');
                    dispatch(edit());
                    navigate('/');
                } else {
                    alert('수정 실패. 입력한 정보를 확인하세요');
                }
            })
            return;
        }        
    }
    
    return (
        <div className ="edit-form">
            <form action="edit" method="post" onSubmit={onSubmitHandler}>
                <label>
                    <span>아이디</span>
                    <input type="text" id="userId" name="userId" value={user.isLoggedIn ? user.user.id : ''} ref={inputId} readOnly />
                </label>
                <br />
                <label>
                    <span>비밀번호</span>
                    <input type='password' name="userPw" value={Pw} id="userPw" onChange={onPwHandler} ref={inputPw} minLength="8"/>
                </label>
                <br />
                <label>
                    <span>비밀번호 확인</span>
                    <input type='password' name="pwCheck" value={PwCk} id="pwCheck" onChange={onPwCkHandler} ref={inputPwCk} minLength="8"/>
                    <em ref={checkMsg}></em>
                </label>
                <br />
                <label>
                    <span>이름</span>
                    <input type='test' name="userNm" value={Nm} id="userNm" onChange={onNmHandler} ref={inputNm} />
                </label>
                <br />
                <button onClick={onCancleHandler}>취소</button>
                <button>수정</button>
            </form>

        </div>
    )
}

export default Edit