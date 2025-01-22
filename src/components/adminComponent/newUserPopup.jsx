import { useState } from "react";

const AddUserPopup = ({ isOpen, onClose }) => {
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        onClose();
    };

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
                            name="name"
                            value={userData.name}
                            style={{ height: "40px",color: "black" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Şifre:</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            style={{ height: "40px",color: "black" }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <select
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            style={{ height: "40px",color: "black" }}
                            required
                        >
                            <option value="">Seçin</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
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
