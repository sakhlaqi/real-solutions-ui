import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

/**
 * DatePicker component for selecting dates.
 * 
 * ## Features
 * - Calendar date selection
 * - Date formatting
 * - Validation
 * - Adapts to UI provider
 */
const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the date picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the picker is disabled',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default date picker
 */
export const Default: Story = {
  args: {
    label: 'Select Date',
  },
};

/**
 * With pre-selected date
 */
export const WithPreselectedDate: Story = {
  args: {
    label: 'Birth Date',
    value: new Date('1990-01-15'),
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Date Picker',
    value: new Date(),
    disabled: true,
  },
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    
    return (
      <div style={{ minWidth: '320px' }}>
        <DatePicker
          label="Select a Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected Date:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            {date ? date.toLocaleDateString() : 'No date selected'}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Birthday picker
 */
export const BirthdayPicker: Story = {
  render: () => {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    
    const calculateAge = (date: Date) => {
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      return age;
    };
    
    return (
      <div style={{ minWidth: '320px' }}>
        <DatePicker
          label="Date of Birth"
          value={birthDate}
          onChange={(date) => setBirthDate(date)}
        />
        {birthDate && (
          <div style={{ marginTop: '16px', padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>
            <strong>Age:</strong> {calculateAge(birthDate)} years old
          </div>
        )}
      </div>
    );
  },
};

/**
 * Event date picker
 */
export const EventDatePicker: Story = {
  render: () => {
    const [eventDate, setEventDate] = useState<Date | null>(new Date());
    
    const daysUntilEvent = eventDate 
      ? Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      : null;
    
    return (
      <div style={{ minWidth: '320px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Plan Your Event</h3>
        <DatePicker
          label="Event Date"
          value={eventDate}
          onChange={(date) => setEventDate(date)}
        />
        {eventDate && daysUntilEvent !== null && (
          <div style={{ 
            marginTop: '16px', 
            padding: '16px', 
            background: daysUntilEvent < 0 ? '#ffebee' : '#e8f5e9', 
            borderRadius: '4px' 
          }}>
            {daysUntilEvent < 0 ? (
              <p style={{ margin: 0, color: '#c62828' }}>
                This event date has passed ({Math.abs(daysUntilEvent)} days ago)
              </p>
            ) : daysUntilEvent === 0 ? (
              <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold' }}>
                🎉 Event is today!
              </p>
            ) : (
              <p style={{ margin: 0, color: '#2e7d32' }}>
                {daysUntilEvent} day{daysUntilEvent !== 1 ? 's' : ''} until the event
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Multiple date pickers
 */
export const MultipleDatePickers: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    
    const duration = startDate && endDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : null;
    
    return (
      <div style={{ minWidth: '350px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Select Date Range</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        {duration !== null && (
          <div style={{ marginTop: '16px', padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>
            <strong>Duration:</strong> {duration} day{duration !== 1 ? 's' : ''}
            {duration < 0 && (
              <p style={{ margin: '8px 0 0 0', color: '#d32f2f', fontSize: '14px' }}>
                ⚠️ End date is before start date
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};
