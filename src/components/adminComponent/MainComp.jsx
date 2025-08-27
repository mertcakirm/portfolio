import {useEffect, useState} from 'react';
import {
    AddEducationReq,
    AddSkillReq,
    DeleteEduReq,
    DeleteProjectReq,
    DeleteSkillReq,
    UpdateContentsReq,
    UpdateImageReq
} from "../../API/AdminApi.js";
import NewProjectPopup from "./newProjectPopup.jsx";
import {EducationsGetAll, ProjectsGetAll, SkillsGetAll} from "../../API/MainApi.js";
import {getCookie} from "../../API/Cookie.js";
import Pagination from "../Pagination.jsx";
import "aos/dist/aos.css";

const MainComp = () => {
    const [skillState, setSkillState] = useState(
        {
            SkillName:"",
            proficiency:""
        }
    );
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [educations, setEducations] = useState([]);
    const [mainData, setMainData] = useState({
        Id: 1,
        header_tr: "",
        description_tr: "",
        header_en: "",
        description_en: ""
    });
    const [lastPage, setLastPage] = useState(5);
    const [imageBase64, setImageBase64] = useState("");
    const [newEducation, setNewEducation] = useState({EducationText: "", Egitim: ""});
    const [pageNum, setPageNum] = useState(1);

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
        const {name, value} = e.target;
        setMainData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleEduChange = (e) => {
        const {name, value} = e.target;
        setNewEducation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateMainData = async () => {
        try {
            await UpdateContentsReq(mainData);
        } catch (error) {
            console.error("Metin güncellenirken hata oluştu:", error);
        }
    };
    const projectsGet = async () => {
        const projectsObj = await ProjectsGetAll(pageNum,10)
        setProjects(projectsObj.items)
        setLastPage(projectsObj.totalPages)
    }

    const skillsGet = async () => {
        const skillsobj = await SkillsGetAll()
        setSkills(skillsobj)
    }

    const eduGet = async () => {
        const eduobj = await EducationsGetAll();
        setEducations(eduobj);
    }

    const AddSkill = async () => {
        if (!skillState.SkillName.trim()) {
            console.log("Yetkinlik adı boş olamaz!");
            return;
        }
        if (!skillState.proficiency) {
            console.log("Yetkinlik derecesi boş olamaz!");
            return;
        }

        if (skillState.proficiency < 0 || skillState.proficiency > 100) {
            console.log("Yetkinlik derecesi 0 ile 100 arasında olmalıdır!");
            return;
        }

        try {
            await AddSkillReq(skillState);
            setSkillState({ name: "", proficiency: "" });
            setRefresh(!refresh);
        } catch (error) {
            console.error("Yetkinlik eklenirken hata oluştu:", error);
        }
    };

    const changeImage = async () => {
        await UpdateImageReq(
            {
                main_image_base64: imageBase64
            }
        )
        setImageBase64(null)
    }

    const DeleteProject = async (id) => {
        await DeleteProjectReq(id);
        setRefresh(!refresh);
    }
    const DeleteSkill = async (id) => {
        await DeleteSkillReq(id);
        setRefresh(!refresh);
    }
    const DeleteEdu = async (id) => {
        await DeleteEduReq(id);
        setRefresh(!refresh);
    }

    const AddEducation = async () => {
        const data = {
            EducationText: newEducation.EducationText,
            egitim: newEducation.Egitim,
        };
        try {
            await AddEducationReq(data);
            setNewEducation("");
            setRefresh(!refresh);
        } catch (error) {
            console.error("Yetkinlik eklenirken hata oluştu:", error);
        }
    }

    useEffect(() => {
        skillsGet();
        projectsGet();
        eduGet();
    }, [])

    useEffect(() => {
        skillsGet();
        projectsGet();
        eduGet();
    }, [refresh])

    const decodeJWT = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    };

    const token = getCookie("token");

    if (!token) {
        return <div>Token bulunamadı</div>;
    }

    const decoded = decodeJWT(token);

    return decoded.sub === "admin" ? (
        <div className="container-fluid py-5">
            <div className="row row-gap-5">

                <div data-aos="fade-right" className="col-6">
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

                <div className="col-6" data-aos="fade-left">
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


                <div className="col-12 py-3" data-aos="fade-up" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-3 text-center">Eğitimleri Yönet</h3>
                        <input type="text" name="EducationText" value={newEducation.EducationText}
                               onChange={handleEduChange} placeholder="Education" className="col-2 login-inp"/>
                        <input type="text" name="Egitim" value={newEducation.Egitim} onChange={handleEduChange}
                               placeholder="Eğitim" className="col-2 login-inp"/>
                        <button className="col-2 login-btn" onClick={AddEducation}>Eğitim Ekle</button>

                        <div className="col-12">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Eğitim ID</th>
                                    <th scope="col">Education Text</th>
                                    <th scope="col">Eğitim Metni</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {educations.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.educationText}</td>
                                        <td>{item.egitim}</td>
                                        <td>
                                            <button onClick={() => DeleteEdu(item.id)} className="delete-btn">Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="col-12 py-3" data-aos="fade-up" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-2 text-center">Yetkinlikleri Yönet</h3>
                        <input
                            value={skillState.SkillName}
                            onChange={(e) => setSkillState({
                                ...skillState,
                                SkillName: e.target.value
                            })}
                            type="text"
                            className="col-3 login-inp"
                            placeholder="Yetkinlik Adı"
                        />

                        <input
                            value={skillState.proficiency}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0 && value <= 100) {
                                    setSkillState({
                                        ...skillState,
                                        proficiency: value
                                    });
                                }
                            }}
                            type="number"
                            min="0"
                            max="100"
                            className="col-2 login-inp"
                            placeholder="Yetkinlik Derecesi(%)"
                        />

                        <button onClick={AddSkill} className="col-2 login-btn">
                            Yetkinlik Ekle
                        </button>

                        <div className="col-12 text-center">
                            <table className="table mt-5 px-4 table-striped table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Yetkinlik ID</th>
                                    <th scope="col">Yetkinlik Adı</th>
                                    <th scope="col">Yetkinlik Derecesi</th>
                                    <th scope="col">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {skills.map((skill, index) => (
                                    <tr key={index}>
                                        <th scope="row">{skill.id}</th>
                                        <td>{skill.skillName}</td>
                                        <td>{skill.proficiency}</td>
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

                <div className="col-12 py-3" data-aos="fade-up" style={{borderTop: '1px solid #fff'}}>
                    <div className="row px-3 row-gap-3 column-gap-3 justify-content-between">
                        <h3 className="col-6">Projeleri Yönet</h3>
                        <button className="col-3 login-btn" onClick={()=>setIsPopupOpen(true)}>Proje Ekle</button>

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
                        {Array.isArray(projects) && projects.length > 0 && (
                            <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} />
                        )}
                    </div>
                </div>
                {isPopupOpen?
                    <NewProjectPopup
                        onClose={(b)=>{
                            if(b===false) {
                                setIsPopupOpen(b);
                                setRefresh(!refresh);
                            }}
                        }
                    />:null
                }

            </div>
        </div>
    ) : (
        <div data-aos="fade-up" className="w-100 text-center align-items-center justify-content-center row-gap-5"
             style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <svg className="col-12" xmlns="http://www.w3.org/2000/svg" fill="white" width="200" height="200"
                 viewBox="0 0 24 24">
                <path
                    d="M16.143 2l5.857 5.858v8.284l-5.857 5.858h-8.286l-5.857-5.858v-8.284l5.857-5.858h8.286zm.828-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm.932 11.667c-.127.328-1.695 3.888-2.096 4.786-.42.941-1.239 1.881-2.751 1.881h-2.627c-1.592 0-2.43-.945-2.43-2.596v-7.208c0-.956 1.316-.908 1.316-.044v3.16c0 .26.478.259.478 0v-5.079c0-.982 1.472-.957 1.472 0v4.795c0 .264.443.252.443-.005v-5.628c0-.957 1.457-.984 1.457 0l.001 5.692c0 .254.459.261.459 0v-4.78c0-.905 1.596-.933 1.596 0v5.417c0 .331.327.384.45.131.118-.24.605-1.315.613-1.327.49-1.029 2.128-.404 1.619.805z"/>
            </svg>
            <h3 className="col-12">Bu alana giriş yetkiniz bulunmamaktadır!!!</h3>
        </div>
    );
};

export default MainComp;