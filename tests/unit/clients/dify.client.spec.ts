/* eslint-disable camelcase */
import assert from 'power-assert';
import { DifyClient } from '../../../src/clients/dify.client';

describe('DifyClient', () => {
  let difyClient: DifyClient;
  const user = 'abc-123';
  const conversationId = '1f510c86-bca7-4fca-bc30-6a8ed5523c7b';
  const timeoutValue = 1000 * 60 * 10;

  beforeEach(() => {
    difyClient = new DifyClient({ baseUrl: 'http://10.32.120.77/v1', apiKey: 'app-slPJaQPj9QjFr1l7AqEqcLgS' });
  });

  test('config', async () => {
    assert.equal(difyClient.getConfig().baseUrl, 'http://10.32.120.77/v1');

    console.log('user: ...', user);
    console.log('conversationId: ...', conversationId);
    console.log('timeoutValue: ...', timeoutValue);
  });

  // test('uploadFile', async () => {
  //   const response = await difyClient.uploadFile({
  //     file: new File(['test'], 'test.txt', { type: 'text/plain' }),
  //     user,
  //   });

  //   console.log('uploadFile response: ...', response);
  // });

  // test(
  //   'getConversations',
  //   async () => {
  //     const response = await difyClient.getConversations({ user, limit: 20, sort_by: '-updated_at' });

  //     console.log('getConversations response: ...', response);

  //     // assert.ok(response.data.length > 0);

  //     // assert.deepEqual(response, {
  //     //   limit: 20,
  //     //   has_more: false,
  //     //   data: [],
  //     // });
  //   },
  //   timeoutValue,
  // );

  // test(
  //   'getMessages',
  //   async () => {
  //     const response = await difyClient.getMessages({ conversation_id: conversationId, user, limit: 20 });

  //     console.log('getMessages response: ...', response);
  //     // assert.ok(response.data.length > 0);

  //     // assert.deepEqual(response, {
  //     //   conversation_id: conversationId,
  //     //   limit: 20,
  //     //   has_more: false,
  //     //   data: [],
  //     // });
  //   },
  //   timeoutValue,
  // );

  // test(
  //   'sendMessage',
  //   async () => {
  //     const response = await difyClient.sendMessage({
  //       inputs: {},
  //       conversation_id: conversationId,
  //       query: '你好',
  //       user,
  //       response_mode: 'blocking',
  //     });

  //     console.log('send Message: ...', response);
  //     // assert.deepEqual(response, {
  //     //   mode: 'chat',
  //     //   answer: '你好',
  //     // });
  //   },
  //   timeoutValue,
  // );
});
