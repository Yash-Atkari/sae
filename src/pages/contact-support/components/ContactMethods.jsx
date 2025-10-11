import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const handlePhoneCall = () => {
    window.open('tel:+1234567890', '_self');
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hi! I need assistance with ElectroMart products and services.');
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      id: 'phone',
      title: 'Call Us',
      description: 'Speak directly with our support team for immediate assistance',
      icon: 'Phone',
      contact: '+1 (234) 567-8900',
      availability: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
      responseTime: 'Immediate',
      action: handlePhoneCall,
      buttonText: 'Call Now',
      buttonVariant: 'default'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Chat with us on WhatsApp for quick responses and order updates',
      icon: 'MessageCircle',
      contact: '+1 (234) 567-8900',
      availability: '24/7 Available',
      responseTime: 'Within 5 minutes',
      action: handleWhatsAppContact,
      buttonText: 'Chat on WhatsApp',
      buttonVariant: 'outline'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {contactMethods?.map((method) => (
        <div key={method?.id} className="bg-card border border-border rounded-xl p-8 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
              <Icon name={method?.icon} size={24} color="var(--color-primary)" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">{method?.title}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">{method?.description}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <Icon name="Phone" size={16} className="mr-2 text-muted-foreground" />
              <span className="font-medium text-foreground">{method?.contact}</span>
            </div>
            <div className="flex items-center text-sm">
              <Icon name="Clock" size={16} className="mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{method?.availability}</span>
            </div>
            <div className="flex items-center text-sm">
              <Icon name="Zap" size={16} className="mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">Response: {method?.responseTime}</span>
            </div>
          </div>
          
          <Button
            variant={method?.buttonVariant}
            onClick={method?.action}
            iconName={method?.icon}
            iconPosition="left"
            fullWidth
          >
            {method?.buttonText}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ContactMethods;