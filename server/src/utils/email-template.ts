export const forgotPasswordTemplate = (
  name: string,
  resetUrl: string
): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
  <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:8px;">
    <h2>Password Reset Request</h2>

    <p>Hello <strong>${name}</strong>,</p>

    <p>We received a request to reset your password.</p>

    <p>
      <a
        href="${resetUrl}"
        style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;"
      >
        Reset Password
      </a>
    </p>

    <p>This link will expire in <strong>15 minutes</strong>.</p>

    <p>If you didn't request this, you can safely ignore this email.</p>

    <hr />

    <p>${resetUrl}</p>
  </div>
</body>
</html>
`;
