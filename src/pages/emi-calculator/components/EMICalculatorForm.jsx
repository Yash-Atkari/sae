import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const EMICalculatorForm = ({ onCalculate, calculationResult }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [errors, setErrors] = useState({});

  const tenureOptions = [
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '18', label: '18 Months' },
    { value: '24', label: '24 Months' },
    { value: '36', label: '36 Months' },
    { value: '48', label: '48 Months' },
    { value: '60', label: '60 Months' }
  ];

  const presetAmounts = [
    { value: 10000, label: '$10,000' },
    { value: 25000, label: '$25,000' },
    { value: 50000, label: '$50,000' },
    { value: 75000, label: '$75,000' },
    { value: 100000, label: '$100,000' }
  ];

  const validateInputs = () => {
    const newErrors = {};

    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount';
    } else if (parseFloat(loanAmount) < 1000) {
      newErrors.loanAmount = 'Minimum loan amount is $1,000';
    } else if (parseFloat(loanAmount) > 1000000) {
      newErrors.loanAmount = 'Maximum loan amount is $1,000,000';
    }

    if (!tenure) {
      newErrors.tenure = 'Please select loan tenure';
    }

    if (!interestRate || parseFloat(interestRate) <= 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    } else if (parseFloat(interestRate) < 1) {
      newErrors.interestRate = 'Minimum interest rate is 1%';
    } else if (parseFloat(interestRate) > 50) {
      newErrors.interestRate = 'Maximum interest rate is 50%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleCalculate = () => {
    if (validateInputs()) {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12;
      const time = parseInt(tenure);

      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const totalAmount = emi * time;
      const totalInterest = totalAmount - principal;

      onCalculate({
        emi: Math.round(emi * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100,
        principal,
        rate: parseFloat(interestRate),
        tenure: parseInt(tenure)
      });
    }
  };

  const handlePresetAmount = (amount) => {
    setLoanAmount(amount?.toString());
    setErrors({ ...errors, loanAmount: '' });
  };

  const handleReset = () => {
    setLoanAmount('');
    setTenure('');
    setInterestRate('');
    setErrors({});
    onCalculate(null);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">EMI Calculator</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className="space-y-6">
        {/* Loan Amount */}
        <div>
          <Input
            label="Loan Amount"
            type="number"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(e?.target?.value);
              setErrors({ ...errors, loanAmount: '' });
            }}
            error={errors?.loanAmount}
            required
            min="1000"
            max="1000000"
            className="mb-3"
          />
          
          {/* Preset Amount Buttons */}
          <div className="flex flex-wrap gap-2">
            {presetAmounts?.map((amount) => (
              <Button
                key={amount?.value}
                variant="outline"
                size="sm"
                onClick={() => handlePresetAmount(amount?.value)}
                className="text-xs"
              >
                {amount?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tenure */}
        <Select
          label="Loan Tenure"
          placeholder="Select tenure"
          options={tenureOptions}
          value={tenure}
          onChange={(value) => {
            setTenure(value);
            setErrors({ ...errors, tenure: '' });
          }}
          error={errors?.tenure}
          required
        />

        {/* Interest Rate */}
        <Input
          label="Interest Rate (% per annum)"
          type="number"
          placeholder="Enter interest rate"
          value={interestRate}
          onChange={(e) => {
            setInterestRate(e?.target?.value);
            setErrors({ ...errors, interestRate: '' });
          }}
          error={errors?.interestRate}
          required
          min="1"
          max="50"
          step="0.1"
        />

        {/* Calculate Button */}
        <Button
          variant="default"
          size="lg"
          iconName="Calculator"
          iconPosition="left"
          onClick={handleCalculate}
          fullWidth
          disabled={!loanAmount || !tenure || !interestRate}
        >
          Calculate EMI
        </Button>
      </div>
    </div>
  );
};

export default EMICalculatorForm;