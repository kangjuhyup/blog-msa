const StatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    INVAILD_ADDRESS: 601,
    MESSAGE_TIMEOUT: 602,
    INVAILD_REQEUST : 603,
    UNSUPPORTED_ADDRESS_TYPE : 604,
    UNSUPPORTED_NETWORK: 701,    
  } as const;
  
  type StatusCodeKey = keyof typeof StatusCode;
  type StatusCodeValue = typeof StatusCode[StatusCodeKey];
  
  export { StatusCode, StatusCodeKey, StatusCodeValue };