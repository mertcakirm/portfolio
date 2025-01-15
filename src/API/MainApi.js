import axios from 'axios';
const BASE_URL="http://localhost:5260"

export const MainGetAll= async ()=>{
    const result= await axios.get(`${BASE_URL}/api/mainpage/get/all`);
    return result.data;
}

export const SkillsGetAll = async ()=>{
    const result= await axios.get(`${BASE_URL}/api/skills/get/all`);
    return result.data;
}


export const ProjectsGetAll = async ()=>{
    const result= await axios.get(`${BASE_URL}/api/projects/get/all`);
    return result.data;
}

export const BlogsGetAll = async ()=>{
    const result= await axios.get(`${BASE_URL}/api/blogs/get/all`);
    return result.data;
}