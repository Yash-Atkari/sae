import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const handlePhoneCall = () => {
    window.open('9370412299', '_self');
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hi! I need assistance with Sahil Mobiles & Atkari Enterprises products and services.');
    window.open(`https://wa.me/9370412299?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      id: 'phone',
      title: 'Call Us',
      description: 'Speak directly with us for immediate assistance',
      icon: 'Phone',
      contact: '9370412299',
      availability: 'Mon-Sun: 9:00 AM - 9:00 PM',
      responseTime: '',
      action: handlePhoneCall,
      buttonText: 'Call Now',
      buttonVariant: 'default'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Chat with us on WhatsApp for product updates',
      icon: 'MessageCircle',
      contact: '',
      availability: 'Mon-Sun: 9:00 AM - 9:00 PM',
      responseTime: 'Within a few minutes',
      action: handleWhatsAppContact,
      buttonText: 'Chat on WhatsApp',
      buttonVariant: 'default'
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
          {method?.contact && (
            <div className="flex items-center text-sm">
              <Icon name="Phone" size={16} className="mr-2 text-muted-foreground" />
              <span className="font-medium text-foreground">{method.contact}</span>
            </div>
          )}

          {method?.availability && (
            <div className="flex items-center text-sm">
              <Icon name="Clock" size={16} className="mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">{method.availability}</span>
            </div>
          )}

          {method?.responseTime && (
            <div className="flex items-center text-sm">
              <Icon name="Zap" size={16} className="mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">Response: {method.responseTime}</span>
            </div>
          )}
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