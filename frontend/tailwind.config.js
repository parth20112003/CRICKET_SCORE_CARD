/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03a9f4",        // Main blue color
        secondary: "#1976d2",      // Darker blue
        accent: "#ff5722",         // Orange accent
        cricinfo: "#03a9f4",       // ESPNCricinfo blue
        cricinfoLight: "#e1f5fe", // Light blue background
        cricinfoGray: "#f5f5f5",  // Light gray background
        cricinfoText: "#2b2c2d",  // Main text color
        cricinfoSecondary: "#718096", // Secondary text
        live: "#e53e3e",          // Live match indicator
        upcoming: "#3182ce",      // Upcoming match
        completed: "#38a169",     // Completed match
        background: "#f8fafc",    // Page background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 5px 0 rgba(0,0,0,0.05)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
