var webpack = require('webpack');

var config = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: __dirname+'/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    
    historyApiFallback: true,
    contentBase: './',
    disableHostCheck: true
  },
  performance: { hints: false },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      
    }),
    
  ]
};

module.exports = config;