# Package.json

**package.json 的常见配置**

```json
{
	"name": "ccdevdocs", // 名称
	"version": "1.0.0", // 版本
	"description": "DoubledConG's development documents.", // 描述
	"main": "index.js", // 入口
	"scripts": {
		// 脚本
		"dev": "vitepress dev docs",
		"build": "vitepress build docs",
		"preview": "vitepress preview docs"
	},
	"repository": {
		// 仓库
		"type": "git",
		"url": "git+https://github.com/cccoding365/ccdevdocs.git"
	},
	"keywords": ["documents", "notes", "study"], // 关键词
	"author": "DoubledConG", // 作者
	"license": "MIT", // 开源协议
	"bugs": {
		// Bug 反馈地址
		"url": "https://github.com/cccoding365/ccdevdocs/issues"
	},
	"homepage": "https://github.com/cccoding365/ccdevdocs#readme", // 主页
	"devDependencies": {
		// 开发依赖
		"vitepress": "^1.0.0-rc.22"
	}
}
```

## 依赖配置

-   dependencies - 生产环境依赖
-   devDependencies - 开发环境依赖
-   peerDependencies - 兼容依赖
-   optionalDependencies - 不阻断依赖
-   bundledDependencies - 打包依赖
-   engines - 版本要求

## 脚本配置

-   script
-   config

## 文件&目录

-   main - 程序入口
-   browser - 程序入口
-   module - 程序入口
-   bin - 命令行工具入口
-   files - 发布文件配置
-   man - man 文档
-   directories - 项目目录

## 发布配置

-   private - 限制发布
-   preferGlobal - 警告本地安装
-   publishConfig - 限制发布仓库和版本
-   os - 限制用户安装系统
-   cpu - 限制用户安装 CPU
-   license - 开源协议

## 第三方配置

-   typings
-   eslintConfig
-   babel
-   unpkg
-   lint-staged
-   gitHooks
-   browserlist

etc
