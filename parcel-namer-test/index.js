const path = require('path')
const { Namer } = require('@parcel/plugin')

module.exports = new Namer({
  name({ bundle, logger }) {
    const filePath = bundle.getMainEntry().filePath
    logger.warn({ message: `🚀 ~ filePath: ${filePath}` })
    return null

  },
})
