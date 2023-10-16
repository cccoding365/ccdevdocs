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
			{ text: "Reading", link: "/reading/index" },
		],

		sidebar: {
			"/front-end/": [
				{
					text: "Front-end",
					items: [
						{
							text: "Internet",
							link: "/front-end/Internet/",
						},
						{
							text: "HTML",
							link: "/front-end/HTML/",
						},
						{
							text: "CSS",
							link: "/front-end/CSS/",
						},
						{
							text: "JavaScript",
							link: "/front-end/JavaScript/",
						},
						{
							text: "Version Control System",
							link: "/front-end/VersionControlSystem/",
						},
						{
							text: "Package Managers",
							link: "/front-end/PackageManagers/",
						},
						{
							text: "Vue",
							link: "/front-end/Vue/",
						},
						{
							text: "React",
							link: "/front-end/React/",
						},
						{
							text: "Markdown",
							link: "/front-end/Markdown/",
						},
						{
							text: "Build Tools",
							link: "/front-end/BuildTools/",
						},
						{
							text: "TypeScript",
							link: "/front-end/TypeScript/",
						},
						{
							text: "Server Side Rendering",
							link: "/front-end/ServerSideRendering/",
						},
						{
							text: "Desktop Applications",
							link: "/front-end/DesktopApplications/",
						},
						{
							text: "Mobile Applications",
							link: "/front-end/MobileApplications/",
						},
						{
							text: "Node.js",
							link: "/front-end/Nodejs/",
						},
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
