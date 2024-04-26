export interface MailOptions {
  to: string;
  subject: string;
  body?: string;
  text?: string;
  attachments?: [
    {
      path?: string;
      filename?: string;
      url?: string;
    }
  ];
}
