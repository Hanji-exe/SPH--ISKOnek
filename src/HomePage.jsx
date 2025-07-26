import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from './AuthContext';
import { Outlet, useLocation } from 'react-router-dom';

function DashboardLayout() {
  const { loggedInRole } = useAuth();
  const location = useLocation();
  // Sidebar should appear on all dashboard pages and /user
  const showSidebar = location.pathname.startsWith('/dashboard') || location.pathname === '/user';
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#fff', width: '100vw', height: '100vh' }}>
      {showSidebar && <Sidebar role={loggedInRole} onLogout={() => window.location.href = '/'} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout; 