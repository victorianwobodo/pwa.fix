/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			serif: ['Georgia', 'serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'ascerta-purple': '#534AB7',
  			'soft-coral': '#FAECE7',
  			'soft-green': '#E1F5EE',
  			'soft-purple': '#EEEDFE',
  			'soft-pink': '#FBEAF0',
  			'soft-amber': '#FAEEDA',
  			'soft-blue': '#E6F1FB',
  			primary: {
  				DEFAULT: '#534AB7',
  				foreground: '#FFFFFF'
  			},
  			border: 'hsl(var(--border))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			}
  		},
  		boxShadow: {
  			none: 'none'
  		},
      borderRadius: {
        'none': '0',
        DEFAULT: '0',
        'sm': '0',
        'md': '0',
        'lg': '0',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}