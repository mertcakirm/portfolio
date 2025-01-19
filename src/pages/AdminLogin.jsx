import './css/login.css'
import Login from '../assets/login.jpg'
import {useState} from "react";
import {LoginRequest} from "../API/AdminApi.js";

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const HandleLogin = async () => {
        const loginDTO = {
            "Username": username,
            "Password": password
        };
        try {
            const response = await LoginRequest(loginDTO);
            console.log(response);
            window.location.href="/admin-panel"
        } catch (error) {
            console.error("Giriş yapılamadı:", error);
            alert("Giriş Yapılamadı")
        }
    };

    return (
        <div className="main-page-parent-con row p-0 m-0">
            <div className="col-7">
                <img src={Login} className="img-fluid w-100 object-fit-cover h-100" alt="login" />
            </div>
            <div className="col-5 login-flex justify-content-center align-items-center p-5">
                <h4>Giriş Yap</h4>
                <input placeholder="Kullanıcı Adı" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="col-12 login-inp"/>
                <input placeholder="Parola" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="col-12 login-inp"/>
                <button className="col-12 login-btn" onClick={HandleLogin}>Giriş Yap</button>

            </div>
        </div>
    );
};

export default AdminLogin;
