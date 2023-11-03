import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_reducers/authSlice';

export default function withAuthenticationCheck(SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props){
        const navigate = useNavigate();
        const user = useSelector((state) => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            // 재 작업을 위한 정리
            // loginSuccess 는 로그인을 안한 경우도 있지만 logout 한상태기도 하다.
            /*
                1. option이 null 값인 경우 무조건 components를 return값을 준다
                2. null이 아닌 경우 로그인 유무는 loginSuccess를 통해 확인
                3. 이후 isAuth를 통해 true값인지 아닌지 확인
                4. 이후 option을 통해 ture와 false로 나누어 결과 값 방출
            */

            // null = 회원 관계 유무 접근 가능
            // false = 회원이 이용 할 수 없는 페이지
            // ture = 회원만 이용 할 수 있는 페이지

            // 누구나 접근이 가능한 사이트
            console.log(option)
            dispatch(auth()).then((res)=>{
                if(user.isLoggedIn){
                    if (adminRoute && !user.user.isAdmin) { // 로그인 했지만 admin 페이지고 등급이 admin이 아닐 때
                        // console.log('// 로그인 했지만 admin 페이지고 등급이 admin이 아닐 때')
                        alert('접근할 수 없습니다.');
                        navigate('/');
                    }                    
                    if (!option && option !== null) { // 로그인했지만 로그인한 경우 접근 할 수 없는 페이지인 경우
                        // console.log('// 로그인했지만 로그인한 경우 접근 할 수 없는 페이지인 경우')
                        navigate('/');
                    }
                } else {
                    if (!user.isLoggedIn && user.isLoggedIn !== undefined && option) { // 로그인을 안했지만 로그인을 해야지만 접근 할 수 있는 경우
                        // console.log('// 로그인을 안했지만 로그인을 해야지만 접근 할 수 있는 경우')
                        alert('회원전용입니다.');
                        navigate('/login');
                    }
                }
                if (option === null && user.isLoggedIn) { // 누구나 접근할수 있는데 로그인을 한 경우
                    // console.log('// 누구나 접근 가능한데 로그인을 한경우')
                    return <SpecificComponent props = {user.user}/>
                } else if(option === null && !user.isLoggedIn && user.isLoggedIn !== undefined) {
                    // console.log('// 누구나 접근 가능한데 로그인을 안한경우')
                    return <SpecificComponent />
                }
            })
        }, []);

        return (
            user.isLoggedIn ? <SpecificComponent props={user} /> : <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}
