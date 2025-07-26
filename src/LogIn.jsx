import React, { useState } from 'react'
import logo from './assets/logo.png'
import pupImage from './assets/pup.jpg'

function EyeIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle' }}><path d="M1 10C1 10 4.5 4.5 10 4.5C15.5 4.5 19 10 19 10C19 10 15.5 15.5 10 15.5C4.5 15.5 1 10 1 10Z" stroke="#888" strokeWidth="2"/><circle cx="10" cy="10" r="3" stroke="#888" strokeWidth="2"/></svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle' }}><path d="M1 10C1 10 4.5 4.5 10 4.5C15.5 4.5 19 10 19 10C19 10 15.5 15.5 10 15.5C4.5 15.5 1 10 1 10Z" stroke="#888" strokeWidth="2"/><path d="M4 4L16 16" stroke="#888" strokeWidth="2"/></svg>
  );
}

function LoginPage({ onLogin, currentUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [role, setRole] = useState('user') // 'user' or 'organization'
  const [showSignUp, setShowSignUp] = useState(false)
  const [error, setError] = useState('')
  const [signUpMessage, setSignUpMessage] = useState('')
  const [fullName, setFullName] = useState('')

  // If already logged in, render nothing (parent will show dashboard)
  if (currentUser) return null;

  // Handle login with json-server
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    const res = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
    const users = await res.json();
    if (users.length > 0) {
      setMessage(`Logged in successfully as ${users[0].userType === 'organization' ? 'Organization' : 'User'}!`);
      setError('');
      setLoading(false);
      if (onLogin) onLogin(users[0]); // Pass user object to parent
    } else {
      setError('Invalid credentials.');
      setMessage('');
      setLoading(false);
    }
  };

  // Handle registration with json-server
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignUpMessage('');
    setError('');
    // Check if user already exists
    const res = await fetch(`http://localhost:4000/users?email=${email}`);
    const users = await res.json();
    if (users.length > 0) {
      setError('User already exists.');
      setLoading(false);
      return;
    }
    // Register new user
    const newUser = {
      email,
      password,
      userType: role,
      profile: {},
      name: fullName
    };
    await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    setSignUpMessage('Sign up successful! You can now log in.');
    setError('');
    setShowSignUp(false);
    setLoading(false);
    setFullName('');
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    setMessage('Google sign-in coming soon!');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', fontFamily: 'Poppins, sans-serif', overflow: 'hidden', position: 'relative', background: '#222' }}>
      {/* Fixed split layout */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', zIndex: 1 }}>
        {/* Left: 70% PUP image */}
        <div style={{ width: '60vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <img src={pupImage} alt="Campus" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(128,0,0,0.35)' }}></div>
          <span style={{ position: 'absolute', left: 16, bottom: 16, color: '#fff', fontSize: 12, opacity: 0.8, zIndex: 2 }}>Photo by Internet Reference</span>
        </div>
        {/* Right: 30% Login Form */}
        <div style={{ width: '40vw', height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 10, position: 'relative' }}>
          {/* Logo at top center */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
            <img src={logo} alt="isKonek Logo" style={{ height: 80, marginBottom: 8 }} />
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: 1, color: '#8B0000', marginBottom: 8 }}>isKonek</span>
          </div>
          {/* Login Form Container */}
          <div style={{ maxWidth: 350, width: '100%', padding: '1.2rem 2rem 1.5rem 2rem', borderRadius: 20, border: '2px solid #8B0000', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 48, marginTop: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <span style={{ fontWeight: 600, color: '#8B0000', fontSize: 18, fontStyle: 'italic' }}>For Pupians, By Pupians</span>
            </div>
            <form>
              <div style={{ marginBottom: 12, textAlign: 'left' }}>
                <label style={{ fontWeight: 500, fontSize: 14, color: '#8B0000' }}>Login</label>
                <input
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: 10, fontSize: 15, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#f7f7f7', color: '#111' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 8, textAlign: 'left', position: 'relative' }}>
                <label style={{ fontWeight: 500, fontSize: 14, color: '#8B0000' }}>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: 10, fontSize: 15, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#f7f7f7', color: '#111' }}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: 36, cursor: 'pointer' }} title={showPassword ? 'Hide' : 'Show'}>
                  <EyeIcon open={showPassword} />
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#222', fontWeight: 600 }}>
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ marginRight: 6, accentColor: '#222' }} />
                  Remember me
                </label>
                <a href="#" style={{ color: '#111', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <button onClick={handleSignIn} disabled={loading} style={{ width: '100%', padding: 12, fontSize: 16, borderRadius: 6, border: 'none', background: '#8B0000', color: '#fff', fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
                Sign in
              </button>
              <button onClick={handleGoogleSignIn} style={{ width: '100%', padding: 12, fontSize: 16, borderRadius: 6, border: 'none', background: '#222', color: '#fff', fontWeight: 500, cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}></span>Sign in with Google
              </button>
              <div style={{ textAlign: 'center', fontSize: 16, marginTop: 12, width: '100%' }}>
                <h3 style={{ color: '#222', fontWeight: 700, fontSize: 18, margin: 0 }}>
                  Don&apos;t have an account? <a href="#" style={{ color: '#8B0000', textDecoration: 'underline', fontWeight: 700, marginLeft: 4 }} onClick={e => { e.preventDefault(); setShowSignUp(true); }}>Sign up now</a>
                </h3>
              </div>
            </form>
            {error && <p style={{ marginTop: 16, color: '#e11d48', textAlign: 'center' }}>{error}</p>}
            {message && <p style={{ marginTop: 16, color: '#198754', textAlign: 'center' }}>{message}</p>}
          </div>
        </div>
      </div>
      {/* Sign Up Modal/Section */}
      {showSignUp && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem 2.5rem', minWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', position: 'relative' }}>
            <button onClick={() => setShowSignUp(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#8B0000' }}>&times;</button>
            <h2 style={{ color: '#8B0000', fontWeight: 700, marginBottom: 18, textAlign: 'center' }}>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 500, fontSize: 14, color: '#8B0000' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={{ width: '100%', padding: 10, fontSize: 15, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#f7f7f7', color: '#111' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 500, fontSize: 14, color: '#8B0000' }}>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: 10, fontSize: 15, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#f7f7f7', color: '#111' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 500, fontSize: 14, color: '#8B0000' }}>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: '100%', padding: 10, fontSize: 15, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#f7f7f7', color: '#111' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, fontSize: 14, color: '#8B0000', marginRight: 10 }}>I am a:</label>
                <label style={{ marginRight: 16, color: '#222', fontWeight: 600 }}>
                  <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} style={{ marginRight: 8 }} /> User
                </label>
                <label style={{ color: '#222', fontWeight: 600 }}>
                  <input type="radio" name="role" value="organization" checked={role === 'organization'} onChange={() => setRole('organization')} style={{ marginRight: 8 }} /> Organization
                </label>
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, fontSize: 16, borderRadius: 6, border: 'none', background: '#8B0000', color: '#fff', fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              {signUpMessage && <p style={{ marginTop: 12, color: '#198754', fontWeight: 600, textAlign: 'center' }}>{signUpMessage}</p>}
              {error && <p style={{ marginTop: 12, color: '#e11d48', fontWeight: 600, textAlign: 'center' }}>{error}</p>}
            </form>
          </div>
        </div>
      )}
      {/* Footer */}
      <div style={{ width: '100vw', background: '#8B0000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.5rem 2rem', fontSize: 15, fontWeight: 300, position: 'fixed', bottom: 0, left: 0, zIndex: 2, letterSpacing: 1 }}>
        <span style={{ color: '#fff', fontWeight: 300, fontSize: 16, marginRight: 32 }}>@SolaRizz</span>
        <span style={{ color: '#fff', fontWeight: 300, fontSize: 16, marginLeft: 32 }}>@Copyright 2025</span>
      </div>
    </div>
  )
}

export default LoginPage 