import { useState } from 'react';
import {AddBlogReq} from "../../API/AdminApi.js";

const generateRandomBlogId = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
};

const BlogComp = () => {
    const [blogId, setBlogId] = useState(generateRandomBlogId());
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [contents, setContents] = useState([
        { id: generateRandomBlogId(), blogId: blogId, title_en: "", title_tr: "", content_en: "", content_tr: "", image_base64: "" }
    ]);
    const [blogs, setBlogs] = useState({ BlogName: "", image_base64: "", Blog_description: "", BLOG_Name_tr: "", BLOG_desc_tr: "" });

    const addContent = () => {
        setContents([...contents, {
            id: generateRandomBlogId(),
            blogId,
            title_en: "",
            title_tr: "",
            content_en: "",
            content_tr: "",
            Blog_image_base64: ""
        }]);
    };

    const updateContent = (id, field, value) => {
        setContents(contents.map((content) => (content.id === id ? { ...content, [field]: value } : content)));
    };

    const removeContent = (id) => {
        setContents(contents.filter((content) => content.id !== id));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        if (event.dataTransfer.files.length > 0) {
            handleFileChange({ target: { files: event.dataTransfer.files } });
        }
    };

    const showBlogInp = () => {
        const blogCon = document.querySelector(".add-blog-con");
        const blogBtn = document.querySelector(".add-blog-btn");
        if (blogCon && blogBtn) {
            blogCon.style.display = "flex";
            blogBtn.style.display = "none";
        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setBlogs({ ...blogs, Blog_image_base64: reader.result });
                setFile(file);
            };
        }
    };

    const HandleSubmit = async () => {
        if (!blogId) {
            console.error("blogId değeri tanımlı değil!");
            return;
        }

        if (!blogs || !contents) {
            console.error("blogs veya contents undefined!");
            return;
        }

        const updatedContents = contents.map(content => ({
            ...content,
            image_base64: content.image_base64 || ""
        }));

        const submitObj = {
            Blogid: blogId,
            BlogName: blogs.BlogName,
            Blog_image_base64: blogs.Blog_image_base64,
            Blog_description: blogs.Blog_description,
            BLOG_Name_tr: blogs.BLOG_Name_tr,
            BLOG_desc_tr: blogs.BLOG_desc_tr,
            blog_Contents: updatedContents,
        };

        try {
            const response = await AddBlogReq(submitObj);
            console.log("API Yanıtı:", response);
        } catch (error) {
            console.error("API isteği başarısız:", error);
        }
    };



    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div style={{ height: '100vh' }} className="col-12 row add-blog-btn justify-content-center align-items-center">
                    <button className="col-12 row-gap-3 row bg-transparent border-0" onClick={showBlogInp}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="col-12" width="50" fill="white" height="50" viewBox="0 0 24 24">
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                        </svg>
                        <h2 className="col-12 text-center">Blog Ekle</h2>
                    </button>
                </div>
                <div className="col-12 add-blog-con row justify-content-center" style={{ display: "none" }}>
                    <div style={{ height: 'fit-content' }} className="row col-4 row-gap-3 justify-content-center">
                        <h5 className="col-12 text-center">Genel Blog Yönetimi</h5>
                        <input type="text" className="col-12 login-inp" placeholder="Blog Title" value={blogs.BlogName} onChange={(e) => setBlogs({ ...blogs, BlogName: e.target.value })} />
                        <input type="text" className="col-12 login-inp" placeholder="Blog Başlığı" value={blogs.BLOG_Name_tr} onChange={(e) => setBlogs({ ...blogs, BLOG_Name_tr: e.target.value })} />
                        <input type="text" className="col-12 login-inp" placeholder="Blog Content" value={blogs.Blog_description} onChange={(e) => setBlogs({ ...blogs, Blog_description: e.target.value })} />
                        <input type="text" className="col-12 login-inp" placeholder="Blog Açıklaması" value={blogs.BLOG_desc_tr} onChange={(e) => setBlogs({ ...blogs, BLOG_desc_tr: e.target.value })} />
                        <div className={`file-upload ${dragActive ? "drag-active" : ""}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                            <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} />
                            <label htmlFor="fileInput" className="file-label">
                                {file ? file.name : "Görselinizi buraya sürükleyin veya tıklayarak seçin"}
                            </label>
                        </div>
                        <button className="col-12 login-btn" onClick={HandleSubmit}>Kaydet</button>
                    </div>
                    <div className="col-8" style={{ height: '100vh', overflowY: 'auto' }}>
                        <button className="btn btn-light login-btn m-3" onClick={addContent}>+ İçerik Ekle</button>
                        {contents.map((content) => (
                            <div key={content.id} className="content-box">
                                <input type="text" className="login-inp w-100 mb-2" placeholder="Title" value={content.title_en} onChange={(e) => updateContent(content.id, "title_en", e.target.value)} />
                                <input type="text" className="login-inp w-100" placeholder="Başlık" value={content.title_tr} onChange={(e) => updateContent(content.id, "title_tr", e.target.value)} />
                                <textarea className="login-inp pt-2 w-100 mt-2" placeholder="Content" value={content.content_en} onChange={(e) => updateContent(content.id, "content_en", e.target.value)} />
                                <textarea className="login-inp pt-2 w-100 mt-2" placeholder="Açıklama" value={content.content_tr} onChange={(e) => updateContent(content.id, "content_tr", e.target.value)} />
                                <input type="file" className="form-control mt-2" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onload = () => updateContent(content.id, "image_base64", reader.result);
                                    }
                                }} />
                                {content.image && <img src={content.image} alt="Yüklenen" className="preview-img" />}
                                <button className="btn btn-danger mt-2" onClick={() => removeContent(content.id)}>Sil</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogComp;
