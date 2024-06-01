module.exports = {
  title: 'My React Style Guide',
  components: 'src/components/**/*.tsx',
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
}
