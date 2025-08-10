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
  startIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ClassicButton: React.FC<ClassicButtonProps> = ({
  variant = 'default',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
  startIcon,
  style
}) => {
  const buttonClass = `classic-button classic-button--${variant} classic-button--${size} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {startIcon && <span className="classic-button-icon">{startIcon}</span>}
      {children}
    </button>
  );
};
