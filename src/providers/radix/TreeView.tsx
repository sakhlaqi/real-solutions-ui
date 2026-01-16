/**
 * Radix UI TreeView Wrapper
 * Minimal tree view using nested lists
 * Note: For advanced tree functionality, consider integrating a dedicated tree library
 */

import React, { useState } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { ChevronRightIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import type { TreeViewProps } from '../../core/types';

export const TreeView: React.FC<TreeViewProps> = ({
  nodes,
  onNodeSelect,
  defaultExpanded = [],
  className,
}) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const toggleNode = (nodeId: string) => {
    setExpanded((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  };

  const renderTree = (nodes: any[], level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expanded.includes(node.id);
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.id} style={{ marginLeft: level * 20 }}>
          <Flex
            align="center"
            gap="1"
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
            onClick={() => {
              if (hasChildren) toggleNode(node.id);
              if (onNodeSelect) onNodeSelect(node.id);
            }}
          >
            {hasChildren ? (
              isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />
            ) : (
              <span style={{ width: '15px' }} />
            )}
            <Text size="2">{node.label}</Text>
          </Flex>
          {hasChildren && isExpanded && renderTree(node.children, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className={className}>
      {nodes && renderTree(nodes)}
    </div>
  );
};

export default TreeView;
