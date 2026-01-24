import React from 'react';

/**
 * Adapter Warning Components
 * 
 * Display warnings when adapters fallback to alternative implementations
 * or when components/templates are not found.
 */

export interface AdapterWarning {
  type: 'adapter-fallback' | 'component-not-found' | 'template-not-found' | 'adapter-missing';
  componentType: string;
  requestedProvider: string;
  fallbackProvider?: string;
  message: string;
  timestamp: number;
}

export interface AdapterWarningsDisplayProps {
  warnings: AdapterWarning[];
  onDismiss?: (index: number) => void;
  position?: 'top' | 'bottom';
  compact?: boolean;
}

/**
 * Get icon for warning type
 */
function getWarningIcon(type: AdapterWarning['type']): string {
  switch (type) {
    case 'adapter-fallback':
      return '⚡';
    case 'component-not-found':
    case 'template-not-found':
      return '🚫';
    case 'adapter-missing':
      return '⚠️';
    default:
      return '⚠️';
  }
}

/**
 * Get color scheme for warning type
 */
function getWarningColors(type: AdapterWarning['type']): {
  bg: string;
  border: string;
  text: string;
  headerBg: string;
} {
  switch (type) {
    case 'adapter-fallback':
      return {
        bg: '#fef3c7',
        border: '#f59e0b',
        text: '#92400e',
        headerBg: '#fbbf24',
      };
    case 'component-not-found':
    case 'template-not-found':
      return {
        bg: '#fee2e2',
        border: '#ef4444',
        text: '#991b1b',
        headerBg: '#f87171',
      };
    case 'adapter-missing':
      return {
        bg: '#fef3c7',
        border: '#f59e0b',
        text: '#92400e',
        headerBg: '#fbbf24',
      };
    default:
      return {
        bg: '#fef3c7',
        border: '#f59e0b',
        text: '#92400e',
        headerBg: '#fbbf24',
      };
  }
}

/**
 * Single Adapter Warning Card
 */
const AdapterWarningCard: React.FC<{
  warning: AdapterWarning;
  onDismiss?: () => void;
  compact?: boolean;
}> = ({ warning, onDismiss, compact = false }) => {
  const colors = getWarningColors(warning.type);
  const icon = getWarningIcon(warning.type);

  return (
    <div
      style={{
        border: `2px solid ${colors.border}`,
        borderRadius: '8px',
        backgroundColor: colors.bg,
        overflow: 'hidden',
        fontSize: compact ? '12px' : '14px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: compact ? '6px 10px' : '8px 12px',
          backgroundColor: colors.headerBg,
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: compact ? '14px' : '16px' }}>{icon}</span>
          <strong style={{ fontSize: compact ? '11px' : '13px' }}>
            {warning.type === 'adapter-fallback' && 'Adapter Fallback'}
            {warning.type === 'component-not-found' && 'Component Not Found'}
            {warning.type === 'template-not-found' && 'Template Not Found'}
            {warning.type === 'adapter-missing' && 'Adapter Missing'}
          </strong>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
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

      {/* Content */}
      <div style={{ padding: compact ? '8px 10px' : '10px 12px' }}>
        <div style={{ color: colors.text, marginBottom: '6px' }}>
          <strong>Component:</strong>{' '}
          <code style={{
            backgroundColor: '#fff',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: compact ? '11px' : '12px',
          }}>
            {warning.componentType}
          </code>
        </div>

        {warning.requestedProvider && (
          <div style={{ color: colors.text, marginBottom: '6px', fontSize: compact ? '11px' : '13px' }}>
            <strong>Requested:</strong> {warning.requestedProvider}
            {warning.fallbackProvider && (
              <>
                {' → '}
                <strong>Fallback:</strong> {warning.fallbackProvider}
              </>
            )}
          </div>
        )}

        <div style={{ color: colors.text, fontSize: compact ? '11px' : '13px' }}>
          {warning.message}
        </div>
      </div>
    </div>
  );
};

/**
 * Adapter Warnings Display
 * 
 * Shows a list of adapter warnings with dismiss functionality
 */
export const AdapterWarningsDisplay: React.FC<AdapterWarningsDisplayProps> = ({
  warnings,
  onDismiss,
  position = 'bottom',
  compact = false,
}) => {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        [position]: '16px',
        right: '16px',
        width: compact ? '300px' : '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {warnings.map((warning, index) => (
        <AdapterWarningCard
          key={index}
          warning={warning}
          onDismiss={onDismiss ? () => onDismiss(index) : undefined}
          compact={compact}
        />
      ))}
    </div>
  );
};

/**
 * Inline Adapter Warning
 * 
 * Displays a single warning inline (not floating)
 */
export const InlineAdapterWarning: React.FC<{
  warning: AdapterWarning;
  onDismiss?: () => void;
}> = ({ warning, onDismiss }) => {
  return (
    <div style={{ margin: '16px' }}>
      <AdapterWarningCard warning={warning} onDismiss={onDismiss} />
    </div>
  );
};

/**
 * Adapter Warnings Summary Badge
 * 
 * Compact badge showing warning count
 */
export const AdapterWarningsBadge: React.FC<{
  count: number;
  onClick?: () => void;
}> = ({ count, onClick }) => {
  if (count === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        backgroundColor: '#f59e0b',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '24px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 9999,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span>⚠️</span>
      <span>{count} Warning{count !== 1 ? 's' : ''}</span>
    </div>
  );
};
