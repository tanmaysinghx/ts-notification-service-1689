import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/emailSender';
import { generateEmailOtp } from '../utils/otpGenerator';
import { getEmailTemplate } from '../templates/emailTemplates';
import registrationTemplate from '../templates/registrationTemplate';
import loginTemplate from '../templates/loginTemplate';
import passwordChangeTemplate from '../templates/passwordChangeTemplate';

const prisma = new PrismaClient();

class NotificationService {
    static async processEmailNotification({
        gearId,
        scenarioId,
        userEmail,
        emailOTP,
        mobileOTP,
    }: any): Promise<string> {
        const scenarios: { [key: string]: { subject: string; template: string } } = {
            "00001": { subject: "Registration OTP", template: registrationTemplate },
            "00002": { subject: "Login OTP", template: loginTemplate },
            "00003": { subject: "Password Change OTP", template: passwordChangeTemplate },
        };
        const scenario = scenarios[scenarioId];
        if (!scenario) {
            throw new Error(`Scenario ID '${scenarioId}' not supported`);
        }
        let otp = "";
        let actions = [];
        const existingOtp = await prisma.otp.findFirst({ where: { email: userEmail } });
        if (existingOtp) {
            const isOtpValid = new Date(existingOtp.expiresAt) > new Date();
            if (isOtpValid) {
                throw new Error("An OTP is already valid and will expire in 10 minutes.");
            } else {
                await prisma.otp.delete({ where: { id: existingOtp.id } });
            }
        }

        if (emailOTP) {
            otp = generateEmailOtp();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
            await prisma.otp.create({
                data: {
                    email: userEmail,
                    otpCode: otp,
                    expiresAt,
                },
            });
            const emailBody = getEmailTemplate(scenario.template, {
                OTP: otp,
                USER_NAME: "User",
                COMPANY_NAME: "TS",
                SUPPORT_EMAIL: "tanmaysinghx99@gmail.com",
                CURRENT_YEAR: new Date().getFullYear().toString(),
            });
            await sendEmail(userEmail, scenario.subject, emailBody);
            actions.push(`Email OTP sent to ${userEmail}`);
        }
        if (mobileOTP) {
            // Implement mobile OTP logic here
            actions.push(`Mobile OTP sent`);
        }

        return actions.join(" and ");
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