import React from 'react';
import Icon from '../../../components/AppIcon';

const BusinessInfo = () => {
  const businessDetails = {
    address: {
      street: "Navegaon road, Bus stand",
      city: "Mandhal",
      state: "Maharashtra",
      zipCode: "441210",
      country: "India"
    },
    hours: {
      weekdays: "Monday - Sunday: 9:00 AM - 9:00 PM",
      // saturday: "Saturday: 10:00 AM - 4:00 PM EST",
      // sunday: "Sunday: Closed"
    },
    contact: {
      phone: "+91 9370412299",
      email: "atkari.help@gmail.com",
      whatsapp: "+91 9370412299"
    }
  };

  const supportResources = [
    {
      title: "FAQ Section",
      description: "Find answers to commonly asked questions",
      icon: "HelpCircle",
      link: "#"
    },
    {
      title: "User Guide",
      description: "Step-by-step guides for using our platform",
      icon: "Book",
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Watch helpful video tutorials",
      icon: "Play",
      link: "#"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: "MessageSquare",
      link: "#"
    }
  ];

  const trustSignals = [
    {
      metric: "< 5 min",
      label: "Average Response Time",
      icon: "Clock"
    },
    {
      metric: "4.8/5",
      label: "Customer Satisfaction",
      icon: "Star"
    },
    {
      metric: "24/7",
      label: "WhatsApp Support",
      icon: "MessageCircle"
    },
    {
      metric: "99.9%",
      label: "Issue Resolution Rate",
      icon: "CheckCircle"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Trust Signals */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trustSignals?.map((signal, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
              <Icon name={signal?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{signal?.metric}</div>
            <div className="text-sm text-muted-foreground">{signal?.label}</div>
          </div>
        ))}
      </div> */}
      {/* Business Information */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Address & Hours */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Visit Our Store
          </h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Address</h5>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {businessDetails?.address?.street}<br />
                {businessDetails?.address?.city}, {businessDetails?.address?.state} {businessDetails?.address?.zipCode}<br />
                {businessDetails?.address?.country}
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-foreground mb-2">Store Hours</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{businessDetails?.hours?.weekdays}</p>
                <p>{businessDetails?.hours?.saturday}</p>
                <p>{businessDetails?.hours?.sunday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center">
            <Icon name="Phone" size={20} className="mr-2" />
            Contact Information
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Icon name="Phone" size={16} className="mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{businessDetails?.contact?.phone}</p>
                <p className="text-sm text-muted-foreground">Customer Support</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="Mail" size={16} className="mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{businessDetails?.contact?.email}</p>
                <p className="text-sm text-muted-foreground">Email Support</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="MessageCircle" size={16} className="mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{businessDetails?.contact?.whatsapp}</p>
                <p className="text-sm text-muted-foreground">WhatsApp Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Support Resources */}
      {/* <div>
        <h4 className="text-xl font-semibold text-foreground mb-6">Additional Support Resources</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportResources?.map((resource, index) => (
            <a
              key={index}
              href={resource?.link}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-smooth group"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-smooth">
                <Icon name={resource?.icon} size={20} color="var(--color-primary)" />
              </div>
              <h5 className="font-medium text-foreground mb-2">{resource?.title}</h5>
              <p className="text-sm text-muted-foreground">{resource?.description}</p>
            </a>
          ))}
        </div>
      </div> */}
      {/* Map Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h4 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Map" size={20} className="mr-2" />
            Find Us on Map
          </h4>
        </div>
        <div className="h-64 w-full">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Sahil Mobiles & Enterprises Store Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.901503402381!2d79.45935257529906!3d20.95647028067482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b53006849d26d%3A0xff86916d9910d574!2sSahil%20Mobiles%20%26%20Enterprises!5e0!3m2!1sen!2sin!4v1760799300857!5m2!1sen!2sin"
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
