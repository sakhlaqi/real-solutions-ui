import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateTimePicker } from './DateTimePicker';
import { Button } from './Button';

/**
 * DateTimePicker component for selecting both date and time.
 * Combines date selection with time input for complete datetime handling.
 * 
 * ## Features
 * - Date and time selection
 * - Optional seconds display
 * - Date range validation
 * - Format customization
 * - Error states
 * - Adapts to UI provider
 */
const meta = {
  title: 'Forms/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the datetime picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the picker is disabled',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Show seconds in time picker',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the picker full width',
    },
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default datetime picker
 */
export const Default: Story = {
  args: {
    label: 'Select Date and Time',
  },
};

/**
 * With pre-selected datetime
 */
export const WithPreselectedDateTime: Story = {
  args: {
    label: 'Appointment',
    value: new Date('2024-03-15T14:30:00'),
  },
};

/**
 * With seconds display
 */
export const WithSeconds: Story = {
  args: {
    label: 'Event Start Time',
    value: new Date(),
    showSeconds: true,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled DateTime Picker',
    value: new Date(),
    disabled: true,
  },
};

/**
 * Error state
 */
export const WithError: Story = {
  args: {
    label: 'Meeting Time',
    error: true,
    helperText: 'Please select a future date and time',
  },
};

/**
 * Full width
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <DateTimePicker
        label="Full Width DateTime Picker"
        fullWidth={true}
      />
    </div>
  ),
};

/**
 * Interactive example with validation
 */
