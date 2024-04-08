export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  attachments?: [
    {
      filename?: string;
      path: string;
    }
  ];
}
