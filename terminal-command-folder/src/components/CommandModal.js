import React, { useState, useEffect } from 'react';

const CommandModal = ({ title, show, onClose, onSubmit, categories, initialValue = {} }) => {
  const [commandText, setCommandText] = useState(initialValue.text || '');
  const [commandDescription, setCommandDescription] = useState(initialValue.description || '');
  const [commandCategoryId, setCommandCategoryId] = useState(initialValue.categoryId || categories[0]?.id || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setCommandText(initialValue.text || '');
      setCommandDescription(initialValue.description || '');
      setCommandCategoryId(initialValue.categoryId || categories[0]?.id || '');
      setError('');
    }
  }, [show, initialValue, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = commandText.trim();

    if (!trimmedText) {
      setError('Command text cannot be empty');
      return;
    }

    if (trimmedText.length < 2) {
      setError('Command text must be at least 2 characters long');
      return;
    }

    if (!commandCategoryId) {
      setError('Please select a category');
      return;
    }

    const commandData = {
      text: trimmedText,
      description: commandDescription.trim(),
      categoryId: commandCategoryId
    };

    onSubmit(commandData);
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

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'docker': '🐳',
      'git': '🔧',
      'nginx': '🌐',
      'k8s': '⚙️',
      'aws': '☁️',
      'python': '🐍',
      'linux': '🐧',
      'mysql': '🗄️',
      'redis': '🔴'
    };

    const lowerName = categoryName.toLowerCase();
    return icons[lowerName] || '📁';
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
              <label className="form-label" htmlFor="command-text">
                Command Text <span className="required">*</span>
              </label>
              <input
                type="text"
                id="command-text"
                className={`form-input ${error && !commandText.trim() ? 'error' : ''}`}
                value={commandText}
                onChange={(e) => {
                  setCommandText(e.target.value);
                  setError('');
                }}
                placeholder="Enter command text..."
                autoFocus
                spellCheck="false"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="command-description">
                Description
              </label>
              <textarea
                id="command-description"
                className="form-textarea"
                value={commandDescription}
                onChange={(e) => setCommandDescription(e.target.value)}
                placeholder="Enter command description (optional)..."
                rows="3"
                spellCheck="false"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="command-category">
                Category <span className="required">*</span>
              </label>
              <select
                id="command-category"
                className={`form-select ${error && !commandCategoryId ? 'error' : ''}`}
                value={commandCategoryId}
                onChange={(e) => {
                  setCommandCategoryId(e.target.value);
                  setError('');
                }}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {getCategoryIcon(category.name)} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="form-error">{error}</p>}
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

export default CommandModal;