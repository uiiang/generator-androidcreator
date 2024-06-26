import assert from 'assert';
import * as tools from '../app/common/tools.js'

describe('测试工具类', () => {
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
})