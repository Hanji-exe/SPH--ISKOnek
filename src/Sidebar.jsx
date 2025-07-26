import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './assets/logo.png';
import { FaHome, FaUser, FaBuilding, FaFolderOpen, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

function SidebarNavigation({ onLogout, role }) {
  const location = useLocation();
  // Build navLinks based on role
  const navLinks = [
    { label: 'Home', icon: FaHome, to: '/dashboard' },
    role === 'organization'
      ? { label: 'Profile', icon: FaBuilding, to: '/Org' }
      : { label: 'Profile', icon: FaUser, to: '/User' },
    { label: 'Organizations', icon: FaFolderOpen, to: '/dashboard/organizations' },
    { label: 'Events', icon: FaCalendarAlt, to: '/dashboard/events' },
  ];
  // Determine active tab
  function isActiveTab(link) {
    if (link.label === 'Home') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    if (link.label === 'Profile') {
      if (role === 'organization') {
        return location.pathname === '/Org';
      } else {
        return location.pathname === '/User';
      }
    }
    if (link.label === 'Organization Profile') {
      return location.pathname === '/HomePage/organization-profile';
    }
    return location.pathname.startsWith(link.to);
  }
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: 200, background: '#fff', border: '8px solid #8B0000', boxShadow: '2px 0 12px rgba(139,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0, zIndex: 100 }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 120 }}>
          <img src={logo} alt="isKonek Logo" style={{ height: 30, marginRight: 12, marginLeft: 5 }} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 750, fontSize: 25, color: '#8B0000', letterSpacing: 0.5, lineHeight: 1.1, whiteSpace: 'nowrap' }}>ISKOnek</span>
        </div>
        <div style={{ borderBottom: '3px solid #eee', margin: '0 1.2rem 0.5rem 1.2rem' }} />
        <nav style={{ marginTop: 0 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navLinks.map((link, idx) => {
              const isActive = isActiveTab(link);
              const color = isActive ? '#fff' : '#8B0000';
              return (
                <li key={link.label} style={{ marginBottom: idx === navLinks.length - 1 ? 0 : 10 }}>
                  <Link
                    to={link.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '90%',
                      padding: '10px 14px',
                      color,
                      background: isActive ? 'rgb(139, 0, 0)' : 'transparent',
                      fontWeight: isActive ? 700 : 600,
                      textDecoration: 'none',
                      fontSize: 15,
                      marginRight: 100,
                      boxShadow: isActive ? '0 2px 8px rgba(139,0,0,0.10)' : 'none',
                      border: 'none',
                      letterSpacing: 0.5,
                      transition: 'background 0.2s, color 0.2s',
                      fontFamily: 'DM Sans, sans-serif',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <span style={{ marginRight: 10, display: 'flex', alignItems: 'center', fontSize: 18 }}><link.icon color={color} /></span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div style={{ padding: '0 0 1.2rem 1.2rem', marginBottom: 20 }}>
        <button
          onClick={onLogout}
          style={{
            color: '#fff',
            background: '#8B0000',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: 0.5,
            fontFamily: 'Poppins, sans-serif',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            padding: '8px 18px',
            boxShadow: '0 2px 8px rgba(139,0,0,0.10)',
            outline: 'none',
            marginTop: 10,
          }}
        >
          <FaSignOutAlt style={{ marginRight: 8, fontSize: 17 }} /> Log Out
        </button>
      </div>
    </div>
  );
}

export default SidebarNavigation; 