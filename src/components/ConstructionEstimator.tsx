import React, { useState } from 'react';
import { Calculator, Hammer, Home, IndianRupee, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const ConstructionEstimator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'construction' | 'emi'>('construction');

  // Construction Cost State
  const [area, setArea] = useState<number>(1500);
  const [floors, setFloors] = useState<number>(1);
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'luxury'>('premium');

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(4500000);
  const [interestRate, setInterestRate] = useState<number>(8.65);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Construction Rates per sq ft
  const rates = {
    standard: {
      rate: 1650,
      label: 'Standard Classic',
      desc: 'Quality red bricks, standard branded CP fittings, vitrified tiles, emulsion paint.',
      breakdown: { structure: 0.50, finishes: 0.25, fittings: 0.15, services: 0.10 }
    },
    premium: {
      rate: 2150,
      label: 'Premium Elegance',
      desc: 'RCC earthquake-resistant design, granite counters, premium Kohler/Jaquar fittings, designer doors.',
      breakdown: { structure: 0.48, finishes: 0.27, fittings: 0.15, services: 0.10 }
    },
    luxury: {
      rate: 2850,
      label: 'Ultra Luxury & Smart',
      desc: 'Italian marble flooring, smart home automation, premium teak wood, concealed copper piping, false ceiling.',
      breakdown: { structure: 0.44, finishes: 0.30, fittings: 0.16, services: 0.10 }
    }
  };

  const selectedRate = rates[packageType].rate;
  const totalBuiltupArea = area * floors;
  const estimatedCost = totalBuiltupArea * selectedRate;

  // EMI Calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayable = emi * totalMonths;
  const totalInterest = totalPayable - loanAmount;

  return (
    <section id="calculator" className="py-20 relative overflow-hidden bg-slate-900 text-white">
      {/* Decorative ambient glowing orbs with glassmorphism */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="h-4 w-4" />
            <span>Interactive Real Estate Tools</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight mb-4 text-white">
            Instant Cost & <span className="text-amber-400">EMI Estimator</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Plan your dream home with total transparency. Calculate turnkey construction expenditure or estimate your monthly home loan installments.
          </p>

          {/* Mode Tabs */}
          <div className="flex justify-center mt-8">
            <div className="glass-panel-dark p-1.5 rounded-2xl inline-flex gap-2 border border-white/10">
              <button
                onClick={() => setActiveTab('construction')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === 'construction'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Hammer className="h-4 w-4" />
                <span>Construction Cost</span>
              </button>
              <button
                onClick={() => setActiveTab('emi')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === 'emi'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home Loan EMI</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'construction' ? (
          /* Construction Cost Estimator Card */
          <div className="glass-panel-dark rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl backdrop-blur-2xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      Plot / Carpet Area (Per Floor)
                    </label>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {area.toLocaleString()} sq ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="6000"
                    step="50"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>400 sq ft</span>
                    <span>3,000 sq ft</span>
                    <span>6,000 sq ft</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      Number of Floors
                    </label>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {floors === 1 ? 'Ground Floor (G)' : `G + ${floors - 1} Floors`}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFloors(f)}
                        className={`py-2 text-sm font-semibold rounded-xl border transition-all ${
                          floors === f
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {f === 1 ? 'G Only' : `G+${f - 1}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Construction Specification Quality
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {(Object.keys(rates) as Array<keyof typeof rates>).map((key) => {
                      const item = rates[key];
                      const isSelected = packageType === key;
                      return (
                        <div
                          key={key}
                          onClick={() => setPackageType(key)}
                          className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm text-white">{item.label}</span>
                              {isSelected && <Check className="h-4 w-4 text-amber-400" />}
                            </div>
                            <p className="text-[11px] text-slate-300 leading-tight mb-3">
                              {item.desc}
                            </p>
                          </div>
                          <div className="text-amber-400 font-bold text-sm font-mono pt-2 border-t border-white/10">
                            ₹{item.rate} / sq ft
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Estimate Summary Glass Column */}
              <div className="lg:col-span-5 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-xl flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Estimated Project Outlay
                  </span>
                  <div className="mt-2 mb-6">
                    <div className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                      ₹ {(estimatedCost / 100000).toFixed(2)} <span className="text-amber-400 text-2xl font-sans">Lakh</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-mono">
                      Approx. ₹{estimatedCost.toLocaleString('en-IN')} for {totalBuiltupArea.toLocaleString()} sq ft total builtup
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Civil & Structure (Brick, Cement, Steel)</span>
                      <span className="font-mono text-white font-semibold">₹ {Math.round(estimatedCost * rates[packageType].breakdown.structure).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Finishes & Flooring (Tiles/Marble, Paint)</span>
                      <span className="font-mono text-white font-semibold">₹ {Math.round(estimatedCost * rates[packageType].breakdown.finishes).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Electrical & Sanitary Fittings</span>
                      <span className="font-mono text-white font-semibold">₹ {Math.round(estimatedCost * rates[packageType].breakdown.fittings).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Architectural & Approvals Oversight</span>
                      <span className="font-mono text-white font-semibold">₹ {Math.round(estimatedCost * rates[packageType].breakdown.services).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={600}
                    offset={-90}
                    className="cursor-pointer w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group shimmer-sweep"
                  >
                    <span>Request Exact Quotation</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </ScrollLink>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    *Estimates are indicative based on prevailing Pune & Mumbai market rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EMI Calculator Card */
          <div className="glass-panel-dark rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl backdrop-blur-2xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      Loan Amount Required
                    </label>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      ₹ {(loanAmount / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="20000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹ 5 Lakh</span>
                    <span>₹ 1 Cr</span>
                    <span>₹ 2 Cr</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      Annual Interest Rate (%)
                    </label>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {interestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="14.0"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>7.0%</span>
                    <span>10.5%</span>
                    <span>14.0%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      Loan Tenure (Years)
                    </label>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {tenureYears} Years ({tenureYears * 12} Mos)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>5 Yrs</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* EMI Output summary */}
              <div className="lg:col-span-5 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 sm:p-8 rounded-2xl border border-white/20 backdrop-blur-xl flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Calculated Monthly EMI
                  </span>
                  <div className="mt-2 mb-6">
                    <div className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                      ₹ {emi.toLocaleString('en-IN')} <span className="text-amber-400 text-lg font-sans">/ month</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      For a {tenureYears}-year home loan at {interestRate}% p.a.
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Principal Loan Amount:</span>
                      <span className="font-mono text-white font-semibold">₹ {loanAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Total Interest Payable:</span>
                      <span className="font-mono text-amber-400 font-semibold">₹ {Math.round(totalInterest).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Total Amount (P + I):</span>
                      <span className="font-mono text-white font-semibold">₹ {Math.round(totalPayable).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={600}
                    offset={-90}
                    className="cursor-pointer w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group shimmer-sweep"
                  >
                    <span>Check Bank Loan Eligibility</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConstructionEstimator;

