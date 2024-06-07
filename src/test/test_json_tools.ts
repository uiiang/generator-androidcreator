import assert from 'assert';
import * as tools from '../app/common/tools.js'
import gs from '../app/generate-schema/json.js'
import fs from 'fs'
import { test_data } from './test_data.js';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  JSONSchemaSourceData,
  FetchingJSONSchemaStore,
  quicktypeMultiFile,
} from "quicktype-core";
import { album_list_schema_data } from './test_data/album_list.schema.js';


describe('测试JSON工具类', () => {
  it('测试 schema', async () => {
    const testJson = test_data
    const schema = gs('product', testJson)
    // console.log('GenerateSchema', JSON.stringify(schema))
    // var schemaObj = jsonSchemaGenerator(testJson)
    // console.log('jsonSchemaGenerator',JSON.stringify(schemaObj))
  })
  it('测试quicktype, json数据转schema', async () => {
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
      rendererOptions: {
      }
    });
    // console.log(result)
  })
  it('测试quicktype, jsonschema转kotlin', async () => {
    const testJson = album_list_schema_data
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    await schemaInput.addSource({
      name: 'TestData',
      schema: JSON.stringify(testJson)
    });

    const inputData = new InputData();
    inputData.addInput(schemaInput);
    // console.log(inputData)
    const options = {
      inputData,
      lang: 'kotlin',
      inferEnums: false,
      inferMaps: false,
      inferUuids: false,
      // debugPrintGraph: true,
      rendererOptions: {
        "framework": 'just-types',
        'package': 'uii.ang'
      }
    }
    // const result = await quicktype();
    const result = await quicktypeMultiFile(options);
    for (const [filename, srr] of result) {
      console.log('filename', filename)
      console.log('srr', srr)
    }
    // return combineRenderResults(result);
    // console.log(result)
  })

  // it('测试生成album_list实体类', async () => {
  //   const testJson = album_list_schema_data
  //   // console.log(testJson['definitions'])
  //   const keys = Object.entries(testJson['definitions'])
  //   for (const [key, value] of keys) {
  //     tools.convertSchemaToData(value)
  //   }
  // })
})