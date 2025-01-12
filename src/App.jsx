import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import Projects from "./pages/Projects.jsx";
function App() {

  return (
      <div style={{background:'#000',height:'100%'}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainPage />} path="/" />
                    <Route element={<Projects />} path="/projects" />
                </Routes>
            </BrowserRouter>
      </div>
  )
}

export default App
