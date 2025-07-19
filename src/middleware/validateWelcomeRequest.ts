import { Request, Response, NextFunction } from 'express';

export const validateWelcomeEmailRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { email, url } = req.body;
    if (!email || !url) {
        res.status(400).json({
            success: false,
            message: 'Missing required fields: email, password, and url are required.'
        });
        return;
    }
    try {
        new URL(url);
    } catch {
        res.status(400).json({
            success: false,
            message: 'Invalid URL format.'
        });
        return;
    }
    next();
};
