// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header.jsx';
import Inbox from './pages/Inbox.jsx';
import Archived from './pages/Archived.jsx';
import DialPad from './pages/DialPad.jsx';
import BottomTabs from './components/BottomTabs.jsx';

const App = () => {
  return (
    <Router>
      <div id="app">
        <div className="container">
          <Header />
          <div className="container-view">
            <Routes>
              <Route path="/" element={<Navigate to="/inbox" />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/archived" element={<Archived />} />
              <Route path="/dialpad" element={<DialPad />} />
            </Routes>
          </div>
          <BottomTabs />
        </div>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
};

export default App;
