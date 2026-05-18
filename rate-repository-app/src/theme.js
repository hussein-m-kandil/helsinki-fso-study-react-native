import { Platform } from 'react-native';

const theme = {
  colors: {
    accent: '#24292e',
    surface: '#e1e4e8',
    muted: '#8e939a',
    danger: '#d73a4a',
    contrast: '#fff',
    secondary: '#586069',
    primary: '#0366d6',
  },
  fonts: {
    main: Platform.select({
      default: 'System',
      android: 'Roboto',
      ios: 'Arial',
    }),
  },
};

export default theme;
