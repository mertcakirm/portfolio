import {useState} from "react";
import {AddProjectReq} from "../../API/AdminApi.js";

const NewProjectPopup = ({isOpen, onClose}) => {
    const [projectData, setProjectData] = useState({
        title_en: "",
        title_tr: "",
        description_tr: "",
        description_en: "",
        image_base64: "",
        href: "",
        Used_skills: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProjectData({...projectData, [name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProjectData({...projectData, image_base64: reader.result});
            };
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AddProjectReq(projectData);
            onClose();
        } catch (error) {
            console.error("Proje eklenirken hata oluştu:", error);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{width: '600px'}}>
                <h2>Proje Ekle</h2>
                <form className="row" onSubmit={handleSubmit}>
                    <div style={{width: '50%'}} className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title_en"
                            value={projectData.title_en}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{width: '50%'}} className="form-group">
                        <label>Başlık:</label>
                        <input
                            type="text"
                            name="title_tr"
                            value={projectData.title_tr}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{width: '50%'}} className="form-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description_en"
                            value={projectData.description_en}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{width: '50%'}} className="form-group">
                        <label>Açıklama:</label>
                        <input
                            type="text"
                            name="description_tr"
                            value={projectData.description_tr}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{width: '50%'}} className="form-group">
                        <label>Görsel:</label>
                        <input
                            type="file"
                            name="image_base64"
                            style={{height: "50px", color: "white", border: '0'}}
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div style={{width: '50%'}} className="form-group">
                        <label>Link:</label>
                        <input
                            type="text"
                            name="href"
                            value={projectData.href}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{width: '50%'}} className="form-group">
                        <label>Kullanılan Diller:</label>
                        <input
                            type="text"
                            name="Used_skills"
                            value={projectData.Used_skills}
                            style={{height: "40px", color: "black"}}
                            onChange={handleChange}
                            required
                        />
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

export default NewProjectPopup;
