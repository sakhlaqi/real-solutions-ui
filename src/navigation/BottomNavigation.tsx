import React, { useState } from 'react';
import './BottomNavigation.css';

export interface BottomNavigationAction {
  value: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  disabled?: boolean;
}

export interface BottomNavigationProps {
  value?: string;
  onChange?: (value: string) => void;
  actions: BottomNavigationAction[];
  showLabels?: boolean;
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  value: propValue,
  onChange,
  actions,
  showLabels = true,
  className = '',
}) => {
  const [value, setValue] = useState<string>(propValue ?? actions[0]?.value ?? '');

  const handleClick = (actionValue: string) => {
    const action = actions.find(a => a.value === actionValue);
    if (action?.disabled) return;

    setValue(actionValue);
    onChange?.(actionValue);
  };

  return (
    <nav className={`bottom-navigation ${className}`}>
      {actions.map((action) => (
        <button
          key={action.value}
          type="button"
          className={`bottom-navigation-action ${value === action.value ? 'selected' : ''} ${
            action.disabled ? 'disabled' : ''
          }`}
          onClick={() => handleClick(action.value)}
          disabled={action.disabled}
        >
          <span className="bottom-navigation-icon">{action.icon}</span>
          {showLabels && <span className="bottom-navigation-label">{action.label}</span>}
        </button>
      ))}
    </nav>
  );
};
