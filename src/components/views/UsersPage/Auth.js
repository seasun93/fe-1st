import axios from 'axios';
import React from 'react';

function Auth() {

    axios.get('/api/users/auth').then((res)=>{console.log(res)})
    
    return (
        <div>Auth</div>
    )
}

export default Auth