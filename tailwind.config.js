import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        xxs: '400px',
      },
      keyframes: {
        breathing: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg) translateY(0)',
          },
          '40%': {
            transform: 'scale(1.05) rotate(-2.5deg) translateY(-5px)',
          },
        },
      },
      animation: {
        breathing: 'breathing 5s ease-in-out infinite',
      },
      colors: {
        menu: {
          DEFAULT: '#B0C4DE50', // Verde suave para elementos primários
          50: '#E6FFFA',
          100: '#B2F5EA',
          200: '#81E6D9',
          300: '#4FD1C5',
          400: '#38B2AC',
          500: '#319795',
          600: '#2C7A7B',
          700: '#285E61',
          800: '#234E52',
          900: '#1D4044',
        },
        background: {
          DEFAULT: '#1A202C',
        },
        red: {
          700: '#951818',
        },
        blue: {
          700: '#2828c9',
        },
        fighting: {
          DEFAULT: '#ffee00',
          50: '#ffee0050',
        },
        tired: {
          DEFAULT: '#ff9500',
          50: '#ff950040',
        },
        hurted: {
          DEFAULT: '#ff4242',
          50: '#ff424240',
        },
        dying: {
          DEFAULT: '#ff0000',
          50: '#ff000040',
        },
        unconscious: {
          DEFAULT: '#000000',
          50: '#00000080',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: '#4A5568', // Cinza azulado para elementos primários
              50: '#F7FAFC',
              100: '#EDF2F7',
              200: '#E2E8F0',
              300: '#CBD5E0',
              400: '#A0AEC0',
              500: '#718096',
              600: '#4A5568',
              700: '#2D3748',
              800: '#1A202C',
              900: '#171923',
            },
            secondary: {
              DEFAULT: '#2C7A7B', // Verde suave para elementos secundários
              50: '#E6FFFA',
              100: '#B2F5EA',
              200: '#81E6D9',
              300: '#4FD1C5',
              400: '#38B2AC',
              500: '#319795',
              600: '#2C7A7B',
              700: '#285E61',
              800: '#234E52',
              900: '#1D4044',
            },
            success: {
              DEFAULT: '#38A169', // Verde para estados de sucesso
              50: '#E6FFED',
              100: '#C6F6D5',
              200: '#9AE6B4',
              300: '#68D391',
              400: '#48BB78',
              500: '#38A169',
              600: '#2F855A',
              700: '#276749',
              800: '#22543D',
              900: '#1C4532',
            },
            warning: {
              DEFAULT: '#D69E2E', // Amarelo queimado para avisos
              50: '#FFFAEB',
              100: '#FEEBC8',
              200: '#FBD38D',
              300: '#F6AD55',
              400: '#ED8936',
              500: '#DD6B20',
              600: '#D69E2E',
              700: '#B7791F',
              800: '#975A16',
              900: '#744210',
            },
            error: {
              DEFAULT: '#E53E3E', // Vermelho suave para erros
              50: '#FFF5F5',
              100: '#FED7D7',
              200: '#FEB2B2',
              300: '#FC8181',
              400: '#F56565',
              500: '#E53E3E',
              600: '#C53030',
              700: '#9B2C2C',
              800: '#822727',
              900: '#63171B',
            },
          },
        },
      },
    }),
  ],
};
