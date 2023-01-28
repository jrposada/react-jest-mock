const { parallel } = require('gulp')
const del = require('del')

function cleanBuild() {
  return del('./dist')
}

exports.clean = parallel(cleanBuild)
