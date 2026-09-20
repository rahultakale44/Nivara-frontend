import { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

/**
 * Modal Component
 * Accessible dialog/modal overlay
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="nivara-modal-overlay" onClick={onClose}>
      <div
        className={`nivara-modal nivara-modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <div className="nivara-modal-header">
            <h2 id="modal-title" className="nivara-modal-title">
              {title}
            </h2>
            {onClose && (
              <button
                className="nivara-modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div className="nivara-modal-content">{children}</div>
        
        {footer && <div className="nivara-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
