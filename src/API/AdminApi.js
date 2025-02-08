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

export const AddUserReq= async (data)=>{
    try {
        await axios.post(`${BASE_URL}/auth/add`,data);
    } catch (error) {
        console.error("Kullanıcı verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const AddRoleReq= async (data)=>{
    try {
        await axios.post(`${BASE_URL}/roles/add`,data);
    } catch (error) {
        console.error("Rol verilerini alırken hata oluştu:", error);
        throw error;
    }
}


export const AddSkillReq= async (data)=>{
    try {
        await axios.post(`${BASE_URL}/skills/add`,data);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}


export const AddProjectReq= async (data)=>{
    try {
        await axios.post(`${BASE_URL}/projects/add`,data);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}


export const DeleteProjectReq= async (id)=>{
    try {
        await axios.delete(`${BASE_URL}/projects/delete/${id}`);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const DeleteSkillReq= async (id)=>{
    try {
        await axios.delete(`${BASE_URL}/skills/delete/${id}`);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const AddEducationReq= async (data)=>{
    try {
        await axios.post(`${BASE_URL}/education/add`,data);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}


export const DeleteEducationReq= async (id)=>{
    try {
        await axios.delete(`${BASE_URL}/education/delete/${id}`);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const AddBlogReq= async (data)=>{
    try {
        await axios.post(`${BASE_URL}/blogs/add`,data);
    }catch (error){
        console.error("Yetkinlik verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const DeleteBlogReq=async (id)=>{
    try {
        await axios.delete(`${BASE_URL}/blogs/delete/${id}`);
    }catch (error){
        console.error("Blog verilerini alırken hata oluştu:", error);
        throw error;
    }
}

export const UpdateImageReq=async (data)=>{
    try {
        await axios.put(`${BASE_URL}/mainpage/update/image`,data);
    }catch (error){
        console.error("Blog verilerini alırken hata oluştu:", error);
        throw error;
    }
}