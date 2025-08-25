/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            scale: {
                55: "0.55",
                65: "0.65",
            },
            screens: {
                'xs': '375px',   // iPhone SE / small Androids
                'xxs': '320px',  // very tiny devices
            },
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "50%": { transform: "translateX(5px)" },
                    "75%": { transform: "translateX(-5px)" },
                },
            },
            animation: {
                shake: "shake 0.5s ease-in-out",
            },
        },
    },
    plugins: [],
}
  
  