import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from './Form';
import { Input } from './Input';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

/**
 * Form component for wrapping form elements and handling submission.
 * 
 * ## Features
 * - Form submission handling
 * - Validation support
 * - Layout management
 * - Adapts to current UI provider
 */
const meta = {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic form
 */
export const Basic: Story = {
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </Form>
  ),
};

/**
 * Login form
 */
export const LoginForm: Story = {
  render: () => {
    const [credentials, setCredentials] = useState({ email: '', password: '', remember: false });
    
    return (
      <Form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          console.log('Login:', credentials);
          alert(`Logging in with ${credentials.email}`);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '320px' }}>
          <h2 style={{ margin: 0 }}>Login</h2>
          <Input 
            label="Email" 
            type="email" 
            placeholder="Enter your email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Checkbox
            label="Remember me"
            checked={credentials.remember}
            onChange={(e) => setCredentials({ ...credentials, remember: e.target.checked })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </div>
      </Form>
    );
  },
};

/**
 * Contact form
 */
export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    return (
      <Form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          console.log('Contact form:', formData);
          alert('Message sent!');
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
          <h2 style={{ margin: 0 }}>Contact Us</h2>
          <Input 
            label="Name" 
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input 
            label="Subject" 
            placeholder="Message subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <Input 
            label="Message" 
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button type="submit" variant="contained" color="primary">
              Send Message
            </Button>
            <Button 
              type="button" 
              variant="outlined"
              onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
            >
              Reset
            </Button>
          </div>
        </div>
      </Form>
    );
  },
};

/**
 * Registration form
 */
export const RegistrationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    });
    
    return (
      <Form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
          }
          if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
          }
          console.log('Registration:', formData);
          alert('Account created successfully!');
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '350px' }}>
          <h2 style={{ margin: 0 }}>Create Account</h2>
          <Input 
            label="Username" 
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          <Checkbox
            label="I agree to the terms and conditions"
            checked={formData.agreeToTerms}
            onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Account
          </Button>
        </div>
      </Form>
    );
  },
};
