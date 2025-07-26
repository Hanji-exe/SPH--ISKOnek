import React, { useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './assets/Logo.png';
import banner1 from './assets/car1.jpg';
import banner2 from './assets/car2.jpg';
import banner3 from './assets/car3.jpg';
import { supabase } from './supabaseClient';
import Sidebar from './Sidebar';
import { FaRegCalendarAlt } from 'react-icons/fa';

// Example orgsData (import or copy from Organizations.jsx)
const orgsData = [
  { name: 'AWS Cloud Club – PUP', logo: banner1 },
  { name: 'GDG PUP MANILA', logo: banner2 },
  { name: 'IBITS PUP MANILA', logo: banner3 },
];

// Example events data
const interestCategories = [
  'All', 'Tech', 'Party', 'Workshop', 'Sports', 'Networking', 'Food', 'Competition', 'Political', 'Uniwide', 'Outside Campus', 'Seminars', 'Job Fairs'
];
const initialEventsData = [
  // ... (copy your eventsData array here from Events.jsx)
];

const EVENTS_PER_PAGE = 5;

function RegistrationModal({ open, onClose, onSubmit, event }) {
  const modalRef = useRef();
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '120vw', height: '100vh', background: 'rgba(30,20,20,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div ref={modalRef} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px rgba(139,0,0,0.18)', padding: '2.5rem 2.2rem', minWidth: 340, maxWidth: 400, width: '100%', position: 'relative', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#8B0000', cursor: 'pointer', fontWeight: 700 }}>&times;</button>
        <div style={{ fontWeight: 800, fontSize: 22, color: '#7B2D2D', marginBottom: 2, textAlign: 'center', letterSpacing: 0.5 }}>Event Registration Form</div>
        {event && (
          <div style={{ background: '#FBEEDB', borderRadius: 10, padding: '10px 14px', marginBottom: 8, boxShadow: '0 1px 4px rgba(139,0,0,0.06)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#7B2D2D', marginBottom: 2 }}>{event.title}</div>
            <div style={{ fontSize: 13, color: '#8B0000', fontWeight: 600, marginBottom: 1 }}>{event.date}</div>
            <div style={{ fontSize: 13, color: '#7B2D2D', fontWeight: 500, marginBottom: 1 }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4, verticalAlign: 'middle' }}><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.2 10.74 8.13 11.41.53.39 1.21.39 1.74 0C13.8 21.74 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 13.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7A2.5 2.5 0 0 0 9.5 11c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5A2.5 2.5 0 0 0 12 8.5z" fill="#7B2D2D"/></svg>
              {event.location}
            </div>
            <div style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>
              Organized by: <span style={{ color: '#8B0000', fontWeight: 700 }}>{event.org?.name}</span>
            </div>
            {event.description && (
              <div style={{ fontSize: 13, color: '#222', fontWeight: 400, marginTop: 7, background: '#fff', borderRadius: 7, padding: '7px 10px', boxShadow: '0 1px 3px rgba(139,0,0,0.04)' }}>
                {event.description}
              </div>
            )}
          </div>
        )}
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 2 }}>
          <input name="name" placeholder="Full Name" required style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 15, fontFamily: 'inherit', marginBottom: 2, background: '#fafbfc', color: '#111' }} />
          <input name="college" placeholder="College" required style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 15, fontFamily: 'inherit', marginBottom: 2, background: '#fafbfc', color: '#111' }} />
          <input name="contact" placeholder="Contact Number" required style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 15, fontFamily: 'inherit', marginBottom: 2, background: '#fafbfc', color: '#111' }} />
          <input name="gmail" placeholder="Gmail Account" type="email" required style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 15, fontFamily: 'inherit', marginBottom: 2, background: '#fafbfc', color: '#111' }} />
          <input name="fb" placeholder="Facebook Account" required style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 15, fontFamily: 'inherit', marginBottom: 2, background: '#fafbfc', color: '#111' }} />
          <textarea name="info" placeholder="Additional Information (e.g., year, course, dietary needs, etc.)" rows={2} style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #eee', fontSize: 15, fontFamily: 'inherit', resize: 'vertical', marginBottom: 2, background: '#fafbfc', color: '#111' }} />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              color: '#fff',
              fontWeight: 900,
              fontSize: 21,
              border: 'none',
              borderRadius: 12,
              padding: '18px 0',
              marginTop: 18,
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: 1.2,
              boxShadow: '0 6px 24px rgba(67,233,123,0.28)',
              transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
              width: '100%',
              outline: 'none',
              textTransform: 'uppercase',
            }}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(67,233,123,0.36)';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(67,233,123,0.28)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function EventCreateForm({ orgId, onCreate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      orgId,
      title,
      date,
      location,
      id: "Event-" + Date.now(),
    };
    // TODO: Replace with your real AWS API Gateway endpoint
    // await fetch("https://your-api-id.execute-api.region.amazonaws.com/prod/events", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newEvent),
    // });
    onCreate(newEvent);
    setTitle("");
    setDate("");
    setLocation("");
    alert("Event created!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Create Event</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        required
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default function EventsPage({ onLogout }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [activeInterest, setActiveInterest] = useState('All');
  const [regOpen, setRegOpen] = useState(false);
  const [regEvent, setRegEvent] = useState(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [events, setEvents] = useState(initialEventsData);
  const { loggedInRole, setLoggedInUser, setLoggedInRole } = useAuth();
  const navigate = useNavigate();

  function handleRegClick(event) {
    setRegEvent(event);
    setRegOpen(true);
    setRegSuccess(false);
  }
  function handleRegClose() {
    setRegOpen(false);
    setRegEvent(null);
    setRegSuccess(false);
  }
  function handleRegSubmit(e) {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegOpen(false);
      setRegEvent(null);
      setRegSuccess(false);
    }, 1800);
  }
  async function handleLogout() {
    setLoggedInUser(null);
    setLoggedInRole(null);
    navigate('/');
  }

  // Event creation only for orgs/admins
  function handleCreateEvent(newEvent) {
    setEvents(prev => [newEvent, ...prev]);
  }

  const filteredEvents = events.filter(e =>
    (activeInterest === 'All' || e.interest === activeInterest) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.org.name.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const pagedEvents = filteredEvents.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#fff', width: '100vw' }}>
      <Sidebar onLogout={onLogout} role={loggedInRole} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', marginLeft: 200 }}>
        {/* Event creation form for orgs/admins only */}
        {(loggedInRole === 'organization' || loggedInRole === 'admin') && (
          <EventCreateForm orgId={null} onCreate={handleCreateEvent} />
        )}
        {/* Main Events Content */}
        {/* ... (rest of the EventsPage content from Events.jsx) ... */}
      </div>
    </div>
  );
} 