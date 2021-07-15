const del = require('del')

const config = require('../config')

function cleanBuild() {
  return del([config.output.package])
}
exports.cleanBuild = cleanBuild
