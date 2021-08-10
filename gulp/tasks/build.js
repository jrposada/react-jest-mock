'use strict'

const { series, src, dest } = require('gulp')
const babel = require('gulp-babel')

const { cleanBuild } = require('./clean')

const config = require('../config')
const babelConfig = require('../../babel.config.json')

function copyPackage() {
  return src(config.src.package).pipe(dest(config.output.package))
}

function buildLib() {
  return src(config.src.lib)
    .pipe(babel(babelConfig))
    .pipe(dest(config.output.lib))
}

function buildTypes() {
  return src(config.src.types).pipe(dest(config.output.lib))
}

exports.build = series(cleanBuild, copyPackage, buildLib, buildTypes)
