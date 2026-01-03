export function formatOTP(otp: string): string {
  if (!otp) return "";

  const len = otp.length;

  if (len === 4) return otp.replace(/(\d{2})(\d{2})/, "$1-$2");
  if (len === 6) return otp.replace(/(\d{3})(\d{3})/, "$1-$2");
  if (len === 8) return otp.replace(/(\d{4})(\d{4})/, "$1-$2");

  return otp;
}
