import React, { useState } from 'react';
import type { AdapterWarning } from './AdapterWarnings';
import type { ValidationError } from './ValidationDisplay';
import { AdapterWarningsDisplay } from './AdapterWarnings';
import { ValidationErrorDisplay } from './ValidationDisplay';

/**
 * Error & Warning Overlay Components
 * 
 * Persistent overlay panel for displaying errors and warnings
 * while keeping the page content visible underneath
 */

export interface ErrorWarningOverlayProps {
  validationErrors?: ValidationError[];
  adapterWarnings?: AdapterWarning[];
  onDismissWarning?: (index: number) => void;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  maxHeight?: string;
}

/**
 * Error & Warning Overlay
 * 
 * Displays both validation errors and adapter warnings in a persistent overlay
 * that doesn't block the rendered page content
 */
export const ErrorWarningOverlay: React.FC<ErrorWarningOverlayProps> = ({
  validationErrors = [],
  adapterWarnings = [],
  onDismissWarning,
  position = 'bottom-right',
  maxHeight = '60vh',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hasErrors = validationErrors.length > 0;
  const hasWarnings = adapterWarnings.length > 0;
  const totalCount = validationErrors.length + adapterWarnings.length;

  if (totalCount === 0) {
    return null;
  }

  // Position styles
  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    ...(position === 'top-right' && { top: '16px', right: '16px' }),
    ...(position === 'bottom-right' && { bottom: '16px', right: '16px' }),
    ...(position === 'top-left' && { top: '16px', left: '16px' }),
    ...(position === 'bottom-left' && { bottom: '16px', left: '16px' }),
  };

  return (
    <div style={positionStyles}>
      {/* Collapsed Badge */}
      {isCollapsed && (
        <div
          onClick={() => setIsCollapsed(false)}
          style={{
            backgroundColor: hasErrors ? '#dc2626' : '#f59e0b',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={{ fontSize: '18px' }}>{hasErrors ? '❌' : '⚠️'}</span>
          <span>
            {totalCount} {hasErrors ? 'Error' : 'Warning'}
            {totalCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Expanded Panel */}
      {!isCollapsed && (
        <div
          style={{
            width: '450px',
            maxHeight,
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: hasErrors ? '#dc2626' : '#f59e0b',
              color: '#fff',
              borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{hasErrors ? '❌' : '⚠️'}</span>
              <strong style={{ fontSize: '16px' }}>
                {hasErrors ? 'Errors & Warnings' : 'Warnings'}
              </strong>
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                }}
              >
                {totalCount}
              </span>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '24px',
                padding: '0 4px',
                lineHeight: 1,
              }}
              aria-label="Collapse panel"
            >
              ▼
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
            }}
          >
            {/* Validation Errors */}
            {hasErrors && (
              <div style={{ marginBottom: adapterWarnings.length > 0 ? '16px' : '0' }}>
                <ValidationErrorDisplay
                  errors={validationErrors}
                  title="Schema Validation Errors"
                  collapsible={false}
                />
              </div>
            )}

            {/* Adapter Warnings */}
            {hasWarnings && (
              <div>
                {adapterWarnings.map((warning, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: index < adapterWarnings.length - 1 ? '12px' : '0',
                      border: '2px solid #f59e0b',
                      borderRadius: '8px',
                      backgroundColor: '#fef3c7',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#fbbf24',
                        color: '#fff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px' }}>⚡</span>
                        <strong style={{ fontSize: '12px' }}>Adapter Fallback</strong>
                      </div>
                      {onDismissWarning && (
                        <button
                          onClick={() => onDismissWarning(index)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '16px',
                            padding: '0 4px',
                            lineHeight: 1,
                          }}
                          aria-label="Dismiss warning"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ color: '#92400e', marginBottom: '6px', fontSize: '13px' }}>
                        <strong>Component:</strong>{' '}
                        <code
                          style={{
                            backgroundColor: '#fff',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '12px',
                          }}
                        >
                          {warning.componentType}
                        </code>
                      </div>
                      <div style={{ color: '#92400e', fontSize: '12px' }}>
                        {warning.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Inline Error Banner
 * 
 * Displays errors inline above the content without blocking it
 */
export interface InlineErrorBannerProps {
  validationErrors?: ValidationError[];
  onDismiss?: () => void;
}

export const InlineErrorBanner: React.FC<InlineErrorBannerProps> = ({
  validationErrors = [],
  onDismiss,
}) => {
  if (validationErrors.length === 0) {
    return null;
  }

  return (
    <div style={{ margin: '0 0 16px 0' }}>
      <div
        style={{
          border: '2px solid #dc2626',
          borderRadius: '8px',
          backgroundColor: '#fef2f2',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#dc2626',
            color: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>❌</span>
            <strong>Validation Errors</strong>
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
              {validationErrors.length}
            </span>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '0 4px',
                lineHeight: 1,
              }}
              aria-label="Dismiss banner"
            >
              ×
            </button>
          )}
        </div>
        <div style={{ padding: '16px' }}>
          {validationErrors.map((error, index) => (
            <div
              key={index}
              style={{
                marginBottom: index < validationErrors.length - 1 ? '12px' : '0',
                paddingBottom: index < validationErrors.length - 1 ? '12px' : '0',
                borderBottom: index < validationErrors.length - 1 ? '1px solid #fecaca' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ fontSize: '14px', marginTop: '2px' }}>•</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: '#991b1b',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {error.path.length > 0 ? error.path.join('.') : 'root'}
                  </div>
                  <div style={{ color: '#dc2626', fontSize: '13px' }}>{error.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
