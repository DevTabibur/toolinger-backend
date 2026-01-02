export interface ISentMessage {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  content: string; // HTML content
  status: "sent" | "failed";
  errorMessage?: string; // To store error details if failed
  sentAt?: Date;
}

export interface ISendEmailRequest {
  from?: string;
  name?: string;
  to: {
    email: string;
    name?: string;
  }[];
  subject: string;
  htmlBody: string;
  message?: string;
}
