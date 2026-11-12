import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Flats from './pages/Flats';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-500/20 selection:text-amber-900">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminPanel />} />

            {/* Public Client Routes */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/flats" element={<Flats />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
