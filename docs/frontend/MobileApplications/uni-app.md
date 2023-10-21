# 用 VS Code 开发 uni-app 项目

## 1. 开发准备

### 安装 uni-app 插件

-   快速创建页面 - uni-create-view
-   uni-app 代码提示 - uni-helper
-   鼠标悬停查看文档 - uniapp 小程序扩展

### ts 类型校验

-   安装类型声明文件

```bash
pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
```

-   配置 tsconfig.json

```jsonc
{
	"compilerOptions": {
		"types": [
			"@dcloudio/types",
			"@types/wechat-miniprogram",
			"@uni-helper/uni-app-types"
		]
	},
	"vueCompilerOptions": {
		"nativeTags": ["block", "component", "template", "slot"]
	}
}
```

### json 注释问题

-   文件关联 -> manifest.json/pages.json -> jsonc

## 2. 基础架构

### 构建界面

1. 安装 uni-ui

```bash
pnpm i @dcloudio/uni-ui
```

2. 组件自动引入

```jsonc
// pages.json
{
	"easycom": {
		"autoscan": true,
		"custom": {
			// uni-ui 规则如下配置
			"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
		}
	},
	"pages": [
		// …
	]
}
```

3. 配置 ts 类型

```bash
pnpm i -D @uni-helper/uni-ui-types
```

```jsonc
// tsconfig.json
{
	"compilerOptions": {
		"types": [
			"@dcloudio/types",
			"@types/wechat-miniprogram",
			"@uni-helper/uni-app-types",
			"@uni-helper/uni-ui-types"
		]
	}
}
```

### 状态管理

-   小程序端 Pinia 持久化

```js
// stores/modules/member.ts
export const useMemberStore = defineStore(
	"member",
	() => {
		//…省略
	},
	{
		// 配置持久化
		persist: {
			// 调整为兼容多端的API
			storage: {
				setItem(key, value) {
					uni.setStorageSync(key, value);
				},
				getItem(key) {
					return uni.getStorageSync(key);
				},
			},
		},
	},
);
```

### 数据交互

-   请求工具 - uni.request()

1. 基础地址
2. 超时时间
3. 请求头
4. token

-   封装 Promise 请求函数
