const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const babelOptions = (presets) => {
   const opts = {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-proposal-class-properties"],
   };

   if (presets) {
      if (typeof presets === "string") {
         opts.presets.push(presets);
      } else if (Array.isArray(presets)) {
         presets.forEach((preset) => {
            opts.presets.push(preset);
         });
      }
   }

   return opts;
};

const jsLoaders = (options = {}) => {
   const loaders = [
      {
         loader: "babel-loader",
         options: babelOptions(options.presets || ""),
      },
   ];

   if (isDev) {
      loaders.push("eslint-loader");
   }

   return loaders;
};

const cssLoaders = (extraLoader) => {
   const loaders = [MiniCssExtractPlugin.loader, "css-loader"];

   if (extraLoader) {
      loaders.push(extraLoader);
   }

   return loaders;
};

const optimization = () => {
   const config = {};

   if (isProd) {
      config.minimize = true;
      config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
   }
   return config;
};

module.exports = {
   context: path.resolve(__dirname, "client/src"),
   entry: {
      main: "./index.ts",
   },
   output: {
      filename: filename("js"),
      path: path.resolve(__dirname, "build"),
   },
   resolve: {
      extensions: [".js", ".ts", ".json"],
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
         template: "./index.html",
         scriptLoading: "blocking",
         minify: {
            collapseWhitespace: isProd,
         },
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "client/src/assets/favicon.png"),
               to: path.resolve(__dirname, "build"),
            },
         ],
      }),
      new MiniCssExtractPlugin({
         filename: filename("css"),
      }),
   ],
   optimization: optimization(),
   devServer: {
      port: 3000,
      hot: isDev,
      historyApiFallback: true,
   },
   devtool: isDev ? "source-map" : false,
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders(),
         },
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: jsLoaders({ presets: "@babel/preset-typescript" }),
         },
         {
            test: /\.(png|jpg|svg|gif)$/,
            use: ["file-loader"],
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ["file-loader"],
         },
         {
            test: /\.css$/,
            use: cssLoaders(),
         },
         {
            test: /\.s[ac]ss$/,
            use: cssLoaders("sass-loader"),
         },
      ],
   },
};
