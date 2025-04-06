// src/components/BottomTabs.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/bottomTabs.css';

const BottomTabs = ({ inboxCount = 0, archivedCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-tabs-nav">
      <div
        className={`tab-link ${isActive('/inbox') ? 'active' : ''}`}
        onClick={() => navigate('/inbox')}
      >
        <span className="tab-icon">📞</span>
        <div>Inbox</div>
        {inboxCount > 0 && <span className="badge">{inboxCount}</span>}
      </div>

      <button
        className="dial-button"
        onClick={() => navigate('/dialpad')}
      >
        ●
      </button>

      <div
        className={`tab-link ${isActive('/archived') ? 'active' : ''}`}
        onClick={() => navigate('/archived')}
      >
        <span className="tab-icon">📁</span>
        <div>Archived</div>
        {archivedCount > 0 && <span className="badge">{archivedCount}</span>}
      </div>
    </div>
  );
};

export default BottomTabs;