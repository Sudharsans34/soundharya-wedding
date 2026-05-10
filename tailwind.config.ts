import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], theme: { extend: { fontFamily: { serifDisplay: ['var(--font-display)', 'serif'], sans: ['var(--font-sans)', 'sans-serif'] }, colors: { ivory: '#FBF5EA', champagne: '#D9B573', cocoa: '#3B2A22', rose: '#B76E79', moss: '#7A8060' }, boxShadow: { soft: '0 24px 80px rgba(59,42,34,.14)' } } }, plugins: [] };
export default config;
