import yo from 'yeoman-generator';
import { Chalk } from 'chalk';
import * as prompts from '../common/prompts.js'
import * as tools from '../common/tools.js';
import { ExtensionConfig, LibraryObj } from '../common/extension_config.js'
import androidDataModel from './generate-android-datamodel.js'

const chalk = new Chalk();

export default new class GeneratorAndroidKtorKoin {
  id: string = 'android-ktor-koin'
  aliases: string[] = ['android']
  name: string = 'Android Ktor Koin'
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
    const sourcePackageDir = 'uii/ang/ivisitor'
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

      // feature_data
      tools.copyTplLibrary(generator, extensionConfig, 'feature_data', 'feature_data',
        sourcePackageDir,
        packageDir, [])

      // 根据自定义library列表生成代码
      const librarys = extensionConfig.librarys
      generator.log('开始生成自定义library，共', librarys.length, '个')
      // console.log('librarys ', extensionConfig.librarys[0])
      this.genCustomLibrary(generator, extensionConfig, sourcePackageDir, packageDir)

      // generator.log('开始生成library单元测试库')
      // library单元测试库
      // tools.copyTplLibrary(generator, extensionConfig, 'konsist_test', 'konsist_test',
      //   sourcePackageDir,
      //   packageDir, [])
      // tools.copyTplLibrary(generator, extensionConfig, 'library_test_utils', 'library_test_utils',
      //   sourcePackageDir,
      //   packageDir, [])
      generator.log('开始生成工程根目录下的文件')
      // 工程根目录下的文件
      tools.copyTplFileList(generator, extensionConfig, '', '', ['gitignore'])
      tools.copyTpls(generator, extensionConfig,
        [{ source: 'gitignore', target: '.gitignore' },
        { source: 'gradle', target: 'gradle' },
        { source: 'buildSrc', target: 'buildSrc' },])

      var path = generator.destinationPath() + "/json"
      tools.mkdir(path)

      tools.saveProjectInfoJson(generator, extensionConfig)
    } else if (this.createType == 'createDatamodel') {
      androidDataModel.writing(generator)
    } else if (this.createType == 'createLibrary') {
      this.genCustomLibrary(generator, extensionConfig, sourcePackageDir, packageDir)
      extensionConfig.librarys = extensionConfig.librarys.concat(this.librarys)
      // console.log('extensionConfig.librarys', extensionConfig.librarys)
      tools.saveProjectInfoJson(generator, extensionConfig)
    }
  }

  genCustomLibrary(generator: yo, extensionConfig: ExtensionConfig,
    sourcePackageDir: string, packageDir: string) {
      extensionConfig.librarys = this.librarys
    for (var i = 0; i < this.librarys.length; i++) {
      const lib = this.librarys[i]
      extensionConfig.idx = i
      var feature_libraryName = "feature_" + lib.libraryName
      tools.copyTplLibrary(generator,
        extensionConfig, 'feature_empty',
        feature_libraryName, sourcePackageDir + '/empty',
        packageDir + '/' + lib.libraryName, ['Empty.kt'],
        [{ source: '/empty/', target: '/' + lib.libraryName + '/' },
        { source: 'empty', target: lib.libraryName },
        { source: 'Empty', target: lib.libraryNameCU }
       ])
    }
  }


  /**
   * @param {Generator} generator
   * @param {Object} extensionConfig
   */
  endMessage(generator: yo, extensionConfig: ExtensionConfig) {
    if (this.createType == 'createLibrary') {
      generator.log(chalk.yellow(`已完成生成library代码`))

      for (var i = 0; i < this.librarys.length; i++) {
        const lib = this.librarys[i]
        generator.log(chalk.yellow(`模块名: ${lib.libraryName}`))
        generator.log(`添加工程相关配置代码...`)
        generator.log(`1, 在工程根目录下的 ${chalk.yellow('setting.gradle.kts')}中添加代码`)
        generator.log(`include(`)
        generator.log(` ...`)
        generator.log(chalk.redBright(`":feature_${lib.libraryName}",`))
        generator.log(` ...`)
        generator.log(`)`)

        generator.log(`2, 在需要引用的模块下的${chalk.yellow('build.gradle.kts')}中添加代码`)
        generator.log(`dependencies {`)
        generator.log(` ...`)
        generator.log(chalk.redBright(`implementation(projects.feature${lib.libraryNameCU})`))
        generator.log(` ...`)
        generator.log(`}`)

        generator.log(`添加工程kotlin代码...`)

        generator.log(`3, 在主工程 ${chalk.yellow(extensionConfig.applicationNameCU + 'Application.kt')} 中添加代码`)
        generator.log(`import ...`)
        generator.log(chalk.redBright(`import ${extensionConfig.basePackageName}.${lib.libraryName}.feature${lib.libraryNameCU}Modules`))
        generator.log(`...`)


        generator.log(`private fun initKoin() {`)
        generator.log(`...`)
        generator.log(chalk.redBright(`modules(feature${lib.libraryNameCU}Modules)`))
        generator.log(`...`)
        generator.log(`}`)



        generator.log(`4, 若需要在主工程菜单中添加导航`)
        generator.log(`在主工程 ${chalk.yellow('src/main/res/menu/bottom_nav_menu.xml')} 文件中添加代码`)
        generator.log(`...`)
        generator.log(chalk.redBright(`<item android:id="@+id/${lib.libraryName}NavGraph"`))
        generator.log(chalk.redBright(`android:icon="@drawable/ic_round_dashboard"`))
        generator.log(chalk.redBright(`android:title="@string/${lib.libraryName}"`))
        generator.log(`...`)


        generator.log(`5, 在主工程 ${chalk.yellow('src/main/res/navigation/app_nav_graph.xml')} 文件中添加代码`)
        generator.log(`...`)
        generator.log(chalk.redBright(`<include app:graph="@navigation/feature_${lib.libraryName}_nav_graph" />`))
        generator.log(`...`)

        generator.log(`6, 资源文件字符串内容 ${chalk.yellow('src/main/res/values/strings.xml')}`)
        generator.log(`...`)
        generator.log(chalk.redBright(`<string name="feature_${lib.libraryName}">feature ${lib.libraryName}</string>`))
        generator.log(chalk.redBright(`<string name="${lib.libraryName}">${lib.libraryNameCU}</string>`))
        generator.log(`...`)
      }
      generator.log('');
    }
  }
}