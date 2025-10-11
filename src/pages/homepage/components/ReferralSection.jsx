import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReferralSection = ({ trackButtonClick }) => {
  const [copied, setCopied] = useState(false);
  
  const referralCode = 'ELECTRO2024';
  const referralLink = 'https://electromart.com/ref/ELECTRO2024';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const message = encodeURIComponent(`Check out ElectroMart for amazing electronics deals! Use my referral code ${referralCode} and get $50 off your first purchase. ${referralLink}`);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${message}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}`,
      email: `mailto:?subject=Amazing Electronics Deals at ElectroMart&body=${message}`
    };
    
    window.open(urls?.[platform], '_blank');
  };

  const benefits = [
    { icon: 'DollarSign', title: '$50 Bonus', description: 'For each successful referral' },
    { icon: 'Gift', title: 'Exclusive Deals', description: 'Special offers for referrers' },
    { icon: 'Users', title: 'Friend Benefits', description: 'Your friends get $50 off too' },
    { icon: 'Trophy', title: 'VIP Status', description: 'Unlock premium benefits' }
  ];

  const handleReferNow = () => {
    trackButtonClick?.('Refer Now', 'Referral Section');
  };

  const handleLearnMore = () => {
    trackButtonClick?.('Learn More Referral', 'Referral Section');
  };

  return (
    <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 rounded-2xl p-8 lg:p-12 mb-8 border border-border">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-accent/20 rounded-full p-3 mr-3">
            <Icon name="Gift" size={32} color="var(--color-accent)" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Refer & Earn
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share ElectroMart with friends and family. Both you and your referrals get amazing rewards!
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Benefits */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Referral Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits?.map((benefit, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="flex items-center mb-2">
                  <div className="bg-accent/20 rounded-lg p-2 mr-3">
                    <Icon name={benefit?.icon} size={20} color="var(--color-accent)" />
                  </div>
                  <h4 className="font-semibold text-foreground">{benefit?.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{benefit?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Code & Sharing */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Share Your Code</h3>
          
          {/* Referral Code */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Your Referral Code
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-lg px-4 py-3 font-mono text-lg font-bold text-foreground">
                {referralCode}
              </div>
              <Button
                variant={copied ? "success" : "outline"}
                size="lg"
                iconName={copied ? "Check" : "Copy"}
                onClick={handleCopyCode}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Share via:</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => handleShare('whatsapp')}
                className="justify-start"
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                iconName="Facebook"
                iconPosition="left"
                onClick={() => handleShare('facebook')}
                className="justify-start"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                iconName="Twitter"
                iconPosition="left"
                onClick={() => handleShare('twitter')}
                className="justify-start"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                iconName="Mail"
                iconPosition="left"
                onClick={() => handleShare('email')}
                className="justify-start"
              >
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="text-center bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-2">Ready to Start Earning?</h3>
        <p className="text-muted-foreground mb-4">
          View all available referral offers and track your earnings
        </p>
        <Link to="/referral-offers">
          <Button 
            variant="default" 
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={handleReferNow}
          >
            Refer Now
          </Button>
        </Link>
        <Link to="/referral-offers">
          <Button 
            variant="default" 
            size="lg"
            iconName="Info"
            iconPosition="right"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReferralSection;