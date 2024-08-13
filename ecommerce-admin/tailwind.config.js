/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    colors: {
      primary: '#5542F6',
      highlight: '#eae8fb',
      bgGray: '#fbfafd',
    },
    keyframes: {
      bounce: {
        '0%, 20%, 50%, 80%, 100%': {
          transform: 'translateY(0)', // Start and end at the original position
        },
        '40%': {
          transform: 'translateY(-100px)', // Move up higher
        },
        '60%': {
          transform: 'translateY(-50px)', // Slightly down
        },
      },
      shake: {
        '0%, 100%': {
          transform: 'translateX(0)',
        },
        '25%': {
          transform: 'translateX(-10px)',
        },
        '50%': {
          transform: 'translateX(10px)',
        },
        '75%': {
          transform: 'translateX(-10px)',
        },
      },
    },
    animation: {
      bounce: 'bounce 3s ease-in-out', // Bounce once on initial load
      shake: 'shake 0.5s ease-in-out', // Shake animation
    },
  },
};

export const plugins = [];
