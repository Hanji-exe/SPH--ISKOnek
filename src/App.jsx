import React, { useState, useEffect } from "react";
import LogIn from "./LogIn";
import HomeDashboard from "./Home_.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./User";
import Organizations from "./Organizations";
import Events from "./Events";
import OrganizationProfile from "./OrganizationProfile";
import Org from "./Org";

function App() {
  // Load user from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  // Whenever currentUser changes, update localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  function handleLogout() {
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <LogIn onLogin={setCurrentUser} currentUser={currentUser} />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<HomeDashboard currentUser={currentUser} onLogout={handleLogout} />} />
      <Route path="/dashboard/organizations" element={<Organizations onLogout={handleLogout} />} />
      <Route path="/dashboard/events" element={<Events onLogout={handleLogout} />} />
      <Route path="/User" element={currentUser?.userType === 'organization' ? <OrganizationProfile /> : <User currentUser={currentUser} onLogout={handleLogout} />} />
      <Route path="/Org" element={<Org />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;