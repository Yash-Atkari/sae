import React from 'react';
import Header from '../../components/ui/Header';
import ContactHeader from './components/ContactHeader';
import ContactMethods from './components/ContactMethods';
import ContactForm from './components/ContactForm';
import BusinessInfo from './components/BusinessInfo';

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <ContactHeader />
          <ContactMethods />
          <ContactForm />
          
          <div className="mt-16">
            <BusinessInfo />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactSupport;