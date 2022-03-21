const { alias } = require("react-app-rewire-alias")

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {}
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  })
  config.resolve.fallback = fallback

  alias({
    "@components": "src/components",
    "@services": "src/services",
    "@pages": "src/pages",
    "@context": "src/context",
  })(config)

  return config
}
