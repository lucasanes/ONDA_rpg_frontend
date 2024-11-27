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
      colors: {
        menu: {
          DEFAULT: '#2C7A7B', // Verde suave para elementos primários
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
            background: {
              DEFAULT: '#1A202C', // Fundo escuro para o tema dark
              foreground: '#E2E8F0', // Texto claro
            },
            cardBackground: {
              DEFAULT: '#2D3748', // Fundo para painéis ou cartões
            },
            border: {
              DEFAULT: '#4A5568', // Bordas sutis
            },
            highlight: {
              DEFAULT: '#38B2AC', // Destaque em verde água
            },
          },
        },
      },
    }),
  ],
};
