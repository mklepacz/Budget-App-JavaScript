const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');

module.exports = { 
  mode: 'none',
  entry:'./src/js/app.js',
  devServer: {
    contentBase: './dist',
  },
  output: { 
    
    path: resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
  }, 
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: 'Budget App JavaScript',
        template: 'src/index-template.html',
        filename: 'index.html',
        meta: {
          'viewport': 'width=device-width, initial-scale=1.0',
          'author': 'Mateusz Klepacz, mateusz.klepacz@outlook.com',
          'description': 'Aplikacja do przeliczania i planowania domowych wydatków',
          'keywords': 'domowy budżet, domowe wydatki, kalkulator wydatków',
          'geo.region': 'PL-PK',
          'geo.placename': 'Rzeszów',
          'geo.position': '50.0054089,21.9184154',
          'ICBM': '50.0054089,21.9184154',
          'theme-color': '#000'
        }}),
        new CleanWebpackPlugin(),
        new AppManifestWebpackPlugin({
          logo: './src/image/logo.png',
          inject: true,
          prefix: '',
          output: '/icons/', 
          config: {
            appName: 'Budget App JavaScript',
            appDescription: null,
            developerName: null,
            developerURL: null,
            background: null,
            theme_color: null,
            version: '1.0',
            logging: false, 
            icons: {
              android: false,
              appleIcon: true,
              appleStartup: false, 
              coast: false, 
              favicons: true, 
              firefox: false, 
              windows: false, 
              yandex: false, 
            },
          }
        })
    ]
}

