import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Globe, Phone, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../utils/helpers';

const Footer: React.FC = () => {
  const [company, setCompany] = useState<any>({
    name: 'Ashwath Realtors',
    phone: '+91 96570 86779',
    email: 'info@ashwathrealtors.in',
    website: 'https://ashwathrealtors.in',
    address: 'Pune · Mumbai · Maharashtra',
  });
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/company/sendData`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setCompany((prev: any) => ({ ...prev, ...data }));
      })
      .catch(() => { });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const exploreLinks = [
    { title: 'About us', to: 'about', route: '/about' },
    { title: 'Completed projects', to: 'projects', route: '/projects' },
    { title: 'Ongoing projects', to: 'projects', route: '/projects' },
    { title: 'Our services', to: 'services', route: '/services' },
    { title: 'Available units', to: 'flats', route: '/flats' },
    { title: 'Cost & EMI estimator', to: 'calculator', route: '/#calculator' },
  ];

  return (
    <footer className="relative bg-[#0B0F19] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Column Layout from Client Spec */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="h-14 w-auto max-w-[210px] overflow-hidden rounded-md flex items-center">
              <img
                src="/assets/logo-lockup.jpg"
                alt="Ashwath Realtors"
                className="h-full w-auto object-contain filter brightness-105"
                onError={(e) => {
                  e.currentTarget.src = '/assets/logo.png';
                }}
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Thoughtful real estate development, redevelopment and turnkey solutions. Spaces shaped with care, built on trust and created for the future.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFC17B] font-bold block mb-2">
                Brand Core
              </span>
              <p className="text-sm font-serif italic text-white/90">
                Spaces. Stories. Legacy.
              </p>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#DFC17B] mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              {exploreLinks.map((item, i) => (
                <li key={i}>
                  {isHomePage ? (
                    <ScrollLink
                      to={item.to}
                      smooth={true}
                      duration={600}
                      offset={-90}
                      className="cursor-pointer hover:text-[#DFC17B] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#DFC17B]">&bull;</span>
                      <span>{item.title}</span>
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={item.route}
                      className="hover:text-[#DFC17B] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#DFC17B]">&bull;</span>
                      <span>{item.title}</span>
                    </RouterLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect (Client Info) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#DFC17B] mb-5">
              Connect
            </h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#DFC17B] flex-shrink-0" />
                <a
                  href={`mailto:${company.email || 'info@ashwathrealtors.in'}`}
                  className="hover:text-[#DFC17B] transition-colors"
                >
                  {company.email || 'info@ashwathrealtors.in'}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-[#DFC17B] flex-shrink-0" />
                <a
                  href={company.website || 'https://ashwathrealtors.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#DFC17B] transition-colors"
                >
                  ashwathrealtors.in
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#DFC17B] flex-shrink-0 mt-0.5" />
                <span>Pune &bull; Mumbai &bull; Maharashtra</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#DFC17B] flex-shrink-0" />
                <a href={`tel:${company.phone || '+91 96570 86779'}`} className="hover:text-[#DFC17B] transition-colors">
                  {company.phone || '+91 96570 86779'}
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-3">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                Subscribe to project updates
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Subscribed to Ashwath bulletins</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email"
                    className="w-full px-3 py-2 text-xs bg-white/10 text-white placeholder-slate-400 rounded-l-lg border border-white/20 focus:outline-none focus:border-[#DFC17B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#DFC17B] hover:from-[#DFC17B] hover:to-[#B38038] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-r-lg transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar (Client Specification) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p className="tracking-wide">
            &copy; {new Date().getFullYear()} Ashwath Realtors. All rights reserved.
          </p>

          <p className="font-serif italic text-[#DFC17B] tracking-widest text-xs">
            Spaces. Stories. Legacy.
          </p>

          <div className="flex items-center space-x-4">
            <RouterLink to="/admin/login" className="hover:text-[#DFC17B] transition-colors">
              Admin Login
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
