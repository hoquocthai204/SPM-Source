export interface Notification {
    id?: number;
    subject?: string;
    message?: string;
    isSeen?: boolean;
    createdDate?: string;
    countUnread?: number;
}
  