import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Templates from "./Components/Templates";
import UpdateProfilePage from "./Components/UpdateProfilePage";
import Login from "./Components/Login/Login";
import { AppProvider } from "./Components/AppContext";
import CreateProfile from "./Components/CreateProfile";
import Register from "./Components/Register/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/update" element={<UpdateProfilePage />} />
        </Routes>
        </AppProvider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
