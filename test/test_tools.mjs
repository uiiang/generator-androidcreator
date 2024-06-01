import * as path from 'path';
import { fileURLToPath } from 'url';
import { RunResult, createHelpers } from 'yeoman-test';
import * as env from '../generators/app/env.js';
import * as tools from '../generators/app/tools.js';
import assert from 'assert';

describe('测试工具类', function() {
	it('测试 toUpperCase', async () => {
		const testStr = 'toUpperCase'
		assert.equal(tools.toUpperCase(testStr), 'ToUpperCase', 'error toUpperCase');
	});
	it('测试 toUpperAll', async () => {
		const testStr = 'toUpperAll'
		assert.equal(tools.toUpperAll(testStr), 'TOUPPERALL', 'error toUpperAll');
	});
	it('测试 toLowerCase', async () => {
		const testStr = 'TOUPPERALL'
		assert.equal(tools.toLowerCase(testStr), 'tOUPPERALL', 'error toLowerCase');
	});
	it('测试 toLowerAll', async () => {
		const testStr = 'toLowerAll'
		assert.equal(tools.toLowerAll(testStr), 'tolowerall', 'error toLowerAll');
	});
	it('测试 convertPath', async () => {
		const testStr = 'D:\\code\\mycodes\\yeoman\\\\generator-androidcreator'
		const expectedStr = 'D:/code/mycodes/yeoman/generator-androidcreator'
		assert.equal(tools.convertPath(testStr), expectedStr, 'error convertPath');
	});
});
