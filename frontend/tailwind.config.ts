import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        'background': '#093545',
        'input': '#224957',
        'card': '#092C39',
      },
      spacing: {
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '120': '120px',
        '160': '160px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      container: {
        center: true,
        padding: '24px',
      },
      screens: {
        '2xl': '1440px',
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'heading-one': ['64px', { lineHeight: '80px' }],
        'heading-two': ['48px', { lineHeight: '56px' }],
        'heading-three': ['32px', { lineHeight: '40px' }],
        'heading-four': ['24px', { lineHeight: '32px' }],
        'heading-five': ['20px', { lineHeight: '24px' }],
        'heading-six': ['16px', { lineHeight: '24px' }],
        'body-large': ['20px', { lineHeight: '32px' }],
        'body-regular': ['16px', { lineHeight: '24px' }],
        'body-small': ['14px', { lineHeight: '24px' }],
        'body-extra-small': ['12px', { lineHeight: '24px' }],
        caption: ['14px', { lineHeight: '16px' }],
      },
      fontWeight: {
        regular: '400',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('autoprefixer'),
  ],
};
export default config;
