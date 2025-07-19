import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/emailSender';
import { generateEmailOtp } from '../utils/otpGenerator';
import { getEmailTemplate } from '../templates/emailTemplates';
import registrationTemplate from '../templates/registrationTemplate';
import loginTemplate from '../templates/loginTemplate';
import passwordChangeTemplate from '../templates/passwordChangeTemplate';
import { NotificationParams, WelcomeEmailParams } from '../types/notification';
import { AUTO_LOGIN_TOKEN_EXPIRY, EMAIL_TEMPLATE_CONFIG, JWT_SECRET, OTP_EXPIRATION_TIME } from '../constants/notification';
import jwt from 'jsonwebtoken';
import welcomeTemplate from '../templates/welcomeTemplate';

const prisma = new PrismaClient();

// Scenario configuration
const SCENARIOS: { [key: string]: { subject: string; template: string } } = {
    "00001": { subject: "Registration OTP", template: registrationTemplate },
    "00002": { subject: "Login OTP", template: loginTemplate },
    "00003": { subject: "Password Change OTP", template: passwordChangeTemplate },
};

export const processEmailNotification = async ({
    gearId,
    scenarioId,
    userEmail,
    emailOTP,
    mobileOTP,
}: NotificationParams): Promise<string> => {
    const scenario = SCENARIOS[scenarioId];
    if (!scenario) {
        throw new Error(`Scenario ID '${scenarioId}' not supported`);
    }

    const actions: string[] = [];

    // Handle existing OTP validation
    await validateAndCleanupExistingOtp(userEmail);

    // Process email OTP if requested
    if (emailOTP) {
        const emailAction = await sendEmailOtp(userEmail, scenario);
        actions.push(emailAction);
    }

    // Process mobile OTP if requested
    if (mobileOTP) {
        const mobileAction = await sendMobileOtp();
        actions.push(mobileAction);
    }

    return actions.join(" and ");
};

const validateAndCleanupExistingOtp = async (userEmail: string): Promise<void> => {
    const existingOtp = await prisma.otp.findFirst({
        where: { email: userEmail }
    });

    if (existingOtp) {
        const isOtpValid = new Date(existingOtp.expiresAt) > new Date();
        if (isOtpValid) {
            throw new Error("An OTP is already valid and will expire in 10 minutes.");
        } else {
            await prisma.otp.delete({ where: { id: existingOtp.id } });
        }
    }
};

const sendEmailOtp = async (
    userEmail: string,
    scenario: { subject: string; template: string }
): Promise<string> => {
    const otp = generateEmailOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

    // Store OTP in database
    await prisma.otp.create({
        data: {
            email: userEmail,
            otpCode: otp,
            expiresAt,
        },
    });

    // Generate email content
    const emailBody = getEmailTemplate(scenario.template, {
        OTP: otp,
        ...EMAIL_TEMPLATE_CONFIG,
        CURRENT_YEAR: new Date().getFullYear().toString(),
    });

    // Send email
    await sendEmail(userEmail, scenario.subject, emailBody);

    return `Email OTP sent to ${userEmail}`;
};

const sendMobileOtp = async (): Promise<string> => {
    // TODO: Implement mobile OTP logic here
    return "Mobile OTP sent";
};

export const verifyOtpService = async (email: string, otpCode: string): Promise<boolean> => {
    // Clean up expired OTPs
    await cleanupExpiredOtps(email);

    // Find valid OTP
    const otpRecord = await findValidOtp(email, otpCode);

    if (!otpRecord) {
        throw new Error('Invalid or expired OTP.');
    }

    // Mark OTP as verified and delete it
    await markOtpAsVerifiedAndDelete(otpRecord.id);

    return true;
};

const cleanupExpiredOtps = async (email: string): Promise<void> => {
    await prisma.otp.deleteMany({
        where: {
            email,
            expiresAt: {
                lte: new Date(),
            },
        },
    });
};

const findValidOtp = async (email: string, otpCode: string) => {
    return await prisma.otp.findFirst({
        where: {
            email,
            otpCode,
            isVerified: false,
            expiresAt: {
                gt: new Date(),
            },
        },
    });
};

const markOtpAsVerifiedAndDelete = async (otpId: number): Promise<void> => {
    // Mark as verified
    await prisma.otp.update({
        where: { id: otpId },
        data: { isVerified: true },
    });

    // Delete the OTP record
    await prisma.otp.delete({
        where: { id: otpId },
    });
};

export const processWelcomeEmail = async ({
    email,
    url
}: WelcomeEmailParams): Promise<string> => {
    try {
        // Generate secure auto-login token using JWT
        const autoLoginToken = generateSecureAutoLoginToken(email);
        const autoLoginUrl = `${url}/auto-login?token=${autoLoginToken}`;

        // Create welcome email content
        const emailBody = getEmailTemplate(welcomeTemplate, {
            USER_EMAIL: email,
            AUTO_LOGIN_URL: autoLoginUrl,
            PLATFORM_URL: url,
            ...EMAIL_TEMPLATE_CONFIG,
            CURRENT_YEAR: new Date().getFullYear().toString(),
        });

        // Send welcome email
        await sendEmail(email, "Welcome to TS Platform! 🎉", emailBody);

        return `Welcome email sent to ${email} with auto-login link`;
    } catch (error: any) {
        throw new Error(`Failed to send welcome email: ${error.message}`);
    }
};

const generateSecureAutoLoginToken = (email: string): string => {
    const payload = {
        email,
        purpose: 'auto-login',
        iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: AUTO_LOGIN_TOKEN_EXPIRY,
        issuer: 'ts-notification-service',
        subject: email
    });
};

export const verifyAutoLoginToken = (token: string): { email: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded.purpose === 'auto-login') {
            return { email: decoded.email };
        }
        return null;
    } catch (error) {
        return null;
    }
};
