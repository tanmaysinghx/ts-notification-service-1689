import { Router } from 'express';
import { validateNotificationRequest } from '../middleware/validateRequest';
import NotificationController from '../controllers/notificationController';

const router = Router();

router.post('/notifications', validateNotificationRequest, NotificationController.sendNotification);

export default router;
