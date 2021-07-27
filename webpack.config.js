const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
//const filename_img = (ext) => (isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`); 
//const filename_font = (ext) => (isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`); 

module.exports = {
    context: path.resolve(__dirname, 'src'), 
    mode: 'development',
    entry: './js/index.js',
    
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        //assetModuleFilename: `./images/${filename_img('png')}`,
        //assetModuleFilename: `./fonts/${filename_font('[ext]')}`,
        publicPath: ''
    },

   /* devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
      }, */

      plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin (),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
          }),
      ],
      module: {
          rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {

                    // Disables attributes processing
                    sources: true,
                },
                
            }, 
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',                
            },
            {

                test: /\.(woff|woff2|eot|ttf|otf)$/i,
        
                type: 'asset/resource',
        
            },
        
          ]
      },

}