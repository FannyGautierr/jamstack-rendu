// uno.config.ts
import {defineConfig, presetUno, presetWebFonts} from "unocss";
import transformerDirectives from '@unocss/transformer-directives'

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
		  'flex items-center justify-center gap-0.5 px-2.5 py-1.5 bg-primary text-sm text-white cursor-pointer rounded transition hover:opacity-80 disabled:cursor-default disabled:opacity-50',
		],
		[
		  'btn-secondary',
		  'flex items-center justify-center gap-0.5 px-2.5 py-1.5 border border-[#E6E6E5] bg-white text-sm text-[#19181E] cursor-pointer rounded transition hover:border-[#1BA774] disabled:cursor-default disabled:opacity-50',
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
	]
});
