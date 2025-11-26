import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./Components/Layout/AppLayout";
import HomePage from "./Pages/HomePage"
import ContactUsPage from "./Pages/ContactUs"
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";
import JobBoardPage from "./Pages/Jobs";
import JobDetails from "./Pages/ViewJob/jobDescription";
import AdditionalDetails from "./Pages/SignUp/additionalDetails";
import VerifyEmail from "./Pages/SignUp/verifyEmail";
import JobSeekerDashboard from "./Pages/DashBoard/JobSeekerDashBoard/JobSeekerDashBoard.jsx";
import AppliedJobs from "./Pages/DashBoard/JobSeekerDashBoard/AppliedJobs.jsx";
import SavedJobs from "./Pages/DashBoard/JobSeekerDashBoard/SavedJobs.jsx";
import JobSeekerProfile from "./Pages/DashBoard/JobSeekerDashBoard/JobSeekerProfile.jsx";
import JobAlerts from "./Pages/DashBoard/JobSeekerDashBoard/JobAlerts.jsx";
import JobSeekerSettings from "./Pages/DashBoard/JobSeekerDashBoard/JobSeekerSettings.jsx";
import AboutUsPage from "./Pages/AboutUs/AboutUs.jsx";
import JobSeekerDrawer from './Components/materialUi/JobSeekerDrawer.jsx';
import EmployerDrawer from "./Components/materialUi/EmployerDrawer.jsx";
import EmployerDashboard from "./Pages/DashBoard/EmployerDashBoard/EmployerDashBoard.jsx";
import JobManagement from "./Pages/DashBoard/EmployerDashBoard/JobManagement.jsx";
import CreateJob from "./Pages/DashBoard/EmployerDashBoard/CreateJob.jsx";
import CompanyProfile from "./Pages/DashBoard/EmployerDashBoard/CompanyProfile.jsx";
import ViewCandidates from "./Pages/DashBoard/EmployerDashBoard/ViewCandidates.jsx";
import EmployerProfileSettings from "./Pages/DashBoard/EmployerDashBoard/ConfigurationSettings.jsx";
import { AuthProvider } from "./Context/AuthContext";
import ApplyJob from "./Pages/Apply/Apply.jsx";
import "./App.css"



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobBoardPage />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/jobs/:jobId/apply" element = {<ApplyJob />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={ <ContactUsPage /> } />
            <Route path ="/login" element  = { <Login /> } />
            <Route path="/register" element={<SignUp />} />
            <Route path="/additionalDetails" element={<AdditionalDetails />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />

            <Route path="/dashboard/employer" element={<EmployerDrawer />}>
              <Route index element={<EmployerDashboard />} />
              <Route path="create-job" element={<CreateJob />} />
              <Route path="manage-jobs" element={<JobManagement />} />
              <Route path="company-profile" element={<CompanyProfile />} />
              <Route path="candidates" element={<ViewCandidates />} />
              <Route path="settings" element={<EmployerProfileSettings />} />
            </Route>

            <Route path="/dashboard/jobseeker" element={<JobSeekerDrawer />}>
              <Route index element={<JobSeekerDashboard />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="profile" element={<JobSeekerProfile />} />
              <Route path="alerts" element={<JobAlerts />} />
              <Route path="settings" element={<JobSeekerSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;