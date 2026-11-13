import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, MessageSquare, Eye, Reply, Archive, Trash2, Search, X, CheckCircle2 } from 'lucide-react';
import { BACKEND_URL } from '../../utils/helpers';

const ContactEnquiries = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [statusTrigger, setStatusTrigger] = useState(false);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact/sendData`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEnquiries(data);
      }
    } catch (err) {
      console.error('Contact fetch err:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusTrigger]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/contact/updateStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setStatusTrigger(!statusTrigger);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, Status: newStatus });
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleReply = async (enquiry: any) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: enquiry.Email, subject: enquiry.Subject }),
      });
      const data = await res.json();
      if (data.link) {
        window.open(data.link, '_blank');
      }
      await updateStatus(enquiry._id, 'replied');
    } catch (err) {
      console.error('Reply link error:', err);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Delete this inquiry?')) return;

    try {
      await fetch(`${BACKEND_URL}/api/contact/${id}`, {
        method: 'DELETE',
      });
      setStatusTrigger(!statusTrigger);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesFilter = filter === 'all' || (e.Status && e.Status.toLowerCase() === filter.toLowerCase());
    const matchesSearch =
      (e.Name && e.Name.toLowerCase().includes(search.toLowerCase())) ||
      (e.Email && e.Email.toLowerCase().includes(search.toLowerCase())) ||
      (e.Subject && e.Subject.toLowerCase().includes(search.toLowerCase())) ||
      (e.Message && e.Message.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const normalized = (status || 'new').toLowerCase();
    switch (normalized) {
      case 'replied':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'archived':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 bg-slate-100/60 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            Contact &amp; Client Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Incoming communication from the website contact form and consultation requests.
          </p>
        </div>

        <div className="w-full sm:w-auto flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm focus:outline-none focus:border-amber-500 capitalize"
          >
            <option value="all">All Inquiries ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => (e.Status || 'new').toLowerCase() === 'new').length})</option>
            <option value="replied">Replied ({enquiries.filter((e) => (e.Status || '').toLowerCase() === 'replied').length})</option>
            <option value="archived">Archived ({enquiries.filter((e) => (e.Status || '').toLowerCase() === 'archived').length})</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client name, email, phone, subject..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 shadow-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Enquiries List */}
      <div className="space-y-3">
        {filteredEnquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            onClick={() => setSelectedEnquiry(enquiry)}
            className="glass-card rounded-2xl p-4 sm:p-5 border border-white/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
          >
            <div className="flex items-start gap-3 sm:gap-3.5 flex-1 min-w-0 w-full sm:w-auto">
              <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0 mt-0.5">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{enquiry.Name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${getStatusBadge(enquiry.Status)}`}>
                    {enquiry.Status || 'new'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-1.5">
                  <span className="text-slate-700 font-medium break-all">{enquiry.Email}</span>
                  {enquiry.Phone && <span>&bull; {enquiry.Phone}</span>}
                  {enquiry.Subject && <span className="font-semibold text-slate-800 truncate max-w-xs">&bull; {enquiry.Subject}</span>}
                </div>

                <p className="text-xs text-slate-600 line-clamp-1">{enquiry.Message}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0">
              <span className="text-[11px] text-slate-400 font-mono">
                {enquiry.Date ? new Date(enquiry.Date).toLocaleDateString() : 'Recent'}
              </span>

              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleReply(enquiry)}
                  className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Reply via Email / Gmail"
                >
                  <Reply className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateStatus(enquiry._id, enquiry.Status === 'archived' ? 'new' : 'archived')}
                  className="p-2 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Archive toggle"
                >
                  <Archive className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(enquiry._id, e)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredEnquiries.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl">
            <p className="text-sm text-slate-500">No contact inquiries found matching filter.</p>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-panel-dark rounded-2xl sm:rounded-3xl max-w-lg w-full border border-white/20 shadow-2xl p-5 sm:p-8 animate-in zoom-in-95 duration-300 text-white relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 sm:mb-6 pr-8">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(selectedEnquiry.Status)}`}>
                {selectedEnquiry.Status || 'new'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif mt-2 break-words">{selectedEnquiry.Name}</h3>
              <div className="text-xs text-slate-400 mt-1">
                Received: {selectedEnquiry.Date ? new Date(selectedEnquiry.Date).toLocaleString() : 'N/A'}
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <span className="text-slate-400 block mb-0.5">Client Email:</span>
                  <a href={`mailto:${selectedEnquiry.Email}`} className="font-semibold text-amber-400 hover:underline break-all">
                    {selectedEnquiry.Email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Contact Phone:</span>
                  <a href={`tel:${selectedEnquiry.Phone}`} className="font-semibold text-white hover:underline">
                    {selectedEnquiry.Phone || 'Not provided'}
                  </a>
                </div>
              </div>

              {selectedEnquiry.Subject && (
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1">Subject:</span>
                  <div className="font-semibold text-white text-sm break-words">{selectedEnquiry.Subject}</div>
                </div>
              )}

              <div>
                <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1">Message Body:</span>
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 leading-relaxed text-xs break-words max-h-48 overflow-y-auto">
                  {selectedEnquiry.Message}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleReply(selectedEnquiry)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Reply className="h-4 w-4" />
                  <span>Reply via Gmail</span>
                </button>
                <button
                  onClick={() => updateStatus(selectedEnquiry._id, 'replied')}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-center"
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => handleDelete(selectedEnquiry._id)}
                  className="py-2.5 px-3 rounded-xl text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center"
                  title="Delete message"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactEnquiries;
