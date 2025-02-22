import {useEffect, useState} from "react";
import {DeleteBlogReq, DeleteRolereq, DeleteUserreq, GetRoles, GetUsers} from "../../API/AdminApi.js";
import AddUserPopup from "./newUserPopup.jsx";
import AddRolePopup from "./newRolePopup.jsx";
import {BlogsGetAll} from "../../API/MainApi.js";
import {getCookie} from "../../API/Cookie.js";

const GeneralComp = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }
    const handleClosePopup = () =>{
        setIsPopupOpen(false);
        setRefresh((prevState) => !prevState);
    }

    const handleOpenPopup2 = () => {
        setIsPopupOpen2(true);
    }
    const handleClosePopup2 = () => {
        setIsPopupOpen2(false);
        setRefresh((prevState) => !prevState);
    }

    const RoleFetch=async()=>{
        const data=await GetRoles();
        setRoles(data);
    }

    const UserFetch=async()=>{
        const data=await GetUsers();
        setUsers(data);
    }

    const DeleteUser=async (id)=>{
        await DeleteUserreq(id);
        setRefresh((prevState) => !prevState);
    }

    const DeleteRole=async (id)=>{
        await DeleteRolereq(id);
        setRefresh((prevState) => !prevState);
    }

    const DeleteBlog=async (id)=>{
        await DeleteBlogReq(id);
        setRefresh((prevState) => !prevState);

    }

    const BlogsGet = async()=>{
        const data = await BlogsGetAll()
        setBlogs(data);
        console.log(data)
    }

    useEffect(() => {
        UserFetch();
        RoleFetch();
        BlogsGet();
        const decodeJWT = (token) => {
            const payload = token.split(".")[1];
            return JSON.parse(atob(payload));
        };

        const token = getCookie("token");
        if (token) {
            const decoded = decodeJWT(token);
            if (decoded.sub==="admin"){
                console.log("test")
            }
        }
    },[])

    useEffect(() => {
        UserFetch();
        RoleFetch();
        BlogsGet();
    },[refresh])






    return (
        <div className="container-fluid py-5">
            <div className="row">

                <div className="col-12">
                    <div className="row px-3 justify-content-between">
                        <h3 className="col-6">Kullanıcılar</h3>
                        <button className="col-2 add-btn" onClick={handleOpenPopup}>Kullanıcı Ekle</button>
                        <AddUserPopup
                            isOpen={isPopupOpen}
                            onClose={handleClosePopup}
                        />
                    </div>
                    <table className="table mt-5 px-4 table-striped table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Kullanıcı ID</th>
                            <th scope="col">Kullanıcı Adı</th>
                            <th scope="col">Rol ID</th>
                            <th scope="col">İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{user.uid}</th>
                                <td>{user.username}</td>
                                <td>{user.roleId}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => DeleteUser(user.uid)}>Sil</button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>


                <div className="col-12 mt-5">
                    <div className="row px-3 justify-content-between">
                        <h3 className="col-6">Roller</h3>
                        <button className="col-2 add-btn" onClick={handleOpenPopup2}>Rol Ekle</button>
                        <AddRolePopup
                            isOpen2={isPopupOpen2}
                            onClose2={handleClosePopup2}
                        />
                    </div>
                    <table className="table mt-5 table-striped table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Rol ID</th>
                            <th scope="col">Rol Adı</th>
                            <th scope="col">İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {roles.map((role, index) => (
                            <tr key={index}>
                                <th scope="row">{role.roleid}</th>
                                <td>{role.roleName}</td>
                                <td>
                                    <button onClick={() => DeleteRole(role.roleid)} className="delete-btn">Sil</button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>


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
                            <th scope="col">İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={index}>
                                <th scope="row">{blog.blogid}</th>
                                <td>{blog.bloG_Name_tr}</td>
                                <td>{blog.blogName}</td>
                                <td>
                                    <button onClick={() => DeleteBlog(blog.blogid)} className="delete-btn">Sil</button>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default GeneralComp;