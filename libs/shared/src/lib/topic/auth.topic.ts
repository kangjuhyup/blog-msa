export const AuthRequestTopic = {
    LOGIN : 'request_logIn',
    LOGOUT : 'request_logOut',
    GET_NONCE : 'request_getNonce',
    VERIFY : 'request_verify',
} as const;

export type AuthRequestTopic = typeof AuthRequestTopic[keyof typeof AuthRequestTopic];

export const AuthResponseTopic = {
    SIGN_IN : 'response_signIn',
    SIGN_UP : 'response_signUp',
} as const;

export type AuthResponseTopic = typeof AuthResponseTopic[keyof typeof AuthResponseTopic];