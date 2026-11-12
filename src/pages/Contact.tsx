import React from 'react';
import ContactSection from './Home/ContactSection';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;

