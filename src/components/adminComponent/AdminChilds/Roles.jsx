import {useEffect, useState} from 'react';
import {DeleteRolereq, GetRoles} from "../../../API/AdminApi.js";
import AddRolePopup from "../newRolePopup.jsx";

const Roles = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const RoleFetch = async () => {
        const data = await GetRoles();
        setRoles(data);
    }
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }
    const handleClosePopup = () => {
        setIsPopupOpen(false);
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
                <button className="col-2 add-btn" onClick={handleOpenPopup}>Rol Ekle</button>
                <AddRolePopup
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                />
            </div>
            <table className="table mt-5 text-center table-striped table-dark">
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