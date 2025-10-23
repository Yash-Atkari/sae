import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSection = ({ trackButtonClick }) => {
  const handleContactSupport = () => {
    trackButtonClick?.('Contact Support', 'Contact Section');
  };

  const handleWhatsAppClick = () => {
    trackButtonClick?.('WhatsApp Contact', 'Contact Section');
  };

  const handleCall = () => {
    window.open('tel:+1234567890', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I need assistance with Sahil Mobiles & Enterprises products and services.');
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Call Us',
      description: 'Speak directly with our experts',
      detail: '+1 (234) 567-8900',
      action: handleCall,
      variant: 'outline',
      available: '24/7 Available'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      description: 'Quick support via WhatsApp',
      detail: 'Chat with us instantly',
      action: handleWhatsApp,
      variant: 'default',
      available: 'Usually replies in minutes'
    }
  ];

  const supportFeatures = [
    { icon: 'Clock', label: '24/7 Support', description: 'Round-the-clock assistance' },
    { icon: 'Users', label: 'Expert Team', description: 'Knowledgeable professionals' },
    { icon: 'Zap', label: 'Quick Response', description: 'Fast resolution times' },
    { icon: 'Shield', label: 'Secure Help', description: 'Safe and private support' }
  ];

  return (
    <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/20 rounded-full p-3 mr-3">
            <Icon name="Headphones" size={32} color="var(--color-primary)" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Need Help?
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our customer support team is here to assist you with any questions about products, orders, or EMI options.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Contact Methods */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Get in Touch</h3>
          <div className="space-y-4">
            {contactMethods?.map((method, index) => (
              <div key={index} className="bg-muted/50 rounded-xl p-6 border border-border/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary/20 rounded-lg p-3 mr-4">
                      <Icon name={method?.icon} size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{method?.title}</h4>
                      <p className="text-muted-foreground">{method?.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold text-foreground">{method?.detail}</p>
                  <p className="text-sm text-accent">{method?.available}</p>
                </div>
                
                <Button
                  variant={method?.variant}
                  size="lg"
                  iconName={method?.icon}
                  iconPosition="left"
                  onClick={method?.action}
                  fullWidth
                >
                  {method?.title}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Features */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Why Choose Our Support?</h3>
          <div className="space-y-4 mb-6">
            {supportFeatures?.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-muted/30 rounded-lg">
                <div className="bg-accent/20 rounded-lg p-2 mr-4">
                  <Icon name={feature?.icon} size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature?.label}</h4>
                  <p className="text-sm text-muted-foreground">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Support Options */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-border/50">
            <h4 className="font-bold text-foreground mb-3">More Support Options</h4>
            <div className="space-y-3">
              <Link to="/contact-support" className="flex items-center justify-between p-3 bg-card/50 rounded-lg hover:bg-card/70 transition-colors">
                <div className="flex items-center">
                  <Icon name="Mail" size={18} className="mr-3" />
                  <span className="font-medium text-foreground">Email Support</span>
                </div>
                <Icon name="ArrowRight" size={16} />
              </Link>
              
              <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                <div className="flex items-center">
                  <Icon name="MapPin" size={18} className="mr-3" />
                  <div>
                    <span className="font-medium text-foreground block">Visit Store</span>
                    <span className="text-sm text-muted-foreground">123 Electronics Ave, Tech City</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Link */}
      <div className="text-center bg-muted/30 rounded-xl p-6">
        <h3 className="font-bold text-foreground mb-2">Looking for Quick Answers?</h3>
        <p className="text-muted-foreground mb-4">
          Check out our comprehensive support center for instant solutions
        </p>
        <Link to="/contact-support">
          <Button 
            variant="outline" 
            size="lg"
            iconName="HelpCircle"
            iconPosition="left"
          >
            Visit Support Center
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;