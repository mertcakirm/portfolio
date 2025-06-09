import {useEffect, useState} from 'react';
import {BlogsGetAll, DeleteBlogReq, HiddenBlogReq, ShowBlogReq} from "../../../API/AdminApi.js";
import Pagination from "../../Pagination.jsx";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [totalPages, setTotalPages] = useState(5);

    const ShowBlog = async (id) => {
        await ShowBlogReq(id);
        setRefresh((prevState) => !prevState);
    }
    const HiddenBlog = async (id) => {
        await HiddenBlogReq(id);
        setRefresh((prevState) => !prevState);
    }

    const DeleteBlog = async (id) => {
        await DeleteBlogReq(id);
        setRefresh((prevState) => !prevState);

    }

    const BlogsGet = async () => {
        const data = await BlogsGetAll(page,10)
        setBlogs(data.items);
        setTotalPages(data.totalPages)

    }
    useEffect(() => {
        BlogsGet();
    }, []);

    useEffect(() => {
        BlogsGet();
    }, [page,refresh]);

    return (
        <div className="col-12 mt-5">
            <div className="row px-3 justify-content-between">
                <h3 className="col-6">Bloglar</h3>
            </div>
            <table className="table mt-5 table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">Blog ID</th>
                    <th scope="col">Blog Adı</th>
                    <th scope="col">Blog Name</th>
                    <th scope="col">Blog Sahibi</th>
                    <th scope="col">Görünürlük</th>
                    <th scope="col" className=" text-center">İşlem</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map((blog, index) => (
                    <tr key={index}>
                        <th scope="row">{blog.blogid}</th>
                        <td>{blog.bloG_Name_tr}</td>
                        <td>{blog.blogName}</td>
                        <td>{blog.createdBy}</td>
                        <td>{blog.showBlog == false ? "Pasif" : "Aktif"}</td>
                        <td>
                            <div className="row justify-content-center column-gap-3">
                                <button onClick={() => {
                                    if (blog.showBlog == false) {
                                        ShowBlog(blog.blogid)
                                    } else {
                                        HiddenBlog(blog.blogid)
                                    }
                                }}
                                        className="delete-btn col-4">Görünürlük Değiştir
                                </button>
                                <button onClick={() => DeleteBlog(blog.blogid)}
                                        className="delete-btn col-4">Sil
                                </button>
                            </div>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageNum={page} setPageNum={setPage} lastPage={totalPages}/>

        </div>

    );
};

export default Blog;