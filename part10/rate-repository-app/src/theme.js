import { Platform } from 'react-native'

const theme = {
  colors: {
    primary: '#0366d6',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    background: '#e1e4e8',
    white: '#ffffff',
    error: '#d73a4a',
    border: '#d1d5da'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  }
}

export default theme
