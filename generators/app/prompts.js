


import Generator from 'yeoman-generator';

import * as validator from './validator.js';
import * as path from 'path';

/**
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForApplicationName(generator, extensionConfig) {
    let applicationName = generator.options['applicationName'];
    if (applicationName) {
        extensionConfig.applicationName = applicationName;
        return Promise.resolve();
    }
    const nameFromFolder = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';

    return generator.prompt({
        type: 'input',
        name: 'applicationName',
        message: 'What\'s the name of your application?',
        default: nameFromFolder
    }).then(applicationNameAnswer => {
        extensionConfig.applicationName = applicationNameAnswer.applicationName;
    });
}

/**
 * Ask for base package name
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForBasePackageName(generator, extensionConfig) {
    const basePackageName = generator.options['basePackageName'];
    if (basePackageName) {
        extensionConfig.basePackageName = basePackageName;
        return Promise.resolve();
    }
    let def = "com." + extensionConfig.applicationName;
    return generator.prompt({
        type: 'input',
        name: 'basePackageName',
        message: 'What\'s the package name of your application?',
        default: def || '',
        // validate: validator.validateExtensionId
    }).then(basePackageNameAnswer => {
        extensionConfig.basePackageName = basePackageNameAnswer.basePackageName;
    });
}

/**
 * Ask for library name
* @param {Generator} generator
* @param {Object} extensionConfig
*/
export function askForLibraryName(generator, extensionConfig) {
    // const libraryName = generator.options['libraryName'];
    // if (libraryName) {
    //     extensionConfig.libraryName = libraryName;
    //     return Promise.resolve();
    // };
    return generator.prompt({
        type: 'input',
        name: 'libraryName',
        message: 'What\'s the main libraryName name of your application?',
        default: 'newlibrary',
        // validate: validator.validateExtensionId
    }).then(libraryNameAnswer => {
        extensionConfig.libraryName = libraryNameAnswer.libraryName;
    });
}