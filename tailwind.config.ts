/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    background: "#FFFFFF",
                    text: "#1F2937",
                    accent: "#3B82F6",
                    muted: "#F3F4F6",
                },
                // Dark mode (Tech Blog)
                dark: {
                    background: "#111827",
                    text: "#F9FAFB",
                    accent: "#10B981",
                    code: "#6366F1",
                }
            }
        },
    },
    plugins: [require('@tailwindcss/typography')]
}
