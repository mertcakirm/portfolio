import {useEffect, useState} from "react";
import {AddUserReq, GetRoles} from "../../API/AdminApi.js";

const AddUserPopup = ({ isOpen, onClose , reflesh }) => {
    const [userData, setUserData] = useState({
        Username: "",
        Password: "",
        RoleId: "",
    });
    const [roles, setRoles] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AddUserReq(userData)
        reflesh(true)
        onClose();
    };

    const GetRolesForDropDown = async () => {
        const data = await GetRoles();
        setRoles(data);
    }
    useEffect(()=>{
        GetRolesForDropDown();
    },[])

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Kullanıcı Ekle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>İsim:</label>
                        <input
                            type="text"
                            name="Username"
                            value={userData.Username}
                            style={{ height: "40px",color: "black" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Şifre:</label>
                        <input
                            type="password"
                            name="Password"
                            value={userData.Password}
                            style={{ height: "40px",color: "black" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <select
                            name="RoleId"
                            value={userData.RoleId}
                            onChange={handleChange}
                            style={{ height: "40px",color: "black" }}
                        >
                            <option value="">Role Seçin</option>
                            {roles.map((role,index) => (
                                <option key={index} value={role.roleid}>{role.roleName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="add-btn" onClick={onClose}>
                            İptal
                        </button>
                        <button type="submit" className="add-btn">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserPopup;
