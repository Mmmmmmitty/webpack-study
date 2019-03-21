const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') //分离css插件
module.exports={
  entry:{   //入口配置
    entry:'./src/js/entry.js', //键（文件名ps:自定义）值（文件路径）
  },
  output:{  //出口文件的配置项
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].bundle.js' //[name]对应入口配置的文件文件名
  },
  module:{  //模块：例如解读CSS,图片如何转换，压缩
    rules:[
      {
        test:/\.css$/,
        // use:['style-loader','css-loader'] // style-loader要在css-loader之前
        use:ExtractTextPlugin.extract({ // css 分离的loader配置及其他配置
          fallback:'style-loader',
          use:[{
            loader:'css-loader',
            // options:{
            //   minimize:true //css压缩
            // }
          }],
          publicPath:"../"
        })
      },
      {
        test:/\.(jpg|jpeg|gif|png)$/, //配置图片格式
        use:['file-loader?limit=1024&name=./images/[name].[ext]'] // 支持图片
      },
      {
        test:/\.html$/, 
        use:['html-withimg-loader'] //使html内的图片能够正确编译
      },
      {
        test:/\.(eot|svg|ttf|woff|woff2)$/, //配置其他文件
        use:['file-loader?limit=1024&name=./fonts/[name].[ext]'] //  ?limit=1024&name=./fonts/[name].[ext]' 配置大小/文件名及目录
      },
    ]
  },
  plugins:[  //插件，用于生产模版和各项功能
    new ExtractTextPlugin('./css/[name].css'), //配置分离css打包后的目录及文件名
    new HtmlWebpackPlugin({
      template:'./src/index.html',// 配置模板
      minify:{  //压缩
        removeAttributeQuotes:true, // 去除引号
        removeComments:true, // 去除注释
        removeEmptyAttribute:true, // 去除空属性
        collapseWhitespace:true, // 去除空格
      }
    })
  ],
  devServer:{  //配置webpack开发服务功能
    contentBase:'./dist', // 本地服务路径
    //inline:true, //实时刷新
    port:8888,
    // host:'0.0.0.0',
    overlay:{
        errors:true, //编译过程中如果有任何错误，都会显示到页面上
    },
    open:false, //自动帮你打开浏览器
    hot:true
  }
}
