import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./Components/Layout/AppLayout";
import HomePage from "./Pages/HomePage"
import ContactUsPage from "./Pages/ContactUs"
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";
import JobBoardPage from "./Pages/Jobs"
import "./App.css"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobBoardPage />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={ <ContactUsPage /> } />
          <Route path ="/login" element  = { <Login /> } />
          <Route path="/register" element={<SignUp />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;