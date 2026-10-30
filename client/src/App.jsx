import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import ProfileView from './pages/ProfileView';
import SwapRequests from './pages/SwapRequests';
import Connections from './pages/Connections';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-500 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile/:id" element={<ProfileView />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected Student Pages */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/requests"
                  element={
                    <ProtectedRoute>
                      <SwapRequests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/connections"
                  element={
                    <ProtectedRoute>
                      <Connections />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
