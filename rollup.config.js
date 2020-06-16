const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const multi = require('@rollup/plugin-multi-entry')
const { terser } = require('rollup-plugin-terser')

const production = !process.env.ROLLUP_WATCH
const preview = process.env.ELEVENTY_ENV === 'development'

module.exports = preview
  ? [{
      input: ['src/assets/js/app.js', 'src/site/_includes/components/**/*.js'],
      output: {
        file: '_site/scripts/bundle.js',
        format: 'iife'
      },
      plugins: [
        commonjs(),
        resolve(),
        multi(),

        // Only minify & uglify in production
        production && terser()
      ]
    },
    {
      input: 'src/assets/js/preview.js',
      output: {
        file: '_site/scripts/preview.js',
        format: 'iife'
      },
      plugins: [
        commonjs(),
        resolve()
      ]
    }
  ]
  : {
    input: ['src/assets/js/app.js', 'src/site/_includes/components/**/*.js'],
    output: {
      file: '_site/scripts/bundle.js',
      format: 'iife'
    },
    plugins: [
      commonjs(),
      resolve(),
      multi(),

      // Only minify & uglify in production
      production && terser()
    ]
  }
