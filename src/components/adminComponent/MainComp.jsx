import {useEffect, useState} from 'react';
import {AddSkillReq, DeleteProjectReq, DeleteSkillReq, UpdateContentsReq, UpdateImageReq} from "../../API/AdminApi.js";
import NewProjectPopup from "./newProjectPopup.jsx";
import {EducationsGetAll, ProjectsGetAll, SkillsGetAll} from "../../API/MainApi.js";

const MainComp = () => {
    const [skillNameState, setSkillNameState] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [educations, setEducations] = useState([]);
    const [mainData, setMainData] = useState({Id:1,header_tr:"",description_tr:"",header_en:"",description_en:""});
    const [imageBase64, setImageBase64] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMainData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateMainData = async () => {
        try {
            console.log("Güncellenecek Veri:", mainData);
            await UpdateContentsReq(mainData);
        } catch (error) {
            console.error("Metin güncellenirken hata oluştu:", error);
        }
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }

    const handleClosePopup = () =>{
        setIsPopupOpen(false);
        setRefresh((prevState) => !prevState);
    }
    const projectsGet=async ()=>{
        const projectsObj = await ProjectsGetAll()
        setProjects(projectsObj)
    }

    const skillsGet=async ()=>{
        const skillsobj = await SkillsGetAll()
        setSkills(skillsobj)
    }

    const eduGet=async ()=>{
        const eduobj = await EducationsGetAll();
        setEducations(eduobj);
    }

    const AddSkill = async () => {
        if (!skillNameState.trim()) {
            console.log("Yetkinlik adı boş olamaz!");
            return;
        }
        const data = {
            SkillName: skillNameState,
            proficiency: "100",
        };
        try {
            await AddSkillReq(data);
            setSkillNameState("");
            setRefresh((prevState) => !prevState);

        } catch (error) {
            console.error("Yetkinlik eklenirken hata oluştu:", error);
        }
    };

    const changeImage=async ()=>{
        await UpdateImageReq(
            {
                main_image_base64:imageBase64
            }
        )
        setImageBase64(null)
    }

    const DeleteProject=async (id)=>{
        await DeleteProjectReq(id);
        setRefresh((prevState) => !prevState);
        console.log(id)
    }


    const DeleteSkill = async (id) => {
        await DeleteSkillReq(id);
        setRefresh((prevState) => !prevState);

    }

    useEffect(()=>{
        skillsGet();
        projectsGet();
        eduGet();
    },[])

    useEffect(()=>{
        skillsGet();
        projectsGet();
        eduGet();
    },[refresh])

    return (
        <div className="container-fluid py-5">
            <div className="row row-gap-5">

                <div className="col-6">
                    <div className="row px-3 row-gap-3 justify-content-center">
                        <h3 className="col-12 text-center">Kişi Resmi</h3>
                        <input type="file" className="col-7" onChange={handleImageChange}/>
                        {imageBase64 && (
                            <div className="col-12 text-center mt-3">
                                <img src={imageBase64} alt="Seçilen Resim"
                                     style={{width: "100px", height: "100px", objectFit: "cover"}}/>
                            </div>
                        )}
                        <button className="col-6 login-btn" onClick={changeImage}>Resmi Güncelle</button>
                    </div>
                </div>

                <div className="col-6">
                    <div className="row px-3 row-gap-3 justify-content-center">
                        <h3 className="col-12 text-center">Tanıtım Metni</h3>
                        <input
                            type="text"
                            name="header_tr"
                            value={mainData.header_tr}
                            onChange={handleInputChange}
                            placeholder="Türkçe Başlık"
                            className="col-7 login-inp"
                        />
                        <input
                            type="text"
                            name="header_en"
                            value={mainData.header_en}
                            onChange={handleInputChange}
                            placeholder="İngilizce Başlık"
                            className="col-7 login-inp"
                        />
                        <input
                            type="text"
                            name="description_tr"
                            value={mainData.description_tr}
                            onChange={handleInputChange}
                            placeholder="Türkçe Açıklama"
                            className="col-7 login-inp"
                        />
                        <input
                            type="text"
                            name="description_en"
                            value={mainData.description_en}
                            onChange={handleInputChange}
                            placeholder="İngilizce Açıklama"
                            className="col-7 login-inp"
                        />
                        <button className="col-6 login-btn" onClick={updateMainData}>Metni Güncelle</button>
                    </div>
                </div>


                <div className="col-12 py-3" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-3 text-center">Eğitimleri Yönet</h3>
                        <input type="text" className="col-5 login-inp"/>
                        <button className="col-2 login-btn">Eğitim Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Eğitim ID</th>
                                    <th scope="col">Eğitim Metni</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {educations.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.educationText}</td>
                                        <td>
                                            <button className="delete-btn">Sil</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="col-12 py-3" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-3 text-center">Yetkinlikleri Yönet</h3>
                        <input
                            value={skillNameState}
                            onChange={(e) => setSkillNameState(e.target.value)}
                            type="text"
                            className="col-5 login-inp"
                        />
                        <button onClick={AddSkill} className="col-2 login-btn">Yetkinlik Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Yetkinlik ID</th>
                                    <th scope="col">Yetkinlik Adı</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {skills.map((skill, index) => (
                                    <tr key={index}>
                                        <th scope="row">{skill.id}</th>
                                        <td>{skill.skillName}</td>
                                        <td>
                                            <button onClick={() => DeleteSkill(skill.id)} className="delete-btn">Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-12 py-3" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-6">Projeleri Yönet</h3>
                        <button className="col-3 login-btn" onClick={handleOpenPopup}>Proje Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Proje ID</th>
                                    <th scope="col">Proje Adı</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index}>
                                        <th scope="row">{project.id}</th>
                                        <td>{project.title_tr}</td>
                                        <td>
                                            <button className="delete-btn"
                                                    onClick={() => DeleteProject(project.id)}>Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <NewProjectPopup
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                />
            </div>
        </div>
    );
};

export default MainComp;