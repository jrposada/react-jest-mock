module.exports = {
  output: {
    package: './dist',
    lib: './dist/lib',
  },
  src: {
    package: ['./index.js', './index.d.ts', './package.json'],
    lib: ['./lib/**/*', '!./lib/**/*.d.ts'],
    types: ['./lib/**/*.d.ts'],
  },
}
