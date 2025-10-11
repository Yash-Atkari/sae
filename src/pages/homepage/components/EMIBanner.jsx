import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EMIBanner = ({ trackButtonClick }) => {
  const handleCalculateEMI = () => {
    trackButtonClick?.('Calculate EMI', 'EMI Banner');
  };

  const handleGetStarted = () => {
    trackButtonClick?.('Get Started', 'EMI Banner');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 lg:p-12 mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-6 lg:mb-0 lg:flex-1">
          <div className="flex items-center justify-center lg:justify-start mb-4">
            <Icon name="CreditCard" size={32} color="white" className="mr-3" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Easy EMI Options
            </h1>
          </div>
          
          <p className="text-lg lg:text-xl text-blue-100 mb-2">
            Shop Now, Pay Later with 0% Interest*
          </p>
          <p className="text-blue-200 mb-6">
            Get your favorite electronics with flexible payment plans starting from just $50/month
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/emi-calculator">
              <Button 
                variant="secondary" 
                size="lg"
                iconName="Calculator"
                iconPosition="left"
                className="w-full sm:w-auto"
                onClick={handleCalculateEMI}
              >
                Calculate EMI
              </Button>
            </Link>
            
            <div className="flex items-center text-blue-100 text-sm">
              <Icon name="Shield" size={16} className="mr-2" />
              <span>Secure & Trusted</span>
            </div>
          </div>
        </div>
        
        <div className="lg:flex-1 lg:max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 text-center">Popular EMI Plans</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-white">
                <span className="text-sm">6 Months</span>
                <span className="font-semibold">0% Interest</span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span className="text-sm">12 Months</span>
                <span className="font-semibold">5.9% Interest</span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span className="text-sm">24 Months</span>
                <span className="font-semibold">8.9% Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMIBanner;