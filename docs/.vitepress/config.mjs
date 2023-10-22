import { defineConfig } from "vitepress";

import nav from './nav.config';
import sidebar from './sidebar.config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	// base: "/ccdevdocs/",
	title: "DevDocs",
	head: [["link", { rel: "icon", href: "/logo.svg" }]],
	cleanUrls: true,

	markdown: {
		lineNumbers: true
	},

	// https://vitepress.dev/reference/default-theme-config
	themeConfig: {
		logo: "/logo.svg",
		lastUpdated: true,
		search: { provider: "local", },

		nav,

		sidebar,

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/cccoding365/ccdevdocs",
			},
		],

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2019-present DoubledConG",
		},
	},
});
