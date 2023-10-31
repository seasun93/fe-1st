import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_reducers/authSlice';

export default function (SpecificComponent, option, adminRoute = null) {
    const navigate = useNavigate();
    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth()).then((res)=>{
                if(!res.payload.result.data.isAuth){ // 로그인 안한상태
                    if(option) {
                        alert('회원전용입니다.');
                        navigate('/login');
                    }
                } else {
                    //로그인한 상태
                    if(adminRoute && !res.payload.result.data.isAdmin){ // 로그인을 했지만 관리자가 아닌경우
                        alert('접근할 수 없습니다.')
                        navigate('/');
                    } else {
                        if(option === false ){
                            navigate('/');
                        }
                    }
                }
            })
        },[])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}