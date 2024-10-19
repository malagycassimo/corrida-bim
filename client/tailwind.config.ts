import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D1005D",
                primaryLightest: "#FFECEF",
                primaryLighter: "#FAC6D0",
                secondary: "#E73285",
                tertiary: "#2E3641",
            },
        },
    },
    plugins: [],
};
export default config;
