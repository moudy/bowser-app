import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEV_PORT = 8093;
const isProduction = process.env.NODE_ENV === 'production';
const devOrigin = `http://localhost:${DEV_PORT}/`;
const PublicPath = isProduction ? 'https://s3.amazonaws.com/react-starter.com/' : devOrigin;
const JSFilename = isProduction ? 'app.[hash].js' : 'app.js';
const CSSFilename = isProduction ? '[name].[hash].css' : '[name].css';
const AppEntry = ['./index.js'];

const cssLoaders = [
  'css-loader?modules&localIdentName=[path][name]__[local]__[hash:base64:5]',
  'autoprefixer-loader?browsers=last 2 versions',
];

if (!isProduction) {
  cssLoaders.unshift('style-loader');
}

const plugins = [
  new HtmlWebpackPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
];

if (isProduction) {
  plugins.push(new ExtractTextPlugin(CSSFilename));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
}

const config = {
  devtool: (isProduction ? null : 'cheap-module-source-map'),
  context: __dirname + '/app'
};

config.entry = {
  app: AppEntry
};

config.resolve = {
  alias: {
    app: __dirname + '/app'
  }
};

config.output = {
  filename: JSFilename,
  path: __dirname + '/dist',
  publicPath: PublicPath
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-1', 'react'],
      }
    },
    {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }
  ]
};

if (isProduction) {
  config.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
  });
} else {
  config.module.loaders.push({
    test: /\.css$/,
    loader: cssLoaders.join('!')
  });
}

config.plugins = plugins;

config.devServer = {
  port: DEV_PORT
};

export default config;

