import React, { useState } from 'react';
import './TransferList.css';

export interface TransferListItem {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TransferListProps {
  leftTitle?: string;
  rightTitle?: string;
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
  onChange?: (left: TransferListItem[], right: TransferListItem[]) => void;
  className?: string;
}

export const TransferList: React.FC<TransferListProps> = ({
  leftTitle = 'Available',
  rightTitle = 'Selected',
  leftItems: initialLeft,
  rightItems: initialRight,
  onChange,
  className = '',
}) => {
  const [leftItems, setLeftItems] = useState<TransferListItem[]>(initialLeft);
  const [rightItems, setRightItems] = useState<TransferListItem[]>(initialRight);
  const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());

  const handleToggle = (id: string, side: 'left' | 'right') => {
    const checked = side === 'left' ? leftChecked : rightChecked;
    const setChecked = side === 'left' ? setLeftChecked : setRightChecked;
    
    const newChecked = new Set(checked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked(newChecked);
  };

  const handleMoveRight = () => {
    const itemsToMove = leftItems.filter(item => leftChecked.has(item.id));
    const newLeft = leftItems.filter(item => !leftChecked.has(item.id));
    const newRight = [...rightItems, ...itemsToMove];
    
    setLeftItems(newLeft);
    setRightItems(newRight);
    setLeftChecked(new Set());
    onChange?.(newLeft, newRight);
  };

  const handleMoveLeft = () => {
    const itemsToMove = rightItems.filter(item => rightChecked.has(item.id));
    const newRight = rightItems.filter(item => !rightChecked.has(item.id));
    const newLeft = [...leftItems, ...itemsToMove];
    
    setLeftItems(newLeft);
    setRightItems(newRight);
    setRightChecked(new Set());
    onChange?.(newLeft, newRight);
  };

  const handleMoveAllRight = () => {
    const newRight = [...rightItems, ...leftItems];
    setLeftItems([]);
    setRightItems(newRight);
    setLeftChecked(new Set());
    onChange?.([], newRight);
  };

  const handleMoveAllLeft = () => {
    const newLeft = [...leftItems, ...rightItems];
    setLeftItems(newLeft);
    setRightItems([]);
    setRightChecked(new Set());
    onChange?.(newLeft, []);
  };

  const renderList = (
    items: TransferListItem[],
    checked: Set<string>,
    side: 'left' | 'right'
  ) => (
    <div className="transfer-list-panel">
      <div className="transfer-list-header">
        {side === 'left' ? leftTitle : rightTitle} ({items.length})
      </div>
      <div className="transfer-list-content">
        {items.map(item => (
          <label
            key={item.id}
            className={`transfer-list-item ${item.disabled ? 'disabled' : ''} ${
              checked.has(item.id) ? 'checked' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={checked.has(item.id)}
              onChange={() => handleToggle(item.id, side)}
              disabled={item.disabled}
            />
            <span className="transfer-list-label">{item.label}</span>
          </label>
        ))}
        {items.length === 0 && (
          <div className="transfer-list-empty">No items</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`transfer-list ${className}`}>
      {renderList(leftItems, leftChecked, 'left')}
      
      <div className="transfer-list-controls">
        <button
          type="button"
          className="transfer-list-button"
          onClick={handleMoveAllRight}
          disabled={leftItems.length === 0}
          title="Move all right"
        >
          ≫
        </button>
        <button
          type="button"
          className="transfer-list-button"
          onClick={handleMoveRight}
          disabled={leftChecked.size === 0}
          title="Move selected right"
        >
          &gt;
        </button>
        <button
          type="button"
          className="transfer-list-button"
          onClick={handleMoveLeft}
          disabled={rightChecked.size === 0}
          title="Move selected left"
        >
          &lt;
        </button>
        <button
          type="button"
          className="transfer-list-button"
          onClick={handleMoveAllLeft}
          disabled={rightItems.length === 0}
          title="Move all left"
        >
          ≪
        </button>
      </div>

      {renderList(rightItems, rightChecked, 'right')}
    </div>
  );
};
