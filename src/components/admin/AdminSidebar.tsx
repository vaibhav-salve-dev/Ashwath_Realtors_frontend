import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Building, 
  MessageSquare, 
  FolderOpen, 
  Home, 
  LogOut, 
  ExternalLink,
  Users
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import logo from '../../assets/logo2.png';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAdmin();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Company Info', path: '/admin/company-info', icon: Building },
    { name: 'Contact Inquiries', path: '/admin/contact-enquiries', icon: MessageSquare },
    { name: 'Project Portfolio', path: '/admin/project-management', icon: FolderOpen },
    { name: 'Flat Management', path: '/admin/flat-management', icon: Home },
    { name: 'Flat Enquiries', path: '/admin/flat-enquiries', icon: Users },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950 text-slate-300 border-r border-white/10 shadow-2xl z-50 flex flex-col justify-between">
      <div className="p-6">
        {/* Logo Brand Header */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="p-1 rounded-xl bg-amber-500/20 border border-amber-500/30">
            <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-serif font-extrabold text-white tracking-wider">ASHWATH</h1>
            <p className="text-[10px] font-semibold tracking-widest text-amber-400 uppercase">ADMIN CONSOLE</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: View Live Site & Logout */}
      <div className="p-6 border-t border-white/10 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-amber-500" />
            <span>View Public Site</span>
          </span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
        </Link>

        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
