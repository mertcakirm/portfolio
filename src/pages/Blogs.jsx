import Navbar from "../components/navbar.jsx";
import {useEffect, useState} from "react";
import './css/blogs.css';
import {BlogsGetActive} from "../API/MainApi.js";
import Pagination from "../components/Pagination.jsx";
import "aos/dist/aos.css";

const Blogs = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

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
        const Blogsobj = await BlogsGetActive(page,8);
        setBlogs(Blogsobj.items);
        setTotalPages(Blogsobj.totalPages)
    };

    useEffect(() => {
        GetBlogs();
    }, []);

    useEffect(() => {
        GetBlogs();
    }, [page]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const datetime = dateString.split('T')[0];
        return datetime.split("-").reverse().join("-");
    };
    return (
        <div className="main-page-parent-con">
            <Navbar languageprops={handleLanguageChange}/>
            <div className="container-fluid blog_detail_con ">
                <div className="row row-gap-3 justify-content-center">
                    <p className="titles text-center col-12">{language === 'tr' ? 'BLOGLAR' : 'BLOGS'}</p>
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <div key={index} data-aos="fade-up" className="col-lg-3 p-3 col-12">
                                <a href={blog.blogid ? `/blog-detail/${blog.blogid}` : "#"}
                                   style={{textDecoration: 'none'}}
                                   className="blog-card">
                                    <img className="blog-card-img"
                                         src={blog.blog_image_base64 || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"}
                                         alt="blog"/>
                                    <p className="normal-text px-4">
                                        {language === "tr" ? blog.bloG_Name_tr : blog.blogName}
                                    </p>
                                    <p className="blog-card-desc">
                                        {language === "tr" ? blog.bloG_desc_tr : blog.blog_description}
                                    </p>
                                    <div className="w-100 px-0"></div>
                                    <p className="createdBy w-100 px-4 py-0 m-0">
                                        {language === "tr" ? "Oluşturan: " : "Created By: "}{blog.createdBy}
                                    </p>
                                    <p className="createdBy w-100 px-4 py-0 m-0">
                                        {formatDate(blog.createdDate)}

                                    </p>
                                </a>
                            </div>
                        ))
                    ) : (
                        <span className="text-center">{language === "tr" ? "Gösterilecek blog bulunamadı" : "No blog available"}</span>
                    )}
                </div>

                {blogs.length > 0 && (
                    <div  data-aos="fade-up">
                        <Pagination pageNum={page} setPageNum={setPage} lastPage={totalPages} />
                    </div>
                )}


            </div>

        </div>
    );
};

export default Blogs;