export const Interactive: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | null>(null);
    
    return (
      <div style={{ minWidth: '400px' }}>
        <DateTimePicker
          label="Select Date and Time"
          value={dateTime}
          onChange={(newDateTime) => setDateTime(newDateTime)}
          showSeconds={false}
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected DateTime:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            {dateTime ? (
              <>
                <span style={{ display: 'block' }}>
                  Date: {dateTime.toLocaleDateString()}
                </span>
                <span style={{ display: 'block' }}>
                  Time: {dateTime.toLocaleTimeString()}
                </span>
                <span style={{ display: 'block', marginTop: '8px', fontSize: '0.875rem', color: '#666' }}>
                  ISO: {dateTime.toISOString()}
                </span>
              </>
            ) : (
              'No date and time selected'
            )}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Appointment booking
 */
export const AppointmentBooking: Story = {
  render: () => {
    const [appointmentTime, setAppointmentTime] = useState<Date | null>(null);
    const [isBooked, setIsBooked] = useState(false);
    
    const handleBook = () => {
      if (appointmentTime) {
        setIsBooked(true);
        setTimeout(() => setIsBooked(false), 3000);
      }
    };
    
    const now = new Date();
    const isFuture = appointmentTime ? appointmentTime > now : false;
    const hasError = appointmentTime && !isFuture;
    
    return (
      <div style={{ minWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>Book an Appointment</h3>
        <DateTimePicker
          label="Appointment Date & Time"
          value={appointmentTime}
          onChange={(newDateTime) => setAppointmentTime(newDateTime)}
          minDate={now}
          error={hasError}
          helperText={hasError ? 'Please select a future date and time' : 'Select your preferred appointment time'}
        />
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button
            onClick={handleBook}
            variant="contained"
            color="primary"
            disabled={!appointmentTime || hasError}
          >
            Book Appointment
          </Button>
          <Button
            onClick={() => setAppointmentTime(null)}
            variant="outlined"
            disabled={!appointmentTime}
          >
            Clear
          </Button>
        </div>
        {isBooked && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: '#d1fae5', 
            border: '1px solid #10b981',
            borderRadius: '4px',
            color: '#065f46'
          }}>
            ✓ Appointment booked for {appointmentTime?.toLocaleString()}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Event scheduler with seconds
 */
export const EventScheduler: Story = {
  render: () => {
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    
    const duration = startTime && endTime ? 
      Math.abs(endTime.getTime() - startTime.getTime()) / (1000 * 60) : 0;
    
    const hasError = startTime && endTime && endTime <= startTime;
    
    return (
      <div style={{ minWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>Schedule Event</h3>
        
        <DateTimePicker
          label="Start Time"
          value={startTime}
          onChange={(newDateTime) => setStartTime(newDateTime)}
          showSeconds={true}
        />
        
        <div style={{ marginTop: '16px' }}>
          <DateTimePicker
            label="End Time"
            value={endTime}
            onChange={(newDateTime) => setEndTime(newDateTime)}
            showSeconds={true}
            error={hasError}
            helperText={hasError ? 'End time must be after start time' : undefined}
            minDate={startTime || undefined}
          />
        </div>
        
        {startTime && endTime && !hasError && (
          <div style={{ 
            marginTop: '16px', 
            padding: '16px', 
            background: '#f5f5f5', 
            borderRadius: '4px' 
          }}>
            <strong>Event Duration:</strong>
            <p style={{ margin: '8px 0 0 0' }}>
              {Math.floor(duration / 60)} hours {Math.floor(duration % 60)} minutes
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Meeting scheduler with business hours
 */
export const MeetingScheduler: Story = {
  render: () => {
    const [meetingTime, setMeetingTime] = useState<Date | null>(null);
    
    const isBusinessHours = (date: Date) => {
      const hour = date.getHours();
      const day = date.getDay();
      // Monday-Friday, 9 AM - 5 PM
      return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
    };
    
    const hasError = meetingTime && !isBusinessHours(meetingTime);
    
    return (
      <div style={{ minWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>Schedule Meeting</h3>
        <p style={{ color: '#666', fontSize: '0.875rem', marginTop: 0 }}>
          Available: Monday-Friday, 9:00 AM - 5:00 PM
        </p>
        
        <DateTimePicker
          label="Meeting Time"
          value={meetingTime}
          onChange={(newDateTime) => setMeetingTime(newDateTime)}
          error={hasError}
          helperText={
            hasError 
              ? 'Meetings can only be scheduled during business hours (Mon-Fri, 9 AM - 5 PM)'
              : 'Select a time during business hours'
          }
          minDate={new Date()}
        />
        
        {meetingTime && !hasError && (
          <div style={{ 
            marginTop: '16px', 
            padding: '16px', 
            background: '#dbeafe', 
            border: '1px solid #3b82f6',
            borderRadius: '4px' 
          }}>
            <strong>Meeting Scheduled:</strong>
            <p style={{ margin: '8px 0 0 0' }}>
              {meetingTime.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Reminder setter
 */
export const ReminderSetter: Story = {
  render: () => {
    const [reminderTime, setReminderTime] = useState<Date | null>(null);
    const [reminders, setReminders] = useState<Date[]>([]);
    
    const addReminder = () => {
      if (reminderTime && reminderTime > new Date()) {
        setReminders([...reminders, reminderTime]);
        setReminderTime(null);
      }
    };
    
    const removeReminder = (index: number) => {
      setReminders(reminders.filter((_, i) => i !== index));
    };
    
    const now = new Date();
    const isFuture = reminderTime ? reminderTime > now : false;
    
    return (
      <div style={{ minWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>Set Reminders</h3>
        
        <DateTimePicker
          label="Reminder Time"
          value={reminderTime}
          onChange={(newDateTime) => setReminderTime(newDateTime)}
          minDate={now}
          error={reminderTime && !isFuture}
          helperText={
            reminderTime && !isFuture 
              ? 'Reminder must be set for a future time'
              : 'Set a time for your reminder'
          }
        />
        
        <Button
          onClick={addReminder}
          variant="contained"
          color="primary"
          disabled={!reminderTime || !isFuture}
          style={{ marginTop: '16px' }}
        >
          Add Reminder
        </Button>
        
        {reminders.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <strong>Active Reminders:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {reminders.map((reminder, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{reminder.toLocaleString()}</span>
                    <Button
                      onClick={() => removeReminder(index)}
                      variant="outlined"
                      color="error"
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
