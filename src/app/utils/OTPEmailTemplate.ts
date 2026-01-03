import { formatOTP } from "./formatOTP";

export function buildOTPEmailTemplate(params: {
  userName?: string;
  otp: string;
  expireMinutes: number;
}) {
  const { userName, otp, expireMinutes } = params;
  const formattedOTP = formatOTP(otp);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Toolinger – OTP Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width:520px; background:#ffffff; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.08); overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="center"
            style="padding:24px; background:linear-gradient(135deg,#06b6d4,#0ea5e9);">

            <!-- Logo Box -->
            <table cellpadding="0" cellspacing="0"
              style="width:48px; height:48px; background:linear-gradient(135deg,#22d3ee,#0ea5e9); border-radius:12px; margin-bottom:8px;">
              <tr>
                <td align="center" valign="middle"
                  style="font-size:24px; font-weight:700; color:#ffffff; line-height:48px;">
                  T
                </td>
              </tr>
            </table>

            <!-- Brand Name -->
            <div style="font-size:20px; font-weight:700; color:#ffffff;">
              Toolinger
            </div>

          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px; color:#111827;">

            <h2 style="margin:0 0 12px; font-size:20px;">
              Verify your email address
            </h2>

            <p style="margin:0 0 16px; font-size:14px; color:#374151;">
              ${userName ? `Hi <strong>${userName}</strong>,` : "Hi,"}
            </p>

            <p style="margin:0 0 24px; font-size:14px; color:#374151;">
              Please use the verification code below to complete your process.
            </p>

            <!-- OTP -->
            <div style="
              text-align:center;
              font-size:32px;
              letter-spacing:6px;
              font-weight:700;
              background:#f9fafb;
              border:1px dashed #d1d5db;
              padding:16px;
              border-radius:8px;
              margin-bottom:16px;
              color:#0f172a;">
              ${formattedOTP}
            </div>

            <p style="margin:0 0 8px; font-size:13px; color:#dc2626;">
              This code will expire in ${Math.round(expireMinutes)} minutes.
            </p>

            <p style="margin:0; font-size:13px; color:#6b7280;">
              If you did not request this, you can safely ignore this email.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center"
            style="padding:16px; background:#f9fafb; font-size:12px; color:#6b7280;">
            Regards,<br />
            <strong>Toolinger Team</strong>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
}
