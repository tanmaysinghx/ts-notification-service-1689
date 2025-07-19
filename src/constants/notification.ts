export const OTP_EXPIRATION_TIME = 10 * 60 * 1000;

export const EMAIL_TEMPLATE_CONFIG = {
    USER_NAME: "User",
    COMPANY_NAME: "TS",
    SUPPORT_EMAIL: "tanmaysinghx99@gmail.com",
};

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
export const AUTO_LOGIN_TOKEN_EXPIRY = '9h';