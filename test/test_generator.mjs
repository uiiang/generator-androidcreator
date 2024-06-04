import * as path from 'path';
import { fileURLToPath } from 'url';
import { RunResult, createHelpers } from 'yeoman-test';
import * as env from '../generators/app/common/env.js';

function stripComments(content) {
  
	const appLocation = path.join(fileURLToPath(import.meta.url), '../../generators/app');
  describe('test code generator', function () {
    this.timeout(10000);
    const helpers = createHelpers();
    /**
     * @param {import('yeoman-test').RunResult} runResult
     * @param {String} extensionName
     * @param {String[]} expectedFileNames
     */
    function assertFiles(runResult, extensionName, expectedFileNames) {
      const allFileNames = expectedFileNames
        // .concat(standartFiles)
        .map(fileName => `${extensionName}/${fileName}`);

      runResult.assertFile(allFileNames);
    }
    
    /**
     * @param {import('yeoman-test').RunResult} runResult
     */
    function cleanup(runResult) {
      try {
        runResult.cleanup();
      } catch (e) {
        // console.error('cleanup failed', e);
      }
    }

    it('generators test project', async () => {
      const runResult = await helpers.run(appLocation).withAnswers({
        applicationName: 'test-project',
        libraryName: 'test.proj'
      }); // Mock the prompt answers
  
      try {
        assertFiles(runResult, 'testTheme',
        ['themes/Green-color-theme.json', 
          'themes/new theme.tmTheme']);
      } finally {
        cleanup(runResult);
      }
    });
  })
}