import { SendMailClient } from "zeptomail";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

export type ZeptoRecipient = {
  email: string;
  name?: string;
};

type SendZeptoMailParams = {
  to: ZeptoRecipient[]; // single or multiple
  subject: string;
  htmlBody: string;
  fromName?: string;
  fromEmail?: string;
};

export async function sendZeptoMail({
  to,
  subject,
  htmlBody,
  fromName = "Toolinger Admin",
  fromEmail = "admin@toolinger.com",
}: SendZeptoMailParams): Promise<any> {
  if (!config.zeptomail?.token || !config.zeptomail?.url) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "ZeptoMail configuration missing",
    );
  }

  if (!to || to.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Recipient list cannot be empty",
    );
  }

  const client = new SendMailClient({
    url: config.zeptomail.url,
    token: config.zeptomail.token,
  });

  const recipients = to.map((r) => ({
    email_address: {
      address: r.email,
      name: r.name || "",
    },
  }));

  try {
    return await client.sendMail({
      from: {
        address: fromEmail, // MUST be verified in ZeptoMail
        name: fromName,
      },
      to: recipients,
      subject,
      htmlbody: htmlBody,
    });
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error?.message || "ZeptoMail send failed",
    );
  }
}
