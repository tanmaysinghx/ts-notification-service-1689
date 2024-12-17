import { Request, Response, NextFunction } from 'express';

export const validateNotificationRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { gearId, scenarioId, userEmail } = req.body;
  if (!gearId || !scenarioId || !userEmail) {
    res.status(400).json({ success: false, message: 'Missing required fields.' });
    return;
  }
  next();
};
