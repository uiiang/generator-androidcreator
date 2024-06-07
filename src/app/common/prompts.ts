import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as path from 'path';
import * as tools from './tools.js';
import { ExtensionConfig, LibraryObj, ChoiceOption } from './extension_config.js'

const chalk = new Chalk()


/**
 * 选择[创建工程，创建library，创建datamodel]
* @param {Generator} generator
*/
export async function askForWhatYouDo(generator: yo) {
  const dataSourceType = [
    { name: "create new project", value: "createProject" },
    { name: "create new library", value: "createLibrary" },
    { name: "create new data model", value: "createDatamodel" }
  ]
  const choices: ChoiceOption[] = [];
  for (const g of dataSourceType) {
    choices.push({ name: g.name, value: g.value })
  }
  return (await generator.prompt({
    type: 'list',
    name: 'createType',
    message: '选择你要做什么?',
    default: 'createProject',
    pageSize: choices.length,
    choices,
  })).createType;
}

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
export async function askForLibraryName(generator: yo) {
  return (await generator.prompt({
    type: 'input',
    name: 'libraryName',
    message: 'What\'s the libraryName name of your application?',
    default: 'newlibrary',
    // validate: validator.validateExtensionId
  })).libraryName;
}

export async function askForLibraryType(generator: yo, order: number) {
  const libraryTypeGenerators = [
    { name: "empty template", value: "empty" }
  ]
  if (order > 0) {
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
    message: 'What\'s the library Type of your application?',
    default: 'empty',
    pageSize: choices.length,
    choices,
  })).libraryType
}

export async function askForLibraryInfo(generator: yo) {
  var librarys: LibraryObj[] = []
  for (var i = 0; i < 3; i++) {
    const selectedType = await askForLibraryType(generator, i)
    if (selectedType == 'exit') {
      break;
    }
    const libraryName = await askForLibraryName(generator)
    // console.log('libraryType', selectedType, 'libraryName', libraryName)
    var lib: LibraryObj = {
      libraryName: tools.toLowerCase(libraryName),// 模块名首字母小写
      libraryNameUAll: tools.toUpperAll(libraryName),// 模块名全大写
      libraryNameCU: tools.toUpperCase(libraryName)// 模块名首字母大写
    }
    librarys.push(lib)
  }
  return librarys
}


export async function askForDataModelForLibrary(generator: yo, extensionConfig: ExtensionConfig) {
  const librarys = extensionConfig.librarys
  const choices: ChoiceOption[] = [];
  for (const g of librarys) {
    choices.push({ name: g.libraryName, value: g.libraryName })
  }
  return (await generator.prompt({
    type: 'list',
    name: 'dataModelForLibrary',
    message: '选择生成datamodel到哪个library?',
    pageSize: choices.length,
    choices,
  })).dataModelForLibrary
}

/**
 * 输入生成data model数据源文件路径
* @param {Generator} generator
*/
export async function askForDataModelSourcePath(generator: yo) {
  return (await generator.prompt({
    type: 'input',
    name: 'dataModelFilePath',
    message: '输入生成data model数据源文件路径',
    store: true,
    // validate: validator.validateExtensionId
  })).dataModelFilePath
}


/**
 * 输入生成data model最外层类类名
* @param {Generator} generator
*/
export async function askForDataModelBaseClassName(generator: yo) {
  return (await generator.prompt({
    type: 'input',
    name: 'dataModelBaseClassName',
    message: '输入生成data model最外层类类名',
    store: true,
    // validate: validator.validateExtensionId
  })).dataModelBaseClassName
}

/**
 * Ask for datamodel package name
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export async function askForDataModelPackageName(generator: yo, extensionConfig: ExtensionConfig) {
  let def = "com." + extensionConfig.applicationName;
  return (await generator.prompt({
    type: 'input',
    name: 'dataModelPackageName',
    message: 'What\'s the package name of your data model?',
    default: def || '',
    // validate: validator.validateExtensionId
  })).dataModelPackageName
}
