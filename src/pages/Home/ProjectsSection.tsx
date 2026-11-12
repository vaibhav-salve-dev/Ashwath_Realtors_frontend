import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  Clock,
  Eye,
  Calendar,
  X,
  Building,
  Tag,
  ArrowRight,
  Sparkles,
  FolderKanban,
  MapPin,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { BACKEND_URL, getImageUrl, normalizeProject } from '../../utils/helpers';

interface ProjectItem {
  id: string | number;
  title: string;
  category: string;
  status: string;
  year?: string | number;
  duration?: string;
  image: string;
  description: string;
  location?: string;
  detail?: string;
}

const clientProjects: ProjectItem[] = [
  {
    id: '1',
    title: 'Anandvilla',
    category: 'residential',
    status: 'in-progress',
    year: 'Expected 2027',
    duration: 'Ongoing',
    image: '/assets/anandvilla.png',
    location: 'Andheri East, Mumbai',
    detail: 'Commercial & Residential · Redevelopment',
    description:
      'Premier redevelopment project transforming prime society land in Andheri East into modern commercial and luxury residential spaces. Registered under MahaRERA PR1180002501890.',
  },
  {
    id: '2',
    title: 'Chaitanya Apartments',
    category: 'residential',
    status: 'in-progress',
    year: 'Under Construction',
    duration: 'Ongoing',
    image: '/assets/chaitanya.png',
    location: 'Kasarwadi, Pune',
    detail: 'Ongoing Development',
    description:
      'Contemporary residential address thoughtfully planned for modern family living with superior connectivity to Pune-Pimpri business corridors.',
  },
  {
    id: '3',
    title: 'NavKshitij',
    category: 'residential',
    status: 'completed',
    year: '2023',
    duration: 'Delivered',
    image: '/assets/navkshitij.png',
    location: 'Kothrud, Pune',
    detail: '2 & 3 BHK Homes',
    description:
      'A thoughtfully planned residential address in prime Kothrud. Built with earthquake-resistant RCC construction, landscaped outdoor spaces, and high-quality fittings.',
  },
  {
    id: '4',
    title: 'Pooja Apartment',
    category: 'residential',
    status: 'completed',
    year: '2024',
    duration: 'Delivered',
    image: '/assets/pooja-apartment.png',
    location: 'Erandwane, Pune',
    detail: '2 & 3 BHK Homes · MahaRERA P52100032378',
    description:
      'Exclusive residences in historic Erandwane, blending serene neighborhood tranquility with premium architectural craftsmanship and MahaRERA compliance.',
  },
  {
    id: '5',
    title: 'Charisma',
    category: 'commercial',
    status: 'completed',
    year: '2022',
    duration: 'Delivered',
    image: '/assets/charisma.png',
    location: 'D’Souza Colony, Nashik',
    detail: 'Commercial & Residential · Off College Road',
    description:
      'A signature mixed-use development combining ground-floor commercial storefronts and corporate spaces with tranquil residential apartments above.',
  },
  {
    id: '6',
    title: 'Vijayashree',
    category: 'commercial',
    status: 'completed',
    year: '2018',
    duration: 'Delivered',
    image: '/assets/vijayashree.png',
    location: 'Karve Road, Pune',
    detail: 'Commercial & Residential',
    description:
      'Iconic multi-use landmark on prime Karve Road in Pune, delivering high-visibility retail spaces and durable residential units with enduring value.',
  },
];

