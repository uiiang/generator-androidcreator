import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from '../common/prompts.js'
import * as tools from '../common/tools.js';
import { ExtensionConfig } from '../common/extension_config.js'
import * as fs from 'fs';



export default new class GeneratorAndroidDataModel {
  id: string = 'android-datamodel'
  aliases: string[] = ['android', 'datamodel']
  name: string = 'Android DataModel'


  /**
 * @param {Generator} generator
 * @param {Object} extensionConfig
 */
  async prompting(generator: yo, extensionConfig: ExtensionConfig): Promise<void> {
    try {
      await prompts.askForDataModelSourceType(generator, extensionConfig);
      await prompts.askForDataModelSourcePath(generator, extensionConfig);
      await prompts.askForDataModelPackageName(generator, extensionConfig);
      await prompts.askForDataModelBaseClassName(generator, extensionConfig);
    } catch (err) {
    }
  }


  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  async writing(generator: yo, extensionConfig: ExtensionConfig) {
    const dataModelFilePath = extensionConfig.dataModelFilePath
    if (fs.existsSync(dataModelFilePath)) {
      tools.loadDataModelSource(extensionConfig.dataModelFilePath,
        extensionConfig.dataModelSourceType,
        extensionConfig.dataModelPackageName,
        extensionConfig.dataModelBaseClassName
      ).then(dataModelSource => {
        extensionConfig.dataModelSource = dataModelSource
        console.log('dataModelSource', dataModelSource)
        tools.copyTpls(generator, extensionConfig,
          [{ source: 'Empty.kt', target: extensionConfig.dataModelBaseClassName + '.kt' },
          ])
      })

    } else {
      generator.log(dataModelFilePath + ' 文件未找到')
    }
  }
}