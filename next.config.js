require('dotenv').config()

module.exports = (phase, { defaultConfig }) => {
  return {
    images: {
      domains: ['images.microcms-assets.io']
    },
    env: {
      x_write_key: process.env.X_WRITE_KEY
    }
  }
}