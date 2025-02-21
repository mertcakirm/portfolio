import axios from "axios";
import { setCookie, getCookie } from "./Cookie.js";

const BASE_URL = "http://localhost:5260/api";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = getCookie("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const LoginRequest = async (LoginDTO) => {
    const result = await api.post("/auth/login", LoginDTO);
    if (result.data) {
        setCookie("token", result.data, 1);
        return result.data;
    }
};

export const GetUsers = async () => {
    try {
        const result = await api.get("/auth/get/all");
        return result.data;
    } catch (error) {
        console.error("Kullanıcı verilerini alırken hata oluştu:", error);
        throw error;
    }
};

export const GetRoles = async () => {
    try {
        const result = await api.get("/roles/get/all");
        return result.data;
    } catch (error) {
        console.error("Rol verilerini alırken hata oluştu:", error);
        throw error;
    }
};

// DELETE REQUESTS
export const DeleteRolereq = async (id) => {
    try {
        await api.delete(`/roles/delete/${id}`);
    } catch (error) {
        console.error("Rol silinirken hata oluştu:", error);
        throw error;
    }
};

export const DeleteUserreq = async (id) => {
    try {
        await api.delete(`/auth/delete/${id}`);
    } catch (error) {
        console.error("Kullanıcı silinirken hata oluştu:", error);
        throw error;
    }
};

export const DeleteProjectReq = async (id) => {
    try {
        await api.delete(`/projects/delete/${id}`);
    } catch (error) {
        console.error("Proje silinirken hata oluştu:", error);
        throw error;
    }
};

export const DeleteSkillReq = async (id) => {
    try {
        await api.delete(`/skills/delete/${id}`);
    } catch (error) {
        console.error("Yetkinlik silinirken hata oluştu:", error);
        throw error;
    }
};

export const DeleteEducationReq = async (id) => {
    try {
        await api.delete(`/education/delete/${id}`);
    } catch (error) {
        console.error("Eğitim bilgisi silinirken hata oluştu:", error);
        throw error;
    }
};

export const DeleteBlogReq = async (id) => {
    try {
        await api.delete(`/blogs/delete/${id}`);
    } catch (error) {
        console.error("Blog silinirken hata oluştu:", error);
        throw error;
    }
};

export const AddUserReq = async (data) => {
    try {
        await api.post("/auth/add", data);
    } catch (error) {
        console.error("Kullanıcı eklenirken hata oluştu:", error);
        throw error;
    }
};

export const AddRoleReq = async (data) => {
    try {
        await api.post("/roles/add", data);
    } catch (error) {
        console.error("Rol eklenirken hata oluştu:", error);
        throw error;
    }
};

export const AddSkillReq = async (data) => {
    try {
        await api.post("/skills/add", data);
    } catch (error) {
        console.error("Yetkinlik eklenirken hata oluştu:", error);
        throw error;
    }
};

export const AddProjectReq = async (data) => {
    try {
        await api.post("/projects/add", data);
    } catch (error) {
        console.error("Proje eklenirken hata oluştu:", error);
        throw error;
    }
};

export const AddEducationReq = async (data) => {
    try {
        await api.post("/education/add", data);
    } catch (error) {
        console.error("Eğitim bilgisi eklenirken hata oluştu:", error);
        throw error;
    }
};

export const AddBlogReq = async (data) => {
    try {
        await api.post("/blogs/add", data);
    } catch (error) {
        console.error("Blog eklenirken hata oluştu:", error);
        throw error;
    }
};

export const UpdateImageReq = async (data) => {
    try {
        await api.put("/mainpage/update/image", data);
    } catch (error) {
        console.error("Görsel güncellenirken hata oluştu:", error);
        throw error;
    }
};

export const UpdateContentsReq = async (data) => {
    try {
        await api.put("/mainpage/update/contents", data);
    } catch (error) {
        console.error("İçerik güncellenirken hata oluştu:", error);
        throw error;
    }
};

export const DeleteEduReq = async (id) => {
    try {
        await api.delete(`/education/delete/${id}`);
    } catch (error) {
        console.error("Blog silinirken hata oluştu:", error);
        throw error;
    }
};