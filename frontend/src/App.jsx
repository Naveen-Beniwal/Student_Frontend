import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JNFForm from "./components/JNF/JNFForm";
import Home from "./pages/HomePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import StudentDashboard from "./components/student/StudentDashboard";
import ProfileEdit from "./components/student/sections/Profile/ProfileEdit/ProfileEdit";
import ApplicationsSection from "./components/student/sections/Applications/ApplicationSection";
import ResumeBuilder from "./components/student/sections/resume/ResumeBuilder";
import ProfileSection from "./components/student/sections/Profile/ProfileSection";
import JobSection from "./components/student/sections/jobs/JobSection";
import NotificationsSection from "./components/student/sections/NotificationSection";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jnf-form" element={<JNFForm />} />

        {/* Nested routes for student dashboard */}
        <Route path="/student/:id/*" element={<StudentDashboard />}>
          <Route index element={<ProfileSection />} />
          <Route path="profile" element={<ProfileSection />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
          <Route path="applications" element={<ApplicationsSection />} />
          <Route path="resume" element={<ResumeBuilder />} />
          <Route path="jobs" element={<JobSection />} />
          <Route path="notifications" element={<NotificationsSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
