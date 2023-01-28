const { dest, series, src } = require('gulp')
const through = require('through2')
var jsonFormat = require('gulp-json-format')

function generatePackageJson() {
  return src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const json = JSON.parse(file.contents.toString())

        delete json.private
        delete json.scripts
        delete json.browserslist
        delete json.devDependencies
        delete json.overrides
        delete json.jest

        json.sideEffects = false
        json.main = 'lib/index.js'
        json.types = 'lib/index.d.ts'

        file.contents = Buffer.from(JSON.stringify(json))

        cb(null, file)
      })
    )
    .pipe(jsonFormat(4))
    .pipe(dest('./build'))
}

function copyReadme() {
  return src('./README.md').pipe(dest('./build'))
}

exports.build = series(generatePackageJson, copyReadme)
