export interface NotificationParams {
    gearId: string;
    scenarioId: string;
    userEmail: string;
    emailOTP?: boolean;
    mobileOTP?: boolean;
}

export interface ScenarioConfig {
    subject: string;
    template: string;
}

export interface OtpRecord {
    id: number;
    email: string;
    otpCode: string;
    expiresAt: Date;
    isVerified: boolean;
}

export interface WelcomeEmailParams {
    email: string;
    url: string;
}

export interface AutoLoginPayload {
    email: string;
    timestamp: number;
    passwordHash: string;
}
