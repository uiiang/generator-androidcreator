import * as fs from 'fs';
import * as path from 'path';
import yo from 'yeoman-generator';
import { ExtensionConfig, Replace } from './extension_config.js';
import Type from 'type-of-is'
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  JSONSchemaSourceData,
  FetchingJSONSchemaStore,
  quicktypeMultiFile,
} from "quicktype-core";

export function toUpperCase(str: string) {
  console.log("toUpperCase", str)
  return str.replace(str[0], str[0].toUpperCase())
}

export function toUpperAll(str: string) {
  return str.toUpperCase()
}

export function toLowerCase(str: string) {
  return str.replace(str[0], str[0].toLowerCase())
}

export function toLowerAll(str: string) {
  return str.toLowerCase()
}

export function convertPath(pathStr: string) {
  return pathStr.replace(/\\/g, '/').replace('//', '/')
}

export function convertDotToPath(pathStr: string) {
  return pathStr.replace(/\./g, '/')
}


export function loadDirList(path: string, exclude: string[] = []) {
  const files = fs.readdirSync(path);
  return files.filter((itemPath) => {
    // console.log('itemPath', path+"/"+itemPath)
    const states = fs.statSync(path + "/" + itemPath)
    // console.log('states', states)
    return states.isDirectory()
  }).map((item) => {
    // console.log("map" , item)
    return item
  }).filter((item) => {
    return exclude.indexOf(item) < 0
  })
}

export function mkdir(path: string){
  fs.mkdirSync(path)
}

export function loadFileList(path: string, exclude: string[] = []) {
  // console.log('loadFileList scanPath',path)
  const files = fs.readdirSync(path);
  return files.filter((itemPath) => {
    // console.log('itemPath', path+"/"+itemPath)
    const states = fs.statSync(path + "/" + itemPath)
    // console.log('states', states)
    return states.isFile()
  }).map((item) => {
    // console.log("map" , item)
    return item
  }).filter((item) => {
    return exclude.indexOf(item) < 0
  })
}
export function getAllFile(scanPath: string) {
  const baseDir = scanPath
  // console.log('getAllFile scanPath',scanPath)
  let res: string[] = []
  function traverse(scanPath: string) {
    fs.readdirSync(scanPath).forEach((file) => {
      const pathname = path.join(scanPath, file)
      if (fs.statSync(pathname).isDirectory()) {
        traverse(pathname)
      } else {
        // console.log('getAllFile scanPath',convertPath(baseDir))
        // console.log('getAllFile replace',convertPath(pathname))
        // console.log('convertPath',convertPath(pathname).replace(convertPath(baseDir),''))
        res.push(convertPath(pathname).replace(convertPath(baseDir), ''))
      }
    })
  }
  traverse(scanPath)
  return res;
}

function loadJsonToMap(josnData: any) {
  const keys = Object.entries(josnData)
  for (const [key, value] of keys) {
    var type = getPropertyType(value)
    console.log('Key', key, 'type', type, 'value', value)
    if (type === 'object') {
      loadJsonToMap(value)
    }
  }
}
export function convertSchemaToData(josnData: {}) {
  loadJsonToMap(josnData)
}


function getPropertyType(value: any) {
  var type = Type.string(value).toLowerCase()
  if (type === 'number') {
    if (Number.isInteger(value)) {
      return 'Long'
    } else {
      return 'Double'
    }
  }
  if (type === 'date') return 'String'
  if (type === 'regexp') return 'String'
  if (type === 'function') return 'String'
  if (type === 'string') return 'String'

  return type
}

export function copyTplFileList(generator: yo, extensionConfig: ExtensionConfig, scanPath: string
  , destinationPath: string,
  exclude: string[] = []) {
  const destPath = destinationPath.length > 0 ? destinationPath + '/' : ''
  const sourcePath = scanPath.length > 0 ? scanPath + '/' : ''
  loadFileList(generator.templatePath(scanPath), exclude)
    .forEach(item => {
      // generator.log('copyTplFileList item',item)
      // generator.log('copyTplFileList templatepath',generator.templatePath(sourcePath+item))
      // generator.log('copyTplFileList destpath',generator.destinationPath(destPath+item))

      generator.fs.copyTpl(generator.templatePath(sourcePath + item),
        generator.destinationPath(destPath + item), extensionConfig);
    })
  // generator.log('==============================')
}

