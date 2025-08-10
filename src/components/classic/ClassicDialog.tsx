// Classic Dialog Component - Albanian Customs Administration (LES)
// Komponenti i Dialogut Klasik - Administrata Doganore e Shqipërisë
import React from 'react';
import { ClassicButton } from './ClassicButton';
import './ClassicDialog.css';

interface ClassicDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  width?: number | string;
  height?: number | string;
  modal?: boolean;
  resizable?: boolean;
  className?: string;
}

/**
 * ClassicDialog - Authentic Windows 98/XP style dialog component
 * Provides classic Windows modal dialog appearance
 * Used throughout the Albanian Customs Administration system
 */
export const ClassicDialog: React.FC<ClassicDialogProps> = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Anulo',
  width = 400,
  height = 'auto',
  modal = true,
  resizable = false,
  className = ''
}) => {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && modal && onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (onClose) {
      onClose();
    }
  };

  const dialogStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    resize: resizable ? 'both' : 'none'
  };

  return (
    <div className="classic-dialog-overlay" onClick={handleOverlayClick}>
      <div className={`classic-dialog ${className}`} style={dialogStyle}>
        {/* Title Bar */}
        <div className="classic-dialog__titlebar">
          <span className="classic-dialog__title">{title}</span>
          {onClose && (
            <button
              className="classic-dialog__close-button"
              onClick={onClose}
              title="Mbyll"
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div className="classic-dialog__content">
          {children}
        </div>

        {/* Action Buttons */}
        {(onConfirm || onCancel) && (
          <div className="classic-dialog__actions">
            {onConfirm && (
              <ClassicButton
                variant="primary"
                onClick={handleConfirm}
                className="classic-dialog__confirm-btn"
              >
                {confirmText}
              </ClassicButton>
            )}
            {onCancel && (
              <ClassicButton
                variant="default"
                onClick={handleCancel}
                className="classic-dialog__cancel-btn"
              >
                {cancelText}
              </ClassicButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicDialog;
