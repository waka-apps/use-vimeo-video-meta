const path = require("path");

module.exports = {
  entry: "./index.ts", // エントリーポイントのファイル
  output: {
    path: path.resolve(__dirname, "dist"), // ビルドファイルの出力先
    filename: "use-vimeo-video-meta.js", // 出力するファイル名
    libraryTarget: "umd", // UMD形式で出力
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/, // .js, .ts, .tsxファイルに対して
        exclude: /node_modules/, // node_modulesを除外
        use: {
          loader: "babel-loader", // Babelを使う
        },
      },
    ],
  },
};
