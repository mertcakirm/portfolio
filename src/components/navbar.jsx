import './css/navbar.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import {useEffect ,useState} from "react";

const NavBar = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const lightBtn=document.getElementById("light-btn");
        const darkBtn=document.getElementById("dark-btn");

        if (isDarkMode) {
            darkBtn.classList.add("active-theme")
            lightBtn.classList.remove("active-theme")
            localStorage.setItem("theme", "light");

        } else {
            darkBtn.classList.remove("active-theme")
            lightBtn.classList.add("active-theme")
            localStorage.setItem("theme", "dark");

        }
    }, [isDarkMode]);


    return (
        <div className="container-fluid mb-3 nav-con">
            <div className="nav-parent justify-content-center">

                <div className="navcard-parent justify-content-center">
                    <div className="nav-card">
                        <a href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="white" height="30"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
                            </svg>
                        </a>
                    </div>


                    <div className="nav-card">
                        <a href="/projects">
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" width="30" height="30"
                                 fill="white"
                                 strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-3 11.25c0 .414-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75zm-11.772-.537c-.151-.135-.228-.321-.228-.509 0-.375.304-.682.683-.682.162 0 .324.057.455.173l.746.665 1.66-1.815c.136-.147.319-.221.504-.221.381 0 .684.307.684.682 0 .163-.059.328-.179.459l-2.116 2.313c-.134.147-.319.222-.504.222-.162 0-.325-.057-.455-.173zm11.772-2.711c0 .414-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75zm-11.772-1.613v.001c-.151-.135-.228-.322-.228-.509 0-.376.304-.682.683-.682.162 0 .324.057.455.173l.746.664 1.66-1.815c.136-.147.319-.221.504-.221.381 0 .684.308.684.682 0 .164-.059.329-.179.46l-2.116 2.313c-.134.147-.319.221-.504.221-.162 0-.325-.057-.455-.173zm11.772-1.639c0 .414-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75z"
                                    fillRule="nonzero"/>
                            </svg>
                        </a>
                    </div>

                    <div className="nav-card">
                        <a href="https://github.com/mertcakirm" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/>
                            </svg>
                        </a>
                    </div>
                    <div className="nav-card">
                        <a href="mailto:mertcakirm3377@gmail.com">
                            <svg width="30" fill="white" height="30" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z"/>
                            </svg>
                        </a>
                    </div>

                    <div id="dark-btn" className="nav-card theme-card">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001zm-7.001 22c-6.617 0-12-5.383-12-12s5.383-12 12-12c1.894 0 3.63.497 5.37 1.179-2.948.504-9.37 3.266-9.37 10.821 0 7.454 5.917 10.208 9.37 10.821-1.5.846-3.476 1.179-5.37 1.179z"/>
                            </svg>
                        </button>
                    </div>

                    <div id="light-btn" className="nav-card theme-card">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5zm-4.184-.599l-3.593-3.594-1.415 1.414 3.595 3.595c.401-.537.876-1.013 1.413-1.415zm4.184-1.401c.34 0 .672.033 1 .08v-5.08h-2v5.08c.328-.047.66-.08 1-.08zm5.598 2.815l3.595-3.595-1.414-1.414-3.595 3.595c.537.402 1.012.878 1.414 1.414zm-12.598 4.185c0-.34.033-.672.08-1h-5.08v2h5.08c-.047-.328-.08-.66-.08-1zm11.185 5.598l3.594 3.593 1.415-1.414-3.594-3.593c-.403.536-.879 1.012-1.415 1.414zm-9.784-1.414l-3.593 3.593 1.414 1.414 3.593-3.593c-.536-.402-1.011-.877-1.414-1.414zm12.519-5.184c.047.328.08.66.08 1s-.033.672-.08 1h5.08v-2h-5.08zm-6.92 8c-.34 0-.672-.033-1-.08v5.08h2v-5.08c-.328.047-.66.08-1 .08z"/>
                            </svg>
                        </button>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default NavBar;
