
import Generator from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from './prompts.js';
import * as tools from './tools.js';

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
    await prompts.askForLibraryInfo(generator, extensionConfig);
    // await prompts.askForLibraryName(generator, extensionConfig);
  },
  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  writing: (generator, extensionConfig) => {
    const sourcePackageDir = 'com/igorwojda/showcase'
    var packageName = extensionConfig.basePackageName
    var packageDir = packageName.replace(/\./g, '/');
    console.log('开始生成配置文件', extensionConfig)
    // 主工程目录
    generator.log('开始生成主工程目录')
    tools.copyTplLibrary(generator, 'app', 'app',
      sourcePackageDir, packageDir, extensionConfig,
      [], [{
        'source': 'ShowcaseApplication.kt',
        'target': extensionConfig.applicationNameCU + 'Application.kt'
      }])

    // feature_base
    generator.log('开始生成feature_base')
    tools.copyTplLibrary(generator, 'feature_base', 'feature_base',
      sourcePackageDir,
      packageDir, extensionConfig, [])

    // 根据自定义library列表生成代码
    const librarys = extensionConfig.librarys
    generator.log('开始生成自定义library，共', librarys.length,'个')
    // console.log('librarys ', extensionConfig.librarys[0])
    for (var i = 0; i < librarys.length; i++) {
      const lib = librarys[i]
      extensionConfig.idx = i
      generator.log('开始生成library', lib.libraryName)
      var feature_libraryName = "feature_" + lib.libraryName
      tools.copyTplLibrary(generator, 'feature_empty', feature_libraryName,
        sourcePackageDir + '/empty',
        packageDir + '/' + lib.libraryName, extensionConfig, [], [
        { source: '/empty/', target: '/' + lib.libraryName + '/' },
        { source: 'EmptyKoinModule.kt', target: lib.libraryNameCU + 'KoinModule.kt' },
        { source: 'EmptyFragment.kt', target: lib.libraryNameCU + 'Fragment.kt' },
        { source: 'feature_empty_nav_graph.xml', target: 'feature_' + lib.libraryName + '_nav_graph.xml' }])
    }
    // var feature_libraryName = "feature_" + extensionConfig.libraryName
    // tools.copyTplLibrary(generator, 'feature_empty', feature_libraryName,
    //   sourcePackageDir + '/empty',
    //   packageDir + '/' + extensionConfig.libraryName, extensionConfig, [], [
    //   { source: '/empty/', target: '/' + extensionConfig.libraryName + '/' },
    //   { source: 'EmptyKoinModule.kt', target: extensionConfig.libraryNameCU + 'KoinModule.kt' },
    //   { source: 'EmptyFragment.kt', target: extensionConfig.libraryNameCU + 'Fragment.kt' },
    //   { source: 'feature_empty_nav_graph.xml', target: 'feature_' + extensionConfig.libraryName + '_nav_graph.xml' }])

    // library单元测试库
    tools.copyTplLibrary(generator, 'konsist_test', 'konsist_test',
      sourcePackageDir,
      packageDir, extensionConfig, [])
    tools.copyTplLibrary(generator, 'library_test_utils', 'library_test_utils',
      sourcePackageDir,
      packageDir, extensionConfig, [])
    // 工程根目录下的文件
    tools.copyTplFileList(generator, '', '', extensionConfig, ['gitignore'])
    generator.fs.copyTpl(generator.templatePath('gitignore'), generator.destinationPath('.gitignore'), extensionConfig);

    // 工程中其它目录
    generator.fs.copyTpl(generator.templatePath('gradle'), generator.destinationPath('gradle'), extensionConfig);
    generator.fs.copyTpl(generator.templatePath('buildSrc'), generator.destinationPath('buildSrc'), extensionConfig);
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
