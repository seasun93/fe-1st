import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        useEffect(()=>{

            dispatch(auth()).then((res)=>{
                console.log(res)
            })
        },[])
    }

    return AuthenticationCheck
}