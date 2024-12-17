const registrationTemplate = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #4A90E2;">Welcome to Our Platform!</h2>
    <p style="font-size: 1.1em;">Here is your registration OTP:</p>
    <p style="font-size: 2em; font-weight: bold; color: #4A90E2; margin: 10px 0;">{{OTP}}</p>
    <p>This code is valid for the next <strong>10 minutes</strong>.</p>
    <p>If you didn't request this, please ignore this email or contact support.</p>
    <p style="margin-top: 30px; font-size: 0.9em;">Best regards,<br />Support Team</p>
  </div>
`;
export default registrationTemplate;