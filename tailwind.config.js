/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/components/**/*.{html,js,jsx,ts,tsx}',
    './src/server/**/*.{html,js,jsx,ts,tsx}',
    './src/styles/**/*.{html,js,jsx,ts,tsx}',
    './src/sections/**/*.{html,js,jsx,ts,tsx}',
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
  ],
  darkMode: ['selector'],
  corePlugins: {
    // preflight: false
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'bg-background',
    'bg-foreground',
    'bg-card',
    'bg-card-foreground',
    'bg-popover',
    'bg-popover-foreground',
    'bg-primary',
    'bg-primary/75',
    'bg-primary-foreground',
    'bg-secondary',
    'bg-secondary-foreground',
    'bg-muted',
    'bg-muted-foreground',
    'bg-accent',
    'bg-accent-foreground',
    'bg-destructive',
    'bg-destructive-foreground',
    'bg-border',
    'bg-input',
    'bg-ring',
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
    'bg-sidebar-background',
    'bg-sidebar-foreground',
    'bg-sidebar-primary',
    'bg-sidebar-primary-foreground',
    'bg-sidebar-accent',
    'bg-sidebar-accent-foreground',
    'bg-sidebar-border',
    'bg-sidebar-ring',
    'bg-brand-one',
    'bg-brand-one-DEFAULT',
    'bg-brand-one-foreground',
    'text-brand-one-foreground',
    'bg-brand-one-100',
    'bg-brand-one-200',
    'bg-brand-one-300',
    'bg-brand-one-400',
    'bg-brand-one-500',
    'bg-brand-one-600',
    'bg-brand-one-700',
    'bg-brand-one-800',
    'bg-brand-one-900',
    'bg-brand-two',
    'bg-brand-two-DEFAULT',
    'bg-brand-two-foreground',
    'text-brand-two-foreground',
    'bg-brand-two-100',
    'bg-brand-two-200',
    'bg-brand-two-300',
    'bg-brand-two-400',
    'bg-brand-two-500',
    'bg-brand-two-600',
    'bg-brand-two-700',
    'bg-brand-two-800',
    'bg-brand-two-900',
    'bg-brand-three',
    'bg-brand-three-DEFAULT',
    'bg-brand-three-foreground',
    'text-brand-three-foreground',
    'bg-brand-three-100',
    'bg-brand-three-200',
    'bg-brand-three-300',
    'bg-brand-three-400',
    'bg-brand-three-500',
    'bg-brand-three-600',
    'bg-brand-three-700',
    'bg-brand-three-800',
    'bg-brand-three-900',
    'bg-brand-four',
    'bg-brand-four-DEFAULT',
    'bg-brand-four-foreground',
    'text-brand-four-foreground',
    'bg-brand-four-100',
    'bg-brand-four-200',
    'bg-brand-four-300',
    'bg-brand-four-400',
    'bg-brand-four-500',
    'bg-brand-four-600',
    'bg-brand-four-700',
    'bg-brand-four-800',
    'bg-brand-four-900',
    'from-brand-one',
    'from-brand-two',
    'from-brand-three',
    'from-brand-four',
    'from-brand-five',
    'to-brand-one',
    'to-brand-two',
    'to-brand-three',
    'to-brand-four',
    'to-brand-five',
    // Add other dynamic class names as needed
  ],
  theme: {
    screens: {
      xs: '320px', // Extra small screens (custom)
      sm: '480px', // Small screens
      md: '768px', // Medium screens
      lg: '1024px', // Large screens
      xl: '1280px', // Extra Large screens
      '2xl': '1440px', // 2XL screens
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem', // Base padding for all screens
        sm: '1rem', // Small screens
        md: '1.5rem', // Medium screens
        lg: '2rem', // Large screens
        xl: '3rem', // Extra Large screens
        '2xl': '4rem', // 2XL screens
      },
      screens: {
        xs: '320px', // Extra small screens (custom)
        sm: '480px', // Small screens
        md: '768px', // Medium screens
        lg: '1024px', // Large screens
        xl: '1280px', // Extra Large screens
        '2xl': '1440px', // 2XL screens
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          // DEFAULT: '#A42368',
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ON_HOVER: 'hsla(var(--primary), 0.75)',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        brand: {
          one: {
            //magenta_haze
            DEFAULT: '#a42368',
            foreground: '#fff',
            100: '#210715',
            200: '#420e2a',
            300: '#62153e',
            400: '#831c53',
            500: '#a42368',
            600: '#d33288',
            700: '#de65a6',
            800: '#e998c3',
            900: '#f4cce1',
          },
          two: {
            // teal
            DEFAULT: '#218380',
            100: '#071a19',
            200: '#0d3433',
            300: '#144e4c',
            400: '#1a6866',
            500: '#218380',
            600: '#2fbab5',
            700: '#59d5d1',
            800: '#90e3e0',
            900: '#c8f1f0',
          },
          three: {
            // orange_peel
            DEFAULT: '#ff9f1c',
            100: '#382100',
            200: '#704100',
            300: '#a86200',
            400: '#e08300',
            500: '#ff9f1c',
            600: '#ffb347',
            700: '#ffc675',
            800: '#ffd9a3',
            900: '#ffecd1',
          },
          four: {
            // isabelline
            DEFAULT: '#f2efe9',
            100: '#3c3423',
            200: '#786746',
            300: '#ac9871',
            400: '#cfc3ad',
            500: '#f2efe9',
            600: '#f4f2ed',
            700: '#f7f5f2',
            800: '#faf8f6',
            900: '#fcfcfb',
          },
          five: {
            // space_cadet
            DEFAULT: '#192a51',
            100: '#050810',
            200: '#0a1121',
            300: '#0f1931',
            400: '#142242',
            500: '#192a51',
            600: '#2c4a90',
            700: '#466dc6',
            800: '#849dd9',
            900: '#c1ceec',
          },
        },
        brandold: {
          one: {
            // azul // 203, 100, 33
            DEFAULT: '#0069aa',
            foreground: '#fff',
            100: '#001522',
            200: '#002a43',
            300: '#003e65',
            400: '#005387',
            500: '#0069aa',
            600: '#0092ed',
            700: '#32b0ff',
            800: '#76cbff',
            900: '#bbe5ff',
          },
          two: {
            //verdigris // 179, 78%, 42%
            DEFAULT: '#17bebb',
            100: '#052626',
            200: '#094c4b',
            300: '#0e7271',
            400: '#139996',
            500: '#17bebb',
            600: '#2ce5e2',
            700: '#61ebe9',
            800: '#96f2f0',
            900: '#caf8f8',
          },
          three: {
            // indigo // 281, 78, 23
            DEFAULT: '#4a0d67',
            100: '#0f0315',
            200: '#1e052a',
            300: '#2d083f',
            400: '#3c0a54',
            500: '#4a0d67',
            600: '#7e16ae',
            700: '#ab2de5',
            800: '#c773ee',
            900: '#e3b9f6',
          },
          four: {
            //carrot_orange // 29, 89, 58
            DEFAULT: '#f39237',
            100: '#381d03',
            200: '#703907',
            300: '#a8560a',
            400: '#e0730d',
            500: '#f39237',
            600: '#f6a75d',
            700: '#f8bd86',
            800: '#fad3ae',
            900: '#fde9d7',
          },
        },
      },
      // fontFamily: {
      //   mono: ['var(--font-geist-mono)'],
      //   sans: ['var(--font-geist-sans)'],
      // },
      boxShadow: {
        1: '0px 0px 60px 0px rgba(0, 0, 0, 0.05)',
        2: '0px 0px 15px 10px rgba(255, 255, 255, 0.1)',
        3: '0px 4px 25px 0px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      clipPath: {
        shape: 'polygon(0 0, 100% 0%, 100% 85%, 0 100%)', // Customize this to get the curve or shape you need
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(180deg,var(--tw-gradient-stops))',
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-bold': 'rgb(var(--accent))',
            // '--tw-prose-body': 'var(--text)',
            // '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '3.5rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
          },
        },
      }),
    },
  },
}

export default config
