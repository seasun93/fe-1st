import axios from 'axios';
import React, { useRef, useState } from 'react';


function Register(props) {
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");
    const [PwCk, setPwCk] = useState("");
    const [Nm, setNm] = useState("");

    const inputId = useRef(null);
    const inputPw = useRef(null);
    const inputPwCk = useRef(null);
    const inputNm = useRef(null);
    const checkMsg = useRef(null);

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
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


    // axios.get('/api/users/register').then((res)=>{console.log(res.data)})

    const onSubmitHandler = (e) => {
        e.preventDefault();
        

        // 아이디 체크
        if(!Id){
            alert('아이디를 입력하세요')
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
        // 이름 체크
        if(!Nm){
            alert('이름을 입력하세요')
            return inputNm.current.focus();
        }

        const data = {
            id : Id,
            pw : Pw,
            name : Nm
        }

        axios.post('/api/users/register', data).then((res)=>{console.log(res.data)})
    }

    


    return (
        <div className="formWrap">
            <form action="register" method="post" onSubmit={onSubmitHandler} >
                <label>
                    <span>아이디</span>
                    <input type='text' name="userId" value={Id} id="userId" onChange={onIdHandler} ref={inputId} />
                </label>
                <br />
                <label>
                    <span>비밀번호</span>
                    <input type='password' name="userPw" value={Pw} id="userPw" onChange={onPwHandler} ref={inputPw} />
                </label>
                <br />
                <label>
                    <span>비밀번호 확인</span>
                    <input type='password' name="pwCheck" value={PwCk} id="pwCheck" onChange={onPwCkHandler} ref={inputPwCk} />
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