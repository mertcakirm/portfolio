import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {

  return (
      <div style={{background:'#000',height:'100%'}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainPage />} path="/" />
                </Routes>
            </BrowserRouter>
      </div>
  )
}

export default App
