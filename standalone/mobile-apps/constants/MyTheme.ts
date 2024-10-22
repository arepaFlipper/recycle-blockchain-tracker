import { DefaultTheme } from '@react-navigation/native'
import { colors } from './Colors'

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[600], // Use your primary color
    background: '#181825', // Customize other colors as needed
    card: '#181825',
    text: '#FFF',
    border: '#cccccc',
  },
}
