import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, Phone, ArrowUpRight, Mail } from 'lucide-react';

interface NavbarProps {
  companyName?: string;
  phone?: string;
}

const Navbar: React.FC<NavbarProps> = ({ companyName = 'ASHWATH REALTORS', phone = '+91 96570 86779' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About us', path: 'about', route: '/about' },
    { name: 'Completed', path: 'projects', route: '/projects' },
    { name: 'Ongoing', path: 'projects', route: '/projects' },
    { name: 'What we do', path: 'services', route: '/services' },
    { name: 'Available Units', path: 'flats', route: '/flats' },
    { name: 'Cost Estimator', path: 'calculator', route: '/#calculator' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate(item.route);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#0B0F19]/95 backdrop-blur-xl py-2.5 border-b border-slate-800/80 shadow-2xl shadow-black/40'
          : 'bg-[#0B0F19]/80 backdrop-blur-md py-4 border-b border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand with Official Client Lockup */}
          <RouterLink to="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-auto max-w-[190px] overflow-hidden rounded-md flex items-center">
              <img
                src="/assets/logo-lockup.jpg"
                alt="Ashwath Realtors"
                className="h-full w-auto object-contain filter brightness-105"
                onError={(e) => {
                  e.currentTarget.src = '/assets/logo.png';
                }}
              />
            </div>
          </RouterLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-white text-[11px] font-semibold uppercase tracking-[0.18em]">
            {navItems.map((item) =>
              isHomePage ? (
                <ScrollLink
                  key={item.name}
                  to={item.path}
                  smooth={true}
                  duration={600}
                  spy={true}
                  offset={-90}
                  activeClass="text-[#DFC17B] font-bold"
                  className="cursor-pointer px-3 py-2 text-white/90 hover:text-[#DFC17B] transition-colors rounded-lg"
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <RouterLink
                  key={item.name}
                  to={item.route}
                  className={`px-3 py-2 transition-colors rounded-lg ${location.pathname === item.route
                      ? 'text-[#DFC17B] font-bold'
                      : 'text-white/90 hover:text-[#DFC17B]'
                    }`}
                >
                  {item.name}
                </RouterLink>
              )
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="mailto:info@ashwathrealtors.in?subject=Project%20Enquiry"
              className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-white/80 hover:text-[#DFC17B] transition-colors px-3 py-2 rounded-lg"
            >
              <Mail className="h-3.5 w-3.5 text-[#DFC17B]" />
              <span>info@ashwathrealtors.in</span>
            </a>

            {isHomePage ? (
              <ScrollLink
                to="contact"
                smooth={true}
                duration={600}
                offset={-90}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#DFC17B]/80 hover:border-[#DFC17B] text-[#DFC17B] hover:text-slate-950 hover:bg-[#DFC17B] text-[10px] uppercase font-bold tracking-[0.16em] transition-all"
              >
                <span>Enquire</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </ScrollLink>
            ) : (
              <RouterLink
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#DFC17B]/80 hover:border-[#DFC17B] text-[#DFC17B] hover:text-slate-950 hover:bg-[#DFC17B] text-[10px] uppercase font-bold tracking-[0.16em] transition-all"
              >
                <span>Enquire</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </RouterLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/90 hover:text-white border border-white/20 bg-white/5"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) =>
            isHomePage ? (
              <ScrollLink
                key={item.name}
                to={item.path}
                smooth={true}
                duration={600}
                offset={-90}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs uppercase tracking-[0.18em] font-semibold text-white/90 hover:text-[#DFC17B]"
              >
                {item.name}
              </ScrollLink>
            ) : (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="w-full text-left block px-3 py-2 text-xs uppercase tracking-[0.18em] font-semibold text-white/90 hover:text-[#DFC17B]"
              >
                {item.name}
              </button>
            )
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="mailto:info@ashwathrealtors.in"
              className="text-xs text-[#DFC17B] flex items-center gap-2 px-3"
            >
              <Mail className="h-4 w-4" />
              <span>info@ashwathrealtors.in</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="text-xs text-white/80 flex items-center gap-2 px-3"
            >
              <Phone className="h-4 w-4 text-[#DFC17B]" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
