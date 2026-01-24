import React from 'react';

/**
 * Component Registry
 * 
 * Maps string keys to React components for safe JSON-driven rendering.
 * Only components registered here can be referenced from JSON configurations.
 */

// Import composites
import { SearchGridComposite } from '../core/composites/SearchGrid';
import { HeaderComposite } from '../core/composites/Header';
import { SidebarComposite } from '../core/composites/Sidebar';

// Import atomic components
import { Button, IconButton } from '../adapters';
import { Input, Select, Checkbox, Textarea } from '../adapters';
import { Table, TreeView } from '../adapters';
import { DatePicker, TimePicker, DateTimePicker } from '../adapters';
import { Modal, Dialog, Alert, Snackbar } from '../adapters';
import { Tabs, Breadcrumbs, Progress } from '../adapters';
import { Card, Badge, Avatar, Chip } from '../adapters';
import { Typography, Heading, Text } from '../adapters';
import { Box, Container, Stack, Flex } from '../adapters';
import { List, Divider } from '../adapters';

/**
 * Component Registry Object
 * Maps component string keys to actual React components
 */
export const ComponentRegistry = {
  // Composites
  SearchGridComposite,
  HeaderComposite,
  SidebarComposite,

  // Form Components
  Button,
  IconButton,
  Input,
  Select,
  Checkbox,
  Textarea,

  // Data Display
  Table,
  TreeView,
  Card,
  List,
  Badge,
  Avatar,
  Chip,

  // Date/Time
  DatePicker,
  TimePicker,
  DateTimePicker,

  // Feedback
  Modal,
  Dialog,
  Alert,
  Snackbar,
  Progress,

  // Navigation
  Tabs,
  Breadcrumbs,

  // Typography
  Typography,
  Heading,
  Text,

  // Layout
  Box,
  Container,
  Stack,
  Flex,
  Divider,
} as const;

/**
 * Component Registry Keys Type
 * Use this type to validate component keys in JSON configurations
 */
export type ComponentKey = keyof typeof ComponentRegistry;

/**
 * Component Type
 * Extracts the component type from the registry
 */
export type RegisteredComponent<K extends ComponentKey> = typeof ComponentRegistry[K];

/**
 * Get component from registry
 * Returns the component if it exists, throws error otherwise
 */
export function getComponent(key: string): React.ComponentType<any> {
  if (!(key in ComponentRegistry)) {
    throw new Error(`Component "${key}" not found in ComponentRegistry. Available components: ${Object.keys(ComponentRegistry).join(', ')}`);
  }
  return ComponentRegistry[key as ComponentKey] as React.ComponentType<any>;
}

/**
 * Check if a component exists in the registry
 */
export function hasComponent(key: string): key is ComponentKey {
  return key in ComponentRegistry;
}

/**
 * Get all available component keys
 */
export function getComponentKeys(): ComponentKey[] {
  return Object.keys(ComponentRegistry) as ComponentKey[];
}

/**
 * Validate component key
 * Useful for runtime validation of JSON configurations
 */
export function validateComponentKey(key: string): asserts key is ComponentKey {
  if (!hasComponent(key)) {
    throw new Error(`Invalid component key: "${key}". Must be one of: ${getComponentKeys().join(', ')}`);
  }
}
