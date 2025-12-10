import React, { useState, useEffect } from 'react';

const CategoryModal = ({ title, show, onClose, onSubmit, initialValue = '' }) => {
  const [categoryName, setCategoryName] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setCategoryName(initialValue);
      setError('');
    }
  }, [show, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      setError('Category name cannot be empty');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Category name must be at least 2 characters long');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Category name cannot exceed 50 characters');
      return;
    }

    // Validate against special characters
    if (!/^[a-zA-Z0-9_\\-\\s]+$/.test(trimmedName)) {
      setError('Category name can only contain letters, numbers, spaces, hyphens, and underscores');
      return;
    }

    onSubmit(trimmedName);
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`modal-overlay ${show ? 'show' : ''}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={handleClose} title="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="category-name">
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                className={`form-input ${error ? 'error' : ''}`}
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setError('');
                }}
                placeholder="Enter category name..."
                autoFocus
                spellCheck="false"
              />
              {error && <p className="form-error">{error}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {title.includes('Add') ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;