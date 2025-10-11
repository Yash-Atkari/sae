import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EMIResultCard = ({ result, onShare }) => {
  if (!result) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const resultItems = [
    {
      label: 'Monthly EMI',
      value: formatCurrency(result?.emi),
      icon: 'CreditCard',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Total Interest',
      value: formatCurrency(result?.totalInterest),
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Total Amount',
      value: formatCurrency(result?.totalAmount),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const handleShare = () => {
    const shareText = `EMI Calculation Result:\nLoan Amount: ${formatCurrency(result?.principal)}\nMonthly EMI: ${formatCurrency(result?.emi)}\nTenure: ${result?.tenure} months\nInterest Rate: ${result?.rate}%\n\nCalculated on ElectroMart EMI Calculator`;
    
    if (navigator.share) {
      navigator.share({
        title: 'EMI Calculation Result',
        text: shareText
      });
    } else {
      navigator.clipboard?.writeText(shareText)?.then(() => {
        alert('EMI details copied to clipboard!');
      });
    }
    
    if (onShare) onShare(result);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Calculation Result</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          onClick={handleShare}
        >
          Share
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {resultItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor} mb-3`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{item?.label}</p>
            <p className={`text-xl font-bold ${item?.color}`}>{item?.value}</p>
          </div>
        ))}
      </div>
      {/* Loan Summary */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Loan Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Principal Amount:</span>
            <span className="font-medium text-foreground ml-2">{formatCurrency(result?.principal)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Interest Rate:</span>
            <span className="font-medium text-foreground ml-2">{result?.rate}% p.a.</span>
          </div>
          <div>
            <span className="text-muted-foreground">Loan Tenure:</span>
            <span className="font-medium text-foreground ml-2">{result?.tenure} months</span>
          </div>
          <div>
            <span className="text-muted-foreground">Interest Percentage:</span>
            <span className="font-medium text-foreground ml-2">{((result?.totalInterest / result?.principal) * 100)?.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMIResultCard;