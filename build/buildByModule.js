#!/usr/bin/env node
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')

const resolve = dir => path.resolve(__dirname, dir)

const getModuleList = () => {
  return glob.sync(resolve('../src/modules/*')).map(item => {
    return item.slice(item.lastIndexOf('/') + 1)
  })
}

const isModuleNameValid = moduleName => {
  const moduleList = getModuleList()
  return moduleList.includes(moduleName)
}

// @todo: 记忆上次输入的模块
const askQuestions = () => {
  const questions = [
    {
      name: 'MODULE_NAME',
      type: 'input',
      default: 'framework',
      message: '请问你想打包哪些模块（多个模块以英文逗号隔开）？'
    }
  ]
  return inquirer.prompt(questions)
}

const getModuleName = async() => {
  const answers = await askQuestions()
  return answers.MODULE_NAME
}

const run = modules => {
  // type: serve or build
  const type = process.argv[2]
  const exec = require('child_process').execSync
  modules.forEach(module => {
    console.log(module)
    exec(`cross-env MODULE_NAME=${module} vue-cli-service ${type} `, {
      stdio: 'inherit'
    })
  })
}

const main = async() => {
  let moduleName = await getModuleName()

  while (!moduleName) {
    console.error('请输入 src/modules 下的目录名')
    moduleName = await getModuleName()
  }

  const modulesToBuild = moduleName.split(',').filter(name => {
    return isModuleNameValid(name)
  })

  console.log(
    chalk.bold(`好的，即将打包 ${modulesToBuild.join(', ')} 模块 ...`)
  )

  run(modulesToBuild)
}

main()
