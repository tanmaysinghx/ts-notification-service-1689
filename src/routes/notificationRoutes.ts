import { Router } from 'express';
import { validateNotificationRequest } from '../middleware/validateRequest';
import { sendNotification, verifyOtp, sendWelcomeEmail } from '../controllers/notificationController';
import { validateWelcomeEmailRequest } from '../middleware/validateWelcomeRequest';

const router = Router();

router.post('/notifications/send', validateNotificationRequest, sendNotification);
router.post('/notifications/verify-otp', verifyOtp);
router.post('/notifications/send-welcome', validateWelcomeEmailRequest, sendWelcomeEmail);

export default router;


