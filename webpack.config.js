const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pug = require('pug');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
//const { webpackConfig, merge } = require('@rails/webpacker');
//const WebpackAssetsManifest = require('webpack-assets-manifest');

//const ImageminPlugin = require('imagemin-webpack');
//const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const fs = require('fs');

const PATHS = {
  src: path.join(__dirname, 'src'),
  app: path.join(__dirname, 'app'),
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`

const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;


const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return configObj;
};

const plugins = () => {
  const basePlugins = [
    ...PAGES.map(page => new HtmlWebpackPlugin({

      template: `${PAGES_DIR}/${page}`,

      filename: `./${page.replace(/\.pug/, '.html')}`

    })),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'src/assets') , to: path.resolve(__dirname, 'app'), noErrorOnMissing: true,},
        //{from: path.resolve(__dirname, 'src/assets/img') , to: path.resolve(__dirname, 'app/assets/img'), noErrorOnMissing: true,},

              
      ]
    }),
  ];
  return basePlugins;
};

module.exports = {
  
   externals: {
    paths: PATHS
  },
  
 
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'app'),
    assetModuleFilename: `./img/${filename('[ext]')}`,
    
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'app'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : 'source-map',

  module: {    
    rules: [
      
      {
        test: /\.html$/,
        loader: 'html-loader',
        
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      
      {
        test: /\.png/,

       type: 'asset/resource'
        
      },
      
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
        options: {
          name: `./pug/${filename('[ext]')}`,
          pretty: true
        }
       }],
       
      }
    ]
  }
};