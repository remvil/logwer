export interface Document {
  fileName: string;
  documentType: string;
  number: string;
  date: Date;
  assignedPractice: string;
  references: string;
  mailId: string;
  mailDate: Date;
  mailSubject: string;
  attachmentsCount: number;
  sender: string;
  recipient: string;
}
