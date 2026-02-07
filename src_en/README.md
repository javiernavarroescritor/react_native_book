# Notes App - Example Application

This is the complete **English** implementation of the "Notes App" from the book "Introduction to React Native: Mobile Application Development with JavaScript".

## Description

Notes application with full Markdown support, including:

- ✅ Text editor with Markdown formatting
- ✅ Real-time preview
- ✅ Local storage with AsyncStorage
- ✅ Export/import notes as .md files
- ✅ Share notes with other applications
- ✅ Formatting toolbar
- ✅ Navigation with React Navigation
- ✅ State management with Context API
- ✅ File system access
- ✅ Material Design interface with React Native Paper

## Project Structure

```
src_en/
├── src/
│   ├── components/
│   │   ├── MarkdownPreview.js      # Markdown preview
│   │   └── MarkdownToolbar.js      # Formatting toolbar
│   ├── context/
│   │   └── NotesContext.js         # Context API for notes management
│   ├── screens/
│   │   ├── NotesListScreen.js      # Notes list screen
│   │   └── EditorScreen.js         # Editor screen
│   ├── services/
│   │   └── fileService.js          # File service
│   ├── navigation/
│   │   └── AppNavigator.js         # Navigation configuration
│   ├── utils/
│   │   └── formatDate.js           # Date formatting utilities
│   └── config/
│       └── theme.js                # App theme
├── App.js                           # Main component
└── package.json                     # Dependencies
```

## Installation

### Prerequisites

- Node.js 18 or higher
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Steps

1. Install dependencies:
```bash
npm install
```

2. Install iOS pods (macOS only):
```bash
cd ios && pod install && cd ..
```

3. Run on Android:
```bash
npm run android
```

4. Run on iOS:
```bash
npm run ios
```

## Features by Chapter

### Chapter 6: Navigation
- Stack Navigator
- NotesListScreen and EditorScreen
- Navigation with parameters

### Chapter 7: State Management
- Context API (NotesContext)
- CRUD operations
- AsyncStorage for persistence

### Chapter 8: Libraries
- React Native Paper for UI
- Vector Icons
- Markdown Display
- Custom toolbar

### Chapter 9: Device Features
- File system (RNFS)
- Export/import notes
- Document Picker
- Share API

### Chapter 10: Testing
- Jest configured
- Testing Library
- Unit test examples

## Code Conventions

**IMPORTANT**: This version uses variable, function, and component names in **English**, differentiating from the Spanish version (`src_es/`).

Examples:
- `notesContext` (English) vs `notasContext` (Spanish)
- `createNote()` (English) vs `crearNota()` (Spanish)
- `NotesListScreen` (English) vs `PantallaListaNotas` (Spanish)

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run test:watch` - Tests in watch mode
- `npm run test:coverage` - Code coverage

## Technologies Used

- **React Native 0.73** - Mobile framework
- **React 18** - UI library
- **React Navigation 6** - Navigation
- **AsyncStorage** - Local storage
- **React Native Paper** - Material Design components
- **RNFS** - File system
- **Jest** - Testing

## License

This code is part of the book "Introduction to React Native" and is provided for educational purposes.

## Author

Javier Navarro Cerda

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)
