import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ReferralCard from './components/ReferralCard';
import ReferralForm from './components/ReferralForm';
import ReferralStats from './components/ReferralStats';
import HowItWorks from './components/HowItWorks';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ReferralOffers = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock referral offers data
  const referralOffers = [
    {
      id: 1,
      title: "Mobile Referral Bonus",
      subtitle: "Smartphones & Accessories",
      description: "Refer friends to buy any mobile phone or accessory and earn rewards for both of you.",
      reward: 25,
      code: "MOBILE25REF",
      icon: "Smartphone",
      bgColor: "bg-primary",
      validUntil: "Dec 31, 2024",
      usageCount: 3,
      maxUsage: 10,
      isNew: true
    },
    {
      id: 2,
      title: "Appliance Mega Referral",
      subtitle: "Home & Kitchen Appliances",
      description: "Get higher rewards when your friends purchase major appliances like refrigerators, washing machines, or ACs.",
      reward: 50,
      code: "APPLIANCE50",
      icon: "Refrigerator",
      bgColor: "bg-success",
      validUntil: "Jan 15, 2025",
      usageCount: 1,
      maxUsage: 5,
      isNew: false
    },
    {
      id: 3,
      title: "Electronics Bundle Deal",
      subtitle: "Multiple Category Purchase",
      description: "Extra bonus when your referral includes purchases from multiple categories in a single order.",
      reward: 35,
      code: "BUNDLE35REF",
      icon: "Package",
      bgColor: "bg-warning",
      validUntil: "Nov 30, 2024",
      usageCount: 0,
      maxUsage: 8,
      isNew: true
    },
    {
      id: 4,
      title: "First-Time Buyer Special",
      subtitle: "New Customer Exclusive",
      description: "Special referral bonus for bringing in completely new customers to ElectroMart.",
      reward: 30,
      code: "NEWBIE30REF",
      icon: "UserPlus",
      bgColor: "bg-accent",
      validUntil: "Dec 25, 2024",
      usageCount: 5,
      maxUsage: 15,
      isNew: false
    }
  ];

  // Mock user referral stats
  const userStats = {
    totalReferrals: 12,
    totalEarned: 340,
    pendingRewards: 75,
    level: "Silver",
    nextLevel: "Gold",
    progressToNext: 7
  };

  const handleShare = (offer, platform) => {
    const referralLink = `https://electromart.com/ref/${offer?.code}`;
    const message = `Check out ElectroMart! Use my referral code ${offer?.code} and get 10% off your first purchase. I'll earn $${offer?.reward} when you buy something. Win-win! ${referralLink}`;

    switch (platform) {
      case 'whatsapp':
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        break;
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(message)}`;
        window.open(facebookUrl, '_blank');
        break;
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        window.open(twitterUrl, '_blank');
        break;
      default:
        break;
    }
  };

  const handleReferralSubmit = (formData) => {
    console.log('Referral submitted:', formData);
    // In a real app, this would send data to your backend
  };

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent('Hi! I need help with the referral program at ElectroMart.');
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Referral Offers - ElectroMart PWA</title>
        <meta name="description" content="Earn rewards by referring friends to ElectroMart. Get cash bonuses for every successful referral and unlock exclusive benefits." />
        <meta name="keywords" content="referral program, earn rewards, cash bonus, electronics referral, appliance referral" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Icon name="Gift" size={32} color="white" />
                  <h1 className="text-3xl lg:text-4xl font-bold">Referral Rewards Program</h1>
                </div>
                <p className="text-lg lg:text-xl opacity-90 mb-8">
                  Share ElectroMart with friends and earn cash rewards for every successful referral. 
                  The more you share, the more you earn!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => document.getElementById('referral-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Refer a Friend
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="BarChart3"
                    iconPosition="left"
                    onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    View My Stats
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            {/* Referral Stats Section */}
            <section id="stats-section" className="mb-12">
              <ReferralStats stats={userStats} />
            </section>

            {/* Current Offers Section */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Current Referral Offers
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose from our active referral campaigns and start earning rewards today. 
                  Each offer has different reward amounts and terms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {referralOffers?.map((offer) => (
                  <ReferralCard
                    key={offer?.id}
                    offer={offer}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </section>

            {/* Referral Form Section */}
            <section id="referral-form" className="mb-12">
              <ReferralForm onSubmit={handleReferralSubmit} />
            </section>

            {/* How It Works & FAQ Section */}
            <section className="mb-12">
              <HowItWorks />
            </section>

            {/* Support Section */}
            <section className="bg-card rounded-xl border border-border p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} color="white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Need Help with Referrals?</h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you maximize your referral earnings and answer any questions 
                  about the program.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="default"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={handleWhatsAppSupport}
                  >
                    WhatsApp Support
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => window.location.href = 'mailto:support@electromart.com?subject=Referral Program Help'}
                  >
                    Email Support
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Sahil Mobiles & Atkari Enterprises. All rights reserved. | 
              <span className="ml-1">Terms apply to all referral offers.</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ReferralOffers;