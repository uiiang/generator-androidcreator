import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as path from 'path';
import * as tools from './tools.js';
import { ExtensionConfig, LibraryObj, ChoiceOption } from './extension_config.js'

const chalk = new Chalk()
/**
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForApplicationName(generator: yo, extensionConfig: ExtensionConfig) {
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
    message: 'What\'s the ' + chalk.blue(order) + ' libraryName name of your application?',
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
    message: 'What\'s the ' + chalk.blue(order) + ' library Type of your application?',
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

export async function askForDataModelSourceType(generator: yo, extensionConfig: ExtensionConfig) {
  const dataSourceType = [
    { name: "json data example", value: "data" },
    { name: "json schema", value: "schema" }
  ]
  const choices: ChoiceOption[] = [];
  for (const g of dataSourceType) {
    choices.push({ name: g.name, value: g.value })
  }
  return generator.prompt({
    type: 'list',
    name: 'dataModelSourceType',
    message: '选择生成datamodel的数据源类型?',
    default: 'data',
    pageSize: choices.length,
    choices,
  }).then(selectedTypeAnswer => {
    extensionConfig.dataModelSourceType = selectedTypeAnswer.dataModelSourceType
  });
}


/**
 * 输入生成data model数据源文件路径
* @param {Generator} generator
*/
export function askForDataModelSourcePath(generator: yo, extensionConfig: ExtensionConfig) {
  return generator.prompt({
    type: 'input',
    name: 'dataModelFilePath',
    message: '输入生成data model数据源文件路径',
    // validate: validator.validateExtensionId
  }).then(selectedTypeAnswer => {
    extensionConfig.dataModelFilePath = selectedTypeAnswer.dataModelFilePath
  });
}


/**
 * 输入生成data model最外层类类名
* @param {Generator} generator
*/
export function askForDataModelBaseClassName(generator: yo, extensionConfig: ExtensionConfig) {
  return generator.prompt({
    type: 'input',
    name: 'dataModelBaseClassName',
    message: '输入生成data model最外层类类名',
    // validate: validator.validateExtensionId
  }).then(selectedTypeAnswer => {
    extensionConfig.dataModelBaseClassName = selectedTypeAnswer.dataModelBaseClassName
  });
}

/**
 * Ask for datamodel package name
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForDataModelPackageName(generator: yo, extensionConfig: ExtensionConfig) {
  let def = "com." + extensionConfig.applicationName;
  return generator.prompt({
    type: 'input',
    name: 'dataModelPackageName',
    message: 'What\'s the package name of your data model?',
    default: def || '',
    // validate: validator.validateExtensionId
  }).then(dataModelPackageNameAnswer => {
    extensionConfig.dataModelPackageName = dataModelPackageNameAnswer.dataModelPackageName;
  });
}


/**
 * 输入datamodel所属的library文件夹路径，用于保存datamodel文件
 * 会自动保存到该library下的\src\main\kotlin\[libraryPackageName]\domain\model目录中
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForDataModelLibraryPath(generator: yo, extensionConfig: ExtensionConfig) {
  return generator.prompt({
    type: 'input',
    name: 'dataModelPackageName',
    message: 'What\'s the package name of your data model?',
    store: true
    // validate: validator.validateExtensionId
  }).then(dataModelPackageNameAnswer => {
    extensionConfig.dataModelPackageName = dataModelPackageNameAnswer.dataModelPackageName;
  });
}