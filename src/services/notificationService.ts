import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/emailSender';
import { generateOtp } from '../utils/otpGenerator';
import registrationTemplate from '../templates/registrationTemplate';
import loginTemplate from '../templates/loginTemplate';
import { getEmailTemplate } from '../templates/emailTemplates';

const prisma = new PrismaClient();

class NotificationService {
    static async processEmailNotification({ gearId, scenarioId, userEmail, additionalData }: any): Promise<void> {
        let subject: string, templateContent: string;
        switch (scenarioId) {
            case '00001':
                subject = 'Your Registration OTP';
                templateContent = registrationTemplate;
                break;
            case '00002':
                subject = 'Your Login OTP';
                templateContent = loginTemplate;
                break;
            default:
                const dbTemplate = await prisma.emailTemplate.findFirst({
                    where: { gearId, scenarioId },
                });
                if (!dbTemplate) throw new Error('Template not found for given gearId and scenarioId.');
                subject = dbTemplate.subject;
                templateContent = dbTemplate.content;
        }
        const otp = generateOtp();
        const emailBody = getEmailTemplate(templateContent, { OTP: otp, USER_NAME: additionalData?.userName || 'User' });
        await sendEmail(userEmail, subject, emailBody);
        await prisma.notificationLog.create({
            data: { gearId, scenarioId, userEmail, otp, sentAt: new Date() },
        });
    }
}

export default NotificationService;
