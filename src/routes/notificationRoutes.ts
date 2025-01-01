import { Router } from 'express';
import { validateNotificationRequest } from '../middleware/validateRequest';
import NotificationController from '../controllers/notificationController';

const router = Router();

router.post('/notifications/send', validateNotificationRequest, NotificationController.sendNotification);
router.post('/notifications/verify-otp', NotificationController.verifyOtp);

export default router;