export function copyTplDir(generator: yo, extensionConfig: ExtensionConfig, scanPath: string
  , destinationPath: string,
  exclude: string[] = []) {
  const destPath = destinationPath.length > 0 ? destinationPath + '/' : ''
  const sourcePath = scanPath.length > 0 ? scanPath + '/' : ''
  loadDirList(generator.templatePath(scanPath), exclude)
    .forEach(item => {
      generator.fs.copyTpl(generator.templatePath(sourcePath + item),
        generator.destinationPath(destPath + item), extensionConfig);
    })
}

export function copyTpls(generator: yo,
  extensionConfig: ExtensionConfig, replace: Replace[] = []) {
  replace.forEach(function (rep) {
    generator.fs.copyTpl(generator.templatePath(rep.source),
      generator.destinationPath(rep.target),
      extensionConfig);
  })
}

export function copyTplLibrary(generator: yo,
  extensionConfig: ExtensionConfig, scanPath: string,
  destinationPath: string, sourcePackageDir: string, targetPackageDir: string, exclude: string[] = [], replace: Replace[] = []) {
  generator.log('开始生成library', destinationPath)
  // generator.log('targetPackageDir', targetPackageDir)
  const destPath = destinationPath.length > 0 ? destinationPath + '/' : '/'
  const sourcePath = scanPath.length > 0 ? scanPath + '/' : '/'
  // convertPath(generator.templatePath(scanPath))
  getAllFile(generator.templatePath(scanPath)).filter((item) => {
    return exclude.indexOf(path.basename(item)) < 0
  }).forEach(item => {
    // generator.log('copyTplLibrary before',item)
    var savePath = item.replace(convertPath(sourcePackageDir), convertPath(targetPackageDir))
    replace.forEach(function (rep) {
      // console.log('rep', rep.source, 'item',path.basename(savePath))
      // if (rep.source == path.basename(savePath)) {
      savePath = savePath.replace(rep.source, rep.target)
      // }
    })
    // generator.log('copyTplLibrary item',item)
    // generator.log('copyTplLibrary after',savePath)
    // generator.log('copyTplLibrary template',generator.templatePath(sourcePath+item))
    // generator.log('copyTplLibrary destpath',generator.destinationPath(destPath+savePath))
    generator.fs.copyTpl(generator.templatePath(sourcePath + item),
      generator.destinationPath(destPath + savePath), extensionConfig);
  })
}

export async function loadDataModelSource(dataModelFilePath: string,
  dataModelPackageName: string,
  dataModelBaseClassName: string): Promise<string> {
  const options = {
    lang: 'kotlin',
    inferEnums: false,
    inferMaps: false,
    inferUuids: false,
    rendererOptions: {
      "framework": 'just-types',
      'package': dataModelPackageName
    },
    outputFilename: dataModelBaseClassName + '.kt'
  }
  const sourceContent = fs.readFileSync(dataModelFilePath)

  const jsonInput = jsonInputForTargetLanguage('kotlin')
  await jsonInput.addSource({
    name: dataModelBaseClassName,
    samples: [sourceContent.toString()]
  });
  const inputData = new InputData();
  inputData.addInput(jsonInput);
  options['inputData'] = inputData
  return (await quicktype(options)).lines.join("\n")
}

export function saveProjectInfoJson(generator: yo,
  extensionConfig: ExtensionConfig) {
  console.log('saveProjectInfoJson', generator.destinationPath(), generator.destinationPath('/creator.json'))
  fs.writeFileSync(generator.destinationPath() + '/creator.json', JSON.stringify(extensionConfig, null, "\t"))
}

export function loadProjectInfoJson(generator: yo) {
  try {
    return JSON.parse(fs.readFileSync(generator.destinationPath() + '/creator.json').toString())
  } catch (ex) {
    return Object.create(null)
  }
}