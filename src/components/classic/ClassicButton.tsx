import React from 'react';
import './ClassicButton.css';

interface ClassicButtonProps {
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

/**
 * ClassicButton - Pure Windows 98/XP style button with Albanian government theming
 * Authentic classic Windows appearance without Material-UI dependencies
 * Follows Albanian Customs Administration design standards
 */
export const ClassicButton: React.FC<ClassicButtonProps> = ({
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  children,
  className = '',
  title,
  style
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    'classic-button',
    `classic-button--${variant}`,
    `classic-button--${size}`,
    disabled && 'classic-button--disabled',
    loading && 'classic-button--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      title={title}
      style={style}
    >
      {loading && (
        <span className="classic-button__spinner" />
      )}
      <span className="classic-button__content">
        {children}
      </span>
    </button>
  );
};

export default ClassicButton;
