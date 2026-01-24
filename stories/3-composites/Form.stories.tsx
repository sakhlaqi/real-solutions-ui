import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from '../../src/adapters/Form';
import { Input } from '../../src/adapters/Input';
import { Button } from '../../src/adapters/Button';
import { Checkbox } from '../../src/adapters/Checkbox';

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

/**
 * Form with comprehensive business data.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a fully populated form with realistic business data for editing.',
      },
    },
  },
  render: () => {
    const [formData, setFormData] = useState({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      jobTitle: 'Senior Software Engineer',
      startDate: '2020-01-15',
      employeeId: 'EMP-12345',
      notifications: true,
    });
    
    return (
      <Form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          console.log('Updated employee data:', formData);
          alert('Employee information updated successfully!');
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '500px' }}>
          <h2 style={{ margin: 0 }}>Edit Employee</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input 
              label="First Name" 
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <Input 
              label="Last Name" 
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <Input 
            label="Email" 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input 
            label="Phone" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input 
              label="Department" 
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <Input 
              label="Job Title" 
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input 
              label="Start Date" 
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input 
              label="Employee ID" 
              value={formData.employeeId}
              disabled
            />
          </div>
          <Checkbox
            label="Enable email notifications"
            checked={formData.notifications}
            onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
          />
          <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button type="button" variant="outlined">
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    );
  },
};

/**
 * Form in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows form during data loading with disabled fields.',
      },
    },
  },
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
        <h2 style={{ margin: 0 }}>Loading Form...</h2>
        <Input label="Name" placeholder="Loading..." disabled />
        <Input label="Email" placeholder="Loading..." disabled />
        <Input label="Department" placeholder="Loading..." disabled />
        <Button type="submit" variant="contained" color="primary" disabled fullWidth>
          Please Wait...
        </Button>
      </div>
    </Form>
  ),
};

/**
 * Empty form state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Empty form ready for new data entry.',
      },
    },
  },
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
    
    return (
      <Form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          console.log('New submission:', formData);
          alert('Form submitted!');
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
          <h2 style={{ margin: 0 }}>New Entry</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Fill out the form below to create a new record.
          </p>
          <Input 
            label="Name" 
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input 
            label="Email" 
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input 
            label="Message" 
            placeholder="Enter message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create
          </Button>
        </div>
      </Form>
    );
  },
};

/**
 * Form showing validation errors.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Form displaying validation errors.',
      },
    },
  },
  render: () => (
    <Form onSubmit={(e) => { e.preventDefault(); alert('Fix errors before submitting'); }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
        <h2 style={{ margin: 0 }}>Form Validation</h2>
        <div style={{ padding: '12px', backgroundColor: '#ffebee', borderRadius: '4px', color: '#c62828', marginBottom: '8px' }}>
          ⚠️ Please fix the following errors before submitting
        </div>
        <div>
          <Input 
            label="Email" 
            type="email"
            defaultValue="invalid-email"
            error
          />
          <p style={{ margin: '4px 0 0 0', color: '#d32f2f', fontSize: '12px' }}>
            Please enter a valid email address
          </p>
        </div>
        <div>
          <Input 
            label="Password" 
            type="password"
            defaultValue="123"
            error
          />
          <p style={{ margin: '4px 0 0 0', color: '#d32f2f', fontSize: '12px' }}>
            Password must be at least 8 characters
          </p>
        </div>
        <div>
          <Input 
            label="Phone" 
            defaultValue="not-a-phone"
            error
          />
          <p style={{ margin: '4px 0 0 0', color: '#d32f2f', fontSize: '12px' }}>
            Please enter a valid phone number
          </p>
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </div>
    </Form>
  ),
};

/**
 * Tests adapter fallback behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Form handles provider switching.

**Testing Instructions:**
1. Use the **UI Provider** toolbar control to switch between providers
2. Verify the form renders consistently across providers
3. Test form submission behavior
4. Check that validation works correctly
5. Verify input field styling matches the provider theme

**Expected Behavior:**
- All providers should handle form submission consistently
- Form validation should work regardless of provider
- Input fields should adapt to provider styling
- Submit button should match provider button styles
        `,
      },
    },
  },
  render: () => {
    const [formData, setFormData] = useState({
      testField1: 'Test Value 1',
      testField2: 'Test Value 2',
    });
    
    return (
      <Form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          alert(`Form submitted! Check which provider is active. Data: ${JSON.stringify(formData)}`);
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
          <h2 style={{ margin: 0 }}>Provider Test Form</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Switch providers using the toolbar to test form behavior
          </p>
          <Input 
            label="Test Field 1" 
            placeholder="Enter some text"
            value={formData.testField1}
            onChange={(e) => setFormData({ ...formData, testField1: e.target.value })}
          />
          <Input 
            label="Test Field 2" 
            placeholder="Enter more text"
            value={formData.testField2}
            onChange={(e) => setFormData({ ...formData, testField2: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Test Submit
          </Button>
        </div>
      </Form>
    );
  },
};

