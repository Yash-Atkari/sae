import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReferralForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    friendName: '',
    friendPhone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.friendName?.trim()) {
      newErrors.friendName = "Friend's name is required";
    }

    if (!formData?.friendPhone?.trim()) {
      newErrors.friendPhone = "Friend's phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.friendPhone)) {
      newErrors.friendPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({
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
    // Simulate backend API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a dynamic referral code (e.g., REFER + random 4 digits)
    const generateReferralCode = () => {
      const randomCode = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      return `REFER${randomCode}`;
    };

    const referralCode = generateReferralCode();

    // WhatsApp message content
    const message = encodeURIComponent(
      `Hey ${formData.friendName}! 👋
I’m inviting you to shop at *Sahil Mobiles & Atkari Enterprises*.
Use my referral code *${referralCode}* on your first purchase and both of us will get ₹20 wallet credit! 🎉

${formData.message ? `\nMessage from me: "${formData.message}"\n` : ''}
Shop locally and save more! 💰`
    );

    // Format phone number to international (India) format
    let phoneNumber = formData.friendPhone.replace(/\D/g, '');
    if (!phoneNumber.startsWith('91')) {
      phoneNumber = '91' + phoneNumber;
    }

    // Open WhatsApp chat in new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
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
          Your referral has been shared via WhatsApp. Thanks for spreading the word!
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
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
          <p className="text-sm text-muted-foreground">
            Invite your friends to Sahil Mobiles & Atkari Enterprises and earn ₹20 each!
          </p>
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
            label="Friend's Phone Number"
            type="tel"
            name="friendPhone"
            placeholder="e.g. 9876543210"
            value={formData?.friendPhone}
            onChange={handleInputChange}
            error={errors?.friendPhone}
            required
          />
        </div>

        <Input
          label="Personal Message (Optional)"
          type="text"
          name="message"
          placeholder="Write a short message to your friend..."
          value={formData?.message}
          onChange={handleInputChange}
          description="Your friend will see this in the WhatsApp message"
        />

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">How it works:</p>
              <ul className="space-y-1">
                <li>• Share your referral code via WhatsApp</li>
                <li>• Friend gets ₹20 wallet credit on first purchase</li>
                <li>• You also get ₹20 in your wallet</li>
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
          {isSubmitting ? 'Sending Referral...' : 'Send via WhatsApp'}
        </Button>
      </form>
    </div>
  );
};

// Complete the onSubmit function
export const handleReferralSubmit = (formData) => {
  console.log('Referral submitted:', formData);
  // Here you could later integrate Firebase / Node backend
  // Example:
  // await fetch('/api/referrals', { method: 'POST', body: JSON.stringify(formData) })
};

export default ReferralForm;
