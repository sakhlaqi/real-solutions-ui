/**
 * Radix UI Tabs Wrapper
 * Adapts Radix UI Tabs to match internal Tabs API
 */

import React from 'react';
import { Tabs as RadixTabs } from '@radix-ui/themes';
import type { TabsProps } from '../../core/types';

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  orientation = 'horizontal',
  className,
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      // Try to parse as number if original value was number
      const parsedValue = isNaN(Number(newValue)) ? newValue : Number(newValue);
      onChange(parsedValue);
    }
  };

  const stringValue = String(value);

  return (
    <RadixTabs.Root
      value={stringValue}
      onValueChange={handleValueChange}
      orientation={orientation}
      className={className}
    >
      <RadixTabs.List>
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={String(tab.value)}
            disabled={tab.disabled}
          >
            {tab.icon && <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>}
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content key={tab.value} value={String(tab.value)}>
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};

export default Tabs;
