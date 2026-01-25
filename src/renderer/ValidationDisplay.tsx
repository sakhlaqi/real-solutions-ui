import React from 'react';
import type { z } from 'zod';

/**
 * Validation Display Components
 * 
 * Inline UI components for displaying validation errors and warnings
 * in Storybook without relying on console-only feedback.
 */

export interface ValidationError {
  path: PropertyKey[];
  message: string;
  code?: string;
}

export interface ValidationDisplayProps {
  errors: ValidationError[];
  title?: string;
  collapsible?: boolean;
}

/**
 * Format a validation path to a readable string
 */
function formatPath(path: PropertyKey[]): string {
  if (path.length === 0) return 'root';
  return path.map((segment, idx) => {
    if (typeof segment === 'number') {
      return `[${segment}]`;
    }
    if (typeof segment === 'symbol') {
      return `[${String(segment)}]`;
    }
    return idx === 0 ? segment : `.${segment}`;
  }).join('');
}

/**
 * Validation Error Display
 * 
 * Displays schema validation errors inline in the UI
 */
export const ValidationErrorDisplay: React.FC<ValidationDisplayProps> = ({
  errors,
  title = 'Schema Validation Errors',
  collapsible = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        margin: '16px',
        border: '2px solid #dc2626',
        borderRadius: '8px',
        backgroundColor: '#fef2f2',
        overflow: 'hidden',
      }}
      role="alert"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: '#dc2626',
          color: '#fff',
          cursor: collapsible ? 'pointer' : 'default',
        }}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>❌</span>
          <strong>{title}</strong>
          <span
            style={{
              backgroundColor: '#fff',
              color: '#dc2626',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {errors.length}
          </span>
        </div>
        {collapsible && (
          <span style={{ fontSize: '18px' }}>
            {isOpen ? '▼' : '▶'}
          </span>
        )}
      </div>

      {/* Error List */}
      {isOpen && (
        <div style={{ padding: '16px' }}>
          {errors.map((error, index) => (
            <div
              key={index}
              style={{
                marginBottom: index < errors.length - 1 ? '12px' : '0',
                paddingBottom: index < errors.length - 1 ? '12px' : '0',
                borderBottom: index < errors.length - 1 ? '1px solid #fecaca' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ fontSize: '16px', marginTop: '2px' }}>•</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      color: '#991b1b',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {formatPath(error.path)}
                  </div>
                  <div style={{ color: '#dc2626', fontSize: '14px' }}>
                    {error.message}
                  </div>
                  {error.code && (
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#7f1d1d',
                        marginTop: '4px',
                      }}
                    >
                      Code: {error.code}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Parse Zod validation errors into our format
 */
export function parseZodErrors(zodError: z.ZodError): ValidationError[] {
  return zodError.issues.map(err => ({
    path: err.path,
    message: err.message,
    code: 'UNKNOWN' as const,
  }));
}

/**
 * Validation Success Display
 * 
 * Shows a success message when validation passes
 */
export interface ValidationSuccessProps {
  message?: string;
  compact?: boolean;
}

export const ValidationSuccessDisplay: React.FC<ValidationSuccessProps> = ({
  message = 'Schema validation passed',
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          backgroundColor: '#dcfce7',
          border: '1px solid #16a34a',
          borderRadius: '16px',
          color: '#166534',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        <span>✓</span>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: '16px',
        padding: '12px 16px',
        backgroundColor: '#dcfce7',
        border: '2px solid #16a34a',
        borderRadius: '8px',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span style={{ fontSize: '20px' }}>✅</span>
      <strong>{message}</strong>
    </div>
  );
};
