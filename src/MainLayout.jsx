import React from 'react';

function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default MainLayout; 