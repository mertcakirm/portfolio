import {BrowserRouter, Route, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import MainPage from "./pages/MainPage.jsx";
import Blogs from "./pages/Blogs.jsx";
import Blog_detail from "./pages/Blog_detail.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
function App() {

  return (
      <div style={{background:'#000',height:'100%'}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainPage />} path="/" />
                    <Route element={<Blogs />} path="/blogs" />
                    <Route element={<Blog_detail />} path="/blog-detail/:id" />
                    <Route element={<AdminLogin />} path="/admin-login" />
                    <Route element={<AdminPanel />} path="/admin-panel" />
                </Routes>
            </BrowserRouter>
      </div>
  )
}

export default App
