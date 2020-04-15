const fs = require('fs')
const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const WebpackBar = require('webpackbar')

function getRoutes() {
  let arr = []
  if (process.env === 'production') {
    fs.readdir('./src/pages', (err, files) => {
      arr = Array.from(files)
    })
  }
  return arr
}

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: getRoutes(),
    postProcess(renderedRoute) {
      renderedRoute.html = renderedRoute.html
        .replace(/<script (.*?)>/g, '<script $1 defer>')
        .replace('id="app"', 'id="app" data-server-rendered="true"')
      return renderedRoute
    },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      inject: {},
      // Our view component is rendered after the API
      // request has fetched all the necessary data,
      // so we create a snapshot of the page after the
      // `data-view` attribute exists in the DOM.
      renderAfterElementExists: '[data-view]'
    })
  })
]

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://cdn1.infrapedia.com/dist/'
      : '',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins)
    } else {
      config.plugins.push(new WebpackBar())
    }
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true
      })
  }
}
