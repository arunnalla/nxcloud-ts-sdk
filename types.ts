interface SendSMSOptionalParams {
  sourceAddress?: string;
  systemMessageId?: string;
  shortLink?: string;
  linkVerbose?: string;
  drUrl?: string;
  ext?: string;
}

interface SendSMSParams extends SendSMSOptionalParams {
  phone: string;
  content: string;
}

interface SendSMSRequestBodyOptionalParams {
  source_address?: string;
  sys_messageid?: string;
  short_link?: string;
  linkVerbose?: string;
  dr_url?: string;
  ext?: string;
}

interface SendSMSRequestBodyParams extends SendSMSRequestBodyOptionalParams {
  appKey: string;
  secretKey: string;
  phone: string;
  content: string;
}

interface SendSMSResponse {
  result: string;
  code: string;
  messageId: string;
}

export {
  SendSMSOptionalParams,
  SendSMSParams,
  SendSMSRequestBodyOptionalParams,
  SendSMSRequestBodyParams,
  SendSMSResponse,
};
