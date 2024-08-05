/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  sassOptions: {
    prependData: '@import "./styles/theming";',
  },
  swcMinify: true,
  images: {
    domains: ['i.annihil.us'],
  },

  // Webpack customizations
  webpack(config, { dev }) {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          cacheGroups: {
            default: false,
            vendors: false,
            common: {
              name: 'common',
              chunks: 'all',
              minChunks: 2,
              priority: -10,
            },
          },
        },
        runtimeChunk: {
          name: entrypoint => `runtime-${entrypoint.name}`,
        },
      }

      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        })
      )
    }

    return config
  },
}

const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig(config)
