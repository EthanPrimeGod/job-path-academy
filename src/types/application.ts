export type ApplicationStatus = "applied" | "in_review" | "interview" | "hired" | "rejected";

export interface Application {
  id: string;
  annotatorId: string;
  jobId: string;
  companyId: string;
  jobTitle: string;
  companyName: string;
  coverNote: string;
  resumeUrl: string;
  resumeFilename: string;
  status: ApplicationStatus;
  expectedPay?: string;
  availability?: string;
  location?: string;
  allowProfileView: boolean;
  appliedAt: string;
  updatedAt: string;
  lastStatusChange?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: "annotator" | "company";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  applicationId: string;
  jobTitle: string;
  companyName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
