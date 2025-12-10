import React, { useState } from 'react';
import CommandModal from './CommandModal';

const CommandList = ({
  commands,
  searchQuery,
  onCopyCommand,
  onContextMenu,
  onAddCommand,
  onEditCommand,
  onDeleteCommand,
  onMoveCommand,
  categories
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(null);

  const handleAddCommandClick = () => {
    setShowAddModal(true);
  };

  const handleAddCommandSubmit = (commandData) => {
    onAddCommand(commandData);
    setShowAddModal(false);
  };

  const handleEditCommandClick = (command) => {
    setCurrentCommand(command);
    setShowEditModal(true);
  };

  const handleEditCommandSubmit = (updatedData) => {
    onEditCommand(currentCommand.id, updatedData);
    setShowEditModal(false);
    setCurrentCommand(null);
  };

  const handleDeleteCommandClick = (commandId) => {
    if (window.confirm('Are you sure you want to delete this command?')) {
      onDeleteCommand(commandId);
    }
  };

  const handleMoveCommandClick = (commandId) => {
    const categoryNames = categories.map(cat => cat.name);
    const newCategoryName = prompt('Enter the name of the category to move this command to:', '');

    if (newCategoryName && categoryNames.includes(newCategoryName)) {
      const newCategoryId = categories.find(cat => cat.name === newCategoryName).id;
      onMoveCommand(commandId, newCategoryId);
    } else if (newCategoryName) {
      alert('Category not found! Please enter a valid category name.');
    }
  };

  const handleContextMenu = (e, commandId) => {
    e.preventDefault();
    onContextMenu(e, 'command', commandId);
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const getSelectedCategoryName = () => {
    if (searchQuery) return 'Search Results';
    if (!selectedCategory) return 'All Commands';

    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'Unknown Category';
  };

  if (commands.length === 0) {
    return (
      <div className="command-list">
        <div className="command-list-header">
          <h2>{getSelectedCategoryName()}</h2>
          <button className="add-command-btn" onClick={handleAddCommandClick}>
            Add Command
          </button>
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">
            {searchQuery ? 'No commands found' : 'No commands in this category'}
          </h3>
          <p className="empty-state-description">
            {searchQuery
              ? 'Try using different search terms or add a new command.'
              : 'Add your first command to get started!'
            }
          </p>
          <button className="btn btn-primary" onClick={handleAddCommandClick}>
            Add New Command
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="command-list">
      <div className="command-list-header">
        <h2>
          {getSelectedCategoryName()}
          <span className="command-count">({commands.length})</span>
        </h2>
        <button className="add-command-btn" onClick={handleAddCommandClick}>
          Add Command
        </button>
      </div>

      <div className="command-items">
        {commands.map(command => (
          <div
            key={command.id}
            className="command-item"
            onContextMenu={(e) => handleContextMenu(e, command.id)}
          >
            <div
              className="command-text"
              dangerouslySetInnerHTML={{ __html: highlightText(command.text, searchQuery) }}
            />

            {command.description && (
              <div className="command-description">
                {highlightText(command.description, searchQuery)}
              </div>
            )}

            <div className="command-actions">
              <button
                className="copy-btn"
                onClick={() => onCopyCommand(command.text)}
                title="Copy command to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <CommandModal
          title="Add New Command"
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCommandSubmit}
          categories={categories}
        />
      )}

      {showEditModal && currentCommand && (
        <CommandModal
          title="Edit Command"
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditCommandSubmit}
          categories={categories}
          initialValue={currentCommand}
        />
      )}
    </div>
  );
};

export default CommandList;