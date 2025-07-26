import React, { useEffect } from 'react';
import logo from './assets/Logo.png';
import bannerImg from './assets/AWSBanner.jpg';
import orgLogoImg from './assets/AWS.jpg';
import Sidebar from './Sidebar';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

// SVG icon components (same as Dashboard)
const HomeIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 10.75L12 4l9 6.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 10v8a2 2 0 002 2h3m6 0h3a2 2 0 002-2v-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ProfileIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke={color} strokeWidth="2"/></svg>
);
const OrgIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="7" cy="10" r="3" stroke={color} strokeWidth="2"/><circle cx="17" cy="10" r="3" stroke={color} strokeWidth="2"/><path d="M7 13c-2.67 0-8 1.34-8 4v3h10v-3c0-2.66-5.33-4-8-4zm10 0c-2.67 0-8 1.34-8 4v3h10v-3c0-2.66-5.33-4-8-4z" stroke={color} strokeWidth="2"/></svg>
);
const EventsIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="2"/><path d="M16 3v4M8 3v4M3 9h18" stroke={color} strokeWidth="2"/></svg>
);
const LogoutIcon = ({ color }) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M16 17l5-5-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 4v16" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>
);

const navLinks = [
  { icon: HomeIcon, label: 'Home' },
  { icon: ProfileIcon, label: 'Profile' },
  { icon: OrgIcon, label: 'Organization' },
  { icon: EventsIcon, label: 'Events' },
];
const activeIdx = 1; // Profile is active (Admin profile)

export default function OrganizationProfilePage() {
  const { loggedInRole, setLoggedInUser, setLoggedInRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInRole !== 'organization') {
      navigate('/dashboard');
    }
  }, [loggedInRole, navigate]);

  function handleLogout() {
    setLoggedInUser(null);
    setLoggedInRole(null);
    navigate('/');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#fff', width: '100vw', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar role={loggedInRole} onLogout={handleLogout} />
      {/* Main Organization Profile Card */}
      <div style={{ flex: 1, marginLeft: 216, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: '2rem 0', height: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: 950, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '2.5rem 2.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Banner */}
          <div style={{ width: '100%', height: 180, borderRadius: 15, overflow: 'hidden', marginBottom: 0, position: 'relative', display: 'flex', alignItems: 'center', marginTop: 0, padding: 0 }}>
            <img src={bannerImg} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Logo and Name/Year Row */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: -60, marginBottom: 24, gap: 32 }}>
            {/* Org Logo - left, overlapping banner */}
            <div style={{ position: 'relative', minWidth: 180, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={orgLogoImg} alt="Org Logo" style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover', border: '8px solid #fff', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            </div>
            <div style={{
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '5rem',
  alignItems: 'flex-start',
  marginBottom: '1rem'
}}>
  {/* Name */}
  <div style={{ flex: 1, width: 400 }}>
    <span style={{
      color: '#D09B1F',
      fontWeight: 600,
      fontSize: 13,
      marginBottom: 6,
      display: 'block'
    }}>Name</span>
    <div style={{
      background: '#F2F2F2',
      color: '#444',
      borderRadius: 10,
      padding: '0.7rem 1rem',
      fontWeight: 500,
      fontSize: 16,
      width: '100%',
    }}>
      AWS Cloud Club – PUP
    </div>
  </div>

  {/* Date Founded */}
  <div style={{ width: 145 }}>
    <span style={{
      color: '#D09B1F',
      fontWeight: 600,
      fontSize: 13,
      marginBottom: 6,
      display: 'block'
    }}>Date Founded</span>
    <div style={{
      background: '#F2F2F2',
      color: '#444',
      borderRadius: 10,
      padding: '0.7rem 3rem',
      fontWeight: 500,
      fontSize: 16,
      width: '100%',
    }}>
      2022
    </div>
  </div>
</div>
          </div>
          {/* Descriptions */}
          <div style={{ width: '100%', marginBottom: 16, marginTop: 0 }}>
            <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Descriptions</span>
            <div style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, textAlign: 'left' }}>
              The AWS Cloud Club at PUP is the Philippines' first student-led AWS Cloud Club, building a vibrant community of AWStronauts at the Polytechnic University of the Philippines. It hosts hands–on events, bootcamps, and workshops where students explore cloud computing, sharpen tech skills, and build real-world solutions using AWS. With its mix of heart, humor, and technical depth, it empowers builders to connect, create, and launch campus-shaking innovations—making cloud not just cool, but culture.
            </div>
          </div>
          {/* Address */}
          <div style={{ width: '100%', marginBottom: 18 }}>
            <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Address</span>
            <div style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, textAlign: 'left' }}>
              Becoming an AWStronaut means gaining access to hands-on AWS workshops, exclusive bootcamps, and mentorship from tech leaders—all designed to supercharge your cloud skills and prepare you for real-world innovation. You’ll collaborate on campus-impacting projects, connect with fellow builders, and be part of a supportive space that blends organized chaos, heart, and humor. Whether you’re new to tech or looking to go serverless, the club helps you grow, lead, and launch—with cloud as your fuel.
            </div>
          </div>
          {/* Edit Button */}
          <button style={{ background: '#8B0000', color: '#fff', fontWeight: 700, fontSize: 22, border: 'none', borderRadius: 12, padding: '16px 0', letterSpacing: 1, marginTop: 18, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', width: '100%', maxWidth: 350, alignSelf: 'center', boxShadow: '0 2px 8px rgba(139,0,0,0.10)' }}>EDIT</button>
        </div>
      </div>
    </div>
  );
} 