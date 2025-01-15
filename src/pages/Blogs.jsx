import Navbar from "../components/navbar.jsx";
import {useEffect, useState} from "react";

const Blogs = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });
    useEffect(() => {
        const lang = localStorage.getItem("lang");
        if (lang && lang !== language) {
            setLanguage(lang);
        }
    }, [language]);
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };
    return (
        <div className="main-page-parent-con">
            <Navbar languageprops={handleLanguageChange}/>
            <div className="container p-5">

            </div>
        </div>
    );
};

export default Blogs;
