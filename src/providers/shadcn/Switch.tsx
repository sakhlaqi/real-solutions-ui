import React from 'react';
import { Switch as ShadcnSwitch } from './ui/switch';
import { Label } from './ui/label';
import { cn } from './utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium';
}

/**
 * Shadcn Switch Adapter
 * Maps library's SwitchProps to shadcn/ui Switch
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled,
  size,
}) => {
  const switchId = `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center space-x-2">
      <ShadcnSwitch
        id={switchId}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className={cn(size === 'small' && 'h-5 w-9')}
      />
      {label && (
        <Label htmlFor={switchId} className="text-sm font-medium">
          {label}
        </Label>
      )}
    </div>
  );
};

Switch.displayName = 'ShadcnSwitch';
