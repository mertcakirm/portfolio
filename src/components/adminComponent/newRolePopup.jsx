import React, {useState} from 'react';

const AddRolePopup = ({ isOpen2, onClose2 }) => {
    const [userData, setUserData] = useState({
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onClose2();
    };

    if (!isOpen2) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Rol Ekle</h2>
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
                    <div className="form-actions">
                        <button type="button" className="add-btn" onClick={onClose2}>
                            İptal
                        </button>
                        <button type="submit" className="add-btn">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRolePopup;
