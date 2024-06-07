import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from '../common/prompts.js'
import * as tools from '../common/tools.js';
import { ExtensionConfig, LibraryObj } from '../common/extension_config.js'
import androidDataModel from './generate-android-datamodel.js'


export default new class GeneratorAndroidShowcase {
  id: string = 'android-showcase'
  aliases: string[] = ['android']
  name: string = 'Android project show case'
  createType: string = 'createProject'
  librarys: LibraryObj[] = []
  /**
 * @param {Generator} generator
 * @param {Object} extensionConfig
 */
  async prompting(generator: yo, extensionConfig: ExtensionConfig): Promise<void> {
    try {
      this.createType = await prompts.askForWhatYouDo(generator)
      if (this.createType == 'createProject') {
        await prompts.askForApplicationName(generator, extensionConfig)
        await prompts.askForBasePackageName(generator, extensionConfig)
        this.librarys = await prompts.askForLibraryInfo(generator)
        if (this.librarys.length > 0) {
          const libraryName = this.librarys[0].libraryName
          extensionConfig.mainLibraryName = tools.toLowerCase(libraryName)// 模块名首字母小写
          extensionConfig.mainLibraryNameUAll = tools.toUpperAll(libraryName)// 模块名首字母小写
          extensionConfig.mainLibraryNameCU = tools.toUpperCase(libraryName)// 模块名首字母小写
        }
        extensionConfig.librarys = this.librarys
      } else if (this.createType == 'createLibrary') {
        this.librarys = await prompts.askForLibraryInfo(generator)
      } else if (this.createType == 'createDatamodel') {
        await androidDataModel.prompting(generator, extensionConfig)
      }
    } catch (err) {
      generator.log(err)
    }
  }

  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  writing(generator: yo, extensionConfig: ExtensionConfig) {
    const sourcePackageDir = 'com/igorwojda/showcase'
    var packageName = extensionConfig.basePackageName
    var packageDir = packageName.replace(/\./g, '/');
    if (this.createType == 'createProject') {
      // console.log('开始生成配置文件', extensionConfig)
      // 主工程目录
      tools.copyTplLibrary(generator, extensionConfig, 'app', 'app',
        sourcePackageDir, packageDir,
        [], [{
          'source': 'ShowcaseApplication.kt',
          'target': extensionConfig.applicationNameCU + 'Application.kt'
        }])

      // feature_base
      tools.copyTplLibrary(generator, extensionConfig, 'feature_base', 'feature_base',
        sourcePackageDir,
        packageDir, [])

      // 根据自定义library列表生成代码
      const librarys = extensionConfig.librarys
      generator.log('开始生成自定义library，共', librarys.length, '个')
      // console.log('librarys ', extensionConfig.librarys[0])
      for (var i = 0; i < librarys.length; i++) {
        const lib = librarys[i]
        extensionConfig.idx = i
        var feature_libraryName = "feature_" + lib.libraryName
        tools.copyTplLibrary(generator,
          extensionConfig, 'feature_empty',
          feature_libraryName,
          sourcePackageDir + '/empty',
          packageDir + '/' + lib.libraryName, ['Empty.kt'],
          [{ source: '/empty/', target: '/' + lib.libraryName + '/' },
          { source: 'empty', target: lib.libraryName },
          { source: 'Empty', target: lib.libraryNameCU },
          { source: 'feature_empty_nav_graph.xml', target: 'feature_' + lib.libraryName + '_nav_graph.xml' }])
      }
      // library单元测试库
      tools.copyTplLibrary(generator, extensionConfig, 'konsist_test', 'konsist_test',
        sourcePackageDir,
        packageDir, [])
      tools.copyTplLibrary(generator, extensionConfig, 'library_test_utils', 'library_test_utils',
        sourcePackageDir,
        packageDir, [])
      // 工程根目录下的文件
      tools.copyTplFileList(generator, extensionConfig, '', '', ['gitignore'])
      tools.copyTpls(generator, extensionConfig,
        [{ source: 'gitignore', target: '.gitignore' },
        { source: 'gradle', target: 'gradle' },
        { source: 'buildSrc', target: 'buildSrc' },])
      tools.saveProjectInfoJson(generator, extensionConfig)
    } else if (this.createType == 'createDatamodel') {
      androidDataModel.writing(generator)
    } else if (this.createType == 'createLibrary') {
      for (var i = 0; i < this.librarys.length; i++) {
        const lib = this.librarys[i]
        extensionConfig.idx = i
        var feature_libraryName = "feature_" + lib.libraryName
        tools.copyTplLibrary(generator,
          extensionConfig, 'feature_empty',
          feature_libraryName,
          sourcePackageDir + '/empty',
          packageDir + '/' + lib.libraryName, ['Empty.kt'],
          [{ source: '/empty/', target: '/' + lib.libraryName + '/' },
          { source: 'empty', target: lib.libraryName },
          { source: 'Empty', target: lib.libraryNameCU },
          { source: 'feature_empty_nav_graph.xml', target: 'feature_' + lib.libraryName + '_nav_graph.xml' }])
      }
      extensionConfig.librarys = extensionConfig.librarys.concat(this.librarys)
      console.log('extensionConfig.librarys', extensionConfig.librarys)
      tools.saveProjectInfoJson(generator, extensionConfig)
    }
  }
}