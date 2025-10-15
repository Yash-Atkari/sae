import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const categoryOptions = [
    { value: 'product-inquiry', label: 'Product Questions' },
    { value: 'order-support', label: 'Order Support' },
    { value: 'emi-assistance', label: 'EMI Assistance' },
    { value: 'technical-issues', label: 'Technical Issues' },
    { value: 'warranty-claims', label: 'Warranty Claims' },
    { value: 'refund-returns', label: 'Refunds & Returns' },
    { value: 'general-inquiry', label: 'General Inquiry' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    if (!formData?.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData?.category) newErrors.category = 'Please select an inquiry category';
    if (!formData?.message?.trim()) newErrors.message = 'Message is required';
    else if (formData?.message?.trim()?.length < 10) newErrors.message = 'Message must be at least 10 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReferenceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `EM${timestamp}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const refNumber = generateReferenceNumber();

      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, referenceNumber: refNumber }),
      });

      // Safely parse JSON
      let result = null;
      try {
        result = await response.json();
      } catch {
        throw new Error('Invalid server response. Please try again.');
      }

      if (result?.success) {
        setReferenceNumber(refNumber);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', category: '', message: '' });
        setErrors({});
      } else {
        throw new Error(result?.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to send message. Please try again or contact us directly.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors?.[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-6">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for contacting us. We've received your inquiry and will respond within 24 hours.
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Reference Number:</p>
            <p className="text-lg font-mono font-semibold text-foreground">{referenceNumber}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            iconName="Plus"
            iconPosition="left"
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3">
          <Icon name="Mail" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Send us a Message</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors?.name}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors?.email}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors?.phone}
            required
          />
          <Select
            label="Inquiry Category"
            placeholder="Select category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
          />
        </div>

        <Input
          label="Subject"
          type="text"
          placeholder="Brief description of your inquiry"
          value={formData?.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          error={errors?.subject}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            className="w-full min-h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Please provide detailed information about your inquiry..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
          />
          {errors?.message && <p className="mt-1 text-sm text-destructive">{errors?.message}</p>}
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="Info" size={16} className="mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Response Time Guarantee:</p>
              <p>We respond to all inquiries within 24 hours during business days. For urgent matters, please call or use WhatsApp for immediate assistance.</p>
            </div>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-2 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
          fullWidth
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;