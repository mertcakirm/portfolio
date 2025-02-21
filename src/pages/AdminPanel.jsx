import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainComp from "../components/adminComponent/MainComp.jsx";
import BlogComp from "../components/adminComponent/BlogComp.jsx";
import '../pages/css/admin.css'
import GeneralComp from "../components/adminComponent/GeneralComp.jsx";
import {deleteCookie} from "../API/Cookie.js";
const AdminPanel = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation();

    const steps = [
        { id: 1, path: "/admin-panel/main", component: <MainComp /> },
        { id: 2, path: "/admin-panel/blog", component: <BlogComp /> },
        { id: 3, path: "/admin-panel/general", component: <GeneralComp /> },

    ];

    useEffect(() => {
        const matchedStep = steps.find((step) => step.path === location.pathname);
        setCurrentStep(matchedStep ? matchedStep.id : 1);
    }, [location.pathname]);

    const renderCurrentStepComponent = () => {
        const matchedStep = steps.find((step) => step.id === currentStep);
        return matchedStep ? matchedStep.component : <div>Sayfa bulunamadı!</div>;
    };

    const LogOut=async ()=>{
        await deleteCookie("token")
        window.location.href="/admin-login"
    }

    return (
        <div className="main-page-parent-con row">
            <div className="sidebar col-2" style={{position: 'fixed'}}>
                <a className="sidebar-links" href="/admin-panel/general">Genel</a>
                <a className="sidebar-links" href="/admin-panel/main">Anasayfa</a>
                <a className="sidebar-links" href="/admin-panel/blog">Blog</a>
                <button onClick={LogOut} style={{background:'transparent',border:'0'}} className="sidebar-links">Çıkış Yap</button>
            </div>
            <div className="content-container col-10">
                <div className="step-content">{renderCurrentStepComponent()}</div>
            </div>
        </div>
    );
};

export default AdminPanel;