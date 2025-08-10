import React from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import './ClassicButton.css';

interface ClassicButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'primary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

/**
 * ClassicButton - Windows 98/XP style button with Albanian government theming
 * Provides authentic classic Windows appearance while maintaining modern functionality
 */
export const ClassicButton: React.FC<ClassicButtonProps> = ({
  variant = 'default',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const classicClasses = [
    'classic-button',
    `classic-button--${variant}`,
    `classic-button--${size}`,
    disabled ? 'classic-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Button
      className={classicClasses}
      disabled={disabled}
      onClick={onClick}
      disableRipple
      disableElevation
      {...props}
    >
      {children}
    </Button>
  );
};

export default ClassicButton;
