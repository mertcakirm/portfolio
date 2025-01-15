import Navbar from "../components/navbar.jsx";
import {useEffect, useState} from "react";
import './css/blogs.css';
import {BlogsGetAll} from "../API/MainApi.js";

const Blogs = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang && lang !== language) {
            setLanguage(lang);
        }
    }, [language]);
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };
    const GetBlogs = async () => {
        const Blogsobg= await BlogsGetAll();
        setBlogs(Blogsobg);

    }
    useEffect(() => {
        GetBlogs();
        console.log(blogs)
    }, []);
    return (
        <div className="main-page-parent-con">
            <Navbar languageprops={handleLanguageChange}/>
            <div className="container p-5">
                <div className="row row-gap-3 justify-content-center">
                    <p className="titles text-center col-12">{language === 'tr' ? 'BLOGLAR' : 'BLOGS'}</p>
                    {blogs && blogs.length > 0 ? (
                            blogs.map((blog, index) => (
                    <div key={index} className="col-lg-3 p-3 col-12">
                        <a href="#" style={{textDecoration: 'none'}} className="blog-card">
                            <img className="blog-card-img"
                                 src={`${blog.image_base64}` || `https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg`}/>
                            <p className="normal-text text-center ">{blog.blogName}</p>
                            <p className="blog-card-desc">{blog.blog_description}</p>
                        </a>
                    </div>
                            ))
                    ) : (
                        <span>{language === "tr" ? "Gösterilecek proje bulunmadı" : "No project available"}</span>
                    )}



                </div>
            </div>
        </div>
    );
};

export default Blogs;
