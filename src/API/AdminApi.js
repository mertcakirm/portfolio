import axios from 'axios';
const BASE_URL="http://localhost:5260"

export const LoginRequest= async (LoginDTO)=>{
    console.log(LoginDTO)
    const result= await axios.post(`${BASE_URL}/api/auth/login`,LoginDTO);
    return result.data
}