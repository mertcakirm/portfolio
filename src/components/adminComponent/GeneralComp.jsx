import {getCookie} from "../../API/Cookie.js";
import Blog from "./AdminChilds/Blog.jsx";
import Roles from "./AdminChilds/Roles.jsx";
import User from "./AdminChilds/User.jsx";

const GeneralComp = () => {


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

        <div className="container-fluid p-5">
            <div className="row">

                <User/>

                <Roles/>

                <Blog />

            </div>
        </div>
    ) : (
        <div className="w-100 text-center align-items-center justify-content-center row-gap-5"
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

export default GeneralComp;