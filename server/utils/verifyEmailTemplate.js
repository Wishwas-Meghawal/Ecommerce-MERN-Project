const VerificationEmail = (username, otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f4f6fb;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #7c3aed, #8b5cf6);
      padding: 40px 30px;
      text-align: center;
      color: #ffffff;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }

    .header p {
      margin-top: 8px;
      font-size: 15px;
      opacity: 0.9;
    }

    .content {
      padding: 40px 30px;
    }

    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }

    .username {
      color: #7c3aed;
      font-weight: 600;
    }

    .otp-box {
      margin: 30px auto;
      text-align: center;
    }

    .otp-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
    }

    .otp-code {
      display: inline-block;
      background: #f5f3ff;
      color: #5b21b6;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 10px;
      padding: 16px 32px;
      border-radius: 12px;
      border: 1px dashed #c4b5fd;
    }

    .info {
      font-size: 14px;
      color: #4b5563;
      line-height: 1.6;
      margin-top: 25px;
    }

    .warning {
      margin-top: 30px;
      padding: 16px;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 10px;
      color: #9a3412;
      font-size: 14px;
    }

    .footer {
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #9ca3af;
      border-top: 1px solid #e5e7eb;
    }

    .brand {
      font-weight: 600;
      color: #7c3aed;
    }

    @media (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }
      .otp-code {
        font-size: 28px;
        letter-spacing: 6px;
      }
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <h1>Verify Your Email</h1>
      <p>Complete your registration</p>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="greeting">
        Hello <span class="username">${username}</span>,
      </p>

      <p class="info">
        Thank you for registering with <span class="brand">Ecommerce App</span>.
        Please use the verification code below to confirm your email address.
      </p>

      <!-- OTP -->
      <div class="otp-box">
        <div class="otp-label">Your verification code</div>
        <div class="otp-code">${otp}</div>
      </div>

      <p class="info">
        This code is valid for <strong>10 minutes</strong>.
        If you did not request this, you can safely ignore this email.
      </p>

      <!-- Warning -->
      <div class="warning">
        🔒 Never share this code with anyone. Our team will never ask for your verification code.
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      © ${new Date().getFullYear()} <span class="brand">Ecommerce App</span><br/>
      All rights reserved.
    </div>

  </div>
</body>
</html>
`;
};

export default VerificationEmail;
