// Type definitions for calendar events
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  sharedWith: string[]; // Array of user IDs or emails
  createdBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
