import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      "primary": "#830eff",
      "roxinho": "#c9a6ee",
      "primary-hover": "#9e4ff3",
      "primary-focus": "#5b00bd",
      "text-primary": "#4a4c4f",
      "text-primary2": "#6a4494",
      "paper": "#f7f4f8",
      "background": "#f0f0fa80",
      "background-dark": "#e7e7f180",
      "verde": "#5dff80",
      "verde-dark": "#188d31",
      "verdinho": "#a3ffb7",
      "vermelho": "#ff3232",
      "vermelho-dark": "#7c0f0f",
      "vermelhinho": "#ff9595",
    }
  },
  plugins: [],
};

export default config;
