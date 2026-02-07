# Introducción a React Native: Desarrollo de Aplicaciones Móviles con JavaScript
# Introduction to React Native: Mobile App Development with JavaScript

**Autor / Author**: Javier Navarro Cerda  
**Fecha de publicación / Publication Date**: 2026-03-01  
**Idiomas / Languages**: Español (Spanish) · English

---

## 📖 Acerca del Libro / About the Book

### 🇪🇸 Español

Libro técnico completo sobre desarrollo de aplicaciones móviles multiplataforma con React Native. Dirigido a desarrolladores que desean aprender a crear aplicaciones nativas para iOS y Android utilizando JavaScript y React.

El libro cubre desde conceptos básicos hasta temas avanzados, construyendo progresivamente una **aplicación completa: "Bloc de Notas"** - un editor de texto con formato Markdown.

### 🇬🇧 English

Comprehensive technical book about cross-platform mobile app development with React Native. Aimed at developers who want to learn to create native apps for iOS and Android using JavaScript and React.

The book covers from basic concepts to advanced topics, progressively building a **complete application: "Notes App"** - a text editor with Markdown formatting.

---

## 📂 Estructura del Repositorio / Repository Structure

```
React-Native-Book/
├── src_es/                  # 🇪🇸 Código completo de la app en español
│   ├── App.js
│   ├── package.json
│   ├── README.md
│   └── src/
│       ├── components/
│       ├── screens/
│       ├── context/
│       ├── services/
│       ├── navigation/
│       ├── utils/
│       └── config/
│
├── src_en/                  # 🇬🇧 Complete app code in English
│   └── (same structure as src_es/)
└── README.md               # Este archivo / This file
```

---

## 💡 Diferencia entre src_es/ y src_en/ / Difference between src_es/ and src_en/

### 🇪🇸 Español

Ambas carpetas contienen **exactamente el mismo código** con la misma funcionalidad, estructura y lógica. La única diferencia es la **nomenclatura** de variables, funciones y comentarios:

