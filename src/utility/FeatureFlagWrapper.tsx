import React from 'react';

export interface FeatureFlagWrapperProps {
  flag: string;
  features: Record<string, boolean>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureFlagWrapper: React.FC<FeatureFlagWrapperProps> = ({
  flag,
  features,
  children,
  fallback = null,
}) => {
  const isEnabled = features[flag] === true;

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
