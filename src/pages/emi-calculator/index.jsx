import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EMICalculatorForm from './components/EMICalculatorForm';
import EMIResultCard from './components/EMIResultCard';
import EMIBreakdownTable from './components/EMIBreakdownTable';
import ProductEMICard from './components/ProductEMICard';

const EMICalculator = () => {
  const [calculationResult, setCalculationResult] = useState(null);
  const [savedCalculations, setSavedCalculations] = useState([]);

  useEffect(() => {
    // Load saved calculations from localStorage
    const saved = localStorage.getItem('emi_calculations');
    if (saved) {
      setSavedCalculations(JSON.parse(saved));
    }
  }, []);

  const handleCalculate = (result) => {
    setCalculationResult(result);
    
    if (result) {
      // Save calculation to localStorage
      const newCalculation = {
        id: Date.now(),
        timestamp: new Date()?.toISOString(),
        ...result
      };
      
      const updatedCalculations = [newCalculation, ...savedCalculations?.slice(0, 4)];
      setSavedCalculations(updatedCalculations);
      localStorage.setItem('emi_calculations', JSON.stringify(updatedCalculations));
    }
  };

  const handleCalculateForProduct = (productPrice) => {
    // Auto-fill calculator with product price
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (result) => {
    // Track sharing analytics or perform additional actions
    console.log('EMI result shared:', result);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <>
      <Helmet>
        <title>EMI Calculator - ElectroMart | Calculate Loan EMI for Electronics</title>
        <meta name="description" content="Calculate EMI for electronics and appliances with our interactive EMI calculator. Get instant results with detailed payment schedules and share your calculations." />
        <meta name="keywords" content="EMI calculator, loan calculator, electronics EMI, appliance financing, monthly installment calculator" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="Calculator" size={32} className="text-primary" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  EMI Calculator
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Plan your electronics and appliances purchase with our interactive EMI calculator. 
                  Get instant results and detailed payment schedules.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">0.1%</div>
                  <div className="text-sm text-muted-foreground">Processing Fee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">6-60</div>
                  <div className="text-sm text-muted-foreground">Months Tenure</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-1">8.5%</div>
                  <div className="text-sm text-muted-foreground">Starting Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Calculator Section */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Form */}
                <div>
                  <EMICalculatorForm 
                    onCalculate={handleCalculate}
                    calculationResult={calculationResult}
                  />
                </div>

                {/* Result Card */}
                <div>
                  {calculationResult ? (
                    <EMIResultCard 
                      result={calculationResult}
                      onShare={handleShare}
                    />
                  ) : (
                    <div className="bg-card rounded-lg border border-border p-6 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">Ready to Calculate</h3>
                        <p className="text-muted-foreground">
                          Enter your loan details to see EMI calculation results here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Product EMI Section */}
          <section className="py-12 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <ProductEMICard onCalculateForProduct={handleCalculateForProduct} />
            </div>
          </section>

          {/* Breakdown Table */}
          {calculationResult && (
            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <EMIBreakdownTable result={calculationResult} />
              </div>
            </section>
          )}

          {/* Saved Calculations */}
          {savedCalculations?.length > 0 && (
            <section className="py-12 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Calculations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedCalculations?.slice(0, 3)?.map((calc) => (
                      <div key={calc?.id} className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            {new Date(calc.timestamp)?.toLocaleDateString()}
                          </span>
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-medium text-foreground">{formatCurrency(calc?.principal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">EMI:</span>
                            <span className="font-medium text-primary">{formatCurrency(calc?.emi)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tenure:</span>
                            <span className="font-medium text-foreground">{calc?.tenure} months</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
            <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Purchase?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Explore our product catalog and find the perfect electronics and appliances for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/product-catalog">
                  <Button
                    variant="secondary"
                    size="lg"
                    iconName="ShoppingBag"
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    Browse Products
                  </Button>
                </Link>
                <Link to="/contact-support">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Get Support
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-lg font-bold text-foreground">Sahil Mobiles & Atkari Enterprises</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Sahil Mobiles & Atkari Enterprises. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default EMICalculator;