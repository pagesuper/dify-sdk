/* eslint-disable camelcase */
import assert from 'power-assert';
import { DifyService } from '../../../src/clients/dify.service';

describe('DifyService', () => {
  let difyService: DifyService;

  beforeEach(() => {
    difyService = new DifyService({
      baseUrl: 'http://dify.example.cn/v1',
      apiKey: 'dataset-xxxx',
    });
  });

  test('getUploadFile', async () => {
    const result = await difyService.getUploadFile({
      dataset_id: 'd7814e00-1c05-495f-aa3e-0231669022db',
      document_id: 'c223a45a-ab1c-4102-a76d-a6b56e9f4ac7',
    });
    // console.log('result: ...', result);
  });
});
