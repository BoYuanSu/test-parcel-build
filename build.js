const path = require('path')
const fs = require('fs')
const { Parcel } = require('@parcel/core')

async function build(projectPath, { publicUrl = './' }) {
  
  const entries = fs.readdirSync(projectPath, { withFileTypes: true })
    .filter(i => i.isFile() && i.name.match(/(html|htm)$/))
    .map(i => path.join(projectPath, i.name))

  if (!entries[0]) {
    return new Error(`找不到打包入口: ${projectPath}`)
  }

  const bundler = new Parcel({
    // entries: path.resolve(__dirname, `${projectPath}/index.html`),
    entries,
    shouldDisableCache: true,
    shouldContentHash: false,
    // defaultConfig: '@parcel/config-default',
    defaultTargetOptions: {
      // publicUrl: './dsg_frontend/wap/dsg586',
      publicUrl,
      sourceMaps: false,
      shouldOptimize: false,
    },
    logLevel: 'warn',
    additionalReporters: [
      {
        packageName: '@parcel/reporter-cli',
        resolveFrom: __filename,
      },
    ],
  })

  try {
    const { bundleGraph, buildTime } = await bundler.run()
    const bundles = bundleGraph.getBundles()
    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`)
    return true
  }
  catch (err) {
    console.log('🚀 ~ err:', err)
    return false
  }
}

module.exports = build
