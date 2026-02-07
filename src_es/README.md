# Bloc de Notas - Aplicación de Ejemplo

Esta es la implementación completa en **español** de la aplicación "Bloc de Notas" del libro "Introducción a React Native: Desarrollo de Aplicaciones Móviles con JavaScript".

## Descripción

Aplicación de notas con soporte completo para Markdown, que incluye:

- ✅ Editor de texto con formato Markdown
- ✅ Vista previa en tiempo real
- ✅ Almacenamiento local con AsyncStorage
- ✅ Exportar/importar notas como archivos .md
- ✅ Compartir notas con otras aplicaciones
- ✅ Barra de herramientas de formato
- ✅ Navegación con React Navigation
- ✅ Gestión de estado con Context API
- ✅ Acceso al sistema de archivos
- ✅ Interfaz Material Design con React Native Paper

## Estructura del Proyecto

```
src_es/
├── src/
│   ├── components/
│   │   ├── MarkdownPreview.js      # Vista previa de Markdown
│   │   └── MarkdownToolbar.js      # Barra de herramientas de formato
│   ├── context/
│   │   └── NotesContext.js         # Context API para gestión de notas
│   ├── screens/
│   │   ├── NotesListScreen.js      # Pantalla de lista de notas
│   │   └── EditorScreen.js         # Pantalla de edición
│   ├── services/
│   │   └── fileService.js          # Servicio de archivos
│   ├── navigation/
│   │   └── AppNavigator.js         # Configuración de navegación
│   ├── utils/
│   │   └── formatDate.js           # Utilidades de formato de fecha
│   └── config/
│       └── theme.js                # Tema de la aplicación
├── App.js                           # Componente principal
└── package.json                     # Dependencias
```

## Instalación

### Prerrequisitos

- Node.js 18 o superior
- React Native CLI
- Xcode (para iOS)
- Android Studio (para Android)

### Pasos

1. Instalar dependencias:
```bash
npm install
```

2. Instalar pods de iOS (solo macOS):
```bash
cd ios && pod install && cd ..
```

3. Ejecutar en Android:
```bash
npm run android
```

4. Ejecutar en iOS:
```bash
npm run ios
```

## Características por Capítulo

### Capítulo 6: Navegación
- Stack Navigator
- NotesListScreen y EditorScreen
- Navegación con parámetros

### Capítulo 7: Gestión del Estado
- Context API (NotesContext)
- CRUD operations
- AsyncStorage para persistencia

### Capítulo 8: Librerías
- React Native Paper para UI
- Vector Icons
- Markdown Display
- Barra de herramientas personalizada

### Capítulo 9: Funcionalidades del Dispositivo
- Sistema de archivos (RNFS)
- Exportar/importar notas
- Document Picker
- Share API

### Capítulo 10: Pruebas
- Jest configurado
- Testing Library
- Ejemplos de pruebas unitarias

## Convenciones de Código

**IMPORTANTE**: Esta versión usa nombres de variables, funciones y componentes en **español**, diferenciándose de la versión en inglés (`src_en/`).

Ejemplos:
- `notasContext` (español) vs `notesContext` (inglés)
- `crearNota()` (español) vs `createNote()` (inglés)
- `PantallaListaNotas` (español) vs `NotesListScreen` (inglés)

## Scripts Disponibles

- `npm start` - Iniciar Metro bundler
- `npm run android` - Ejecutar en Android
- `npm run ios` - Ejecutar en iOS
- `npm test` - Ejecutar pruebas
- `npm run test:watch` - Pruebas en modo watch
- `npm run test:coverage` - Cobertura de código

## Tecnologías Utilizadas

- **React Native 0.73** - Framework móvil
- **React 18** - Librería UI
- **React Navigation 6** - Navegación
- **AsyncStorage** - Almacenamiento local
- **React Native Paper** - Componentes Material Design
- **RNFS** - Sistema de archivos
- **Jest** - Testing

## Licencia

Este código es parte del libro "Introducción a React Native" y se proporciona con fines educativos.

## Autor

Javier Navarro Cerda

## Recursos

- [Documentación React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)
