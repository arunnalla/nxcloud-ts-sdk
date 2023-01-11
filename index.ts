import axios from 'axios';
import qs from 'qs';
import {
  SendSMSOptionalParams,
  SendSMSParams,
  SendSMSRequestBodyOptionalParams,
  SendSMSRequestBodyParams,
  SendSMSResponse,
} from './types';

class NXCloud {
  private static readonly DEFAULT_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  private static readonly BASE_URL: string = 'http://api2.nxcloud.com/api/';

  private appKey: string;

  private secretKey: string;

  constructor(appKey: string, appSecret: string) {
    this.appKey = appKey;
    this.secretKey = appSecret;
  }

  async sendSMS({
    phone,
    content,
    sourceAddress,
    systemMessageId,
    shortLink,
    linkVerbose,
    drUrl,
    ext,
  }: SendSMSParams) {
    const path = 'sms/mtsend';
    const body: SendSMSRequestBodyParams = {
      appKey: this.appKey,
      secretKey: this.secretKey,
      phone,
      content,
      ...NXCloud.getOptionalParams({
        sourceAddress,
        systemMessageId,
        shortLink,
        linkVerbose,
        drUrl,
        ext,
      }),
    };
    const sendSMSResponse = await axios.post(
      NXCloud.BASE_URL + path,
      qs.stringify(body),
      {
        headers: NXCloud.DEFAULT_HEADERS,
      }
    );

    if (sendSMSResponse.data.code !== '0') {
      NXCloud.handleSendSmsErrors(sendSMSResponse.data);
    }

    return;
  }

  private static getOptionalParams(params: SendSMSOptionalParams) {
    const propertyToRequestBodyFieldMapper = {
      sourceAddress: 'source_address',
      systemMessageId: 'sys_messageid',
      shortLink: 'short_link',
      linkVerbose: 'linkVerbose',
      drUrl: 'dr_url',
      ext: 'ext',
    } as const;
    const optionalParams: SendSMSRequestBodyOptionalParams = {};

    const keys = Object.keys(propertyToRequestBodyFieldMapper) as Array<
      keyof typeof propertyToRequestBodyFieldMapper
    >;

    keys.forEach((key) => {
      if (params[key]) {
        const requestBodyPropertyName = propertyToRequestBodyFieldMapper[key];
        optionalParams[requestBodyPropertyName] = params[key];
      }
    });

    return optionalParams;
  }

  private static handleSendSmsErrors(response: SendSMSResponse) {
    switch (response.code) {
      case '1':
        throw new Error('App is not available, or wrong appkey / secret');
      case '2':
        throw new Error('Paramters wrong or empty');
      case '3':
        throw new Error('No credit');
      case '4':
        throw new Error('Empty content or contains black list words');
      case '5':
        throw new Error('Content > 1000');
      case '6':
        throw new Error('Phone number invalid');
      case '7':
        throw new Error('Number size more than 50000');
      case '8':
        throw new Error('Source address must be 1-20, numeric or alphabet');
      case '9':
        throw new Error('Invalid IP');
      case '88':
        throw new Error('Submit failed');
      case '99':
        throw new Error('System error');
      default:
        throw new Error(response.result);
    }
  }
}

export default NXCloud;
