import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';

const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: emailConfig.auth,
});

export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
    await transporter.sendMail({
        from: `"Support Team" <${emailConfig.auth.user}>`,
        to,
        subject,
        html,
    });
};
