export const AuthRequestTopic = {
    GET_NONCE : 'getNonce',
    VERIFY : 'verify',
    GET_INFO : 'getInfo',
} as const;

export type AuthRequestTopic = typeof AuthRequestTopic[keyof typeof AuthRequestTopic];

