import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReferralForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    friendName: '',
    friendEmail: '',
    friendPhone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.friendName?.trim()) {
      newErrors.friendName = 'Friend\'s name is required';
    }

    if (!formData?.friendEmail?.trim()) {
      newErrors.friendEmail = 'Friend\'s email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.friendEmail)) {
      newErrors.friendEmail = 'Please enter a valid email address';
    }

    if (!formData?.friendPhone?.trim()) {
      newErrors.friendPhone = 'Friend\'s phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.friendPhone)) {
      newErrors.friendPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(formData);
      setIsSubmitted(true);
      setFormData({
        friendName: '',
        friendEmail: '',
        friendPhone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={32} color="white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Referral Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Your referral has been submitted successfully. We'll contact your friend soon!
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Referral
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="UserPlus" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Refer a Friend</h3>
          <p className="text-sm text-muted-foreground">Help your friends discover great deals</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Friend's Name"
            type="text"
            name="friendName"
            placeholder="Enter friend's full name"
            value={formData?.friendName}
            onChange={handleInputChange}
            error={errors?.friendName}
            required
          />
          
          <Input
            label="Friend's Email"
            type="email"
            name="friendEmail"
            placeholder="friend@example.com"
            value={formData?.friendEmail}
            onChange={handleInputChange}
            error={errors?.friendEmail}
            required
          />
        </div>

        <Input
          label="Friend's Phone Number"
          type="tel"
          name="friendPhone"
          placeholder="+1 (555) 123-4567"
          value={formData?.friendPhone}
          onChange={handleInputChange}
          error={errors?.friendPhone}
          required
        />

        <Input
          label="Personal Message (Optional)"
          type="text"
          name="message"
          placeholder="Tell your friend why they'll love ElectroMart..."
          value={formData?.message}
          onChange={handleInputChange}
          description="Add a personal touch to your referral"
        />

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">How it works:</p>
              <ul className="space-y-1">
                <li>• We'll send your friend a special discount code</li>
                <li>• When they make their first purchase, you both get rewards</li>
                <li>• Your friend gets 10% off, you get $25 credit</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
          fullWidth
        >
          {isSubmitting ? 'Sending Referral...' : 'Send Referral'}
        </Button>
      </form>
    </div>
  );
};

export default ReferralForm;