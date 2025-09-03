/* eslint-disable camelcase */
// import assert from 'power-assert';
import { DifyDataset } from '../../../src/clients/dify.dataset';

describe('DifyService', () => {
  let difyDataset: DifyDataset;

  beforeEach(() => {
    difyDataset = new DifyDataset({
      baseUrl: 'http://dify.example.cn/v1',
      apiKey: 'dataset-xxxx',
    });
  });

  test('getUploadFile', async () => {
    const result = await difyDataset.getUploadFile({
      dataset_id: 'd7814e00-1c05-495f-aa3e-0231669022db',
      document_id: 'c223a45a-ab1c-4102-a76d-a6b56e9f4ac7',
    });
    console.log('result: ...', result);
  });
});
