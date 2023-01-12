<div align="center">
  <h2>nxcloud-ts-sdk</h2>
</div>

NXCloud Typscript SDK. The SDK current implements only one function ie, sending SMS. Documentation for the API can be found [here](https://github.com/nxtele/http-api-document-en/wiki/Sending-SMS).

### Sample usage

```ts
import NXCloud from 'nxcloud-ts-sdk';

const sendSms = async () => {
  const app = new NXCloud('username', 'password');
  return await app.sendSMS({ phone: '91999999999', content: 'Hello, Jhon Doe' });
};
```
