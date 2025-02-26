import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar.jsx";
import {GetBlogFromId} from "../API/MainApi.js";
import './css/Blog_detail.css'

const Blog_detail = () => {
    const { id } = useParams();
    const [blogState, setBlogState] = useState(null);

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang && lang !== language) {
            setLanguage(lang);
        }
    }, [language]);

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const getBlog = async () => {
        const blogsobj = await GetBlogFromId(id);
        setBlogState(blogsobj);
    }

    useEffect(() => {
        getBlog();

    }, []);

    return (
        <div className="main-page-parent-con">
            <Navbar languageprops={handleLanguageChange} />
            <div className="container-fluid blog_detail_con">
                <div className="row justify-content-center">
                    {blogState ? (
                        <div className="row justify-content-center col-12 row-gap-5">
                            <div className="row col-12 justify-content-between">
                                <div className="col-lg-3 col-12">{blogState.createdDate}</div>
                                <div className="text-center col-lg-6 col-12 titles w-auto">{language === "tr" ? blogState.bloG_Name_tr : blogState.blogName}</div>
                                <div className="createdBy col-lg-3 col-12">  {language === "tr" ? "Oluşturan: " : "Created By: "}{blogState.createdBy}</div>
                            </div>


                            {blogState.blog_Contents.map((content, index) => (
                                <div key={index} className="col-12 justify-content-center text-center row-gap-3 row">
                                    <img
                                        className="col-12 blog_images img-fluid"
                                        alt={`Blog Content ${index}`}
                                        src={content.image_base64}
                                    />
                                    <div>{language === "tr" ? content.title_tr : content.title_en}</div>
                                    <p>{language === "tr" ? content.content_tr : content.content_en}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>{language === "tr" ? "Gösterilecek blog bulunamadı" : "No blog available"}</span>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default Blog_detail;
