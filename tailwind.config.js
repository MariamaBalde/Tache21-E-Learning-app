/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#00B894", // Couleur pour le bouton "Démarrer"
        secondaryGreen: "#F4FBF9", // Couleur de fond
        textDark: "#2D2D2D", // Texte sombre pour les titres
        textLight: "#777777", // Texte plus clair pour la description
        buttonYellow: "#FDC82D", // Couleur pour le bouton "Tâches validées"
      },
    },
  },
  plugins: [],
}

