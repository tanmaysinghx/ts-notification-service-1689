const loginTemplate = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
    <!-- Header -->
    <div style="text-align: center; padding: 10px 0; background-color: #4A90E2; color: #fff; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0; font-size: 24px;">{{COMPANY_NAME}}</h1>
    </div>
    
    <!-- Body -->
    <div style="padding: 20px;">
      <h2 style="color: #4A90E2; text-align: center;">Login Alert</h2>
      <p style="font-size: 1.1em; text-align: center; margin-bottom: 20px;">
        We received a request to log in to your account. Use the code below to complete your login:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 2.5em; font-weight: bold; color: #4A90E2; background-color: #e8f4fc; padding: 10px 20px; border-radius: 8px; display: inline-block;">{{OTP}}</span>
      </div>
      <p style="text-align: center; font-size: 1.1em;">
        This code is valid for the next <strong>10 minutes</strong>.
      </p>
      <p style="margin-top: 20px; text-align: center; color: #555;">
        If you didn't request this, please ignore this email or contact our support team immediately.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 15px 0; border-top: 1px solid #ddd; font-size: 0.9em; color: #777;">
      <p>Need help? Contact us at <a href="mailto:{{SUPPORT_EMAIL}}" style="color: #4A90E2; text-decoration: none;">{{SUPPORT_EMAIL}}</a></p>
      <p>&copy; {{CURRENT_YEAR}} {{COMPANY_NAME}}. All rights reserved.</p>
    </div>
  </div>
`;
export default loginTemplate;
