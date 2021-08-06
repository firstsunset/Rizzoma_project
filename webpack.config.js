const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const fs =require('fs');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const filename_img = (ext) => (isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`); 
const filename_font = (ext) => (isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`); 

const PATHS = {
  src: path.join(__dirname, 'src'),
  app: path.join(__dirname, 'app'),
}

//const PAGES_DIR = `${PATHS.src}/pages/`;


//const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));


module.exports = {
    
    externals: {
    paths: PATHS
  },
    context: path.resolve(__dirname, 'src'), 
    mode: 'development',
    entry: {
      registration: '/pages/registration/registration.js',
      uikit: '/pages/uikit/uikit.js',
      
    },
  
       
    output: {
        filename: `js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        //?????
        clean: true,
        assetModuleFilename: `./images/${filename_img('[ext]')}`,
        assetModuleFilename: `./fonts/${filename_font('[ext]')}`,
        publicPath: ''
    },
    optimization: {
      minimize: true,
      minimizer: [
        
       /* new TerserPlugin({
          parallel: true
        }),*/
        
        //new CssMinimizerPlugin()
      ]
    },
    devServer: {
        historyApiFallback: true,
       // contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
      }, 
     // optimization: optimization(),
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/pages/registration/registration.pug'),
          inject: true,
          chunks: ['registration'],
          filename: 'registration.html'
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/pages/uikit/uikit.pug'),
            inject: true,
            chunks: ['uikit'],
            filename: 'uikit.html'
        }),
    
        
        new HtmlWebpackPugPlugin({
          adjustIndent: true
        }),
      /*  new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),*/
        new CleanWebpackPlugin (),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
          }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/assets') , to: path.resolve(__dirname, 'app'), noErrorOnMissing: true}
            ]
          }),
      ],
      devtool: isProd ? false : 'source-map',
      module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {

                    // Disables attributes processing
                    sources: true,
                },
                
            }, 
            {
              test: /\.pug$/,
              use: [{
                loader: 'pug-loader',
                options: {
                pretty: true,
                sources: true,
              }
             }],
             
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: isDev //меняет css без перезвгрузки страницы hot в devServer
                        },
                      },
                      'css-loader'    
                ],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: (resourcePath, context) => {
                          return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                      }
                    },
                    
                    'css-loader',
                    'sass-loader'
                  ],
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'images/[hash][ext]'
                },
                exclude: path.resolve(__dirname, 'src/fonts')
               
                                            
            },
            
            {

                test: /\.(woff|woff2|eot|ttf|svg)$/i,
        
                type: 'asset/resource',
                include: path.resolve(__dirname, 'src/fonts'),
                generator: {
                  filename: 'fonts/[hash][ext]'
                },

              
            },
        
          ]
      },

}