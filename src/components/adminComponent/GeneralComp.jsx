import {useEffect, useState} from "react";
import {
    DeleteBlogReq,
    DeleteRolereq,
    DeleteUserreq,
    GetRoles,
    GetUsers,
    HiddenBlogReq,
    ShowBlogReq
} from "../../API/AdminApi.js";
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
    }

    const ShowBlog =async(id)=>{
        await ShowBlogReq(id);
        setRefresh((prevState) => !prevState);
    }
    const HiddenBlog =async(id)=>{
        await HiddenBlogReq(id);
        setRefresh((prevState) => !prevState);
    }
    useEffect(() => {
        UserFetch();
        RoleFetch();
        BlogsGet();

    },[])

    useEffect(() => {
        UserFetch();
        RoleFetch();
        BlogsGet();
    },[refresh])

    const decodeJWT = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    };

    const token = getCookie("token");

    if (!token) {
        return <div>Token bulunamadı</div>;
    }

    const decoded = decodeJWT(token);

    return decoded.sub === "admin" ? (

        <div className="container-fluid py-5">
            <div className="row">

                <div className="col-12">
                    <div className="row px-3 justify-content-between">
                        <h3 className="col-6">Kullanıcılar</h3>
                        <button className="col-2 add-btn" onClick={handleOpenPopup}>Kullanıcı Ekle</button>
                        <AddUserPopup
                            isOpen={isPopupOpen}
                            onClose={handleClosePopup}
                            reflesh={(b)=>{
                                if(b===true){
                                    setRefresh(prev => !prev);
                                }
                            }}
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
                </div>

            </div>
        </div>
    ) : (
        <div className="w-100 text-center align-items-center justify-content-center row-gap-5"
             style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <svg className="col-12" xmlns="http://www.w3.org/2000/svg" fill="white" width="200" height="200"
                 viewBox="0 0 24 24">
                <path
                    d="M16.143 2l5.857 5.858v8.284l-5.857 5.858h-8.286l-5.857-5.858v-8.284l5.857-5.858h8.286zm.828-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm.932 11.667c-.127.328-1.695 3.888-2.096 4.786-.42.941-1.239 1.881-2.751 1.881h-2.627c-1.592 0-2.43-.945-2.43-2.596v-7.208c0-.956 1.316-.908 1.316-.044v3.16c0 .26.478.259.478 0v-5.079c0-.982 1.472-.957 1.472 0v4.795c0 .264.443.252.443-.005v-5.628c0-.957 1.457-.984 1.457 0l.001 5.692c0 .254.459.261.459 0v-4.78c0-.905 1.596-.933 1.596 0v5.417c0 .331.327.384.45.131.118-.24.605-1.315.613-1.327.49-1.029 2.128-.404 1.619.805z"/>
            </svg>
            <h3 className="col-12">Bu alana giriş yetkiniz bulunmamaktadır!!!</h3>
        </div>
    );
};

export default GeneralComp;