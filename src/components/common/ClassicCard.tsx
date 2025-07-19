import React from 'react';
import './ClassicCard.css';

interface ClassicCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export const ClassicCard: React.FC<ClassicCardProps> = ({
  title,
  children,
  className = '',
  elevated = false
}) => {
  const cardClass = `classic-card ${elevated ? 'classic-card--elevated' : ''} ${className}`;
  
  return (
    <div className={cardClass}>
      {title && (
        <div className="classic-card-header">
          <h3 className="classic-card-title">{title}</h3>
        </div>
      )}
      <div className="classic-card-content">
        {children}
      </div>
    </div>
  );
};
