import {useEffect, useState} from 'react';
import AddRolePopup from "../newRolePopup.jsx";
import {DeleteRolereq, GetRoles} from "../../../API/AdminApi.js";

const Roles = () => {
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const RoleFetch = async () => {
        const data = await GetRoles();
        setRoles(data);
    }
    const handleOpenPopup2 = () => {
        setIsPopupOpen2(true);
    }
    const handleClosePopup2 = () => {
        setIsPopupOpen2(false);
        setRefresh((prevState) => !prevState);
    }

    const DeleteRole = async (id) => {
        await DeleteRolereq(id);
        setRefresh((prevState) => !prevState);
    }


    useEffect(() => {
        RoleFetch();

    }, [])

    useEffect(() => {
        RoleFetch();
    }, [refresh])

    return (
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

    );
};

export default Roles;