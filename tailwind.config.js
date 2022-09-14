const colors = require("tailwindcss/colors");
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  
     darkMode: 'class',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}',  './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {		backgroundImage: {
      'desktopform': "url('/images/form-banner.jpg')",
      'mobileform': "url('/images/short-banner.jpg')"
   }},
    zIndex: {
      '0': 0,
     '10': 10,
     '20': 20,
     '30': 30,
     '40': 40,
     '50': 50,
     '25': 25,
     '50': 50,
     '75': 75,
     '100': 100,
      'auto': 'auto',
    },
    extend: {
      colors: {
        container: {
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '6rem',
          },
        },
        'green': {
          '50': '#f8fbf7', 
          '100': '#f1f8f0', 
          '200': '#dcedd9', 
          '300': '#c7e3c1', 
          '400': '#9dcd93', 
          '500': '#73b865', 
          '600': '#68a65b', 
          '700': '#568a4c', 
          '800': '#456e3d', 
          '900': '#385a31'
        },
        'dark-green': {
          '50': '#f2f8f5', 
          '100': '#e6f0eb', 
          '200': '#c0dace', 
          '300': '#9bc4b1', 
          '400': '#4f9876', 
          '500': '#046c3b', 
          '600': '#046135', 
          '700': '#03512c', 
          '800': '#024123', 
          '900': '#02351d'
        },
        'blue': {
          '50': '#f2f5f7', 
          '100': '#e6ebef', 
          '200': '#c0cdd7', 
          '300': '#99afbf', 
          '400': '#4d748e', 
          '500': '#01385e', 
          '600': '#013255', 
          '700': '#012a47', 
          '800': '#012238', 
          '900': '#001b2e'
        },
        'red': {
          '50': '#fbf5f7', 
          '100': '#f6eaef', 
          '200': '#e9cbd7', 
          '300': '#dbacbf', 
          '400': '#c06e8e', 
          '500': '#a5305e', 
          '600': '#952b55', 
          '700': '#7c2447', 
          '800': '#631d38', 
          '900': '#51182e'
        },
        width: {
          '1/7': '14.2857143%',
          '2/7': '28.5714286%',
          '3/7': '42.8571429%',
          '4/7': '57.1428571%',
          '5/7': '71.4285714%',
          '6/7': '85.7142857%',
        }    
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
    colors: {
      primary: colors.teal,
      gray: colors.neutral,
      kapitus: "#00395d",
      green: "#72b664",
      white: "#ffffff",
      footer: "#e6ebef",
      titleGreen: "rgb(5, 113, 58)",
      pink: "#a94068",
      liteblue: "rgb(102 137 158)",
      errorred: "rgb(170, 68, 107)",
      kapitusLiteGreen: "rgb(115, 181, 100)",
      lightgreen: "rgb(114 182 100)",
      kapitusblue: "#66899e",
      // formred: "#790000",
      formred: "#a94068",
      carouselBlue: "rgb(93, 127, 173)",
      descGreen: "rgb(0, 114, 57)",
      code: {
        green: "#b5f4a5",
        yellow: "#ffe484",
        purple: "#d9a9ff",
        red: "#ff8383",
        blue: "#93ddfd",
      },
    },
    fontFamily: {
      body: ['Lato', 'sans-serif'],
      display: ['Lato', 'sans-serif']
  },
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      animation: ["motion-safe"],
 
    extend: {},
  },
  plugins: [],
};
  
