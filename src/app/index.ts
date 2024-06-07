import yosay from 'yosay';
import Generator from "yeoman-generator"; // eslint-disable-line @typescript-eslint/no-var-requires
import * as chalk from 'chalk';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { ChoiceOption, ExtensionConfig } from './common/extension_config.js'

import * as tools from './common/tools.js';
import androidShowcase from './helpers/generate-android-showcase.js'

const extensionGenerators = [
  androidShowcase
]

export default class extends Generator {
  extensionConfig: ExtensionConfig
  abort: boolean
  extensionGenerator: any
  constructor(args, opts) {
    super(args, opts);
    this.description = 'android脚手架生成器';

    // this.extensionConfig = Object.create(null);
    this.extensionConfig = tools.loadProjectInfoJson(this)

    console.log(this.extensionConfig)
    this.abort = false;
  }

  async initializing() {
    this.log(yosay('android脚手架生成器'));
  }

  async prompting() {
    const choices: ChoiceOption[] = [];
    for (const g of extensionGenerators) {
      choices.push({ name: g.name, value: g.id })
    }
    // 选择使用哪个模板
    this.extensionConfig.type = (await this.prompt({
      type: 'list',
      name: 'type',
      message: 'What template of application do you want to create?',
      pageSize: choices.length,
      choices,
    })).type;

    this.extensionGenerator = extensionGenerators.find(g => g.id === this.extensionConfig.type);
    try {
      await this.extensionGenerator.prompting(this, this.extensionConfig);
    } catch (e) {
      console.log(e);
      this.abort = true;
    }
  }
  // Write files
  writing() {
    if (this.abort) {
      return;
    }
    // if (!this.options['destination'] && !this.extensionGenerator.update) {
    //     this.destinationRoot(this.destinationPath(this.extensionConfig.name))
    // }
    // this.env.cwd = this.destinationPath();

    this.log();
    this.log(`Writing in ${this.destinationPath()}...`);

    const currentFilename = fileURLToPath(import.meta.url);
    // this.log("import.meta.url ", import.meta.url)
    // this.log("currentFilename ", currentFilename)
    this.sourceRoot(path.join(currentFilename, '../templates/' + this.extensionConfig.type));

    return this.extensionGenerator.writing(this, this.extensionConfig);
  }

}