- **src_es/**: Nombres en español (`crearNota()`, `notas`, `guardarNotas()`)
- **src_en/**: Nombres en inglés (`createNote()`, `notes`, `saveNotes()`)

Esto permite que los lectores del libro en español vean código con nomenclatura familiar, mientras que los lectores en inglés tengan la misma experiencia en su idioma.

**Ejemplo comparativo:**

```javascript
// src_es/utils/formatDate.js
export const formatearFecha = (fecha) => {
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString('es-ES');
};

// src_en/utils/formatDate.js
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US');
};
```

### 🇬🇧 English

Both folders contain **exactly the same code** with identical functionality, structure, and logic. The only difference is the **naming convention** of variables, functions, and comments:

- **src_es/**: Spanish names (`crearNota()`, `notas`, `guardarNotas()`)
- **src_en/**: English names (`createNote()`, `notes`, `saveNotes()`)

This allows Spanish readers to see code with familiar nomenclature, while English readers have the same experience in their language.

**Comparative example:**

```javascript
// src_es/utils/formatDate.js
export const formatearFecha = (fecha) => {
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString('es-ES');
};

// src_en/utils/formatDate.js
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US');
};
```

---

---

## 📚 Estructura del Libro / Book Structure

### 🇪🇸 Contenido en Español

El libro está organizado en **12 capítulos**:

1. **Introducción** - ¿Qué es React Native?, historia, ventajas y desventajas
2. **Preparación del Entorno de Desarrollo** - Instalación completa para macOS, Windows y Linux
3. **Tu Primera Aplicación: Hello World** - Creación y ejecución del primer proyecto
4. **Componentes Básicos** - View, Text, Image, Button, ScrollView, FlatList
5. **Estilos y Diseño** - StyleSheet, Flexbox, diseño responsivo
6. **Navegación** - React Navigation, Stack Navigator, paso de parámetros
7. **Gestión del Estado** - useState, Context API, AsyncStorage
8. **Librerías y Herramientas** - React Native Paper, Markdown, iconos
9. **Funcionalidades del Dispositivo** - Sistema de archivos, permisos, compartir
10. **Depuración y Pruebas** - Flipper, Reactotron, Jest, Testing Library
11. **Publicación** - Google Play Store y Apple App Store
12. **Conclusión y Recursos** - Resumen y próximos pasos

### 🇬🇧 English Content

The book is organized in **12 chapters**:

1. **Introduction** - What is React Native? History, advantages and disadvantages
2. **Environment Setup** - Complete installation for macOS, Windows and Linux
3. **Your First App: Hello World** - Creating and running the first project
4. **Basic Components** - View, Text, Image, Button, ScrollView, FlatList
5. **Styles and Design** - StyleSheet, Flexbox, responsive design
6. **Navigation** - React Navigation, Stack Navigator, passing parameters
7. **State Management** - useState, Context API, AsyncStorage
8. **Libraries and Tools** - React Native Paper, Markdown, icons
9. **Device Features** - File system, permissions, sharing
10. **Debugging and Testing** - Flipper, Reactotron, Jest, Testing Library
11. **Publishing** - Google Play Store and Apple App Store
12. **Conclusion and Resources** - Summary and next steps

---

## 📱 Aplicación de Ejemplo: "Bloc de Notas" / Sample App: "Notes"

### 🇪🇸 Español

Los capítulos 6-10 construyen progresivamente una aplicación completa de edición de notas con las siguientes características:

**Funcionalidades:**
- ✏️ Editor de texto con formato Markdown
- 📝 Preview en tiempo real del Markdown
- 💾 Guardar notas en AsyncStorage
- 📂 Exportar notas como archivos .md
- 📥 Importar archivos desde el dispositivo
- 🗑️ Crear, editar y eliminar notas
- 🎨 Interfaz moderna con Material Design (React Native Paper)
- 🔄 Navegación fluida entre pantallas

**Estructura del código:**
```
src/
├── components/
│   ├── MarkdownPreview.js      # Renderiza Markdown
│   └── MarkdownToolbar.js      # Barra de herramientas de formato
├── screens/
│   ├── NotesListScreen.js      # Lista de notas
│   └── EditorScreen.js         # Editor de notas
├── context/
│   └── NotesContext.js         # Estado global con Context API
├── services/
│   └── fileService.js          # Servicio de archivos
├── navigation/
│   └── AppNavigator.js         # Configuración de navegación
├── utils/
│   └── formatDate.js           # Utilidades de fecha
└── config/
    └── theme.js                # Tema de Material Design
```

### 🇬🇧 English

Chapters 6-10 progressively build a complete note-taking application with the following features:

**Features:**
- ✏️ Text editor with Markdown formatting
- 📝 Real-time Markdown preview
- 💾 Save notes in AsyncStorage
- 📂 Export notes as .md files
- 📥 Import files from device
- 🗑️ Create, edit and delete notes
- 🎨 Modern UI with Material Design (React Native Paper)
- 🔄 Smooth navigation between screens

**Code structure:**
```
src/
├── components/
│   ├── MarkdownPreview.js      # Renders Markdown
│   └── MarkdownToolbar.js      # Formatting toolbar
├── screens/
│   ├── NotesListScreen.js      # Notes list
│   └── EditorScreen.js         # Note editor
├── context/
│   └── NotesContext.js         # Global state with Context API
├── services/
│   └── fileService.js          # File service
├── navigation/
│   └── AppNavigator.js         # Navigation setup
├── utils/
│   └── formatDate.js           # Date utilities
└── config/
    └── theme.js                # Material Design theme
```

---

---

## 🛠️ Tecnologías y Herramientas / Technologies and Tools

### Versiones / Versions (2026)

| Tecnología / Technology | Versión / Version |
|------------------------|-------------------|
| React Native | 0.73.4 |
| React | 18.2.0 |
| React Navigation | 6.1.10+ |
| React Native Paper | 5.11.6+ |
| AsyncStorage | 1.21.0+ |
| React Native FS | 2.20.0+ |
| Jest | 29+ |

### Stack Completo / Complete Stack

**UI & Styling:**
- React Native Paper (Material Design)
- React Native Vector Icons
- StyleSheet & Flexbox

**Navigation:**
- React Navigation 6
- Stack Navigator
- Safe Area Context

**State Management:**
- Context API
- AsyncStorage (Persistence)

**Markdown:**
- React Native Markdown Display

**File System:**
- React Native FS (File System)
- React Native Share
- React Native Document Picker

**Testing:**
- Jest
- React Native Testing Library

**Development Tools:**
- Flipper
- Reactotron
- React DevTools

---

## 🚀 Cómo Usar Este Repositorio / How to Use This Repository

### 🇪🇸 Para Lectores del Libro en Español

1. Lee el contenido en la carpeta `manuscrito/` (capítulos 01-12)
2. Consulta el código completo en `src_es/`
3. Ejecuta la aplicación:
   ```bash
   cd src_es
   npm install
   npx react-native start
   # En otra terminal:
   npx react-native run-android  # o run-ios
   ```

### 🇬🇧 For English Book Readers

1. Read the content in the `manuscript/` folder (chapters 01-12) *(coming soon)*
2. Check the complete code in `src_en/`
3. Run the application:
   ```bash
   cd src_en
   npm install
   npx react-native start
   # In another terminal:
   npx react-native run-android  # or run-ios
   ```

---

## �� ¿Por Qué React Native? / Why React Native?

### 🇪🇸 Español

**Ventajas:**
1. ✅ **Desarrollo Multiplataforma** - Una base de código para iOS y Android
2. ✅ **Rendimiento Nativo** - Usa componentes nativos reales
3. ✅ **Comunidad Grande** - Ecosistema rico en librerías y recursos
4. ✅ **Hot Reload** - Ver cambios instantáneamente
5. ✅ **Uso de JavaScript/TypeScript** - Lenguajes ampliamente conocidos
6. ✅ **Respaldado por Meta** - Usado en apps como Facebook, Instagram

**Consideraciones:**
- ⚠️ **Rendimiento en gráficos intensivos** - Apps con alta demanda gráfica pueden necesitar código nativo
- ⚠️ **Dependencias de terceros** - Requiere evaluar librerías externas
- ⚠️ **Curva de aprendizaje** - Necesitas conocer React primero

### 🇬🇧 English

**Advantages:**
1. ✅ **Cross-Platform Development** - One codebase for iOS and Android
2. ✅ **Native Performance** - Uses real native components
3. ✅ **Large Community** - Rich ecosystem of libraries and resources
4. ✅ **Hot Reload** - See changes instantly
5. ✅ **JavaScript/TypeScript** - Widely known languages
6. ✅ **Backed by Meta** - Used in apps like Facebook, Instagram

**Considerations:**
- ⚠️ **Graphics-intensive performance** - High-demand graphics apps may need native code
- ⚠️ **Third-party dependencies** - Requires evaluating external libraries
- ⚠️ **Learning curve** - You need to know React first

---

## �📚 Recursos Adicionales / Additional Resources

### 🇪🇸 Español
- [Documentación oficial de React Native](https://reactnative.dev/)
- [React Native en Español (comunidad)](https://es.reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)

### 🇬🇧 English
- [React Native Official Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Community](https://github.com/react-native-community)

### Comunidad / Community
- [GitHub - React Native](https://github.com/facebook/react-native)
- [Stack Overflow - React Native Tag](https://stackoverflow.com/questions/tagged/react-native)
- [Reddit - r/reactnative](https://www.reddit.com/r/reactnative/)
- [Twitter - @reactnative](https://twitter.com/reactnative)
- [Discord - Reactiflux](https://www.reactiflux.com/)

---

## 👨‍💻 Sobre el Autor / About the Author

**Javier Navarro Cerda**  
Desarrollador con experiencia en desarrollo móvil y web, especializado en tecnologías JavaScript y React.

---

## 📄 Licencia / License

Este material es proporcionado con fines educativos.  
This material is provided for educational purposes.

Copyright © 2026 Javier Navarro Cerda

---

**⭐ Si este libro te resulta útil, considera darle una estrella / If you find this book useful, consider giving it a star!**

