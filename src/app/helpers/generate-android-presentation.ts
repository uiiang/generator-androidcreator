import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from '../common/prompts.js'
import * as tools from '../common/tools.js';
import { ExtensionConfig } from '../common/extension_config.js'
import * as fs from 'fs';



export default new class GeneratorAndroidPresentation {
  presentationPackageName: string = ''
  presentationForLibrary: string = ''
  presentationSourceFilePath: string = ''
  presentationBaseClassName: string = ''


  /**
 * @param {Generator} generator
 * @param {Object} extensionConfig
 */
  async prompting(generator: yo, extensionConfig: ExtensionConfig): Promise<void> {
    try {
      this.presentationForLibrary = await prompts.askForPresentationForLibrary(generator, extensionConfig)
      this.presentationPackageName = extensionConfig.basePackageName + '.' + this.presentationForLibrary + '.presentation'
      this.presentationBaseClassName = await prompts.askForPresentationBaseClassName(generator);
    } catch (err) {
      console.log(err)
    }
  }


  genPresentation(generator: yo, extensionConfig: ExtensionConfig) {
    extensionConfig.presentationForLibrary = this.presentationForLibrary
    extensionConfig.presentationBaseClassName = this.presentationBaseClassName
    extensionConfig.presentationPackageName = this.presentationPackageName
    extensionConfig.presentationBaseClassName = tools.toLowerCase(this.presentationBaseClassName)// 模块名首字母小写
    extensionConfig.presentationBaseClassNameCU = tools.toUpperCase(this.presentationBaseClassName)
    const targetPath = generator.destinationPath() + '/feature_'
      + this.presentationForLibrary + '/src/main/kotlin/'
      + tools.convertDotToPath(this.presentationPackageName)

    generator.log('开始生成Presentation', extensionConfig.presentationForLibrary
      , extensionConfig.presentationBaseClassName
      , extensionConfig.presentationPackageName
      , targetPath)
    //+ '/' + this.presentationBaseClassName + '.kt'
    // tools.copyTplDir(generator, extensionConfig
    //   , 'other_src/presentation/empty'
    //   , targetPath)
    tools.copyTplLibrary(generator,
      extensionConfig, 'other_src/presentation/empty',
      targetPath + '/' + extensionConfig.presentationBaseClassName, 'empty',
      targetPath + '/' + extensionConfig.presentationBaseClassName, [],
      [{ source: '/empty/', target: '/' + extensionConfig.presentationBaseClassName + '/' },
      { source: 'empty', target: extensionConfig.presentationBaseClassName },
      { source: 'Empty', target: extensionConfig.presentationBaseClassNameCU }
      ])

  }

}