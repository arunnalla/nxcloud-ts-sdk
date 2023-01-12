import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NXCloud from './index';

const SEND_SMS_API_URL = 'https://api2.nxcloud.com/api/sms/mtsend';

describe('Send SMS', () => {
  it('exits cleanly if the SMS was sent', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(SEND_SMS_API_URL).reply(200, { code: '0', messageid: 'dummytext' });

    await expect(
      new NXCloud('mock', 'mock').sendSMS({
        phone: '919999999999',
        content: 'message',
      })
    ).resolves.toEqual('dummytext');
  });

  it('throws error if response code is not zero', async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(SEND_SMS_API_URL).reply(200, { code: '2' });

    await expect(
      new NXCloud('mock', 'mock').sendSMS({
        phone: '919999999999',
        content: 'message',
      })
    ).rejects.toThrowError('Paramters wrong or empty');
  });
});
