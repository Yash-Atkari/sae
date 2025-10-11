import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: 'UserPlus',
      title: 'Invite Friends',
      description: 'Share your unique referral code or link with friends and family through social media, email, or messaging apps.',
      details: 'Use the sharing buttons on each offer card or fill out the referral form to send personalized invitations. Your referral code never expires!'
    },
    {
      icon: 'ShoppingCart',
      title: 'Friend Makes Purchase',
      description: 'Your friend uses your referral code during their first purchase and gets an instant discount.',
      details: 'They receive 10% off their first order (minimum $50). The discount is automatically applied when they enter your code at checkout.'
    },
    {
      icon: 'Gift',
      title: 'Both Get Rewards',
      description: 'Once the purchase is confirmed, both you and your friend receive rewards in your accounts.',
      details: 'You earn $25 credit, your friend saves money, and both rewards are added within 24 hours of successful purchase confirmation.'
    },
    {
      icon: 'Repeat',
      title: 'Keep Referring',
      description: 'Continue referring friends to unlock higher reward tiers and exclusive benefits.',
      details: 'Reach different levels (Bronze, Silver, Gold, Platinum) with increasing rewards per referral and special perks like early access to sales.'
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to receive my reward?',
      answer: 'Rewards are typically credited within 24 hours after your friend\'s purchase is confirmed and the return period has passed.'
    },
    {
      question: 'Is there a limit to how many friends I can refer?',
      answer: 'No limit! You can refer as many friends as you want. Higher referral counts unlock better reward tiers and exclusive benefits.'
    },
    {
      question: 'What if my friend returns their purchase?',
      answer: 'If a referred purchase is returned, the associated rewards will be deducted from both accounts. This ensures fairness in our program.'
    },
    {
      question: 'Can I refer someone who already has an account?',
      answer: 'Referral rewards only apply to new customers making their first purchase. Existing customers don\'t qualify for referral discounts.'
    },
    {
      question: 'How do I track my referral status?',
      answer: 'Check your referral dashboard above to see pending referrals, earned rewards, and your current level progress in real-time.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* How It Works Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">How Referrals Work</h2>
          <p className="text-muted-foreground">Simple steps to earn rewards by sharing ElectroMart with friends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {steps?.map((step, index) => (
            <div
              key={index}
              className={`text-center cursor-pointer transition-smooth ${
                activeStep === index ? 'transform scale-105' : ''
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-smooth ${
                activeStep === index ? 'bg-primary' : 'bg-muted'
              }`}>
                <Icon 
                  name={step?.icon} 
                  size={24} 
                  color={activeStep === index ? 'white' : 'var(--color-muted-foreground)'} 
                />
              </div>
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold ${
                  activeStep === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index < steps?.length - 1 && (
                  <div className="hidden lg:block absolute top-4 left-1/2 w-full h-0.5 bg-border transform translate-x-4" />
                )}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step?.title}</h3>
              <p className="text-sm text-muted-foreground">{step?.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={steps?.[activeStep]?.icon} size={20} color="white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">{steps?.[activeStep]?.title}</h4>
              <p className="text-sm text-muted-foreground">{steps?.[activeStep]?.details}</p>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground">Get answers to common referral questions</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <Button
                variant="ghost"
                onClick={() => toggleFaq(index)}
                className="w-full justify-between p-4 h-auto text-left"
                iconName={expandedFaq === index ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                <span className="font-medium text-foreground">{faq?.question}</span>
              </Button>
              
              {expandedFaq === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">{faq?.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="MessageCircle" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Still have questions?</p>
              <p className="text-xs text-muted-foreground">Contact our support team for personalized assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;