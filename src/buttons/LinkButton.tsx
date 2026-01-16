import React, { AnchorHTMLAttributes } from 'react';
import './LinkButton.css';

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  underline?: 'none' | 'hover' | 'always';
  external?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  size = 'md',
  underline = 'hover',
  external = false,
  disabled = false,
  className = '',
  children,
  href,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  return (
    <a
      href={disabled ? undefined : href}
      className={`link-button ${variant} ${size} underline-${underline} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : props.tabIndex}
      {...props}
    >
      {children}
      {external && !disabled && (
        <svg
          className="link-button-external-icon"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 6.5V10C10 10.2652 9.89464 10.5196 9.70711 10.7071C9.51957 10.8946 9.26522 11 9 11H2C1.73478 11 1.48043 10.8946 1.29289 10.7071C1.10536 10.5196 1 10.2652 1 10V3C1 2.73478 1.10536 2.48043 1.29289 2.29289C1.48043 2.10536 1.73478 2 2 2H5.5M8 1H11M11 1V4M11 1L5 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
};
