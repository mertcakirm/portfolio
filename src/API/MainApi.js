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



export const BlogsGetActive = async ()=>{
    const result= await axios.get(`${BASE_URL}/api/blogs/get/active`);
    return result.data;
}

export const GetBlogFromId=async (id)=>{
    const result= await axios.get(`${BASE_URL}/api/blogs/get/${id}`);
    return result.data;
}

export const EducationsGetAll = async ()=>{
    const result= await axios.get(`${BASE_URL}/api/education/get/all`);
    return result.data;
}