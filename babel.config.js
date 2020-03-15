const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  [
    'import',
    { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
  ]
]
if (IS_PROD) {
  plugins.push('transform-remove-console')
  plugins.push('lodash')
}

module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins
}
