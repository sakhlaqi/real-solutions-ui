/**
 * Adapter Navbar Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Navbar as InternalNavbar, NavbarProps } from '../core/components/navigation';

/**
 * Adaptive Navbar Component
 * 
 * @example
 * ```tsx
 * <Navbar
 *   brand="MyApp"
 *   items={navItems}
 *   position="fixed"
 * />
 * ```
 */
export const Navbar: React.FC<NavbarProps> = (props) => {
  // Navbar always uses internal implementation
  return <InternalNavbar {...props} />;
};

Navbar.displayName = 'AdapterNavbar';
