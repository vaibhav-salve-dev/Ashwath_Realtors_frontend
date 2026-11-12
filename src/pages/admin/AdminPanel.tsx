import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminDashboard from './AdminDashboard';
import CompanyInfo from './CompanyInfo';
import ContactEnquiries from './ContactEnquiries';
import ProjectManagement from './ProjectManagement';
import FlatManagement from './FlatManagement';
import FlatEnquiries from './FlatEnquiries';

const AdminPanel = () => {
  const { isAuthenticated, isLoading } = useAdmin();

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
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-w-0">
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
