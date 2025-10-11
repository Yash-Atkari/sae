import React from 'react';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';


const ShopIntroduction = ({ trackButtonClick }) => {
  // const handleShopNow = () => {
  //   trackButtonClick?.('Shop Now', 'Shop Introduction');
  //   // ... keep existing navigation logic ...
  // };

  const trustSignals = [
  { icon: 'TrendingUp', label: 'Smart Pricing', description: 'Prices adapt based on user preferences' },
  { icon: 'CreditCard', label: 'Flexible Payment Options', description: 'Pay your way, easily and securely' },
  { icon: 'PhoneCall', label: 'Delivery Partner Support', description: 'Contact our trusted delivery providers for assistance' },
  { icon: 'MessageCircle', label: '24/7 Chatbot Support', description: 'Instant help anytime' }
];


  return (
    <div className="bg-card rounded-2xl p-8 lg:p-12 mb-8 border border-border">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Welcome to Sahil Mobiles & Atkari Enterprises
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your trusted destination for premium electronics, appliances, and the latest mobile phones and accessories. We bring you the latest technology 
          with unbeatable prices, flexible payment options, and exceptional customer service.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {trustSignals?.map((signal, index) => (
          <div key={index} className="text-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-smooth">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Icon name={signal?.icon} size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{signal?.label}</h3>
            <p className="text-sm text-muted-foreground">{signal?.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <Icon name="Star" size={20} color="var(--color-accent)" className="mr-2" />
          <span className="text-accent font-semibold">4.8/5 Customer Rating</span>
          <Icon name="Star" size={20} color="var(--color-accent)" className="ml-2" />
        </div>
        <p className="text-muted-foreground">
          Join over 50,000+ satisfied customers who trust Sahil Mobiles & Atkari Enterprises for their electronics needs
        </p>
      </div>
      <Link
        to="/auth/signup"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default ShopIntroduction;