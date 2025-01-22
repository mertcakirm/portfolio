import {useEffect, useState} from "react";
import {DeleteRolereq, DeleteUserreq, GetRoles, GetUsers} from "../../API/AdminApi.js";
import AddUserPopup from "./newUserPopup.jsx";

const GeneralComp = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [reflesh, setReflesh] = useState(false);


    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const handleSaveUser = (userData) => {
        console.log("Yeni Kullanıcı:", userData);
    };

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
        setReflesh((prevState) => !prevState);
    }

    const DeleteRole=async (id)=>{
        await DeleteRolereq(id);
        setReflesh((prevState) => !prevState);
    }

    useEffect(() => {
        UserFetch();
        RoleFetch();
    },[])

    useEffect(() => {
        UserFetch();
        RoleFetch();
    },[reflesh])


    return (
        <div className="container-fluid py-5">
            <div className="row">

                <div className="col-12">
                    <h3>Kullanıcılar</h3>
                    <table className="table mt-5 px-4 table-striped table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Kullanıcı ID</th>
                            <th scope="col">Kullanıcı Adı</th>
                            <th scope="col">Rol Adı</th>
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
                    <h3>Roller</h3>
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

                <div>
                    <h1>Kullanıcı Yönetimi</h1>
                    <button onClick={handleOpenPopup}>Kullanıcı Ekle</button>
                    <AddUserPopup
                        isOpen={isPopupOpen}
                        onClose={handleClosePopup}
                    />
                </div>
            </div>
        </div>
    );
};

export default GeneralComp;