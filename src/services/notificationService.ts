import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/emailSender';
import { generateEmailOtp } from '../utils/otpGenerator';
import { getEmailTemplate } from '../templates/emailTemplates';
import registrationTemplate from '../templates/registrationTemplate';
import loginTemplate from '../templates/loginTemplate';

const prisma = new PrismaClient();

class NotificationService {
    static async processEmailNotification({
        gearId,
        scenarioId,
        userEmail,
        emailOTP,
        mobileOTP,
    }: any): Promise<void> {
        let templateContent = '';
        let subject = '';
        let otp = '';
        if (scenarioId === '00001') {
            subject = 'Registration OTP';
            templateContent = registrationTemplate;
        } else if (scenarioId === '00002') {
            subject = 'Login OTP';
            templateContent = loginTemplate;
        } else {
            throw new Error('Scenario ID not supported');
        }
        const existingOtp = await prisma.otp.findFirst({
            where: {
                email: userEmail,
            },
        });
        if (existingOtp && new Date(existingOtp.expiresAt) > new Date()) {
            throw new Error('An OTP has already been generated and is still valid.');
        }
        if (existingOtp && new Date(existingOtp.expiresAt) <= new Date()) {
            await prisma.otp.delete({
                where: {
                    id: existingOtp.id,
                },
            });
        }
        if (emailOTP) {
            otp = generateEmailOtp();
        }
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await prisma.otp.create({
            data: {
                email: userEmail,
                otpCode: otp,
                expiresAt,
            },
        });
        const emailBody = getEmailTemplate(templateContent, {
            OTP: otp,
            USER_NAME: 'User',
            COMPANY_NAME: 'TS',
            SUPPORT_EMAIL: 'tanmaysinghx99@gmail.com',
            CURRENT_YEAR: '2025'
        });
        await sendEmail(userEmail, subject, emailBody);
    }


    static async verifyOtp(email: string, otpCode: string): Promise<boolean> {
        await prisma.otp.deleteMany({
            where: {
                email,
                expiresAt: {
                    lte: new Date(),
                },
            },
        });
        const otpRecord = await prisma.otp.findFirst({
            where: {
                email,
                otpCode,
                isVerified: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!otpRecord) {
            throw new Error('Invalid or expired OTP.');
        }
        await prisma.otp.update({
            where: { id: otpRecord.id },
            data: { isVerified: true },
        });
        await prisma.otp.delete({
            where: { id: otpRecord.id },
        });
        return true;
    }

}

export default NotificationService;