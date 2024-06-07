import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from '../common/prompts.js'
import * as tools from '../common/tools.js';
import { ExtensionConfig } from '../common/extension_config.js'
import * as fs from 'fs';



export default new class GeneratorAndroidDataModel {
  dataModelPackageName: string = ''
  dataModelForLibrary: string = ''
  dataModelSourceFilePath: string = ''
  dataModelBaseClassName: string = ''

  /**
 * @param {Generator} generator
 * @param {Object} extensionConfig
 */
  async prompting(generator: yo, extensionConfig: ExtensionConfig): Promise<void> {
    try {
      this.dataModelForLibrary = await prompts.askForDataModelForLibrary(generator, extensionConfig)
      this.dataModelPackageName = extensionConfig.basePackageName + '.' + this.dataModelForLibrary + '.domain.model'
      // await prompts.askForDataModelSourceType(generator, extensionConfig);
      this.dataModelSourceFilePath = await prompts.askForDataModelSourcePath(generator);
      // await prompts.askForDataModelPackageName(generator, extensionConfig);
      this.dataModelBaseClassName = await prompts.askForDataModelBaseClassName(generator);
    } catch (err) {
      console.log(err)
    }
  }


  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  async writing(generator: yo) {
    const dataModelFilePath = this.dataModelSourceFilePath
    if (fs.existsSync(dataModelFilePath)) {
      tools.loadDataModelSource(this.dataModelSourceFilePath,
        this.dataModelPackageName,
        this.dataModelBaseClassName
      ).then(dataModelSource => {
        const genSource = dataModelSource
        // console.log('dataModelSource', dataModelSource)
        const targetPath = generator.destinationPath() + '/feature_' + this.dataModelForLibrary + '/src/main/kotlin/' + tools.convertDotToPath(this.dataModelPackageName) + '/' + this.dataModelBaseClassName + '.kt'
        // console.log('targetPath', targetPath)
        generator.fs.copyTpl(generator.templatePath('other_src/Empty.kt'),
          targetPath, { 'dataModelSource': genSource });
      })

    } else {
      generator.log(dataModelFilePath + ' 文件未找到')
    }
  }
}