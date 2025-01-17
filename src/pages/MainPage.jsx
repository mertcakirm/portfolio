import Navbar from "../components/navbar.jsx";
import './css/MainPage.css'
import {MainGetAll, ProjectsGetAll, SkillsGetAll} from '../API/MainApi.js'
import {useEffect, useState} from "react";
const MainPage = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });
    const [mainItem, setMainItem] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang && lang !== language) {
            setLanguage(lang);
        }
    }, [language]);
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };
    const mainGet=async ()=>{
        const mainobj = await MainGetAll()
        setMainItem(mainobj)
    }
    const skillsGet=async ()=>{
        const skillsobj = await SkillsGetAll()
        setSkills(skillsobj)
    }
    const projectsGet=async ()=>{
        const projectsObj = await ProjectsGetAll()
        setProjects(projectsObj)
        console.log(projectsObj)
    }
    useEffect(()=>{
        mainGet()
        skillsGet()
        projectsGet()
    },[])

    return (
        <div className="main-page-parent-con">
            <Navbar languageprops={handleLanguageChange} />
            <div className="container p-5">
                {mainItem && mainItem.length > 0 ? (
                    mainItem.map((item, index) => (
                        <div key={index} className="row justify-content-center">
                            <div className="col-lg-8 col-12 py-5">
                                <p className="left-animation-item titles">
                                    {language === "tr" ? item.header_tr : item.header_en}
                                </p>
                                <p className="left-animation-item normal-text">
                                    {language === "tr" ? item.description_tr : item.description_en}
                                </p>
                            </div>
                            <div className="col-lg-4 col-12">
                                <img
                                    style={{ position: "sticky", top: "100px" }}
                                    className="right-animation-item w-100 personal-image"
                                    src={`${item.main_image_base64}`}
                                    alt="personal_card"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <span>{language === "tr" ? "Gösterilecek açıklama bulunmadı" : "No information available"}</span>
                )}
                <div className="row justify-content-between row-gap-3 col-12">
                    <p className="titles col-12">{language === "tr" ? "EĞİTİMLERİM" : "EDUCATİONS"}</p>

                    <div className="col-lg-6 col-12 animation-item-right  row col-12">
                        <div className="edu-card col-12">
                            {language === "tr" ? "Sakarya Üniversitesi / 2021-2025 / Yönetim Bilişim Sistemleri" : "Sakarya University / 2021-2025 / Management Information Systems"}
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 animation-item-right  row col-12">
                        <div className="edu-card col-12">
                            {language === "tr" ? "Tarsus Fatih Anadolu Lisesi / 2017-2021" : "Tarsus Fatih Anadolu High School / 2017-2021"}
                        </div>
                    </div>
                </div>
                <div className="col-12  py-5 row">
                    <p className="titles col-12">{language === "tr" ? "YETKİNLİKLERİM" : "SKİLLS"}</p>
                    <div className="skills-con">
                        {skills && skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <div  key={index} className="skill-card animation-item-right">{skill.skillName}</div>
                            ))
                            ) : (
                            <span>{language === "tr" ? "Gösterilecek yetkinlik bulunmadı" : "No skill available"}</span>
                        )}
                    </div>
                </div>
                <div className="col-12  row py-5">
                        <p className="titles col-12">{language === "tr" ? "PROJELERİM" : "PROJECTS"}</p>
                        <div className="row  col-12 row-gap-3 justify-content-between">
                            {projects && projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <div key={index} className="project-card animation-item-right col-lg-4 row px-0">
                                        <img className="col-12 project-card-img p-0"
                                             src={`${project.image_base64}` || `https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg`}/>
                                        <p className="normal-text col-12 m-0">{language === "tr" ? project.title_tr : project.title_en}</p>
                                        <div className="project-card-skills skills-con">
                                            {project.used_skills && project.used_skills.split(',').map((skill, skillIndex) => (
                                                <div key={skillIndex} className="project-skill-card">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="main-projects-desc">{language === "tr" ? project.description_tr : project.description_en}</p>
                                        <a href={`${project.href}` ||  "#"} className="project-visit-btn w-50">{language === "tr" ? "ZİYARET ET" : "VISIT NOW"}</a>
                                    </div>
                                ))
                            ) : (
                                <span>{language === "tr" ? "Gösterilecek proje bulunmadı" : "No project available"}</span>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default MainPage;