const registrationTemplate = `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center; padding: 20px; background-color: #4A90E2; border-radius: 10px 10px 0 0;">
      <img src="https://via.placeholder.com/100x100?text=Logo" alt="Company Logo" style="width: 80px; margin-bottom: 10px;" />
      <h1 style="color: #fff; margin: 0; font-size: 1.8em;">Verify Your Email Address</h1>
    </div>
    <div style="padding: 20px; text-align: center; color: #333;">
      <p style="font-size: 1.1em;">Welcome to <strong>Our Platform</strong>!</p>
      <p style="font-size: 1em; margin: 15px 0;">Here is your one-time password (OTP) for registration:</p>
      <p style="font-size: 2em; font-weight: bold; color: #4A90E2; margin: 10px 0;">{{OTP}}</p>
      <p style="font-size: 0.9em; color: #666;">This code is valid for the next <strong>10 minutes</strong>.</p>
      <a href="#" style="display: inline-block; margin-top: 20px; padding: 10px 20px; color: #fff; background-color: #4A90E2; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirm Email</a>
      <p style="margin-top: 20px; font-size: 0.9em; color: #666;">If you did not request this email, you can safely ignore it.</p>
    </div>
    <div style="padding: 20px; text-align: center; font-size: 0.8em; color: #999; background-color: #f1f1f1; border-radius: 0 0 10px 10px;">
      <p>© 2025 YourCompany Inc. All rights reserved.</p>
      <p><a href="#" style="color: #4A90E2; text-decoration: none;">Unsubscribe</a></p>
    </div>
  </div>
`;
export default registrationTemplate;
