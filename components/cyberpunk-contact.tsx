'use client';

import { motion, useInView } from 'framer-motion';
import { LocationIcon, PhoneIcon, EmailIcon, WebsiteIcon } from './icons/system-icons';
import { TerminalIcon, NeuralNetworkIcon } from './icons/navigation-icons';
import { CyberpunkGitHubIcon, CyberpunkLinkedInIcon, CyberpunkEmailIcon, CyberpunkWebsiteIcon } from './icons/cyberpunk-social-icons';
import { useRef, useState } from 'react';

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/pavanTkumar",
    icon: CyberpunkGitHubIcon,
    color: "terminal-green"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/geekypavan",
    icon: CyberpunkLinkedInIcon,
    color: "cyan"
  },
  {
    name: "Email (Hiring)",
    url: "mailto:hirepavan@thetejavath.com",
    icon: CyberpunkEmailIcon,
    color: "magenta"
  },
  {
    name: "Email (Projects)",
    url: "mailto:pavan@thetejavath.com",
    icon: CyberpunkEmailIcon,
    color: "cyan"
  },
  {
    name: "Website",
    url: "https://me.thetejavath.com",
    icon: CyberpunkWebsiteIcon,
    color: "terminal-green"
  }
];

export function CyberpunkContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: {
      borderColor: '#00ffff',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
      transition: { duration: 0.3 }
    },
    blur: {
      borderColor: '#00ff00',
      boxShadow: 'none',
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="contact" ref={containerRef} className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-magenta rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-terminal text-center mb-16 text-cyan glow-cyan"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glitch-text" data-text="CONTACT SYSTEM">CONTACT SYSTEM</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-neural-900 border border-cyan rounded-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="font-terminal text-2xl text-cyan mb-6 glow-cyan">
              $ contact --form
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="block font-mono text-sm text-terminal-green mb-2">
                  &gt; name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-transparent border-b-2 border-terminal-green text-text-light font-mono py-2 px-0 focus:outline-none transition-all duration-300"
                  placeholder="Enter your name..."
                  variants={inputVariants}
                  animate={activeField === 'name' ? 'focus' : 'blur'}
                />
                {activeField === 'name' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block font-mono text-sm text-terminal-green mb-2">
                  &gt; email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-transparent border-b-2 border-terminal-green text-text-light font-mono py-2 px-0 focus:outline-none transition-all duration-300"
                  placeholder="your.email@domain.com"
                  variants={inputVariants}
                  animate={activeField === 'email' ? 'focus' : 'blur'}
                />
                {activeField === 'email' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Subject Field */}
              <div className="relative">
                <label className="block font-mono text-sm text-terminal-green mb-2">
                  &gt; subject
                </label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-transparent border-b-2 border-terminal-green text-text-light font-mono py-2 px-0 focus:outline-none transition-all duration-300"
                  placeholder="Project inquiry / Collaboration / etc."
                  variants={inputVariants}
                  animate={activeField === 'subject' ? 'focus' : 'blur'}
                />
                {activeField === 'subject' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="block font-mono text-sm text-terminal-green mb-2">
                  &gt; message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  rows={5}
                  className="w-full bg-transparent border-2 border-terminal-green text-text-light font-mono py-3 px-4 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project, collaboration ideas, or just say hello..."
                  variants={inputVariants}
                  animate={activeField === 'message' ? 'focus' : 'blur'}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="cyberpunk-btn w-full py-3 text-lg font-terminal disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Transmitting Data...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 bg-terminal-green/20 border border-terminal-green rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="font-mono text-terminal-green text-center">
                    ✓ Message transmitted successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 bg-red-500/20 border border-red-500 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="font-mono text-red-500 text-center">
                    ✗ Transmission failed. Please try again.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Contact Info */}
            <div className="bg-neural-900 border border-terminal-green rounded-lg p-8">
              <h3 className="font-terminal text-2xl text-terminal-green mb-6 glow-green">
                $ contact --info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <LocationIcon className="mr-3" />
                    <div>
                      <div className="font-terminal text-sm text-terminal-green">Location</div>
                      <div className="font-mono text-text-light">Hyderabad, India</div>
                    </div>
                </div>
                
                <div className="flex items-center">
                  <PhoneIcon className="mr-3" />
                  <div>
                    <div className="font-terminal text-sm text-terminal-green">Phone</div>
                    <div className="font-mono text-text-light">+91-7893936732</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <EmailIcon className="mr-3" />
                  <div>
                    <div className="font-terminal text-sm text-terminal-green">Email</div>
                    <div className="font-mono text-text-light">hirepavan@thetejavath.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-neural-900 border border-magenta rounded-lg p-8">
              <h3 className="font-terminal text-2xl text-magenta mb-6 glow-magenta">
                $ social --links
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-neural-800 border rounded-lg text-center hover:border-cyan transition-all duration-300 group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
  <div className="mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <social.icon size={22} />
  </div>
                    <div className="font-mono text-sm text-text-light group-hover:text-cyan transition-colors duration-300">
                      {social.name}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-neural-900 border border-cyan rounded-lg p-8">
              <h3 className="font-terminal text-2xl text-cyan mb-6 glow-cyan">
                $ stats --response
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-terminal text-terminal-green font-bold">
                    &lt; 24h
                  </div>
                  <div className="text-text-light text-sm font-mono">
                    Response Time
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-terminal text-cyan font-bold">
                    100%
                  </div>
                  <div className="text-text-light text-sm font-mono">
                    Response Rate
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
