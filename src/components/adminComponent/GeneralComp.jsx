import {useEffect, useState} from "react";
import {DeleteRolereq, DeleteUserreq, GetRoles, GetUsers} from "../../API/AdminApi.js";
import AddUserPopup from "./newUserPopup.jsx";
import AddRolePopup from "./newRolePopup.jsx";

const GeneralComp = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [reflesh, setReflesh] = useState(false);


    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        setReflesh((prevState) => !prevState);
    }
    const handleClosePopup = () =>{
        setIsPopupOpen(false);
        setReflesh((prevState) => !prevState);
    }

    const handleOpenPopup2 = () => {
        setIsPopupOpen2(true);
        setReflesh((prevState) => !prevState);
    }
    const handleClosePopup2 = () => {
        setIsPopupOpen2(false);
        setReflesh((prevState) => !prevState);
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


            </div>
        </div>
    );
};

export default GeneralComp;