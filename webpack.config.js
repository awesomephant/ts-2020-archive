const path = require("path");
module.exports = {
  entry: {
    main: "./js/index.js",
    cursor: "./js/cursor.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "_site/dist"),
  },
};
