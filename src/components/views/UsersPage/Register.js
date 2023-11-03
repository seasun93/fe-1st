import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Register(props) {
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");
    const [PwCk, setPwCk] = useState("");
    const [Nm, setNm] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const inputId = useRef(null);
    const inputPw = useRef(null);
    const inputPwCk = useRef(null);
    const inputNm = useRef(null);
    const checkMsg = useRef(null);
    const idMsg = useRef(null);


    // user.isLoggedIn이 true 일때 루트페이지로 이동
    if(user.isLoggedIn) {
        navigate('/');
    }

    //정규식
    const egNum = /^[A-Za-z0-9]{4,12}$/

    const onIdHandler = (e) => {
        setId(e.currentTarget.value.replace(/[^a-zA-Z0-9]/gi, ''))
        
        if(!egNum.test(Id)){
            idMsg.current.innerText = "4~12자로된 영문 혹은 숫자 조합"            
        } else {
            idMsg.current.innerText = ""
        }
    }
    const onCheckHandler = (e)=>{
        e.preventDefault();

        if(!egNum.test(Id)){
            alert('아이디 조건을 충족하지 않았습니다.')
            return;
        }
        
        const data = {
            id : Id
        }
        axios.post('/api/users/idCheck', data).then((res)=>{
            const result = res.data.msg;
            if(result.includes('중복')){
                idMsg.current.innerText = result;
            } else {
                idMsg.current.innerText = result;
            }
        })
    }
    const onPwHandler = (e) => {
        setPw(e.currentTarget.value);
    }
    const onPwCkHandler = (e) => {
        setPwCk(e.currentTarget.value);
        const checkPw = e.currentTarget.value;
        if(Pw !== checkPw) {
            checkMsg.current.innerText = "비밀번호를 확인해주세요."
        }
        if(Pw === checkPw) {
            checkMsg.current.innerText = "비밀번호가 일치합니다."
        }
    }
    const onNmHandler = (e) => {
        setNm(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        

        // 아이디 체크
        if(!Id){
            alert('아이디를 입력하세요')
            return inputId.current.focus();
        }
        //아이디 중복체크
        if(idMsg.current.innerText.includes('중복') || idMsg.current.innerText.includes('영문') || idMsg.current.innerText.length === 0){
            alert('아이디 중복확인을 하세요')
            return inputId.current.focus();
        }
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
        // 이름 체크
        if(!Nm){
            alert('이름을 입력하세요')
            return inputNm.current.focus();
        }

        if(Id !== null && Pw !== null && PwCk == Pw && Nm !== null){
            const data = {
                id : Id,
                pw : Pw,
                name : Nm
            }
    
            axios.post('/api/users/register', data).then((res)=>{console.log(res.data)})
            return;
        }
    }

    


    return (
        <div className="formWrap">
            <form action="register" method="post" onSubmit={onSubmitHandler} >
                <label>
                    <span>아이디</span>
                    <input type='text' name="userId" value={Id} id="userId" onChange={onIdHandler} ref={inputId} maxLength="12" minLength="4" />
                    <em ref={idMsg}></em>
                    <button onClick={onCheckHandler}>중복확인</button>
                </label>
                <br />
                <label>
                    <span>비밀번호</span>
                    <input type='password' name="userPw" value={Pw} id="userPw" onChange={onPwHandler} ref={inputPw} minLength="8"/>
                </label>
                <br />
                <label>
                    <span>비밀번호 확인</span>
                    <input type='password' name="pwCheck" value={PwCk} id="pwCheck" onChange={onPwCkHandler} ref={inputPwCk} minLength="8" />
                    <em ref={checkMsg}></em>
                </label>
                <br />
                <label>
                    <span>이름</span>
                    <input type='test' name="userNm" value={Nm} id="userNm" onChange={onNmHandler} ref={inputNm} />
                </label>
                <br />
                <button>등록</button>
            </form>

        </div>
    )
}

export default Register