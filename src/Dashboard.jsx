import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

function DashboardOutlet() {
  const { loggedInRole, setLoggedInUser, setLoggedInRole } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    setLoggedInUser(null);
    setLoggedInRole(null);
    navigate('/'); // Redirect to Login.jsx
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#222', width: '100vw', height: '100vh' }}>
      <Sidebar onLogout={() => setLogoutModalOpen(true)} role={loggedInRole} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        <Outlet />
      </div>
      {logoutModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,20,20,0.18)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px rgba(139,0,0,0.18)', padding: '2.2rem 2.5rem', minWidth: 320, maxWidth: 380, width: '100%', position: 'relative', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ fontWeight: 800, fontSize: 22, color: '#7B2D2D', marginBottom: 2, textAlign: 'center', letterSpacing: 0.5 }}>Confirm Log Out</div>
            <div style={{ fontSize: 15, color: '#444', marginBottom: 10, textAlign: 'center' }}>Are you sure you want to log out?</div>
            <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
              <button
                onClick={handleLogout}
                style={{ background: '#8B0000', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', letterSpacing: 1, boxShadow: '0 2px 8px rgba(139,0,0,0.10)', transition: 'background 0.18s, box-shadow 0.18s' }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardOutlet; 