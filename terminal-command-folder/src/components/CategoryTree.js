import React, { useState } from 'react';
import CategoryModal from './CategoryModal';

const CategoryTree = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onContextMenu,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const handleAddCategoryClick = () => {
    setShowAddModal(true);
  };

  const handleAddCategorySubmit = (name) => {
    onAddCategory(name);
    setShowAddModal(false);
  };

  const handleRenameCategoryClick = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setShowRenameModal(true);
  };

  const handleRenameCategorySubmit = (newName) => {
    onRenameCategory(currentCategoryId, newName);
    setShowRenameModal(false);
    setCurrentCategoryId(null);
  };

  const handleDeleteCategoryClick = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category and all its commands?')) {
      onDeleteCategory(categoryId);
    }
  };

  const handleContextMenu = (e, categoryId) => {
    e.preventDefault();
    onContextMenu(e, 'category', categoryId);
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
    <div className="category-tree">
      <div className="category-tree-header">
        <h2>Categories</h2>
        <button
          className="add-category-btn"
          onClick={handleAddCategoryClick}
          title="Add new category"
        >
          ➕
        </button>
      </div>

      <ul className="category-list">
        {categories.map(category => (
          <li
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => onCategorySelect(category.id)}
            onContextMenu={(e) => handleContextMenu(e, category.id)}
          >
            <span className="category-name">
              <span className="category-icon">{getCategoryIcon(category.name)}</span>
              {category.name}
            </span>
          </li>
        ))}
      </ul>

      {showAddModal && (
        <CategoryModal
          title="Add New Category"
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCategorySubmit}
        />
      )}

      {showRenameModal && (
        <CategoryModal
          title="Rename Category"
          show={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          onSubmit={handleRenameCategorySubmit}
          initialValue={categories.find(cat => cat.id === currentCategoryId)?.name || ''}
        />
      )}
    </div>
  );
};

export default CategoryTree;