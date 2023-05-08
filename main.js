const path = require('path')
const build = require('./build')

async function main() {

  await build(path.resolve(__dirname, './app'), {})
  console.log('-------------------------separate line-----------------------------------')
  await build(path.resolve(__dirname, './app'), {})
}

main()