// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     darkMode: ["class"],
//     content: [
//       './pages/**/*.{js,jsx}',
//       './components/**/*.{js,jsx}',
//       './app/**/*.{js,jsx}',
//       './src/**/*.{js,jsx}',
//     ],
//     prefix: "",
//     theme: {
//       container: {
//         center: true,
//         padding: "2rem",
//         screens: {
//           "2xl": "1400px",
//         },
//       },
//       extend: {
//         colors: {
//           border: "hsl(var(--border))",
//           input: "hsl(var(--input))",
//           ring: "hsl(var(--ring))",
//           background: "hsl(var(--background))",
//           foreground: "hsl(var(--foreground))",
//           primary: {
//             DEFAULT: "hsl(var(--primary))",
//             foreground: "hsl(var(--primary-foreground))",
//           },
//           secondary: {
//             DEFAULT: "hsl(var(--secondary))",
//             foreground: "hsl(var(--secondary-foreground))",
//           },
//           tertiary: {
//             DEFAULT: "hsl(var(--tertiary))",
//           },
//           destructive: {
//             DEFAULT: "hsl(var(--destructive))",
//             foreground: "hsl(var(--destructive-foreground))",
//           },
//           muted: {
//             DEFAULT: "hsl(var(--muted))",
//             foreground: "hsl(var(--muted-foreground))",
//           },
//           accent: {
//             DEFAULT: "hsl(var(--accent))",
//             foreground: "hsl(var(--accent-foreground))",
//           },
//           popover: {
//             DEFAULT: "hsl(var(--popover))",
//             foreground: "hsl(var(--popover-foreground))",
//           },
//           card: {
//             DEFAULT: "hsl(var(--card))",
//             foreground: "hsl(var(--card-foreground))",
//           },
//         },
//         borderRadius: {
//           lg: "var(--radius)",
//           md: "calc(var(--radius) - 2px)",
//           sm: "calc(var(--radius) - 4px)",
//         },
//         keyframes: {
//           "accordion-down": {
//             from: { height: "0" },
//             to: { height: "var(--radix-accordion-content-height)" },
//           },
//           "accordion-up": {
//             from: { height: "var(--radix-accordion-content-height)" },
//             to: { height: "0" },
//           },
//         },
//         animation: {
//           "accordion-down": "accordion-down 0.2s ease-out",
//           "accordion-up": "accordion-up 0.2s ease-out",
//         },
//         backgroundImage:{
//           hero:'url(/hero/hero-bg.png)',
//           hero_shape:'url(/hero/shape-1.svg)',
//           hero_shape_dark:'url(/hero/shape-1-dark.svg)',
//           hero_shape2_light:'url(/hero/shape-2-light.svg)',
//           hero_shape2_dark:'url(/hero/shape-2-dark.svg)',
//           about_shape_light:'url(/about/shape-light.svg)',
//           about_shape_dark:'url(/about/shapedark.svg)',
//           dots_light:'url(/dots-light.svg)',
//           dots_dark:'url(/dots-dark.svg)',
//           work_project_bg_light:'url(/work/project-bg-light.png)',
//           work_project_bg_dark:'url(/work/project-bg-dark.png)',
//           contact_illustration_light:'url(/contact/illustration-light.svg)',
//           contact_illustration_dark:'url(/contact/illustration-dark.svg)',
//         }
//       },
//     },
//     plugins: [require("tailwindcss-animate")],
//   }


const config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
