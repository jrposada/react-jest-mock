module.exports = {
  output: {
    package: './dist',
    lib: './dist/lib',
  },
  src: {
    package: ['./index.js', './package.json'],
    lib: ['./lib/**/*', '!./lib/**/*.d.ts'],
  },
}
