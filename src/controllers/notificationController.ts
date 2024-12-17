import { Request, Response } from 'express';
import notificationService from '../services/notificationService';

class NotificationController {
    static async sendNotification(req: Request, res: Response): Promise<void> {
        try {
            const { gearId, scenarioId, userEmail, additionalData } = req.body;
            if (!gearId || !scenarioId || !userEmail) {
                res.status(400).json({ success: false, message: 'Missing required fields.' });
                return;
            }
            await notificationService.processEmailNotification({ gearId, scenarioId, userEmail, additionalData });
            res.status(200).json({ success: true, message: 'Notification sent successfully.' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default NotificationController;
