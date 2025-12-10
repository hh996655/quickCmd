const Store = require('electron-store').default;

// Initialize Electron Store
const store = new Store({
  name: 'terminal-commands',
  defaults: {
    categories: [],
    commands: []
  }
});

// Save data to storage
const saveData = (data) => {
  try {
    store.set(data);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Load data from storage
const loadData = () => {
  try {
    const data = store.get();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

// Get specific category
const getCategory = (categoryId) => {
  try {
    const categories = store.get('categories');
    return categories.find(category => category.id === categoryId);
  } catch (error) {
    console.error('Error getting category:', error);
    return null;
  }
};

// Get commands by category
const getCommandsByCategory = (categoryId) => {
  try {
    const commands = store.get('commands');
    return commands.filter(command => command.categoryId === categoryId);
  } catch (error) {
    console.error('Error getting commands by category:', error);
    return [];
  }
};

// Add new category
const addCategory = (category) => {
  try {
    const categories = store.get('categories');
    categories.push(category);
    store.set('categories', categories);
    return category;
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
};

// Add new command
const addCommand = (command) => {
  try {
    const commands = store.get('commands');
    commands.push(command);
    store.set('commands', commands);
    return command;
  } catch (error) {
    console.error('Error adding command:', error);
    return null;
  }
};

// Update command
const updateCommand = (commandId, updatedCommand) => {
  try {
    const commands = store.get('commands');
    const commandIndex = commands.findIndex(command => command.id === commandId);

    if (commandIndex !== -1) {
      commands[commandIndex] = { ...commands[commandIndex], ...updatedCommand };
      store.set('commands', commands);
      return commands[commandIndex];
    }

    return null;
  } catch (error) {
    console.error('Error updating command:', error);
    return null;
  }
};

// Delete command
const deleteCommand = (commandId) => {
  try {
    const commands = store.get('commands');
    const updatedCommands = commands.filter(command => command.id !== commandId);
    store.set('commands', updatedCommands);
    return true;
  } catch (error) {
    console.error('Error deleting command:', error);
    return false;
  }
};

// Update category
const updateCategory = (categoryId, updatedCategory) => {
  try {
    const categories = store.get('categories');
    const categoryIndex = categories.findIndex(category => category.id === categoryId);

    if (categoryIndex !== -1) {
      categories[categoryIndex] = { ...categories[categoryIndex], ...updatedCategory };
      store.set('categories', categories);
      return categories[categoryIndex];
    }

    return null;
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
};

// Delete category and all its commands
const deleteCategory = (categoryId) => {
  try {
    // Delete category
    const categories = store.get('categories');
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    store.set('categories', updatedCategories);

    // Delete all commands in this category
    const commands = store.get('commands');
    const updatedCommands = commands.filter(command => command.categoryId !== categoryId);
    store.set('commands', updatedCommands);

    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

// Export all functions
module.exports = {
  saveData,
  loadData,
  getCategory,
  getCommandsByCategory,
  addCategory,
  addCommand,
  updateCommand,
  deleteCommand,
  updateCategory,
  deleteCategory
};