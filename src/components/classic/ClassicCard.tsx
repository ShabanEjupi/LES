import React from 'react';
import { Card } from '@mui/material';
import type { CardProps } from '@mui/material';
import './ClassicCard.css';

interface ClassicCardProps extends Omit<CardProps, 'variant'> {
  variant?: 'default' | 'panel' | 'inset' | 'raised';
  children: React.ReactNode;
  title?: string;
}

/**
 * ClassicCard - Windows 98/XP style panel/card component
 * Provides authentic classic Windows appearance for content containers
 */
export const ClassicCard: React.FC<ClassicCardProps> = ({
  variant = 'default',
  title,
  children,
  className = '',
  ...props
}) => {
  const classicClasses = [
    'classic-card',
    `classic-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Card
      className={classicClasses}
      elevation={0}
      {...props}
    >
      {title && (
        <div className="classic-card__title">
          {title}
        </div>
      )}
      <div className="classic-card__content">
        {children}
      </div>
    </Card>
  );
};

export default ClassicCard;
