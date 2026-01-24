import React from 'react';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = '',
  ...props
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};
