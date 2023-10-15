import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/ccdevdocs/",
	title: "ccDevDocs",
	description: "A develop document.",
	head: [["link", { rel: "icon", href: "/ccdevdocs/favicon.svg" }]],
	themeConfig: {
		search: {
			provider: "local",
		},
		// https://vitepress.dev/reference/default-theme-config
		logo: "/logo.svg",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Front-end", link: "/front-end/index" },
			{ text: "Website", link: "/website/index" },
			{ text: "Examples", link: "/examples/markdown-examples.md" },
		],

		sidebar: {
			"/front-end/": [
				{
					text: "Front-end",
					items: [],
				},
			],
			"/examples/": [
				{
					text: "Examples",
					items: [
						{
							text: "Markdown Examples",
							link: "/examples/markdown-examples",
						},
						{ text: "Runtime API Examples", link: "/examples/api-examples" },
					],
				},
			],
		},

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
