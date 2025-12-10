# Terminal Command Folder

A desktop application for storing and quickly accessing your favorite terminal commands. Built with Electron and React.

## Features

### 📁 **Two-Column Layout**
- **Left Panel**: Collapsible category tree with default categories:
  - Docker 🐳
  - Git 🔧
  - Nginx 🌐
  - Kubernetes ⚙️
  - Linux 🐧
  - MySQL 🗄️

- **Right Panel**: Command list showing all commands in the selected category

### 🔍 **Global Search**
- Real-time search across all commands
- Fuzzy matching supports command text and descriptions
- Highlighted search results for easy identification
- Cross-category search results

### 📝 **Command Management**
- **Add Commands**: Create new commands with text, description, and category
- **Edit Commands**: Modify existing command details
- **Delete Commands**: Remove commands you no longer need
- **Move Commands**: Transfer commands between categories
- **Copy to Clipboard**: One-click command copying with toast notifications

### 🗂️ **Category Management**
- **Create Categories**: Add custom categories for your workflow
- **Rename Categories**: Update category names as needed
- **Delete Categories**: Remove entire categories (with command deletion confirmation)

### 💾 **Data Persistence**
- All data stored locally using `electron-store`
- No external server or database required
- Data preserved between application restarts

### 🎨 **User Experience**
- Clean, modern interface with responsive design
- Dark theme optimized for terminal users
- Toast notifications for successful operations
- Context menus for quick actions
- Keyboard shortcuts support

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
# Start Webpack dev server
npm run dev

# In a new terminal, start Electron
npm start
```

### Build Application
```bash
# Build React application
npm run build

# Start Electron with production build
npm start
```

### Package for Distribution
To package the application for your operating system:

```bash
# For Windows
npm run package:win

# For macOS
npm run package:mac

# For Linux
npm run package:linux
```

## Usage Guide

### Getting Started
1. **Launch the Application**: Open Terminal Command Folder
2. **Browse Categories**: Click on any category in the left panel
3. **View Commands**: See all commands in the selected category
4. **Search Commands**: Use the search bar to find specific commands

### Adding a Command
1. Click the "Add Command" button in the command list header
2. Fill in the command details:
   - **Command Text**: The actual terminal command
   - **Description**: Optional explanation of what the command does
   - **Category**: Select which category to store the command in
3. Click "Add" to save the command

### Copying a Command
1. Find the command you want to copy
2. Click the "Copy" button on the command card
3. The command will be copied to your clipboard
4. A toast notification will confirm the copy

### Searching for Commands
1. Type your search term in the search bar at the top
2. The command list will update in real-time to show matching commands
3. Search results include commands from all categories
4. Matching text is highlighted for easy identification

### Managing Categories
#### Adding a Category
1. Click the "+" button in the category tree header
2. Enter a name for your new category
3. Click "Add" to create the category

#### Renaming a Category
1. Right-click on the category you want to rename
2. Select "Rename Category" from the context menu
3. Enter the new name
4. Click "Save" to update

#### Deleting a Category
1. Right-click on the category you want to delete
2. Select "Delete Category" from the context menu
3. Confirm that you want to delete the category and all its commands
4. Click "Delete" to remove

### Keyboard Shortcuts
- **Ctrl/Cmd + Q**: Quit application
- **Ctrl/Cmd + R**: Reload application
- **Ctrl/Cmd + Shift + I**: Open Developer Tools
- **Ctrl/Cmd + F**: Focus search bar
- **F11**: Toggle full-screen mode

## File Structure

```
terminal-command-folder/
├── main.js                 # Electron main process
├── package.json            # Project dependencies and scripts
├── webpack.config.js       # Webpack configuration
├── .babelrc                # Babel configuration
├── src/                     # React application source
│   ├── index.js            # React entry point
│   ├── index.html          # HTML template
│   ├── App.js              # Main application component
│   ├── App.css             # Global styles
│   ├── components/          # React components
│   │   ├── CategoryTree.js   # Category sidebar component
│   │   ├── CommandList.js    # Command display component
│   │   ├── SearchBar.js      # Search functionality
│   │   ├── Toast.js           # Notification component
│   │   ├── CategoryModal.js   # Category management dialog
│   │   └── CommandModal.js    # Command management dialog
│   └── utils/               # Utility functions
│       ├── storage.js        # Data persistence
│       └── defaultData.js    # Default categories and commands
├── assets/                   # Static assets
├── dist/                     # Production build output
└── README.md                 # This file
```

## Data Storage

The application uses `electron-store` for local data persistence. Data is stored in a JSON file located at:

- **Windows**: `%APPDATA%/terminal-command-folder/config.json`
- **macOS**: `~/Library/Application Support/terminal-command-folder/config.json`
- **Linux**: `~/.config/terminal-command-folder/config.json`

The data structure is:

```json
{
  "categories": [
    {
      "id": "category_unique_id",
      "name": "Category Name",
      "createdAt": "ISO timestamp"
    }
  ],
  "commands": [
    {
      "id": "command_unique_id",
      "text": "command --example",
      "description": "What this command does",
      "categoryId": "category_unique_id",
      "createdAt": "ISO timestamp"
    }
  ]
}
```

## Customization

### Adding Default Categories
Edit `src/utils/defaultData.js` to add your own default categories and commands:

```javascript
// Add to the categories array
{
  id: 'category_custom',
  name: 'Custom Category',
  createdAt: new Date().toISOString()
}
```

### Styling
The application uses CSS modules with a global stylesheet. Modify `src/App.css` to customize the appearance.

### Themes
The application supports a dark theme by default. You can add a light theme by modifying the CSS variables in `src/App.css`.

## Troubleshooting

### Application Won't Start
1. Check that Node.js and npm are installed correctly
2. Delete the `node_modules` folder and reinstall dependencies
3. Check the terminal for error messages

### Data Not Saving
1. Check that the application has write permissions to the data directory
2. Verify that the data file exists and is not corrupted
3. Try resetting the application by deleting the data file

### Performance Issues
1. Close and restart the application
2. Clear out old or unused commands
3. Check that your system meets the minimum requirements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow the existing code style
2. Add comments where necessary
3. Write tests for new functionality
4. Update documentation as needed

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Support

If you encounter any issues or have questions, please create an issue on the project repository.

---

**Enjoy your terminal command management! 🚀**