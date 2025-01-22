import axios from 'axios';
const BASE_URL="http://localhost:5260/api"

export const LoginRequest= async (LoginDTO)=>{
    const result= await axios.post(`${BASE_URL}/auth/login`,LoginDTO);
    return result.data
}

export const GetUsers= async ()=>{
    try {
        const result= await axios.get(`${BASE_URL}/auth/get/all`);
        return result.data;
    } catch (error) {
        console.error("Kullanıcı verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const GetRoles= async ()=>{
    try {
        const result= await axios.get(`${BASE_URL}/roles/get/all`);
        return result.data;
    } catch (error) {
        console.error("Kullanıcı verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const DeleteRolereq= async (id)=>{
    try {
        await axios.delete(`${BASE_URL}/roles/delete/${id}`);
    } catch (error) {
        console.error("Kullanıcı verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const DeleteUserreq= async (id)=>{
    try {
        await axios.delete(`${BASE_URL}/auth/delete/${id}`);
    } catch (error) {
        console.error("Kullanıcı verilerini alırken hata oluştu:", error);
        throw error;
    }
}

