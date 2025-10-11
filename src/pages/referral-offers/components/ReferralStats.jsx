import React from 'react';
import Icon from '../../../components/AppIcon';

const ReferralStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Users',
      label: 'Friends Referred',
      value: stats?.totalReferrals,
      color: 'bg-primary'
    },
    {
      icon: 'DollarSign',
      label: 'Total Earned',
      value: `$${stats?.totalEarned}`,
      color: 'bg-success'
    },
    {
      icon: 'Gift',
      label: 'Pending Rewards',
      value: `$${stats?.pendingRewards}`,
      color: 'bg-warning'
    },
    {
      icon: 'Trophy',
      label: 'Referral Level',
      value: stats?.level,
      color: 'bg-accent'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Referral Stats</h3>
          <p className="text-sm text-muted-foreground">Track your referral performance</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${item?.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <Icon name={item?.icon} size={20} color="white" />
            </div>
            <div className="text-xl font-bold text-foreground">{item?.value}</div>
            <div className="text-xs text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress to next level</span>
            <span className="font-medium text-foreground">{stats?.progressToNext}/10</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-smooth"
              style={{ width: `${(stats?.progressToNext / 10) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {10 - stats?.progressToNext} more referrals to reach {stats?.nextLevel} level
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Star" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Next Level Benefits</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Higher referral rewards ($35 per referral)</li>
            <li>• Exclusive product previews</li>
            <li>• Priority customer support</li>
            <li>• Special birthday discounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReferralStats;