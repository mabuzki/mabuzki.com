const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
	runtimeCompiler: true,
	// 是否为生产环境构建生成 source map？
	productionSourceMap: false,
	//[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.(found in Root)
	//https://github.com/vuejs/vue-cli/issues/1875#issuecomment-408739414
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