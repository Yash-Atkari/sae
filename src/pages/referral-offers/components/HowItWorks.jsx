import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Updated Steps for Sahil Mobiles Referral Program
  const steps = [
    {
      icon: 'UserPlus',
      title: 'Invite Your Friends',
      description:
        'Share your referral code or link with friends and family in your area.',
      details:
        'Tap “Get My Referral Code” and share it through WhatsApp or SMS. Your friends can use this code on their first order at Sahil Mobiles & Enterprises.'
    },
    {
      icon: 'ShoppingCart',
      title: 'Friend Makes First Purchase',
      description:
        'Your friend gets ₹20 wallet credit when they place their first order above ₹200.',
      details:
        'They just need to enter your referral code at checkout to claim their ₹20 reward instantly on their first purchase.'
    },
    {
      icon: 'Gift',
      title: 'You Earn ₹20 Too!',
      description:
        'Once their order is completed, you also get ₹20 added to your wallet.',
      details:
        'You’ll receive ₹20 wallet balance within 24 hours of your friend’s first successful order. You can use this credit on your next purchase.'
    },
    {
      icon: 'Repeat',
      title: 'Keep Referring & Earning',
      description:
        'There’s no limit! Keep sharing and earn more rewards for every new customer you bring.',
      details:
        'Refer as many people as you like — the more friends you refer, the more wallet credit you collect. Grow with Sahil Mobiles & Enterprises!'
    }
  ];

  // Localized & simplified FAQs
  const faqs = [
    {
      question: 'How do I share my referral code?',
      answer:
        'Go to the referral section and tap “Get My Code.” You can share it via WhatsApp, SMS, or any social app with your friends.'
    },
    {
      question: 'When will I receive my ₹20 reward?',
      answer:
        'Your ₹20 wallet credit will be added within 24 hours after your friend’s first order is successfully completed.'
    },
    {
      question: 'Is there a limit to referrals?',
      answer:
        'No limit! You can invite as many friends as you like and earn ₹20 for each new customer who orders.'
    },
    {
      question: 'Can I refer an existing customer?',
      answer:
        'Referral rewards are only valid for new customers making their first purchase.'
    },
    {
      question: 'What happens if my friend cancels the order?',
      answer:
        'If the referred order is cancelled or returned, the reward will not be added or will be deducted if already credited.'
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
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How Our Referral Program Works
          </h2>
          <p className="text-muted-foreground">
            Simple steps to earn wallet rewards at Sahil Mobiles & Enterprises
          </p>
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
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-smooth ${
                  activeStep === index ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <Icon
                  name={step?.icon}
                  size={24}
                  color={activeStep === index ? 'white' : 'var(--color-muted-foreground)'}
                />
              </div>
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold ${
                    activeStep === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
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
              <h4 className="font-semibold text-foreground mb-2">
                {steps?.[activeStep]?.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {steps?.[activeStep]?.details}
              </p>
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
            <h3 className="text-lg font-semibold text-foreground">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-muted-foreground">
              Get answers about our ₹20 referral rewards
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <Button
                variant="ghost"
                onClick={() => toggleFaq(index)}
                className="w-full justify-between p-4 h-auto text-left"
                iconName={expandedFaq === index ? 'ChevronUp' : 'ChevronDown'}
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
              <p className="text-sm font-medium text-foreground">
                Still have questions?
              </p>
              <p className="text-xs text-muted-foreground">
                Contact Sahil Mobiles & Enterprises for more help
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
