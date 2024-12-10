
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens:{
        'xss' : '500px',
        'xs' : '410px',
        'xxs' : '320px',
      },
      colors: {
        // primaryGreen: "#00B894", // Couleur pour le bouton "Démarrer"
        // secondaryGreen: "#F4FBF9", // Couleur de fond
        // textDark: "#2D2D2D", // Texte sombre pour les titres
        // textLight: "#777777", // Texte plus clair pour la description
        // buttonYellow: "#FDC82D", // Couleur pour le bouton "Tâches validées"
        pink200: '#EFD9D1', // Replace with actual hex colors
        blue200: '#D5C8E1',
        green200: '#B9E0D6',
        'royal-blue': '#4169E1',
        'light-blue': '#87CEEB',
      },
    },
  },
  plugins: [],
};
