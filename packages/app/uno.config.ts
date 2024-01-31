// uno.config.ts
import {defineConfig, presetUno, presetWebFonts} from "unocss";
import transformerDirectives from '@unocss/transformer-directives'
import { formkitThemeClassesAsArray } from './src/themes/formkit-theme'

export default defineConfig({
	shortcuts: [
		// ['bg-primary', 'bg-[#0F084B]'],
		['bg-primary', 'bg-[#15C28E]'],
		['bg-secondary', 'bg-[#FCFAF7]'],
		['bg-tertiary', 'bg-[#FAFAFA]'],
		['text-primary', 'text-[#262626]'],
		['text-secondary', 'text-[#0F084B]'],
		[
		  'btn-primary',
		  'flex items-center justify-center !border-none gap-0.5 px-2.5 py-1.5 bg-primary text-sm text-white cursor-pointer rounded transition hover:opacity-80 disabled:cursor-default disabled:opacity-50 decoration-none',
		],
		[
		  'btn-secondary',
		  'flex items-center justify-center gap-0.5 px-2.5 py-1.5 border border-[#E6E6E5] bg-white text-sm text-[#19181E] cursor-pointer rounded transition hover:border-[#1BA774] disabled:cursor-default disabled:opacity-50  border-solid !decoration-none border-2',
		],
		[
		  'btn-save',
		  'flex justify-center items-center bg-[#ECFDF6] gap-0.5 px-2.5 py-1.5 rounded border text-sm border-[#A9F1D2] cursor-pointer transition hover:border-[#1BA774] disabled:cursor-default disabled:opacity-50',
		],
		[
		  'btn-cancel',
		  'flex justify-center items-center bg-red-50 gap-0.5 px-2.5 py-1.5 rounded border text-sm border-red-200 cursor-pointer transition hover:border-red-400 disabled:cursor-default disabled:opacity-50',
		],
	  ],
	theme: {
		container: {
			center: true,
		}
	},
	presets: [
		presetUno(),
		presetWebFonts({
			provider: "bunny",
			fonts: {
				sans: [
				  {
					name: 'SF Text Pro',
					weights: ['100', '200', '300', '400', '500', '600', '700', '800'],
					italic: true,
				  },
				],
				mono: [
				  {
					name: 'Nunito',
					weights: ['100', '200', '300', '400', '500', '600', '700', '800'],
					italic: true,
				  },
				],
			  },
		}),
	],
	transformers: [
		transformerDirectives(),
	],
	safelist: [
		...'prose prose-sm bg-[#E9F4FC] bg-[#EAF5EE] bg-[#F1E7FE] text-secondary text-[#62B1EA] text-[#B989F8] bg-[#1BA774] bg-[#B989F8] bg-[#62B1EA] bg-[#FAA613] bg-[#EF476F] bg-[#9A9A98] bg-[#2DD4BF] bg-[#5048E5] h-10'.split(' '), // Global
		...'!bg-[#F5F5F5] !text-[#595959] !bg-[#FEF3C7] !text-[#D97706] !bg-[#DCFCE7] !text-[#15803D] !bg-[#FFE4E6] !text-[#E11D48]'.split(' '), // Status Tags colors
		...'bg-[#F5F3FF] text-[#6D28D9] bg-[#EFF6FF] text-[#1D4ED8] bg-[#FEF2F2] text-[#B91C1C] bg-[#F0FDF4] text-[#15803D] bg-[#FEFCE8] text-[#A16207]'.split(' '), // Tags colors
		...formkitThemeClassesAsArray(), // Formkit theme
	  ],
});