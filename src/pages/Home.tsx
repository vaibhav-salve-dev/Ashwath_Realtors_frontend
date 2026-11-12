import { useEffect, useState } from 'react';
import { ArrowRight, Award, ShieldCheck, Clock, CheckCircle2, Building, Sparkles, PhoneCall, ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import AboutSection from './Home/AboutSection';
import ServicesSection from './Home/ServicesSection';
import ProjectsSection from './Home/ProjectsSection';
import FlatsSection from './Home/FlatsSection';
import ContactSection from './Home/ContactSection';
import ConstructionEstimator from '../components/ConstructionEstimator';
import Footer from '../components/Footer';
import FloatingContactWidget from '../components/FloatingContactWidget';
import { BACKEND_URL } from '../utils/helpers';

interface CompanyData {
  name?: string;
  founded?: number;
  description?: string;
  mission?: string;
  vision?: string;
  address?: string;
  phone?: string;
  email?: string;
  totalProjects?: string | number;
  yearsExperience?: string | number;
  teamMembers?: string | number;
  clientSatisfaction?: number;
}

const Home = () => {
  const [company, setCompany] = useState<CompanyData>({
    name: 'Ashwath Realtors',
    founded: 2004,
    totalProjects: '6',
    yearsExperience: '20',
    teamMembers: '100',
    clientSatisfaction: 99,
    phone: '+91 96570 86779',
    email: 'info@ashwathrealtors.in',
  });

  const [counters, setCounters] = useState({
    years: 0,
    sqft: 0,
    customers: 0,
    projects: 0,
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/company/sendData`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCompany((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.log('Company fetch note:', err.message));
  }, []);

  useEffect(() => {
    const targetYears = 20;
    const targetSqft = 1;
    const targetCustomers = 2500;
    const targetProjects = 6;

    const duration = 2200;
    const steps = 60;
    const increment = duration / steps;
    let step = 0;

    let hasStarted = false;
    const animateCounters = () => {
      if (hasStarted) return;
      hasStarted = true;

      const timer = setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        setCounters({
          years: Math.floor(targetYears * ease),
          sqft: Math.floor(targetSqft * ease),
          customers: Math.floor(targetCustomers * ease),
          projects: Math.floor(targetProjects * ease),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters({
            years: targetYears,
            sqft: targetSqft,
            customers: targetCustomers,
            projects: targetProjects,
          });
        }
      }, increment);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('impact-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with High-Definition Showreel Background */}
      <section
        id="home"
        className="relative min-h-[95vh] lg:min-h-screen bg-[#0B0F19] text-white overflow-hidden flex items-center pt-24 pb-20"
      >
        {/* HTML5 Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/anandvilla.png"
          className="absolute inset-0 w-full h-full object-cover opacity-60 filter saturate-[0.85] pointer-events-none scale-105 transition-transform duration-1000"
        >
          <source src="/assets/hero-showreel.mp4" type="video/mp4" />
          <source src="/assets/hero-preview.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Dual Gradient Overlays: Rich Midnight Obsidian */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/95 via-[#0B0F19]/80 to-[#0B0F19]/35 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/60 pointer-events-none"></div>

        {/* Ambient Glassmorphic Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none"></div>

        {/* Vertical Side Location Badge */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 [writing-mode:vertical-rl] text-[#DFC17B] tracking-[0.25em] text-[10px] font-semibold uppercase opacity-90 select-none">
          Pune &bull; Mumbai &bull; Maharashtra
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel-dark border border-[#C5A059]/40 text-[#DFC17B] text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-glow-gold animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="w-6 h-[1px] bg-[#DFC17B]"></span>
                <Sparkles className="h-3.5 w-3.5 text-[#DFC17B]" />
                <span>Real Estate &bull; Development &bull; Redevelopment</span>
              </div>

              {/* Tagline Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal font-serif tracking-tight leading-[1.02] mb-6 text-white">
                SPACES.
                <br />
                STORIES.
                <br />
                <span className="text-[#DFC17B] italic font-serif">LEGACY.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 font-light">
                We create thoughtful spaces shaped by experience, guided by integrity and built to stand the test of time. Discover the Ashwath approach to real estate.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <ScrollLink
                  to="projects"
                  smooth={true}
                  duration={600}
                  offset={-90}
                  className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.16em] text-slate-950 bg-gradient-to-r from-[#C5A059] via-[#DFC17B] to-[#C5A059] hover:from-[#DFC17B] hover:to-[#B38038] shadow-xl shadow-amber-950/20 transition-all duration-300 flex items-center justify-center gap-3 group shimmer-sweep border border-[#F0DBA5]/60"
                >
                  <span>Explore Our Projects</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </ScrollLink>

                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={600}
                  offset={-90}
                  className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-[0.16em] text-white glass-panel-dark hover:bg-white/15 border border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Discover Ashwath</span>
                  <ArrowRight className="h-4 w-4" />
                </ScrollLink>
              </div>

              {/* Focus Highlights */}
              <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#DFC17B] flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Joint Ventures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#DFC17B] flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Redevelopment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#DFC17B] flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">Turnkey Projects</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sovereign Architectural Card */}
            
          </div>
        </div>

        {/* Scroll Cue at bottom */}
        <div className="absolute left-8 sm:left-12 bottom-6 z-20 hidden md:flex items-center gap-3 text-white/70 text-[10px] tracking-[0.2em] uppercase">
          <span className="w-8 h-[1px] bg-[#DFC17B]"></span>
          <span>Scroll to explore</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-[#DFC17B]" />
        </div>
      </section>

      {/* Impact Numbers Section: Deep Midnight Obsidian */}
      <section id="impact-section" className="bg-[#0F172A] text-white py-12 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0 px-4">
              <strong className="block text-4xl sm:text-6xl font-serif text-[#DFC17B] font-normal mb-1">
                {counters.years}+
              </strong>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Years Legacy
              </span>
            </div>

            <div className="pt-4 lg:pt-0 px-4">
              <strong className="block text-4xl sm:text-6xl font-serif text-[#DFC17B] font-normal mb-1">
                {counters.sqft}M+
              </strong>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Sq. Ft. Delivered
              </span>
            </div>

            <div className="pt-4 lg:pt-0 px-4">
              <strong className="block text-4xl sm:text-6xl font-serif text-[#DFC17B] font-normal mb-1">
                {counters.customers}+
              </strong>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Happy Customers
              </span>
            </div>

            <div className="pt-4 lg:pt-0 px-4">
              <strong className="block text-4xl sm:text-6xl font-serif text-[#DFC17B] font-normal mb-1">
                {counters.projects}
              </strong>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Featured Projects
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <FlatsSection />
      <ConstructionEstimator />
      <ContactSection />
      <Footer />
      <FloatingContactWidget phone={company.phone} />
    </div>
  );
};

export default Home;
