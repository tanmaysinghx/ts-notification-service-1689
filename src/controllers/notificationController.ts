import { Request, Response } from 'express';
import NotificationService from '../services/notificationService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
    transactionId?: string;
}

class NotificationController {
    static async sendNotification(req: CustomRequest, res: Response): Promise<void> {
        const transactionId = req.transactionId;
        try {
            const { gearId, scenarioId, userEmail, emailOTP, mobileOTP } = req.body;
            if (!gearId || !scenarioId || !userEmail) {
                res.status(400).json(errorResponse("Error", "Missing required fields.", transactionId));
                return;
            }
            const notificationDetails = await NotificationService.processEmailNotification({
                gearId,
                scenarioId,
                userEmail,
                emailOTP,
                mobileOTP,
            });
            res.status(201).json(
                successResponse(
                    "Success",
                    `Notification sent successfully. ${notificationDetails}`,
                    transactionId
                )
            );
        } catch (error: any) {
            const errorMessage = error.message || "An unexpected error occurred.";
            res.status(500).json(errorResponse("Error", errorMessage, transactionId));
        }
    }

    static async verifyOtp(req: CustomRequest, res: Response): Promise<void> {
        const transactionId = req.transactionId;
        try {
            const { email, otpCode } = req.body;
            if (!email || !otpCode) {
                res.status(400).json(errorResponse("Error", "Email and OTP are required.", transactionId,));
                return;
            }
            const isVerified = await NotificationService.verifyOtp(email, otpCode);
            if (isVerified) {
                res.status(200).json(successResponse("Success", "OTP verified successfully.'", transactionId));
            } else {
                res.status(400).json(errorResponse("Error", "Invalid or expired OTP.", transactionId,));
            }
        } catch (error: any) {
            res.status(400).json(errorResponse("Error", error, transactionId,));
        }
    }
}

export default NotificationController;
