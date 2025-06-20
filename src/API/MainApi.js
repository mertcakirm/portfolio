import axios from 'axios';

const BASE_URL = "http://localhost:5260/api/"

export const MainGetAll = async () => {
    const result = await axios.get(`${BASE_URL}mainpage/get/all`);
    return result.data;
}

export const SkillsGetAll = async () => {
    const result = await axios.get(`${BASE_URL}skills/get/all`);
    return result.data;
}


export const ProjectsGetAll = async (page, size) => {
    const result = await axios.get(`${BASE_URL}projects/get/paged?page=${page}&pageSize=${size}`);
    return result.data;
}

export const BlogsGetActive = async (page,size) => {
    const result = await axios.get(`${BASE_URL}blogs/public?page=${page}&pageSize=${size}`);
    return result.data;
}

export const GetBlogFromId = async (id) => {
    const result = await axios.get(`${BASE_URL}blogs/get/${id}`);
    return result.data;
}

export const EducationsGetAll = async () => {
    const result = await axios.get(`${BASE_URL}education/get/all`);
    return result.data;
}