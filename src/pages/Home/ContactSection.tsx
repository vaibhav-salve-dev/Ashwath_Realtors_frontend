import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, MessageSquare, AlertCircle, ArrowUpRight } from 'lucide-react';
import { BACKEND_URL } from '../../utils/helpers';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Project & Redevelopment Inquiry',
    message: '',
  });

  const [companyInfo, setCompanyInfo] = useState<any>({
    name: 'Ashwath Realtors',
    address: 'Pune · Mumbai · Maharashtra',
    phone: '+91 96570 86779',
    email: 'info@ashwathrealtors.in',
    website: 'https://ashwathrealtors.in',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/company/sendData`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCompanyInfo((prev: any) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.log('Company info for contact:', err.message));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const contactObject = {
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      Subject: formData.subject,
      Message: formData.message,
      Date: new Date().toISOString(),
      Status: 'new',
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact/getData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactObject),
      });

      const data = await res.text();

      if (data.includes('Message sent successfully') || res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'Project & Redevelopment Inquiry',
            message: '',
          });
        }, 4000);
      } else {
        setErrorMessage(data || 'Failed to submit message. Please email us directly.');
      }
    } catch (error: any) {
      setErrorMessage('Offline mode. Please email us directly at info@ashwathrealtors.in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden bg-[#F8FAFC]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Contact Banner Header: Sovereign Obsidian Gradient */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B0F19] via-[#0F172A] to-[#1E293B] p-8 sm:p-12 mb-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#DFC17B] mb-3">
                <span className="w-8 h-[1px] bg-[#DFC17B]"></span>
                <span>Start a conversation</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal font-serif text-white tracking-tight leading-tight mb-3">
                Let’s create something
                <br />
                lasting together.
              </h2>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Have a project, redevelopment opportunity or joint venture in mind? We would be glad to hear from you.
              </p>
            </div>

            <a
              href="mailto:info@ashwathrealtors.in?subject=Project%20Enquiry"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC17B] to-[#C5A059] hover:from-[#DFC17B] hover:to-[#B38038] text-slate-950 font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-xl shadow-black/20 self-start md:self-center flex-shrink-0"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Contact Details & Direct Form */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 bg-white">
              <h3 className="text-2xl font-normal font-serif text-slate-900 pb-4 border-b border-slate-100">
                Direct Contact
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-800 flex-shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Regions of Operation</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Pune &bull; Mumbai &bull; Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-800 flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Official Email</h4>
                  <a
                    href="mailto:info@ashwathrealtors.in"
                    className="text-xs sm:text-sm text-slate-700 hover:text-[#B38038] transition-colors"
                  >
                    info@ashwathrealtors.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-800 flex-shrink-0">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Online Portal</h4>
                  <a
                    href="https://ashwathrealtors.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm text-slate-700 hover:text-[#B38038] transition-colors"
                  >
                    ashwathrealtors.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-100 text-slate-800 flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Direct Call</h4>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-xs sm:text-sm text-slate-700 hover:text-[#B38038] transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm bg-white">
              <h3 className="text-2xl font-normal font-serif text-slate-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-8">
                Fill in your details below and our team will get in touch regarding project partnerships or unit purchases.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>
                    Thank you! Your message has been received by Ashwath Realtors. We will contact you shortly.
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Patil"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0F172A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98220 00000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0F172A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0F172A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Interest Type
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0F172A] transition-colors bg-white"
                    >
                      <option value="Joint Venture Opportunity">Joint Venture Opportunity</option>
                      <option value="Society Redevelopment">Society Redevelopment</option>
                      <option value="Turnkey Project Inquiry">Turnkey Project Inquiry</option>
                      <option value="Residential Unit Booking">Residential Unit Booking</option>
                      <option value="General Query">General Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Message / Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your property location, plot size, society details, or flat requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0F172A] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#0F172A] hover:bg-[#C5A059] text-white hover:text-slate-950 font-bold text-xs uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Message to Ashwath Realtors'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
