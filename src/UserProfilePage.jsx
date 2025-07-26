import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

export default function UserProfilePage({ currentUser, onLogout }) {
  const { loggedInRole } = useAuth();
  const navigate = useNavigate();

  // Redirect if not user
  useEffect(() => {
    if (loggedInRole !== 'user') {
      navigate('/dashboard');
    }
  }, [loggedInRole, navigate]);

  // Form state
  const [form, setForm] = useState({
    email: currentUser?.email || '',
    name: currentUser?.name || '',
    birthday: '',
    pronoun: '',
    address: '',
    bio: '',
    image: null,
    imageUrl: '',
  });
  const [age, setAge] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Load profile info from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('profileInfo');
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(prev => ({ ...prev, ...parsed }));
      if (parsed.imageUrl) {
        setImagePreview(parsed.imageUrl);
      }
    }
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'birthday') {
      if (value) {
        const today = new Date();
        const birthDate = new Date(value);
        let years = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          years--;
        }
        setAge(years >= 0 ? years : '');
      } else {
        setAge('');
      }
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setForm(f => ({ ...f, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreview(ev.target.result);
        setForm(f => ({ ...f, imageUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setForm(f => ({ ...f, imageUrl: '' }));
    }
  }

  function handleSave(e) {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      return;
    }
    setEditMode(false);
    // Save to localStorage (including imageUrl)
    localStorage.setItem('profileInfo', JSON.stringify(form));
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', background: '#fff', width: '115vw', height: '100vh' }}>
      <Sidebar onLogout={onLogout} role={loggedInRole} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '2rem 0' }}>
        <form onSubmit={handleSave} style={{ maxWidth: 900, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '2.5rem 3.5rem 2rem 3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Profile image and upload */}
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: 24, gap: 36, justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: 10 }}
                />
              )}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  style={{ width: 210, height: 210, borderRadius: '50%', objectFit: 'cover', border: '6px solid #8B0000', background: '#eae6df' }}
                />
              ) : (
                <div style={{ width: 210, height: 210, borderRadius: '50%', border: '6px solid #8B0000', background: '#eae6df', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B0000', fontWeight: 600, fontSize: 20, textAlign: 'center' }}>
                  Upload Profile Pic
                </div>
              )}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'flex-start' }}>
              <div style={{ width: '100%' }}>
                <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Name</span>
                {editMode ? (
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}
                    required
                  />
                ) : (
                  <div style={{ background: '#F2F2F2', color: form.name ? '#444' : '#bbb', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}>{form.name || 'Add Name'}</div>
                )}
              </div>
              <div style={{ width: '100%', display: 'flex', gap: 50 }}>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Birthday</span>
                  {editMode ? (
                    <input
                      name="birthday"
                      type="date"
                      value={form.birthday}
                      onChange={handleInputChange}
                      style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}
                      required
                    />
                  ) : (
                    <div style={{ background: '#F2F2F2', color: form.birthday ? '#444' : '#bbb', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}>{form.birthday || 'Add Birthday'}</div>
                  )}
                  {form.birthday && (
                    <span style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Age: {age}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Pronoun</span>
                  {editMode ? (
                    <select
                      name="pronoun"
                      value={form.pronoun}
                      onChange={handleInputChange}
                      style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '112%', border: '1px solid #ccc' }}
                      required
                    >
                      <option value="" disabled>Select pronoun</option>
                      <option value="he/him">he/him</option>
                      <option value="she/her">she/her</option>
                      <option value="they/them">they/them</option>
                      <option value="prefer not to say">prefer not to say</option>
                    </select>
                  ) : (
                    <div style={{ background: '#F2F2F2', color: form.pronoun ? '#444' : '#bbb', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}>{form.pronoun || 'Add Pronoun'}</div>
                  )}
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <span style={{ color: '#D09B1F', fontWeight: 700, fontSize: 15, marginBottom: 2, display: 'block', letterSpacing: 0.5 }}>Email</span>
                <div style={{ background: '#F2F2F2', color: form.email ? '#444' : '#bbb', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}>
                  {currentUser?.email || 'User'}
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', marginBottom: 10 }}>
            <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Address</span>
            {editMode ? (
              <input
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}
                required
              />
            ) : (
              <div style={{ background: '#F2F2F2', color: form.address ? '#444' : '#bbb', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc' }}>{form.address || 'Add Address'}</div>
            )}
          </div>
          <div style={{ width: '100%', marginBottom: 18 }}>
            <span style={{ color: '#D09B1F', fontWeight: 600, fontSize: 14, marginBottom: 2, display: 'block' }}>Bio</span>
            {editMode ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
                placeholder="Enter bio"
                style={{ background: '#F2F2F2', color: '#444', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc', minHeight: 80, resize: 'vertical' }}
                required
              />
            ) : (
              <div style={{ background: '#F2F2F2', color: form.bio ? '#444' : '#bbb', borderRadius: 10, padding: '0.7rem 1rem', fontWeight: 400, fontSize: 16, width: '100%', border: '1px solid #ccc', minHeight: 80 }}>{form.bio || 'Add Bio'}</div>
            )}
          </div>
          <button
            type="submit"
            style={{ background: '#8B0000', color: '#fff', fontWeight: 700, fontSize: 20, border: 'none', borderRadius: 10, padding: '10px 48px', letterSpacing: 1, marginTop: 10, cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}
          >
            {editMode ? 'SAVE' : 'EDIT'}
          </button>
        </form>
      </div>
    </div>
  );
} 