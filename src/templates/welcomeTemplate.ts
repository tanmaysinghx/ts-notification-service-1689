const welcomeTemplate = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
    <!-- Header -->
    <div style="text-align: center; padding: 10px 0; background-color: #4A90E2; color: #fff; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0; font-size: 24px;">{{COMPANY_NAME}}</h1>
    </div>
    
    <!-- Body -->
    <div style="padding: 20px;">
      <h2 style="color: #4A90E2; text-align: center;">🎉 Welcome Aboard!</h2>
      <p style="font-size: 1.1em; text-align: center; margin-bottom: 20px;">
        Hello <strong>{{USER_EMAIL}}</strong>,<br>
        We're thrilled to have you join our platform. Your account has been successfully created.
      </p>

      <!-- Login Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{AUTO_LOGIN_URL}}" style="display: inline-block; padding: 12px 30px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Login to Your Account
        </a>
        <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
          This link will automatically log you in for your convenience.
        </p>
      </div>

      <!-- Account Info -->
      <div style="background-color: #e8f4fc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #4A90E2; margin-top: 0;">📋 Your Account Details</h3>
        <p><strong>Email:</strong> {{USER_EMAIL}}</p>
        <p><strong>Platform URL:</strong> <a href="{{PLATFORM_URL}}" style="color: #4A90E2;">{{PLATFORM_URL}}</a></p>
        <p style="color: #555;"><em>For security reasons, please change your password after your first login.</em></p>
      </div>

      <!-- Support Info -->
      <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; border-radius: 6px;">
        <h4 style="margin-top: 0;">📞 Need Help?</h4>
        <p>If you have any questions or need assistance, contact our support team:</p>
        <p><strong>Email:</strong> <a href="mailto:{{SUPPORT_EMAIL}}" style="color: #4A90E2;">{{SUPPORT_EMAIL}}</a></p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 15px 0; border-top: 1px solid #ddd; font-size: 0.9em; color: #777;">
      <p>&copy; {{CURRENT_YEAR}} {{COMPANY_NAME}}. All rights reserved.</p>
      <p>This email was sent to {{USER_EMAIL}}. If you didn’t request this, please contact support.</p>
    </div>
  </div>
`;

export default welcomeTemplate;
