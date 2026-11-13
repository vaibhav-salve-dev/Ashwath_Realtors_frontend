import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ExternalLink, Building2, LogOut } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminDashboard from './AdminDashboard';
import CompanyInfo from './CompanyInfo';
import ContactEnquiries from './ContactEnquiries';
import ProjectManagement from './ProjectManagement';
import FlatManagement from './FlatManagement';
import FlatEnquiries from './FlatEnquiries';
import logo from '../../assets/logo2.png';

const AdminPanel = () => {
  const { isAuthenticated, isLoading, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Automatically close mobile sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
          <span className="text-sm font-semibold text-slate-300">Authenticating Staff Console...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Mobile Top Navigation Bar (< lg) */}
      <header className="sticky top-0 z-40 lg:hidden bg-slate-950 text-white px-4 py-3 border-b border-white/10 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-amber-400 focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-7 w-7 object-contain" />
            <div className="flex flex-col">
              <span className="text-xs font-serif font-extrabold tracking-wider text-white">ASHWATH</span>
              <span className="text-[9px] font-semibold text-amber-400 tracking-widest uppercase">ADMIN</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to="/"
            target="_blank"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
            title="View Public Site"
          >
            <Building2 className="h-4 w-4 text-amber-400" />
          </Link>
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Responsive Sidebar Drawer */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area: full width on mobile, offset margin on desktop */}
      <main className="flex-1 lg:ml-64 min-w-0 transition-all duration-300 flex flex-col">
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/contact-enquiries" element={<ContactEnquiries />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="/flat-management" element={<FlatManagement />} />
          <Route path="/flat-enquiries" element={<FlatEnquiries />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;
