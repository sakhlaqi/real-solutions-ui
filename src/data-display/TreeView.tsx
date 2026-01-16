import React, { useState } from 'react';
import './TreeView.css';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  expanded?: string[];
  selected?: string[];
  onNodeToggle?: (nodeId: string) => void;
  onNodeSelect?: (nodeId: string) => void;
  multiSelect?: boolean;
  className?: string;
}

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  expanded: controlledExpanded,
  selected: controlledSelected,
  onNodeToggle,
  onNodeSelect,
  multiSelect = false,
  className = '',
}) => {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set());
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());

  const expanded = controlledExpanded
    ? new Set(controlledExpanded)
    : internalExpanded;

  const selected = controlledSelected
    ? new Set(controlledSelected)
    : internalSelected;

  const handleToggle = (nodeId: string) => {
    if (onNodeToggle) {
      onNodeToggle(nodeId);
    } else {
      const newExpanded = new Set(internalExpanded);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      setInternalExpanded(newExpanded);
    }
  };

  const handleSelect = (nodeId: string) => {
    if (onNodeSelect) {
      onNodeSelect(nodeId);
    } else {
      const newSelected = new Set(internalSelected);
      if (multiSelect) {
        if (newSelected.has(nodeId)) {
          newSelected.delete(nodeId);
        } else {
          newSelected.add(nodeId);
        }
      } else {
        newSelected.clear();
        newSelected.add(nodeId);
      }
      setInternalSelected(newSelected);
    }
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const isSelected = selected.has(node.id);

    return (
      <div key={node.id} className="tree-node" style={{ '--level': level } as React.CSSProperties}>
        <div
          className={`tree-node-content ${isSelected ? 'selected' : ''} ${
            node.disabled ? 'disabled' : ''
          }`}
          onClick={() => !node.disabled && handleSelect(node.id)}
        >
          {hasChildren && (
            <button
              type="button"
              className={`tree-node-toggle ${isExpanded ? 'expanded' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                !node.disabled && handleToggle(node.id);
              }}
              disabled={node.disabled}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {!hasChildren && <span className="tree-node-spacer" />}
          
          {node.icon && <span className="tree-node-icon">{node.icon}</span>}
          <span className="tree-node-label">{node.label}</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="tree-node-children">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`tree-view ${className}`} role="tree">
      {data.map((node) => renderNode(node, 0))}
    </div>
  );
};
