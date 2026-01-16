import React from 'react';

export interface VisibilityToggleProps {
  children: (visible: boolean, toggle: () => void) => React.ReactNode;
  defaultVisible?: boolean;
}

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  children,
  defaultVisible = false,
}) => {
  const [visible, setVisible] = React.useState(defaultVisible);

  const toggle = React.useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return <>{children(visible, toggle)}</>;
};
