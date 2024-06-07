import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from '../common/prompts.js'
import * as tools from '../common/tools.js';
import { ExtensionConfig } from '../common/extension_config.js'


export default new class GeneratorAndroidShowcase {
  id: string = 'android-showcase'
  aliases: string[] = ['android']
  name: string = 'Android project show case'

  /**
 * @param {Generator} generator
 * @param {Object} extensionConfig
 */
  async prompting(generator: yo, extensionConfig: ExtensionConfig): Promise<void> {
    try {
      await prompts.askForApplicationName(generator, extensionConfig);
      await prompts.askForBasePackageName(generator, extensionConfig);
      await prompts.askForLibraryInfo(generator, extensionConfig);
    } catch (err) {
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
  }
}