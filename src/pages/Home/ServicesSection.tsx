import { Users, RefreshCw, Hammer, CheckCircle2, ArrowRight, ShieldCheck, FileCheck, HardHat, Compass } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const ServicesSection = () => {
  const coreServices = [
    {
      num: '01',
      title: 'Joint venture projects',
      tagline: 'Strategic Landowner Partnerships',
      desc: 'Building strategic partnerships with landowners to unlock the potential of well-planned residential and commercial developments.',
      features: [
        'Mutually beneficial profit & area-sharing models',
        'Transparent title verification & legal due diligence',
        'Maximized floor space index (FSI) & TDR optimization',
        'Reputable branding with established buyer reach',
      ],
      icon: Users,
      gradient: 'from-amber-600/20 via-amber-500/10 to-transparent',
    },
    {
      num: '02',
      title: 'Redevelopment',
      tagline: 'Urban Renewal & Society Modernization',
      desc: 'Reimagining existing properties through thoughtful planning, transparent engagement and a focus on long-term value.',
      features: [
        'MahaRERA compliant society consensus frameworks',
        'Rent escrow & timely relocation allowances for members',
        'High-speed elevators & modern lifestyle amenities',
        'Seismic-resistant RCC structural transformation',
      ],
      icon: RefreshCw,
      gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    },
    {
      num: '03',
      title: 'Turnkey projects',
      tagline: 'Concept to Handover Precision',
      desc: 'Coordinating project execution from planning through delivery with an integrated, quality-focused approach.',
      features: [
        'Single-point architectural and structural accountability',
        'Strict milestone-based BOQ budget adherence',
        'Lab-certified raw materials (Fe550 steel, OPC cement)',
        'Prompt occupancy certificate (OC) acquisition',
      ],
      icon: Hammer,
      gradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation & Feasibility',
      desc: 'Site evaluation, FSI analysis, soil bearing tests, and transparent commercial modeling for owners and societies.',
      icon: Compass,
    },
    {
      step: '02',
      title: '3D Architecture & Sanctions',
      desc: 'Comprehensive architectural layouts, structural blueprint approvals, and municipal MahaRERA sanction clearance.',
      icon: FileCheck,
    },
    {
      step: '03',
      title: 'Precision Construction',
      desc: 'High-grade civil execution, weekly client progress updates, and stringent multi-stage structural inspections.',
      icon: HardHat,
    },
    {
      step: '04',
      title: 'Handover & Enduring Care',
      desc: 'Thorough 150-point QA verification, occupancy certification handover, and ongoing structural maintenance support.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 relative overflow-hidden bg-[#F8FAFC]">
      {/* Background subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B38038] mb-3">
              <span className="w-8 h-[1px] bg-[#B38038]"></span>
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal font-serif text-slate-900 tracking-tight">
              Expertise that moves
              <br />
              possibilities forward.
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md leading-relaxed">
            We bring the right people, process and perspective to every opportunity — from land partnerships to complete project delivery.
          </p>
        </div>

        {/* 3 Core Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {coreServices.map((service) => (
            <div
              key={service.num}
              className="glass-card rounded-3xl p-8 border border-slate-200 hover:border-[#C5A059] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="font-serif text-3xl text-[#B38038] font-normal">
                    {service.num}
                  </span>
                  <div className="p-3 rounded-2xl bg-slate-100 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-[#DFC17B] transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#B38038] mb-1">
                  {service.tagline}
                </div>
                <h3 className="text-2xl font-serif font-normal text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#0F172A] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={600}
                  offset={-90}
                  className="cursor-pointer text-xs font-bold uppercase tracking-[0.15em] text-[#0F172A] hover:text-[#B38038] flex items-center justify-between group/link"
                >
                  <span>Initiate Discussion</span>
                  <ArrowRight className="h-4 w-4 group-link-hover:translate-x-1 transition-transform" />
                </ScrollLink>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Stage Project Delivery Workflow (Royal Obsidian Navy) */}
        <div className="rounded-3xl bg-[#0F172A] text-white p-8 sm:p-12 lg:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DFC17B]">
              Systematic Execution
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white mt-2 mb-3 font-normal">
              How We Deliver Enduring Value
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              From the initial site appraisal to keys handover, every phase is marked by transparent milestone communication and zero compromise on civil quality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="glass-panel-dark rounded-2xl p-6 border border-white/10 hover:border-[#DFC17B]/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif text-[#DFC17B] font-normal">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#DFC17B] group-hover:bg-[#DFC17B]/20 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <h4 className="text-base font-serif text-white mb-2 font-medium">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
