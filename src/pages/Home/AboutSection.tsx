import { useEffect, useState } from 'react';
import { Award, Compass, Eye, Target, ArrowRight, CheckCircle2, Sparkles, Building2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { BACKEND_URL } from '../../utils/helpers';

const AboutSection = () => {
  const [company, setCompany] = useState({
    tagline: 'SPACES. STORIES. LEGACY.',
    vision:
      'To become a trusted leader in construction and infrastructure by delivering high-quality, innovative and sustainable building solutions that shape better living with quality, trust and excellence.',
    mission:
      'To deliver reliable and high-quality construction services by maintaining integrity, transparency and a strong commitment to customer satisfaction.',
  });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/company/sendData`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCompany((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.log('About company load:', err.message));
  }, []);

  const ashwathDifference = [
    {
      num: '01',
      title: 'Thoughtful planning',
      desc: 'Every site and opportunity is approached with careful consideration for its context and potential.',
      icon: Compass,
      accent: 'from-amber-500/20 to-amber-600/10 text-amber-800',
    },
    {
      num: '02',
      title: 'Transparent partnerships',
      desc: 'We value open communication, clear expectations and relationships built on mutual trust.',
      icon: HeartHandshake,
      accent: 'from-blue-500/20 to-indigo-600/10 text-blue-800',
    },
    {
      num: '03',
      title: 'Quality-led execution',
      desc: 'Attention to detail and a commitment to workmanship shape every stage of delivery.',
      icon: ShieldCheck,
      accent: 'from-emerald-500/20 to-teal-600/10 text-emerald-800',
    },
    {
      num: '04',
      title: 'Enduring value',
      desc: 'We aspire to create places that remain relevant, useful and meaningful over time.',
      icon: Award,
      accent: 'from-[#C5A059]/25 to-[#B38038]/10 text-[#947128]',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-[#F8FAFC]">
      {/* Decorative ambient glass glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Manifesto Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative group">
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100">
              <img
                src="/assets/anandvilla.png"
                alt="Anandvilla redevelopment, Andheri East"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-[#0B0F19]/25 to-transparent"></div>

              {/* Tagline Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#DFC17B] block mb-1">
                    ASHWATH REALTORS
                  </span>
                  <span className="text-sm font-serif font-medium text-white/95">
                    Anandvilla Redevelopment &bull; Andheri East
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/15 backdrop-blur-md border border-white/30 text-white">
                  MahaRERA PR1180002501890
                </span>
              </div>
            </div>

            {/* Accent Floating Glass Card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 z-20 glass-card rounded-2xl p-4 shadow-xl border border-white/90 items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/20 text-[#947128]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 font-serif">20+ Years Legacy</div>
                <div className="text-[11px] text-slate-500 font-medium">Pune &bull; Mumbai &bull; Nashik</div>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B38038] mb-4">
              <span className="w-8 h-[1px] bg-[#B38038]"></span>
              <span>We Are Ashwath Realtors</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-slate-900 tracking-tight leading-[1.12] mb-6">
              More than spaces.
              <br />
              <span className="italic text-[#B38038] font-serif">A sense of belonging.</span>
            </h2>

            <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                We believe a meaningful development is measured not only in square feet, but in the lives it touches and the value it creates over time. Rooted in experience and driven by thoughtful planning, Ashwath Realtors brings together people, places and possibilities through considered real estate development.
              </p>
              <p>
                From residential and commercial developments to joint ventures and redevelopment, our focus remains the same: clear commitments, careful execution and spaces that feel right for generations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <ScrollLink
                to="services"
                smooth={true}
                duration={600}
                offset={-90}
                className="cursor-pointer inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#C5A059] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md group"
              >
                <span>Know Our Approach</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </ScrollLink>

              <ScrollLink
                to="contact"
                smooth={true}
                duration={600}
                offset={-90}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs uppercase tracking-[0.16em] font-semibold text-slate-800 border border-slate-300 hover:border-slate-800 bg-white/80 transition-colors"
              >
                <span>Partner With Us</span>
              </ScrollLink>
            </div>
          </div>
        </div>

        {/* The Ashwath Difference: 4 Pillars */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B38038] mb-3">
                <span className="w-8 h-[1px] bg-[#B38038]"></span>
                <span>The Ashwath Difference</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-slate-900 tracking-tight">
                Built on principles.
                <br />
                Defined by purpose.
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md leading-relaxed">
              Every decision is an opportunity to build trust. These are the principles that guide the way we plan, partner and deliver.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ashwathDifference.map((item) => (
              <div
                key={item.num}
                className="glass-card rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl text-[#B38038] font-normal">
                      {item.num}
                    </span>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.accent} transition-transform group-hover:scale-110`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-normal font-serif text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intent: Vision & Mission Section (Royal Obsidian Midnight) */}
        <div className="rounded-3xl bg-[#0F172A] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#DFC17B] mb-3">
                <span className="w-8 h-[1px] bg-[#DFC17B]"></span>
                <span>Our Intent</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal font-serif text-white tracking-tight leading-tight mb-4">
                Creating a better built environment.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our vision and mission keep us focused on the long view — creating quality spaces while building relationships that last.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="border-t border-[#DFC17B]/40 pt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFC17B] mb-2 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-[#DFC17B]" />
                  <span>Our Vision</span>
                </div>
                <h3 className="text-2xl font-serif text-[#DFC17B] font-normal mb-3">
                  Progress with purpose.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {company.vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="border-t border-[#DFC17B]/40 pt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFC17B] mb-2 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-[#DFC17B]" />
                  <span>Our Mission</span>
                </div>
                <h3 className="text-2xl font-serif text-[#DFC17B] font-normal mb-3">
                  Excellence in every detail.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {company.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
