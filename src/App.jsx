import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import MainPage from "./pages/MainPage.jsx";
import Blogs from "./pages/Blogs.jsx";
import Blog_detail from "./pages/Blog_detail.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import {getCookie} from "./API/Cookie.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";

function App() {
    const token = getCookie("token");

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div style={{background: '#000', height: '100%'}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainPage/>} path="/"/>
                    <Route element={<Blogs/>} path="/blogs"/>
                    <Route element={<Blog_detail/>} path="/blog-detail/:id"/>
                    <Route element={token ? <Navigate to="/admin-panel/blog" replace/> : <AdminLogin/>}
                           path="/admin-login"/>
                    <Route path="/admin-panel/main"
                           element={token ? <AdminPanel/> : <Navigate to="/admin-login" replace/>}/>
                    <Route path="/admin-panel/blog"
                           element={token ? <AdminPanel/> : <Navigate to="/admin-login" replace/>}/>
                    <Route path="/admin-panel/general"
                           element={token ? <AdminPanel/> : <Navigate to="/admin-login" replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
