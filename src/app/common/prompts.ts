import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as path from 'path';
import * as tools from './tools.js';
import { ExtensionConfig, LibraryObj, ChoiceOption } from './extension_config.js'


/**
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForApplicationName(generator: yo, extensionConfig: ExtensionConfig) {
  let applicationName = generator.options['applicationName'];
  if (applicationName) {
    extensionConfig.applicationName = applicationName;
    return Promise.resolve();
  }
  const nameFromFolder = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';

  return generator.prompt({
    type: 'input',
    name: 'applicationName',
    message: 'What\'s the name of your application?',
    default: generator.appname
  }).then(applicationNameAnswer => {
    // 应用名称首字母小写
    extensionConfig.applicationName = tools.toLowerCase(applicationNameAnswer.applicationName);
    // 应用名称首字母大写
    extensionConfig.applicationNameCU = tools.toUpperCase(applicationNameAnswer.applicationName)
  });
}

/**
 * Ask for base package name
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForBasePackageName(generator: yo, extensionConfig: ExtensionConfig) {
  const basePackageName = generator.options['basePackageName'];
  if (basePackageName) {
    extensionConfig.basePackageName = basePackageName;
    return Promise.resolve();
  }
  let def = "com." + extensionConfig.applicationName;
  return generator.prompt({
    type: 'input',
    name: 'basePackageName',
    message: 'What\'s the package name of your application?',
    default: def || '',
    // validate: validator.validateExtensionId
  }).then(basePackageNameAnswer => {
    extensionConfig.basePackageName = basePackageNameAnswer.basePackageName;
  });
}

/**
 * Ask for library name
* @param {Generator} generator
*/
export async function askForLibraryName(generator: yo, order: string) {
  return (await generator.prompt({
    type: 'input',
    name: 'libraryName',
    message: 'What\'s the ' + order + ' libraryName name of your application?',
    default: 'newlibrary',
    // validate: validator.validateExtensionId
  })).libraryName;
}

export async function askForLibraryType(generator: yo, order: string) {
  const libraryTypeGenerators = [
    { name: "list album template", value: "list" },
    { name: "empty template", value: "empty" }
  ]
  if (order != 'main') {
    libraryTypeGenerators.push({ name: "不再添加library", value: "exit" })
  }
  const choices: ChoiceOption[] = [];
  for (const g of libraryTypeGenerators) {
    const name = g.name;
    choices.push({ name, value: g.value })
  }
  return (await generator.prompt({
    type: 'list',
    name: 'libraryType',
    message: 'What\'s the ' + order + ' library Type of your application?',
    default: 'empty',
    pageSize: choices.length,
    choices,
  })).libraryType
}

export async function askForLibraryInfo(generator: yo, extensionConfig: ExtensionConfig) {
  var librarys: LibraryObj[] = []
  const orders = ['main', 'second', 'thrid']
  for (var i = 0; i < orders.length; i++) {
    const order = orders[i]
    const selectedType = await askForLibraryType(generator, order)
    if (selectedType == 'exit') {
      break;
    }
    const libraryName = await askForLibraryName(generator, order)
    if (order == 'main') {
      extensionConfig.mainLibraryName = tools.toLowerCase(libraryName)// 模块名首字母小写
      extensionConfig.mainLibraryNameUAll = tools.toUpperAll(libraryName)// 模块名首字母小写
      extensionConfig.mainLibraryNameCU = tools.toUpperCase(libraryName)// 模块名首字母小写
    }
    // console.log('libraryType', selectedType, 'libraryName', libraryName)
    var lib: LibraryObj = {
      order: order,
      libraryType: selectedType,
      libraryName: tools.toLowerCase(libraryName),// 模块名首字母小写
      libraryNameUAll: tools.toUpperAll(libraryName),// 模块名全大写
      libraryNameCU: tools.toUpperCase(libraryName)// 模块名首字母大写
    }
    librarys.push(lib)
  }
  // generator.log(librarys[1])
  extensionConfig.librarys = librarys
}
