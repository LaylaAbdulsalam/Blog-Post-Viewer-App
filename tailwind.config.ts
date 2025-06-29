// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                dark: {
                    '900': '#0D1117',
                    '800': '#161B22',
                },
                primary: {
                    '500': '#58A6FF',
                    '700': '#1F6FEB',
                },
                light: {
                    'bg': '#F6F8FA',
                    'text': '#24292F',
                },
                accent: {
                    'bg': '#DDf4FF',
                    'text': '#0969DA',
                }
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
export default config