import './css/navbar.css'
import {useEffect ,useState} from "react";
import {en_Icon, tr_Icon} from "./icons.jsx";
const NavBar = ({languageprops}) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lang") || "en";
    });

    useEffect(() => {
        localStorage.setItem("lang", language);
        languageprops(language);
    }, [language, languageprops]);

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "tr" : "en";
        setLanguage(newLanguage);
    };


    return (
        <div className="container-fluid mb-3 nav-con z-3">
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
                        <span className="tooltip">{language === "tr" ? "Anasayfa" : "Homepage"}</span>
                    </div>


                    <div className="nav-card">
                    <a href="/blogs">
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" width="30" height="30"
                                 fill="white" strokeMiterlimit="2" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-3 11.25c0 .414-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75zm-11.772-.537c-.151-.135-.228-.321-.228-.509 0-.375.304-.682.683-.682.162 0 .324.057.455.173l.746.665 1.66-1.815c.136-.147.319-.221.504-.221.381 0 .684.307.684.682 0 .163-.059.328-.179.459l-2.116 2.313c-.134.147-.319.222-.504.222-.162 0-.325-.057-.455-.173zm11.772-2.711c0 .414-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75zm-11.772-1.613v.001c-.151-.135-.228-.322-.228-.509 0-.376.304-.682.683-.682.162 0 .324.057.455.173l.746.664 1.66-1.815c.136-.147.319-.221.504-.221.381 0 .684.308.684.682 0 .164-.059.329-.179.46l-2.116 2.313c-.134.147-.319.221-.504.221-.162 0-.325-.057-.455-.173zm11.772-1.639c0 .414-.336.75-.75.75h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75z"
                                    fillRule="nonzero"/>
                            </svg>
                        </a>
                        <span className="tooltip">{language === "tr" ? "Bloglar" : "Blogs"}</span>
                    </div>

                    <div className="nav-card">
                    <a href="https://github.com/mertcakirm" target="_blank">
                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/>
                            </svg>
                            <span className="tooltip">Github</span>
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
                        <span className="tooltip">{language === "tr" ? "İletişim" : "Contact"}</span>
                    </div>

                    <div className="nav-card lang-card">
                        <button onClick={toggleLanguage} className="lang-btn">
                            <svg viewBox="0 0 24 24" width="30" fill="white" height="30"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path
                                    d="M15.246 17c-.927 3.701-2.547 6-3.246 7-.699-1-2.32-3.298-3.246-7h6.492zm7.664 0c-1.558 3.391-4.65 5.933-8.386 6.733 1.315-2.068 2.242-4.362 2.777-6.733h5.609zm-21.82 0h5.609c.539 2.386 1.47 4.678 2.777 6.733-3.736-.8-6.828-3.342-8.386-6.733zm14.55-2h-7.28c-.29-1.985-.29-4.014 0-6h7.281c.288 1.986.288 4.015-.001 6zm-9.299 0h-5.962c-.248-.958-.379-1.964-.379-3s.131-2.041.379-3h5.962c-.263 1.988-.263 4.012 0 6zm17.28 0h-5.963c.265-1.988.265-4.012.001-6h5.962c.247.959.379 1.964.379 3s-.132 2.042-.379 3zm-8.375-8h-6.492c.925-3.702 2.546-6 3.246-7 1.194 1.708 2.444 3.799 3.246 7zm-8.548-.001h-5.609c1.559-3.39 4.651-5.932 8.387-6.733-1.237 1.94-2.214 4.237-2.778 6.733zm16.212 0h-5.609c-.557-2.462-1.513-4.75-2.778-6.733 3.736.801 6.829 3.343 8.387 6.733z"/>
                            </svg>
                        </button>
                        <span className="tooltip">
                            {language === "tr" ? (
                                <>
                                    <span>Dili Değiştir</span>
                                    {en_Icon()}
                                </>
                            ) : (
                                <>
                                    <span>Change Language</span>
                                    {tr_Icon()}
                                </>
                            )}


                        </span>
                                </div>

                </div>

            </div>
        </div>
    );
};

export default NavBar;
