import axios from "axios";
import {
    LOGIN_USER
} from '../_reducers/types';

export default async function loginUser(dataToSubmit){
    const request = await axios.post ('/api/users/login', dataToSubmit)
    .then(res => res)

    return {
        type : LOGIN_USER,
        result : request
    }
}