var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as path from 'path';
import * as tools from './tools.js';
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
        default: generator.appname
    }).then(applicationNameAnswer => {
        // 应用名称首字母小写
        extensionConfig.applicationName = tools.toLowerCase(applicationNameAnswer.applicationName);
        // 应用名称首字母大写
        extensionConfig.applicationNameCU = tools.toUpperCase(applicationNameAnswer.applicationName);
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
*/
export function askForLibraryName(generator, order) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield generator.prompt({
            type: 'input',
            name: 'libraryName',
            message: 'What\'s the ' + order + ' libraryName name of your application?',
            default: 'newlibrary',
            // validate: validator.validateExtensionId
        })).libraryName;
    });
}
export function askForLibraryType(generator, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const libraryTypeGenerators = [
            { name: "list album template", value: "list" },
            { name: "empty template", value: "empty" }
        ];
        if (order != 'main') {
            libraryTypeGenerators.push({ name: "不再添加library", value: "exit" });
        }
        const choices = [];
        for (const g of libraryTypeGenerators) {
            const name = g.name;
            choices.push({ name, value: g.value });
        }
        return (yield generator.prompt({
            type: 'list',
            name: 'libraryType',
            message: 'What\'s the ' + order + ' library Type of your application?',
            default: 'empty',
            pageSize: choices.length,
            choices,
        })).libraryType;
    });
}
export function askForLibraryInfo(generator, extensionConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        var librarys = [];
        const orders = ['main', 'second', 'thrid'];
        for (var i = 0; i < orders.length; i++) {
            const order = orders[i];
            const selectedType = yield askForLibraryType(generator, order);
            if (selectedType == 'exit') {
                break;
            }
            const libraryName = yield askForLibraryName(generator, order);
            if (order == 'main') {
                extensionConfig.mainLibraryName = tools.toLowerCase(libraryName); // 模块名首字母小写
                extensionConfig.mainLibraryNameUAll = tools.toUpperAll(libraryName); // 模块名首字母小写
                extensionConfig.mainLibraryNameCU = tools.toUpperCase(libraryName); // 模块名首字母小写
            }
            // console.log('libraryType', selectedType, 'libraryName', libraryName)
            var lib = {
                order: order,
                libraryType: selectedType,
                libraryName: tools.toLowerCase(libraryName), // 模块名首字母小写
                libraryNameUAll: tools.toUpperAll(libraryName), // 模块名全大写
                libraryNameCU: tools.toUpperCase(libraryName) // 模块名首字母大写
            };
            librarys.push(lib);
        }
        // generator.log(librarys[1])
        extensionConfig.librarys = librarys;
    });
}
//# sourceMappingURL=prompts.js.map