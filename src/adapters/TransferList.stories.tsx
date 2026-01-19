import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TransferList, TransferListProps } from './TransferList';

const meta: Meta<typeof TransferList> = {
  title: 'Adapters/TransferList',
  component: TransferList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TransferList>;

const availableItems = [
  { id: '1', label: 'React' },
  { id: '2', label: 'Vue' },
  { id: '3', label: 'Angular' },
  { id: '4', label: 'Svelte' },
  { id: '5', label: 'Solid' },
];

const selectedItems = [
  { id: '6', label: 'TypeScript' },
  { id: '7', label: 'JavaScript' },
];

export const Default: Story = {
  render: () => {
    const [left, setLeft] = useState(availableItems);
    const [right, setRight] = useState(selectedItems);

    const handleChange = (newLeft: any[], newRight: any[]) => {
      setLeft(newLeft);
      setRight(newRight);
    };

    return (
      <TransferList
        leftItems={left}
        rightItems={right}
        onChange={handleChange}
      />
    );
  },
};

export const CustomTitles: Story = {
  render: () => {
    const [left, setLeft] = useState(availableItems);
    const [right, setRight] = useState(selectedItems);

    const handleChange = (newLeft: any[], newRight: any[]) => {
      setLeft(newLeft);
      setRight(newRight);
    };

    return (
      <TransferList
        leftTitle="Available Frameworks"
        rightTitle="Selected Frameworks"
        leftItems={left}
        rightItems={right}
        onChange={handleChange}
      />
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const leftWithDisabled = [
      { id: '1', label: 'React' },
      { id: '2', label: 'Vue', disabled: true },
      { id: '3', label: 'Angular' },
      { id: '4', label: 'Svelte' },
    ];

    const [left, setLeft] = useState(leftWithDisabled);
    const [right, setRight] = useState(selectedItems);

    const handleChange = (newLeft: any[], newRight: any[]) => {
      setLeft(newLeft);
      setRight(newRight);
    };

    return (
      <TransferList
        leftItems={left}
        rightItems={right}
        onChange={handleChange}
      />
    );
  },
};
