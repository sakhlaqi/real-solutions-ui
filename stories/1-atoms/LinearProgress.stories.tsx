import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { LinearProgress } from '../../src/adapters/LinearProgress';
import { Button } from '../../src/adapters/Button';

/**
 * LinearProgress component for showing progress indicators.
 * 
 * ## Features
 * - Determinate (with value)
 * - Indeterminate (loading)
 * - Color variants
 * - Adapts to UI provider
 */
const meta = {
  title: 'Feedback/LinearProgress',
  component: LinearProgress,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Progress variant',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color variant',
    },
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Indeterminate loading
 */
export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};

/**
 * Determinate at 50%
 */
export const Determinate50: Story = {
  args: {
    variant: 'determinate',
    value: 50,
  },
};

/**
 * Determinate at 75%
 */
export const Determinate75: Story = {
  args: {
    variant: 'determinate',
    value: 75,
  },
};

/**
 * Secondary color
 */
export const SecondaryColor: Story = {
  args: {
    variant: 'determinate',
    value: 60,
    color: 'secondary',
  },
};

/**
 * File upload simulation
 */
export const FileUpload: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    
    const startUpload = () => {
      setProgress(0);
      setUploading(true);
      
      // Fixed increment for deterministic testing
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10; // Fixed 10% increment
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
        }
      }, 500);
    };
    
    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>File Upload</h3>
        <LinearProgress 
          variant={uploading ? 'determinate' : 'indeterminate'} 
          value={progress}
        />
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{progress}% Complete</span>
          <Button 
            onClick={startUpload} 
            disabled={uploading}
            variant="contained"
            size="small"
          >
            {uploading ? 'Uploading...' : 'Start Upload'}
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Download progress
 */
export const Download: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);
    
    const startDownload = () => {
      setProgress(0);
      setDownloading(true);
      
      // Fixed increment for deterministic testing
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10; // Fixed 10% increment
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setDownloading(false);
        }
      }, 400);
    };
    
    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Download File</h3>
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>document.pdf</span>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(100, progress)}
        />
        {!downloading && progress === 0 && (
          <Button 
            onClick={startDownload} 
            variant="outlined"
            size="small"
            style={{ marginTop: '16px' }}
          >
            Start Download
          </Button>
        )}
        {downloading && (
          <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#1976d2' }}>
            Downloading...
          </p>
        )}
        {!downloading && progress === 100 && (
          <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#2e7d32' }}>
            ✓ Download complete!
          </p>
        )}
      </div>
    );
  },
};

/**
 * Multiple progress bars
 */
export const MultipleProgress: Story = {
  render: () => {
    const [progress1, setProgress1] = useState(30);
    const [progress2, setProgress2] = useState(65);
    const [progress3, setProgress3] = useState(90);
    
    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h3 style={{ margin: '0 0 24px 0' }}>Task Progress</h3>
        
        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px' }}>Database Migration</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{progress1}%</span>
          </div>
          <LinearProgress variant="determinate" value={progress1} />
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px' }}>Building Assets</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{progress2}%</span>
          </div>
          <LinearProgress variant="determinate" value={progress2} />
        </div>
        
        <div>
          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px' }}>Running Tests</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{progress3}%</span>
          </div>
          <LinearProgress variant="determinate" value={progress3} />
        </div>
      </div>
    );
  },
};

/**
 * Loading states
 */
export const LoadingStates: Story = {
  render: () => {
    return (
      <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Loading Content</h4>
          <LinearProgress variant="indeterminate" />
          <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#666' }}>
            Please wait while we load your content...
          </p>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Processing Request</h4>
          <LinearProgress variant="indeterminate" color="secondary" />
          <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#666' }}>
            Processing your request...
          </p>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Saving Changes</h4>
          <LinearProgress variant="indeterminate" />
          <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#666' }}>
            Saving your changes to the server...
          </p>
        </div>
      </div>
    );
  },
};
