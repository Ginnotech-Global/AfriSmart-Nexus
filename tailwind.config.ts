import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))',
					glow: 'hsl(var(--primary-glow))'
				},
				electric: {
					blue: 'hsl(var(--electric-blue))',
					cyan: 'hsl(var(--electric-cyan))',
					purple: 'hsl(var(--electric-purple))',
					green: 'hsl(var(--electric-green))',
					pink: 'hsl(var(--electric-pink))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				health: {
					primary: 'hsl(var(--health-primary))',
					secondary: 'hsl(var(--health-secondary))',
					glow: 'hsl(var(--health-glow))'
				},
				smart: {
					primary: 'hsl(var(--smart-primary))',
					secondary: 'hsl(var(--smart-secondary))',
					glow: 'hsl(var(--smart-glow))'
				},
				agro: {
					primary: 'hsl(var(--agro-primary))',
					secondary: 'hsl(var(--agro-secondary))',
					glow: 'hsl(var(--agro-glow))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'gradient-shift': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(193 100% 50% / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(193 100% 50% / 0.6), 0 0 60px hsl(193 100% 50% / 0.3)',
						transform: 'scale(1.02)'
					}
				},
				'scan-line': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'holographic-shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'data-flow': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'50%': { opacity: '1' },
					'100%': { 
						opacity: '0',
						transform: 'translateX(20px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'scan-line': 'scan-line 2s linear infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'holographic-shimmer': 'holographic-shimmer 2.5s ease-in-out infinite',
				'data-flow': 'data-flow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
