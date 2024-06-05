import assert from 'assert';
import * as tools from '../app/common/tools.js'
import gs from '../app/generate-schema/json.js'
import fs from 'fs'
import { test_data } from './test_data.js';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";


describe('测试JSON工具类', () => {
  it('测试 schema', async () => {
    const testJson = test_data
    const schema = gs('product', testJson)
    console.log('GenerateSchema', JSON.stringify(schema))
    // var schemaObj = jsonSchemaGenerator(testJson)
    // console.log('jsonSchemaGenerator',JSON.stringify(schemaObj))
  })
  it('测试quicktype', async () => {
    const testJson = test_data
    const jsonInput = jsonInputForTargetLanguage('json-schema')
    await jsonInput.addSource({
      name: 'typeName',
      samples: [JSON.stringify(testJson)]
    });
    const inputData = new InputData();
    inputData.addInput(jsonInput);
    const result = await quicktype({
      inputData,
      lang: 'json-schema',
      inferEnums: false,
      inferMaps: false,
      inferUuids: false,
      rendererOptions:{
      }
    });
    console.log(result)
  })
})