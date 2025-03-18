import assert from 'power-assert';
import { DifyClient } from '../../../src/clients/dify.client';

describe('DifyClient', () => {
  let difyClient: DifyClient;

  beforeEach(() => {
    difyClient = new DifyClient({ baseUrl: 'http://10.32.120.77/v1', apiKey: 'app-IrnP71hlmuegWY5YK7zNcecY' });
  });

  test('getConversations', async () => {
    const response = await difyClient.getConversations({ user: 'abc-123', limit: 20, sort_by: '-updated_at' });
    assert.deepEqual(response, {
      limit: 20,
      has_more: false,
      data: [],
    });
  });
});
