
'use strict';

import Generator from 'yeoman-generator';
import yosay from 'yosay';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as env from './env.js';
import which from 'which';
import androidShowcase from './generate-android-showcase.js';

const extensionGenerators = [
    androidShowcase
]

export default class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.description = 'android工程框架脚手架生成器';

        this.argument('destination', { type: String, required: false, description: `\n    The folder to create the application project, absolute or relative to the current working directory.\n    Use '.' for the current folder. If not provided, defaults to a folder with the application name.\n  ` })

        this.extensionConfig = Object.create(null);
        this.abort = false;
    }

    async initializing() {
        // Welcome
        this.log(yosay('Welcome to the android project generator!'));

        const destination = this.options['destination'];
        if (destination) {
            const folderPath = path.resolve(this.destinationPath(), destination);
            this.destinationRoot(folderPath);
        }
    }

    async prompting() {
        const choices = [];
        for (const g of extensionGenerators) {
            const name = g.name;
            choices.push({ name, value: g.id })
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
        if (!this.options['destination'] && !this.extensionGenerator.update) {
            this.destinationRoot(this.destinationPath(this.extensionConfig.name))
        }
        this.env.cwd = this.destinationPath();

        this.log();
        this.log(`Writing in ${this.destinationPath()}...`);

        const currentFilename = fileURLToPath(import.meta.url);
        // this.log("import.meta.url ", import.meta.url)
        // this.log("currentFilename ", currentFilename)
        this.sourceRoot(path.join(currentFilename, '../templates/' + this.extensionConfig.type));

        return this.extensionGenerator.writing(this, this.extensionConfig);
    }

    // // Installation
    // install() {
    //     if (this.abort) {
    //         // @ts-ignore
    //         this.env.options.skipInstall = true;
    //         return;
    //     }
    //     if (this.extensionConfig.installDependencies) {
    //         // @ts-ignore
    //         this.env.options.nodePackageManager = this.extensionConfig.pkgManager;
    //     } else {
    //         // @ts-ignore
    //         this.env.options.skipInstall = true;
    //     }
    // }

    // End
    // async end() {
    //     if (this.abort) {
    //         return;
    //     }

    //     if (this.extensionGenerator.update) {
    //         this.log('');
    //         this.log('Your extension has been updated!');
    //         this.log('');
    //         this.log('To start editing with Visual Studio Code, use the following commands:');
    //         this.log('');
    //         if (!this.extensionConfig.insiders) {
    //             this.log('     code .');
    //         } else {
    //             this.log('     code-insiders .');
    //         }
    //         this.log(`     ${this.extensionConfig.pkgManager} run compile-web`);
    //         this.log('');
    //         return;
    //     }

    //     // Git init
    //     if (this.extensionConfig.gitInit) {
    //         await this.spawn('git', ['init', '--quiet']);
    //     }

    //     if (this.extensionConfig.proposedAPI) {
    //         await this.spawn(this.extensionConfig.pkgManager, ['run', 'update-proposed-api']);
    //     }
    //     this.log('');

    //     this.log('Your extension ' + this.extensionConfig.name + ' has been created!');
    //     this.log('');

    //     const [codeStableLocation, codeInsidersLocation] = await Promise.all([which('code').catch(() => undefined), which('code-insiders').catch(() => undefined)]);

    //     if (!this.extensionConfig.insiders && !this.options['open'] && !this.options['openInInsiders'] && !this.options['quick']) {
    //         const cdLocation = this.options['destination'] || this.extensionConfig.name;

    //         this.log('To start editing with Visual Studio Code, use the following commands:');
    //         this.log('');
    //         if (!this.extensionConfig.insiders) {
    //             this.log('     code ' + cdLocation);
    //         } else {
    //             this.log('     code-insiders ' + cdLocation);
    //         }
    //         this.log('');
    //     }
    //     this.log('Open vsc-extension-quickstart.md inside the new extension for further instructions');
    //     this.log('on how to modify, test and publish your extension.');
    //     this.log('');

    //     if (this.extensionGenerator.endMessage) {
    //         this.extensionGenerator.endMessage(this, this.extensionConfig);
    //     }

    //     this.log('For more information, also visit http://code.visualstudio.com and follow us @code.');
    //     this.log('\r\n');

    //     if (this.options["open"]) {
    //         if (codeStableLocation) {
    //             this.log(`Opening ${this.destinationPath()} in Visual Studio Code...`);
    //             await this.spawn(codeStableLocation, [this.destinationPath()]);
    //         } else {
    //             this.log(`'code' command not found.`);
    //         }
    //     } else if (this.options["openInInsiders"]) {
    //         if (codeInsidersLocation) {
    //             this.log(`Opening ${this.destinationPath()} with Visual Studio Code Insiders...`);
    //             await this.spawn(codeInsidersLocation, [this.destinationPath()]);
    //         } else {
    //             this.log(`'code-insiders' command not found.`);
    //         }
    //     } else if (codeInsidersLocation || codeStableLocation) {
    //         if (this.options["quick"]) {
    //             await this.spawn(codeInsidersLocation || codeStableLocation, [this.destinationPath()]);
    //         } else {
    //             const choices = [];
    //             if (codeInsidersLocation) {
    //                 choices.push({ name: "Open with `code-insiders`", value: codeInsidersLocation });
    //             }
    //             if (codeStableLocation) {
    //                 choices.push({ name: "Open with `code`", value: codeStableLocation });
    //             }
    //             choices.push({ name: "Skip", value: 'skip' });

    //             const answer = await this.prompt({
    //                 type: "list",
    //                 name: "openWith",
    //                 message: "Do you want to open the new folder with Visual Studio Code?",
    //                 choices
    //             });
    //             if (answer && answer.openWith && answer.openWith !== 'skip') {
    //                 await this.spawn(answer.openWith, [this.destinationPath()]);
    //             }
    //         }
    //     }
    // }
}
