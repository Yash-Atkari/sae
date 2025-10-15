import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6">
        <Icon name="MessageCircle" size={32} color="var(--color-primary)" />
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-4">Contact Support</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        We’re always happy to assist with your questions about our products and services.
      </p>
    </div>
  );
};

export default ContactHeader;