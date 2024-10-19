import colors from 'tailwindcss/colors';

const yellowPallete = {
  DEFAULT: 'hsl(52, 100%, 50%)',
  25: 'hsl(51, 97%, 98%)',
  50: 'hsl(51, 97%, 92%)',
  100: 'hsl(51, 97%, 84%)',
  200: 'hsl(51, 97%, 75%)',
  300: 'hsl(51, 97%, 66%)',
  400: 'hsl(51, 97%, 58%)',
  500: 'hsl(51, 97%, 50%)',
  600: 'hsl(51, 97%, 38%)',
  700: 'hsl(51, 97%, 24%)',
  800: 'hsl(51, 97%, 10%)',
  900: 'hsl(51, 97%, 04%)',
}

const redPallete = {
  DEFAULT: 'hsl(10, 94%, 45%)',
  25: 'hsl(10, 94%, 98%)',
  50: 'hsl(10, 94%, 92%)',
  100: 'hsl(10, 94%, 84%)',
  200: 'hsl(10, 94%, 75%)',
  300: 'hsl(10, 94%, 66%)',
  400: 'hsl(10, 94%, 56%)',
  500: 'hsl(10, 94%, 50%)',
  600: 'hsl(10, 94%, 38%)',
  700: 'hsl(10, 94%, 22%)',
  800: 'hsl(10, 94%, 10%)',
  900: 'hsl(10, 94%, 04%)',
}

const brandHue = 40;

const grayPallete = {
  DEFAULT: `hsl(${brandHue}, 2%, 45%)`,
  25: `hsl(${brandHue}, 32.3%, 12.7%)`,
  50: `hsl(${brandHue}, 2%, 92%)`,
  100: `hsl(${brandHue}, 2%, 84%)`,
  200: `hsl(${brandHue}, 2%, 75%)`,
  300: `hsl(${brandHue}, 2%, 66%)`,
  400: `hsl(${brandHue}, 2%, 58%)`,
  500: `hsl(${brandHue}, 2%, 50%)`,
  600: `hsl(${brandHue}, 2%, 38%)`,
  700: `hsl(${brandHue}, 2%, 24%)`,
  800: `hsl(${brandHue}, 2%, 10%)`,
  900: `hsl(${brandHue}, 2%, 04%)`,
}

export const colorsConfig = {
  transparent: colors.transparent,
  primary: colors.black,
  black: colors.black,
  white: colors.white,
  green: colors.green,
  red: redPallete,
  yellow: yellowPallete,
  gray: grayPallete,
  accent: colors.black,
}
