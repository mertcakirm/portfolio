import Navbar from "../components/navbar.jsx";
import person from "../assets/Group 64.png"
import './css/MainPage.css'
const MainPage = () => {
    return (
        <div className="main-page-parent-con">
            <Navbar />
            <div className="container p-5">
                <div className="row justify-content-center">
                    <div className="col-8 p-5">
                            <p className="left-animation-item titles">dawodnpoawndopawndawd</p>
                            <p className="left-animation-item normal-text">dawddawodnpoawndoadawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopadawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopapoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawddawodnpoawndopawndawd</p>

                    </div>
                    <div className="col-4" >
                        <img style={{position:'sticky',top:'100px'}} className="right-animation-item w-100 personal-image" src={person} alt="personal_card"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;