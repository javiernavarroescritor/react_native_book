import { MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498DB',
    secondary: '#2ECC71',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    error: '#E74C3C',
    text: '#2C3E50',
    onSurface: '#2C3E50',
    disabled: '#95A5A6',
    placeholder: '#95A5A6',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 12,
};

export default theme;
