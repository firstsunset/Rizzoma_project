const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs =require('fs');
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

const PAGES_DIR = `${PATHS.src}/pug/pages/`

const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

/*const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerPlugin()
    ];
  }

  return configObj;
};*/
module.exports = {
    externals: {
    paths: PATHS
  },
    context: path.resolve(__dirname, 'src'), 
    mode: 'development',
    entry: './js/index.js',
    
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
       // assetModuleFilename: `./images/${filename_img('[ext]')}`,
       // assetModuleFilename: `./fonts/${filename_font('[ext]')}`,
        publicPath: ''
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
        ...PAGES.map(page => new HtmlWebpackPlugin({

          template: `${PAGES_DIR}/${page}`,
    
          filename: `./${page.replace(/\.pug/,'.html')}`,
          minify: {
            collapseWhitespace: isProd
        }
    
        })),
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
                //name: `./${filename('[ext]')}`,
                name: `./pug/${filename('[ext]')}`,
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
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
                                   
            },
            
            {

                test: /\.(woff|woff2|eot|ttf|svg)$/i,
        
                type: 'asset/resource',
              
            },
        
          ]
      },

}