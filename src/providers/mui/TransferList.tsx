/**
 * MUI Transfer List Component
 */

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Card,
  CardHeader,
  Divider,
} from '@mui/material';

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

function not(a: TransferListItem[], b: TransferListItem[]) {
  return a.filter((value) => !b.some((item) => item.id === value.id));
}

function intersection(a: TransferListItem[], b: TransferListItem[]) {
  return a.filter((value) => b.some((item) => item.id === value.id));
}

export const TransferList: React.FC<TransferListProps> = ({
  leftTitle = 'Available',
  rightTitle = 'Selected',
  leftItems: initialLeft,
  rightItems: initialRight,
  onChange,
  className,
}) => {
  const [checked, setChecked] = useState<TransferListItem[]>([]);
  const [left, setLeft] = useState<TransferListItem[]>(initialLeft);
  const [right, setRight] = useState<TransferListItem[]>(initialRight);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: TransferListItem) => () => {
    const currentIndex = checked.findIndex((item) => item.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    const newRight = right.concat(left);
    setRight(newRight);
    setLeft([]);
    onChange?.([], newRight);
  };

  const handleCheckedRight = () => {
    const newRight = right.concat(leftChecked);
    const newLeft = not(left, leftChecked);
    setRight(newRight);
    setLeft(newLeft);
    setChecked(not(checked, leftChecked));
    onChange?.(newLeft, newRight);
  };

  const handleCheckedLeft = () => {
    const newLeft = left.concat(rightChecked);
    const newRight = not(right, rightChecked);
    setLeft(newLeft);
    setRight(newRight);
    setChecked(not(checked, rightChecked));
    onChange?.(newLeft, newRight);
  };

  const handleAllLeft = () => {
    const newLeft = left.concat(right);
    setLeft(newLeft);
    setRight([]);
    onChange?.(newLeft, []);
  };

  const customList = (title: string, items: TransferListItem[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={`${title} (${items.length})`}
        titleTypographyProps={{ variant: 'subtitle2' }}
      />
      <Divider />
      <List
        sx={{
          width: 250,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;
          const isDisabled = item.disabled || false;

          return (
            <ListItem
              key={item.id}
              role="listitem"
              onClick={!isDisabled ? handleToggle(item) : undefined}
              sx={{ cursor: isDisabled ? 'default' : 'pointer' }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.some((c) => c.id === item.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  disabled={isDisabled}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} className={className}>
      <Box>{customList(leftTitle, left)}</Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          ≫
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Box>
      <Box>{customList(rightTitle, right)}</Box>
    </Box>
  );
};
