// const path = require('path');//引入path模块
// console.log(path)
// function resolve(dir){
//     return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
// }

// module.exports={
//     chainWebpack:(config)=>{
//         config.resolve.alias
//             .set('@',resolve('./src'))
//             .set('components',resolve('src/components'))
//             .set('views',resolve('src/views'))
//             .set('assets',resolve('src/assets'))
//             .set('common'.resolve('src/common'))
//             .set('network', resolve('src/network'))
//         //set第一个参数：设置的别名，第二个参数：设置的路径

//     }
// }

const path = require('path')
const resolve = dir => path.join(__dirname, dir)



module.exports = {
	publicPath: './',
	productionSourceMap: false,
	chainWebpack: config => {
		// 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('network', resolve('src/network'))
			.set('common', resolve('src/common'))
	},
	//跨域


	devServer: {
		proxy: {
			'/api': {
				target: 'https://api.jisuapi.com', // 源地址
				ws: true, //代理websockets,配置这个参数
				secure: false, //如果接口是https,需要配置此参数
				changeOrigin: true, // 改变源 是否跨域
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	}
}
