import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReferralCard = ({ offer, onShare }) => {
  const handleShare = (platform) => {
    onShare(offer, platform);
  };

  const handleCopyLink = () => {
    const referralLink = `https://electromart.com/ref/${offer?.code}`;
    navigator.clipboard?.writeText(referralLink);
    // You could add a toast notification here
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${offer?.bgColor}`}>
            <Icon name={offer?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{offer?.title}</h3>
            <p className="text-sm text-muted-foreground">{offer?.subtitle}</p>
          </div>
        </div>
        {offer?.isNew && (
          <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
            New
          </span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-2xl font-bold text-primary">${offer?.reward}</span>
          <span className="text-sm text-muted-foreground">reward</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{offer?.description}</p>
        
        <div className="bg-muted rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Your Referral Code</p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-medium text-foreground">{offer?.code}</span>
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              onClick={handleCopyLink}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Valid until: {offer?.validUntil}</span>
          <span>{offer?.usageCount}/{offer?.maxUsage} used</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-smooth"
            style={{ width: `${(offer?.usageCount / offer?.maxUsage) * 100}%` }}
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            iconPosition="left"
            onClick={() => handleShare('whatsapp')}
            className="flex-1"
          >
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            onClick={() => handleShare('facebook')}
          >
            <Icon name="Facebook" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            onClick={() => handleShare('twitter')}
          >
            <Icon name="Twitter" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;