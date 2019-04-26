const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
	runtimeCompiler: true,
	// 是否为生产环境构建生成 source map？
	productionSourceMap: false,
	//[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.(found in Root)
	//https://github.com/vuejs/vue-cli/issues/1875#issuecomment-408739414
	pages: {
		index: {
			// page 的入口
			entry: 'src/index/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'Index Page',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		// 当使用只有入口的字符串格式时，
		// 模板会被推导为 `public/subpage.html`
		// 并且如果找不到的话，就回退到 `public/index.html`。
		// 输出文件名会被推导为 `subpage.html`。
		user: 'src/user/main.js'
	},
	css: {
		loaderOptions: {
		// 给 sass-loader 传递选项
			sass: {
			// @/ 是 src/ 的别名
			// 所以这里假设你有 `src/variables.scss` 这个文件
				data: `@import "@/sass/_variables.scss";`
			}
		}
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 生产环境
			config.plugins.push(
				new CompressionWebpackPlugin({
					// asset: '[path].gz[query]',
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
					threshold: 10240,
					minRatio: 0.8
				})
			)
		} else {
			// 为开发环境修改配置...
			console.log('develop')
		}
	}
}