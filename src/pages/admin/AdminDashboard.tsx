import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Home, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Calendar,
  Award,
  Clock,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { BACKEND_URL } from '../../utils/helpers';

interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  totalFlats: number;
  availableFlats: number;
  soldFlats: number;
  upcomingFlats: number;
  totalEnquiries: number;
  totalContacts: number;
  newContacts: number;
  totalFlatEnquiries: number;
  newFlatEnquiries: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    totalFlats: 0,
    availableFlats: 0,
    soldFlats: 0,
    upcomingFlats: 0,
    totalEnquiries: 0,
    totalContacts: 0,
    newContacts: 0,
    totalFlatEnquiries: 0,
    newFlatEnquiries: 0,
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardStats = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/dashboard/data`);
      const data = await res.json();
      if (data && data.success) {
        setStats(data.stats);
        setRecentActivity(data.recentActivity || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      subtitle: `${stats.completedProjects} Completed &bull; ${stats.inProgressProjects} Active`,
      icon: Building2,
      gradient: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Flats & Properties',
      value: stats.totalFlats,
      subtitle: `${stats.availableFlats} Available &bull; ${stats.soldFlats} Sold`,
      icon: Home,
      gradient: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Contact Inquiries',
      value: stats.totalContacts,
      subtitle: `${stats.newContacts} Unread Messages`,
      icon: MessageSquare,
      gradient: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Flat Enquiries',
      value: stats.totalFlatEnquiries,
      subtitle: `${stats.newFlatEnquiries} Pending Site Visits`,
      icon: Users,
      gradient: 'from-purple-600 to-violet-700',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-6 sm:p-10 space-y-8 bg-slate-100/60 min-h-screen">
      {/* Header with Title and Refresh Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Real-time Operational Metrics</span>
          </div>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            Executive Command Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Synchronized live with MongoDB database. Monitor construction milestones, leads, and listings.
          </p>
        </div>

        <button
          onClick={fetchDashboardStats}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-sm transition-all hover:shadow hover:border-slate-300 active:scale-95 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 text-amber-600 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Syncing...' : 'Refresh Metrics'}</span>
        </button>
      </div>

      {/* 4 Primary Stats Cards with Glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-md`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${card.bgColor} ${card.textColor}`}>
                  Active
                </span>
              </div>
              <div className="text-3xl font-extrabold font-serif text-slate-900 font-mono">
                {loading ? '...' : card.value}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                {card.title}
              </div>
            </div>

            <div
              className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium"
              dangerouslySetInnerHTML={{ __html: card.subtitle }}
            />
          </div>
        ))}
      </div>

      {/* Main Grid: Status Breakdown + Recent Activity */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Project & Property Status Matrix */}
        <div className="lg:col-span-7 space-y-6">
          {/* Construction Portfolio Breakdown */}
          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Projects Execution Ratio</h3>
                  <p className="text-xs text-slate-500">Breakdown of portfolio lifecycle</p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                Total: {stats.totalProjects}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Completed &amp; Handed Over</span>
                  </span>
                  <span className="font-mono">{stats.completedProjects} / {stats.totalProjects}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${stats.totalProjects ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Under Active Construction</span>
                  </span>
                  <span className="font-mono">{stats.inProgressProjects} / {stats.totalProjects}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${stats.totalProjects ? Math.round((stats.inProgressProjects / stats.totalProjects) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Estate Inventory Breakdown */}
          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Real Estate Inventory Status</h3>
                  <p className="text-xs text-slate-500">Ready vs upcoming flat units</p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                Flats: {stats.totalFlats}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <div className="text-2xl font-extrabold text-emerald-700 font-mono">
                  {stats.availableFlats}
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-0.5">Available</div>
                <div className="text-[10px] text-emerald-600">Ready for booking</div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100">
                <div className="text-2xl font-extrabold text-rose-700 font-mono">
                  {stats.soldFlats}
                </div>
                <div className="text-xs font-bold text-rose-800 mt-0.5">Sold Out</div>
                <div className="text-[10px] text-rose-600">Occupied units</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
                <div className="text-2xl font-extrabold text-amber-700 font-mono">
                  {stats.upcomingFlats}
                </div>
                <div className="text-xs font-bold text-amber-800 mt-0.5">Upcoming</div>
                <div className="text-[10px] text-amber-600">Pre-launch stage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Feed of Recent Inquiries & Activity */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-base">Live Activity Feed</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">Latest Inquiries</span>
              </div>

              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    No recent inquiries registered in database.
                  </div>
                ) : (
                  recentActivity.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors flex items-start gap-3"
                    >
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 text-xs ${
                          item.type === 'flat'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.type === 'flat' ? <Home className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 truncate">{item.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-center">
              <a
                href="/admin/contact-enquiries"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors inline-flex items-center gap-1"
              >
                <span>View Full Leads Inbox</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
