import {BrowserRouter, Route, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import MainPage from "./pages/MainPage.jsx";
import Blogs from "./pages/Blogs.jsx";
function App() {

  return (
      <div style={{background:'#000',height:'100%'}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainPage />} path="/" />
                    <Route element={<Blogs />} path="/blogs" />
                </Routes>
            </BrowserRouter>
      </div>
  )
}

export default App
