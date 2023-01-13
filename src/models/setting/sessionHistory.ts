export interface CurrentSession {
  dateTime: string;
  ipAddress: string;
  isCurrentSession: boolean;
  location: string;
  sessionId: string;
  userAgent: string;
}

export interface PastSession {
  dateTime: string;
  ipAddress: string;
  isCurrentSession: boolean;
  location: string;
  sessionId: string;
  userAgent: string;
}
