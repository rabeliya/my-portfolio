
module.exports = (phase, { defaultConfig }) => {
  return {
    images: {
      domains: ['images.microcms-assets.io']
    },
    env: {
      X_WRITE_KEY: process.env.X_WRITE_KEY
    }
  }
}