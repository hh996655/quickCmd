import React, { useState, useEffect } from 'react';
import './App.css';
import CategoryTree from './components/CategoryTree';
import CommandList from './components/CommandList';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import { getDefaultData } from './utils/defaultData';
import { saveData, loadData } from './utils/storage';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [commands, setCommands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, type: '', id: '' });

  // Initialize data on first load
  useEffect(() => {
    const savedData = loadData();
    if (savedData && savedData.categories && savedData.commands) {
      setCategories(savedData.categories);
      setCommands(savedData.commands);
      if (savedData.categories.length > 0) {
        setSelectedCategory(savedData.categories[0].id);
      }
    } else {
      const defaultData = getDefaultData();
      setCategories(defaultData.categories);
      setCommands(defaultData.commands);
      setSelectedCategory(defaultData.categories[0].id);
      saveData(defaultData);
    }
  }, []);

  // Save data when changes occur
  useEffect(() => {
    if (categories.length > 0 || commands.length > 0) {
      saveData({ categories, commands });
    }
  }, [categories, commands]);

  // Filter commands by selected category or search query
  const filteredCommands = () => {
    let result = commands;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(command =>
        command.text.toLowerCase().includes(query) ||
        (command.description && command.description.toLowerCase().includes(query))
      );
    } else if (selectedCategory) {
      result = result.filter(command => command.categoryId === selectedCategory);
    }

    return result;
  };

  // Handle copy command to clipboard
  const handleCopyCommand = (commandText) => {
    navigator.clipboard.writeText(commandText).then(() => {
      showToast('Command copied to clipboard!');
    }).catch(err => {
      showToast('Failed to copy command!');
      console.error('Failed to copy:', err);
    });
  };

  // Show toast notification
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2000);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle context menu
  const handleContextMenu = (e, type, id) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      type,
      id
    });
  };

  // Close context menu
  const handleCloseContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, type: '', id: '' });
  };

  // Handle adding new category
  const handleAddCategory = (name) => {
    const newCategory = {
      id: `category_${Date.now()}`,
      name,
      createdAt: new Date().toISOString()
    };
    setCategories([...categories, newCategory]);
    showToast(`Category "${name}" added!`);
  };

  // Handle adding new command
  const handleAddCommand = (commandData) => {
    const newCommand = {
      id: `command_${Date.now()}`,
      text: commandData.text,
      description: commandData.description || '',
      categoryId: commandData.categoryId || selectedCategory,
      createdAt: new Date().toISOString()
    };
    setCommands([...commands, newCommand]);
    showToast('Command added!');
  };

  // Handle editing command
  const handleEditCommand = (commandId, updatedData) => {
    setCommands(commands.map(command =>
      command.id === commandId ? { ...command, ...updatedData } : command
    ));
    showToast('Command updated!');
  };

  // Handle deleting command
  const handleDeleteCommand = (commandId) => {
    setCommands(commands.filter(command => command.id !== commandId));
    showToast('Command deleted!');
  };

  // Handle moving command to another category
  const handleMoveCommand = (commandId, newCategoryId) => {
    setCommands(commands.map(command =>
      command.id === commandId ? { ...command, categoryId: newCategoryId } : command
    ));
    showToast('Command moved!');
  };

  // Handle renaming category
  const handleRenameCategory = (categoryId, newName) => {
    setCategories(categories.map(category =>
      category.id === categoryId ? { ...category, name: newName } : category
    ));
    showToast('Category renamed!');
  };

  // Handle deleting category
  const handleDeleteCategory = (categoryId) => {
    // Delete category and all its commands
    setCategories(categories.filter(category => category.id !== categoryId));
    setCommands(commands.filter(command => command.categoryId !== categoryId));

    // If deleted category was selected, select first available category
    if (selectedCategory === categoryId && categories.length > 1) {
      setSelectedCategory(categories.find(cat => cat.id !== categoryId).id);
    }

    showToast('Category deleted!');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Terminal Command Folder</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="app-body">
        <CategoryTree
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onContextMenu={handleContextMenu}
          onAddCategory={handleAddCategory}
          onRenameCategory={handleRenameCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        <CommandList
          commands={filteredCommands()}
          searchQuery={searchQuery}
          onCopyCommand={handleCopyCommand}
          onContextMenu={handleContextMenu}
          onAddCommand={handleAddCommand}
          onEditCommand={handleEditCommand}
          onDeleteCommand={handleDeleteCommand}
          onMoveCommand={handleMoveCommand}
          categories={categories}
        />
      </div>

      {contextMenu.show && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={handleCloseContextMenu}
        >
          {/* Context menu items will be rendered here based on context type */}
        </div>
      )}

      <Toast show={toast.show} message={toast.message} />
    </div>
  );
};

export default App;