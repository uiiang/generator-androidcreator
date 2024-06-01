
import Generator from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from './prompts.js';
import * as tools from './tools.js';
import { mkdirp } from 'mkdirp'
import * as fs from 'fs';

const chalk = new Chalk();

export default {
  id: 'android-showcase',
  aliases: ['android'],
  name: 'Android project show case',
  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  prompting: async (generator, extensionConfig) => {
    await prompts.askForApplicationName(generator, extensionConfig);
    await prompts.askForBasePackageName(generator, extensionConfig);
    await prompts.askForLibraryName(generator, extensionConfig);

    var applicationName = extensionConfig.applicationName
    // 应用名称首字母大写
    extensionConfig.applicationNameCU = tools.toUpperCase(applicationName)
    // 应用名称首字母小写
    extensionConfig.applicationName = tools.toLowerCase(applicationName)
    var libraryName = extensionConfig.libraryName
    // 模块名全大写
    extensionConfig.libraryNameUAll = tools.toUpperAll(libraryName)
    // 模块名首字母大写
    extensionConfig.libraryNameCU = tools.toUpperCase(libraryName)
    // 模块名首字母小写
    extensionConfig.libraryName = tools.toLowerCase(libraryName)

  },
  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  writing: (generator, extensionConfig) => {
    const sourcePackageDir = 'com/igorwojda/showcase'
    var packageName = extensionConfig.basePackageName
    var packageDir = packageName.replace(/\./g, '/');
    // 主工程目录
		tools.copyTplLibrary(generator,'app','app',
    sourcePackageDir, packageDir, extensionConfig, 
    [], [{'source':'ShowcaseApplication.kt','target': extensionConfig.libraryNameCU+'Application.kt'}])

    // feature_base
		tools.copyTplLibrary(generator,'feature_base','feature_base',
    sourcePackageDir,
    packageDir, extensionConfig, [])
		
    // 自定义library(空)
    var feature_libraryName = "feature_" + extensionConfig.libraryName
    tools.copyTplLibrary(generator,'feature_empty',feature_libraryName,
    sourcePackageDir+'/favourite',
    packageDir+'/'+extensionConfig.libraryName, extensionConfig, [],[
    {source:'/favourite/', target:'/'+extensionConfig.libraryName+'/'},{source:'FavouriteKoinModule.kt', target:extensionConfig.libraryNameCU+'KoinModule.kt'}, 
    {source:'FavouriteFragment.kt', target:extensionConfig.libraryNameCU+'Fragment.kt'},
    {source:'feature_favourite_nav_graph.xml', target:'feature_'+extensionConfig.libraryName+'_nav_graph.xml'}])
    
    // library单元测试库
    tools.copyTplLibrary(generator,'konsist_test','konsist_test',
    sourcePackageDir,
    packageDir, extensionConfig, [])
    tools.copyTplLibrary(generator,'library_test_utils','library_test_utils',
    sourcePackageDir,
    packageDir, extensionConfig, [])
    // 工程根目录下的文件
    tools.copyTplFileList(generator, '','', extensionConfig, ['gitignore'])
    generator.fs.copyTpl(generator.templatePath('gitignore'), generator.destinationPath('.gitignore'), extensionConfig);
    
    // 工程中其它目录
    generator.fs.copyTpl(generator.templatePath('gradle'), generator.destinationPath('gradle'), extensionConfig);
    generator.fs.copyTpl(generator.templatePath('buildSrc'), generator.destinationPath('buildSrc'), extensionConfig);

		
		// tools.loadFileList(generator.templatePath('app'))
    // generator.fs.copyTpl(generator.templatePath('library_test_utils'), generator.destinationPath('library_test_utils'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('konsist_test'), generator.destinationPath('konsist_test'), extensionConfig);
		// generator.fs.copyTpl(generator.templatePath(feature_empty_src+"/presentation/screen/favourite/FavouriteFragment.kt"),generator.destinationPath(fetaure_packagePath+'presentation/screen/'+extensionConfig.libraryName+'/'+extensionConfig.libraryNameCU+'Fragment.kt'), extensionConfig)
		
		
    // generator.fs.copyTpl(generator.templatePath(feature_empty_src+'/FavouriteKoinModule.kt'), generator.destinationPath(fetaure_packagePath+extensionConfig.libraryNameCU+'KoinModule.kt'), extensionConfig);

    // generator.fs.copyTpl(generator.templatePath('app'), generator.destinationPath('app'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_base'), generator.destinationPath('feature_base'), extensionConfig);
		
    // // 自定义library
    // var feature_libraryName = "feature_" + extensionConfig.libraryName
    // var feature_librarySrc = feature_libraryName + "/src/main/"
		// var fetaure_packagePath = feature_librarySrc+'/kotlin/' +packageDir + "/"+ extensionConfig.libraryName+'/'
		// var feature_empty_src = "feature_empty/src/main/kotlin/com/igorwojda/showcase/favourite/"
    // tools.copyTplFileList(generator, 'feature_empty',feature_libraryName, extensionConfig)
    // tools.copyTplDir(generator, 'feature_empty/src/main/res',feature_librarySrc+'/res', extensionConfig)
    // tools.copyTplFileList(generator, "feature_empty/src/main/",feature_librarySrc, extensionConfig)

    // tools.copyTplFileList(generator, feature_empty_src+"data",fetaure_packagePath+'data', extensionConfig)
    // tools.copyTplFileList(generator, feature_empty_src+"/domain",fetaure_packagePath+'domain', extensionConfig)
		
    // tools.copyTplFileList(generator, feature_empty_src+"/presentation",fetaure_packagePath+'presentation/', extensionConfig)

		// generator.fs.copyTpl(generator.templatePath(feature_empty_src+"/presentation/screen/favourite/FavouriteFragment.kt"),generator.destinationPath(fetaure_packagePath+'presentation/screen/'+extensionConfig.libraryName+'/'+extensionConfig.libraryNameCU+'Fragment.kt'), extensionConfig)
		
		
    // generator.fs.copyTpl(generator.templatePath(feature_empty_src+'/FavouriteKoinModule.kt'), generator.destinationPath(fetaure_packagePath+extensionConfig.libraryNameCU+'KoinModule.kt'), extensionConfig);

    // generator.fs.copyTpl(generator.templatePath('editorconfig'), generator.destinationPath('editorconfig'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('build.gradle.kts'), generator.destinationPath('build.gradle.kts'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('CODE_OF_CONDUCT.md'), generator.destinationPath('CODE_OF_CONDUCT.md'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('CONTRIBUTING.md'), generator.destinationPath('CONTRIBUTING.md'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('detekt.yml'), generator.destinationPath('detekt.yml'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('gitignore'), generator.destinationPath('gitignore'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('gradle.properties'), generator.destinationPath('gradle.properties'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('gradlew'), generator.destinationPath('gradlew'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('gradlew.bat'), generator.destinationPath('gradlew.bat'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('README.md'), generator.destinationPath('README.md'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('renovate.json'), generator.destinationPath('renovate.json'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('settings.gradle.kts'), generator.destinationPath('settings.gradle.kts'), extensionConfig);
    
    // generator.fs.copyTpl(generator.templatePath('feature_empty/src/main/AndroidManifest.xml'), generator.destinationPath(feature_librarySrc+"/AndroidManifest.xml"), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_empty/build.gradle.kts'), generator.destinationPath(feature_libraryName+'/build.gradle.kts'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_empty/proguard-rules.pro'), generator.destinationPath(feature_libraryName+'/proguard-rules.pro'), extensionConfig);
    

    // generator.fs.copyTpl(generator.templatePath('feature_empty/src/main/res'), generator.destinationPath(feature_librarySrc+"/res"), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_empty/src/main/kotlin/com/igorwojda/showcase/favourite/data'), generator.destinationPath(feature_librarySrc+"/kotlin/"+packageDir+'/data'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_empty/src/main/kotlin/com/igorwojda/showcase/favourite/domain'), generator.destinationPath(feature_librarySrc+"/kotlin/"+packageDir+'/domain'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_empty/src/main/kotlin/com/igorwojda/showcase/favourite/presentation'), generator.destinationPath(feature_librarySrc+"/kotlin/"+packageDir+'/presentation'), extensionConfig);
    // generator.fs.copyTpl(generator.templatePath('feature_empty/src/main/kotlin/com/igorwojda/showcase/favourite/FavouriteKoinModule.kt'), generator.destinationPath(feature_librarySrc+"/kotlin/"+packageDir+"/"+extensionConfig.libraryNameCU+'KoinModule.kt'), extensionConfig);



  },

  // /**
  //  * @param {Generator} generator
  //  * @param {Object} extensionConfig
  //  */
  // endMessage: (generator, extensionConfig) => {
  //   if (extensionConfig.webpack) {
  //     generator.log(chalk.yellow(`To run the extension you need to install the recommended extension 'amodio.tsl-problem-matcher'.`));
  //     generator.log('');
  //   }
  // }
}
