import React, { useEffect, useState } from 'react';
import { Save, Building2, Users, Target, Award, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { BACKEND_URL } from '../../utils/helpers';

const CompanyInfo = () => {
  const [companyData, setCompanyData] = useState({
    name: 'Ashwath Realtors',
    founded: 2004,
    description: 'We believe a meaningful development is measured not only in square feet, but in the lives it touches and the value it creates over time. Rooted in experience and driven by thoughtful planning, Ashwath Realtors brings together people, places and possibilities through considered real estate development.',
    mission: 'To deliver reliable and high-quality construction services by maintaining integrity, transparency and a strong commitment to customer satisfaction.',
    vision: 'To become a trusted leader in construction and infrastructure by delivering high-quality, innovative and sustainable building solutions that shape better living with quality, trust and excellence.',
    address: 'Pune · Mumbai · Maharashtra',
    phone: '+91 99250 86478',
    email: 'info@ashwathrealtors.in',
    website: 'https://ashwathrealtors.in',
    totalProjects: '6',
    yearsExperience: '20',
    teamMembers: '100',
    clientSatisfaction: 99
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchCompany = () => {
    fetch(`${BACKEND_URL}/api/company/sendData`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data != null) {
          setCompanyData(data);
        }
      })
      .catch((err) => console.log('Fetch error:', err.message));
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/company/getData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData)
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Company information updated successfully in database!' });
        setIsEditing(false);
        fetchCompany();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update company data' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Could not connect to backend server.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 bg-slate-100/60 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            Company Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your builder profile, public contact information, and impact metrics.
          </p>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors text-center"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-initial bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save & Deploy'}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Edit Company Profile</span>
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 border ${feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Brand Identity */}
          <div className="glass-card rounded-2xl p-5 sm:p-8 border border-white/80 shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
              <Building2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <span>Brand Identity &amp; Overview</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Company / Developer Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={companyData.name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Founded Year
                </label>
                <input
                  type="number"
                  name="founded"
                  value={companyData.founded || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Company Mission Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={companyData.description || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="glass-card rounded-2xl p-5 sm:p-8 border border-white/80 shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
              <Target className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>Vision &amp; Strategic Mission</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Corporate Mission
                </label>
                <textarea
                  name="mission"
                  rows={3}
                  value={companyData.mission || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Corporate Vision
                </label>
                <textarea
                  name="vision"
                  rows={3}
                  value={companyData.vision || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="glass-card rounded-2xl p-5 sm:p-8 border border-white/80 shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 pb-4 border-b border-slate-100">
              Public Contact &amp; Headquarters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Registered Headquarters Address
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={companyData.address || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Official Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={companyData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Inquiry Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={companyData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={companyData.website || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/80 shadow-sm space-y-5">
            <h3 className="text-base font-bold font-serif text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Award className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <span>Public Impact Numbers</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Projects</label>
                <input
                  type="text"
                  name="totalProjects"
                  value={companyData.totalProjects || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Years in Industry</label>
                <input
                  type="text"
                  name="yearsExperience"
                  value={companyData.yearsExperience || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Engineers &amp; Team</label>
                <input
                  type="text"
                  name="teamMembers"
                  value={companyData.teamMembers || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Satisfaction Rate (%)</label>
                <input
                  type="number"
                  name="clientSatisfaction"
                  value={companyData.clientSatisfaction || 98}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white disabled:bg-slate-50 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Quick Preview Card */}
          <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Homepage Preview Counter
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">{companyData.totalProjects}+</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Projects</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">{companyData.yearsExperience}+</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Years</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">{companyData.teamMembers}+</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Team</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">{companyData.clientSatisfaction}%</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Satisfied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
