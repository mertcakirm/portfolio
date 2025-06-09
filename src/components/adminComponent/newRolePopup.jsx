import {useState} from 'react';
import {AddRoleReq} from "../../API/AdminApi.js";

const AddRolePopup = ({isOpen, onClose}) => {
    const [userData, setUserData] = useState({
        RoleName: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    const handleSubmit = () => {
        AddRoleReq(userData)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Rol Ekle</h2>
                <div>
                    <div className="form-group">
                        <label>İsim:</label>
                        <input
                            type="text"
                            name="RoleName"
                            value={userData.RoleName}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="add-btn" onClick={onClose}>
                            İptal
                        </button>
                        <button onClick={handleSubmit} className="add-btn">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRolePopup;
