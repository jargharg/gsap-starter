This repo serves as a base for new One iota Vue.js projects.

It's based on the excellent [Vue CLI 3](https://cli.vuejs.org/guide/) with a few tweaks:
* Vuex and Vue Router are in by default, as is ESLint with [custom Oi Web Apps rules](https://bitbucket.org/oneiota/eslint-config-oi-webapps/)
* Global CSS is defined in *src/styles/main.scss* with some useful default CSS
* SCSS variables and mixins defined in *src/styles/globalImports.scss* are automatically imported to all .vue files for easy theming
* Services/utilities can be defined in *src/services/* and imported to Vue components with `import x from '@/services/x';`
* 2-space indents have been replaced with tabs

You can easily add extra plugins to your project using the Vue CLI (make sure you have `@vue/cli` installed globally first): just run `vue add [name of the plugin]` in the app directory.

## Getting Started
In the terminal, create your new project directory:
```
mkdir example-project
```

Clone the skeleton app repo into the new directory and remove the .git file:
```
git clone --depth=1 --branch=master git@bitbucket.org:oneiota/webapps-skeleton-vue-app.git !$ && rm -rf !$/.git
```

Enter the new directory:
```
cd example-project
```

Install dependencies:
```
npm i
```

Initialise a new git repo:
```
git init
```

## Developing
`npm start` starts a development server at localhost:8080 (or closest port if 8080 isn't available) with Hot-Module-Replacement (HMR) working out of the box.

`npm run build` produces a production-ready bundle in the dist/ directory, with minification for JS/CSS/HTML and auto vendor chunk splitting for better caching. The chunk manifest is inlined into the HTML.

For more information on flags you can add to these commands, see the docs [here](https://cli.vuejs.org/guide/cli-service.html).

## Formatting
Vue files can be auto-formatted very easily in VSCode using the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions. Some settings that I've found useful (add them to your User Settings JSON) are:
```
"prettier.arrowParens": "avoid",
"prettier.semi": true,
"prettier.singleQuote": true,
"prettier.trailingComma": "all",
"prettier.printWidth": 90,
"prettier.tabWidth": 4,
"prettier.useTabs": true,
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatter.js": "prettier",
"vetur.format.defaultFormatter.css": "prettier",
"vetur.format.defaultFormatter.less": "prettier",
"vetur.format.defaultFormatter.postcss": "prettier",
"vetur.format.defaultFormatter.scss": "prettier",
"vetur.format.defaultFormatter.ts": "prettier",
"eslint.validate": [
	{
		"language": "vue",
		"autoFix": true
	},
	{
		"language": "javascript",
		"autoFix": true
	}
]
```

Once these are installed, pressing `CMD + Shift + P` in all .vue and .js files will auto-format your code.

## Resources
* [Vue docs](https://vuejs.org/v2/guide/)
* [Vuex docs](https://vuex.vuejs.org/guide/)
* [Vue Router docs](https://router.vuejs.org/)