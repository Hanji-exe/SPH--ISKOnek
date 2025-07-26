import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo from './assets/logo.png';
import car1 from './assets/car1.jpg';
import car2 from './assets/car2.jpg';
import car3 from './assets/car3.jpg';
import car4 from './assets/car4.jpg';
import car5 from './assets/car5.jpg';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const images = [car1, car2, car3, car4, car5];

// SVG icon components
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
const activeIdx = 0; // Home is active

function HomeDashboard({ currentUser, onLogout }) {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif', overflow: 'hidden' }}>
      {/* Sidebar on the left */}
      <Sidebar currentUser={currentUser} onLogout={onLogout} />
      {/* Main Content */}
      <div style={{ flex: 1, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        {/* Header with user info (logout button removed from here) */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '2rem 3rem 1rem 3rem', background: '#8B0000', color: '#fff', flexShrink: 0 }}>
          <h1 style={{ fontWeight: 700, fontSize: 32, margin: 0 }}>
            Welcome, {currentUser?.name || currentUser?.email || 'User'}!
          </h1>
        </div>
        {/* Slideshow */}
        <div style={{ width: '100%', flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            transitionTime={800}
            showArrows={false}
            stopOnHover={false}
            swipeable
            emulateTouch
            style={{ height: '100%' }}
          >
            {images.map((img, idx) => (
              <div key={idx} style={{ width: '100%', position: 'relative', height: '100%' }}>
                <img src={img} alt={`slide-${idx}`} style={{ width: '100%', maxHeight: '90vh', minHeight: 250, objectFit: 'cover', display: 'block' }} />
                {/* Existing overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(0, 0,0, 0.3) 0%, rgba(195, 27, 27, 0.3) 100%)' }}></div>
                {/* New bottom shadow overlay */}
                <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, rgba(0,0,0,5), transparent)' }}></div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard; 