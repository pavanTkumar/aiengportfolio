'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactForm as ContactFormType } from '@/types';

interface ContactFormProps {
  onSubmit: (data: ContactFormType) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    budget: '',
    timeline: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormType>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormType]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ContactFormType> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neural-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-neural-800 border rounded-lg text-neural-200 placeholder-neural-500 focus:outline-none transition-colors ${
              errors.name ? 'border-cyberpunk-pink' : 'border-neural-700 focus:border-cyberpunk-neon'
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-cyberpunk-pink text-sm mt-1">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neural-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-neural-800 border rounded-lg text-neural-200 placeholder-neural-500 focus:outline-none transition-colors ${
              errors.email ? 'border-cyberpunk-pink' : 'border-neural-700 focus:border-cyberpunk-neon'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-cyberpunk-pink text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-neural-300 mb-2">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-neural-800 border border-neural-700 rounded-lg text-neural-200 placeholder-neural-500 focus:border-cyberpunk-neon focus:outline-none transition-colors"
          placeholder="Your company name"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-neural-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-neural-800 border rounded-lg text-neural-200 placeholder-neural-500 focus:outline-none transition-colors ${
            errors.subject ? 'border-cyberpunk-pink' : 'border-neural-700 focus:border-cyberpunk-neon'
          }`}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="text-cyberpunk-pink text-sm mt-1">{errors.subject}</p>
        )}
      </div>

      {/* Budget and Timeline */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neural-300 mb-2">
            Budget Range
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-neural-800 border border-neural-700 rounded-lg text-neural-200 focus:border-cyberpunk-neon focus:outline-none transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-10k">Under $10K</option>
            <option value="10k-25k">$10K - $25K</option>
            <option value="25k-50k">$25K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="over-100k">Over $100K</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neural-300 mb-2">
            Timeline
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-neural-800 border border-neural-700 rounded-lg text-neural-200 focus:border-cyberpunk-neon focus:outline-none transition-colors"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-month">Within 1 month</option>
            <option value="3-months">Within 3 months</option>
            <option value="6-months">Within 6 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-neural-300 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-neural-800 border rounded-lg text-neural-200 placeholder-neural-500 focus:outline-none transition-colors resize-none ${
            errors.message ? 'border-cyberpunk-pink' : 'border-neural-700 focus:border-cyberpunk-neon'
          }`}
          placeholder="Tell me about your project, goals, and how I can help..."
        />
        {errors.message && (
          <p className="text-cyberpunk-pink text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-cyberpunk-neon text-neural-900 rounded-lg font-bold hover:bg-cyberpunk-neon/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neural-900"></div>
            <span>Sending Message...</span>
          </div>
        ) : (
          'Send Message'
        )}
      </motion.button>

      {/* Privacy Note */}
      <p className="text-xs text-neural-500 text-center">
        Your information is secure and will only be used to respond to your inquiry.
      </p>
    </form>
  );
}