const ProjectsSection = () => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(clientProjects);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', phone: '', email: '', date: '' });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/project/sendData`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((p) => {
            const norm = normalizeProject(p);
            return {
              id: norm.id,
              title: norm.title,
              category: norm.category,
              status: norm.status,
              year: norm.year,
              duration: norm.duration,
              image: getImageUrl(norm.image),
              description: norm.description,
              location: norm.location || 'Pune / Mumbai, Maharashtra',
              detail: norm.detail,
            };
          });
          setProjectsList(normalized);
        }
      })
      .catch((err) => {
        console.log('Project fetch note:', err.message);
      });
  }, []);

  const ongoingProjects = projectsList.filter(
    (p) => p.status === 'in-progress' || p.status === 'planning' || String(p.status).toLowerCase().includes('ongoing')
  );
  const completedProjects = projectsList.filter(
    (p) => p.status === 'completed' || String(p.status).toLowerCase().includes('completed')
  );

  const filterOptions = [
    { key: 'all', label: 'All Projects', count: projectsList.length },
    { key: 'ongoing', label: 'Ongoing (Taking Shape)', count: ongoingProjects.length },
    { key: 'completed', label: 'Completed Portfolio', count: completedProjects.length },
    {
      key: 'residential',
      label: 'Residential',
      count: projectsList.filter((p) => p.category.toLowerCase().includes('residential')).length,
    },
    {
      key: 'commercial',
      label: 'Commercial & Mixed',
      count: projectsList.filter((p) => p.category.toLowerCase().includes('commercial')).length,
    },
  ];

  const filteredProjects = projectsList.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ongoing') {
      return p.status === 'in-progress' || p.status === 'planning' || String(p.status).toLowerCase().includes('ongoing');
    }
    if (activeFilter === 'completed') {
      return p.status === 'completed' || String(p.status).toLowerCase().includes('completed');
    }
    if (activeFilter === 'residential') {
      return p.category.toLowerCase().includes('residential');
    }
    if (activeFilter === 'commercial') {
      return p.category.toLowerCase().includes('commercial');
    }
    return true;
  });

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${BACKEND_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...enquiryForm,
          flatTitle: selectedProject?.title || 'General Project Enquiry',
          flatLocation: selectedProject?.location || 'Pune / Mumbai',
          flatPrice: 0,
        }),
      });
    } catch (e) {
      // offline fallback
    }
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setSelectedProject(null);
      setEnquiryForm({ name: '', phone: '', email: '', date: '' });
    }, 2800);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden bg-white">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B38038] mb-3">
              <span className="w-8 h-[1px] bg-[#B38038]"></span>
              <span>Our Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal font-serif text-slate-900 tracking-tight">
              Delivered with commitment.
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md leading-relaxed">
            A selection of completed and ongoing developments reflecting our journey, our experience and the trust placed in us.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-start gap-2.5 mb-12">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-lg shadow-slate-950/20 scale-105'
                    : 'glass-pill text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#DFC17B] text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isOngoing =
              project.status === 'in-progress' ||
              project.status === 'planning' ||
              String(project.status).toLowerCase().includes('ongoing');

            return (
              <article
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group bg-[#F8FAFC]"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Status Pill Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border ${
                          isOngoing
                            ? 'bg-amber-500/85 text-white border-amber-400/50'
                            : 'bg-[#0F172A]/90 text-[#DFC17B] border-[#DFC17B]/40'
                        }`}
                      >
                        {isOngoing ? (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>Ongoing</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            <span>Completed {project.year ? `· ${project.year}` : ''}</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Location Pin Bottom Left */}
                    <div className="absolute bottom-3 left-4 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow-md">
                      <MapPin className="h-3.5 w-3.5 text-[#DFC17B]" />
                      <span>{project.location || 'Pune &bull; Maharashtra'}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-normal text-slate-900 group-hover:text-[#0F172A] transition-colors mb-2">
                      {project.title}
                    </h3>

                    {project.detail && (
                      <p className="text-xs font-semibold text-[#B38038] tracking-wide mb-3">
                        {project.detail}
                      </p>
                    )}

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link / Trigger */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0F172A] hover:text-[#B38038] transition-colors group/btn"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DFC17B] text-slate-950 mb-2">
                  {selectedProject.status}
                </span>
                <h3 className="text-3xl font-serif font-normal text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-[#DFC17B]" />
                  <span>{selectedProject.location}</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#B38038] mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.detail && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-700 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-800">
                    {selectedProject.detail}
                  </span>
                </div>
              )}

              {/* Quick Site Visit / Information Form */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold font-serif text-slate-900 mb-3">
                  Schedule a Site Visit or Request Brochure
                </h4>

                {enquirySuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Your site visit request has been sent to Ashwath Realtors!</span>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0F172A]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0F172A]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0F172A]"
                      />
                      <input
                        type="date"
                        value={enquiryForm.date}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0F172A]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-[#C5A059] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Book Direct Consultation</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
