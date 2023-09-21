/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundWhite: '#FCFCFC',
        mainTextGray: '#152938',
        grayBlue: '#7191A5',
        mainButtonOrange: '#FDA214',
        mainButtonOrangeHover: '#FFB84A',
        mainSelectionBlue: '#304859',
        mainSelectionBlueHover: '#304859',
        mainSelectionBlueIdle: '#BCCED9',
        secondButtonGray: '#DFE7EC',
        secondButtonGrayHover: '#6395B8',
        secondButtonIdle: '#DFE7EC'
      },
      fontFamily: {
        atkinson: ['Atkinson Hyperlegible', 'sans-serif']
      },
      fontWeight: {
        bold: '700',
      }
    },
  },
  plugins: [],
}

