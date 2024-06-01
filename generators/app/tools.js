
import * as fs from 'fs';
import * as path from 'path';

export function toUpperCase(str) {
  console.log("toUpperCase",str)
  return str.replace(str[0], str[0].toUpperCase())
}

export function toUpperAll(str) {
  return str.toUpperCase()
}

export function toLowerCase(str) {
  return str.replace(str[0], str[0].toLowerCase())
}

export function toLowerAll(str) {
  return str.toLowerCase()
}

export function convertPath(pathStr){
  return pathStr.replace(/\\/g, '/').replace('//','/')
}

export function copyTplFileList(generator, scanPath
  , destinationPath,  extensionConfig, exclude=[]) {
  const destPath = destinationPath.length>0?destinationPath+'/':''
  const sourcePath = scanPath.length>0?scanPath+'/':''
  loadFileList(generator.templatePath(scanPath), exclude)
  .forEach(item => {
    generator.log('copyTplFileList item',item)
    generator.log('copyTplFileList templatepath',generator.templatePath(sourcePath+item))
    generator.log('copyTplFileList destpath',generator.destinationPath(destPath+item))
      
    generator.fs.copyTpl(generator.templatePath(sourcePath+item), 
    generator.destinationPath(destPath+item), extensionConfig);
  })
  generator.log('==============================')
}

export function copyTplDir(generator, scanPath
  , destinationPath, extensionConfig, exclude=[]) {
  const destPath = destinationPath.length>0?destinationPath+'/':''
  const sourcePath = scanPath.length>0?scanPath+'/':''
  loadDirList(generator.templatePath(scanPath), exclude)
  .forEach(item => {
    generator.fs.copyTpl(generator.templatePath(sourcePath+item), 
    generator.destinationPath(destPath+item), extensionConfig);
  })
}

export function copyTplLibrary(generator, scanPath, 
  destinationPath, sourcePackageDir, targetPackageDir,
  extensionConfig, exclude=[], replace=[]) {
    // generator.log('targetPackageDir', targetPackageDir)
    const destPath = destinationPath.length>0?destinationPath+'/':'/'
    const sourcePath = scanPath.length>0?scanPath+'/':'/'
    // convertPath(generator.templatePath(scanPath))
    getAllFile(generator.templatePath(scanPath)).filter((item)=>{
      return exclude.indexOf(path.basename(item)) < 0
    })
    .forEach(item=>{
      // generator.log('copyTplLibrary before',item)
      var savePath = item.replace(convertPath(sourcePackageDir), convertPath(targetPackageDir))
      replace.forEach(function(rep) {
        // console.log('rep', rep.source, 'item',path.basename(savePath))
        // if (rep.source == path.basename(savePath)) {
          savePath = savePath.replace(rep.source, rep.target)
        // }
      })
      // generator.log('copyTplLibrary item',item)
      // generator.log('copyTplLibrary after',savePath)
      // generator.log('copyTplLibrary template',generator.templatePath(sourcePath+item))
      // generator.log('copyTplLibrary destpath',generator.destinationPath(destPath+savePath))
      generator.fs.copyTpl(generator.templatePath(sourcePath+item), 
        generator.destinationPath(destPath+savePath), extensionConfig);
    })
    generator.log('==============================')
}

export function loadDirList(path, exclude=[]) {
  const files = fs.readdirSync(path);
  return files.filter((itemPath)=>{
    console.log('itemPath', path+"/"+itemPath)
    const states = fs.statSync(path+"/"+itemPath)
    // console.log('states', states)
    return states.isDirectory()
  }).map((item)=>{
    console.log("map" , item)
    return item
  }).filter((item)=>{
    return exclude.indexOf(item)<0
  })
}

export function loadFileList(path, exclude=[]) {
  console.log('loadFileList scanPath',path)
  const files = fs.readdirSync(path);
  return files.filter((itemPath)=>{
    console.log('itemPath', path+"/"+itemPath)
    const states = fs.statSync(path+"/"+itemPath)
    // console.log('states', states)
    return states.isFile()
  }).map((item)=>{
    console.log("map" , item)
    return item
  }).filter((item)=>{
    return exclude.indexOf(item)<0
  })
}
export function getAllFile(scanPath){
  const baseDir = scanPath
  console.log('getAllFile scanPath',scanPath)
  let res=[]
  function traverse(scanPath){
      fs.readdirSync(scanPath).forEach((file)=>{
          const pathname=path.join(scanPath,file)
          if(fs.statSync(pathname).isDirectory()){
              traverse(pathname)
          }else{
            // console.log('getAllFile scanPath',convertPath(baseDir))
            // console.log('getAllFile replace',convertPath(pathname))
            // console.log('convertPath',convertPath(pathname).replace(convertPath(baseDir),''))
            res.push(convertPath(pathname).replace(convertPath(baseDir),''))
          }
      })
  }
  traverse(scanPath)
  return res;
}