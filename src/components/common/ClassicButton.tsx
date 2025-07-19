import React from 'react';
import './ClassicButton.css';

interface ClassicButtonProps {
  variant?: 'default' | 'primary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ClassicButton: React.FC<ClassicButtonProps> = ({
  variant = 'default',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button'
}) => {
  const buttonClass = `classic-button classic-button--${variant} classic-button--${size} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
