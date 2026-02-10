// In-memory storage for events (for demo purposes)
// In production, this would be replaced with a database
import { CalendarEvent } from '@/types/calendar';

let events: CalendarEvent[] = [];

export const eventStore = {
  getAll: (): CalendarEvent[] => {
    return [...events];
  },

  getById: (id: string): CalendarEvent | undefined => {
    return events.find((event) => event.id === id);
  },

  getByUser: (userId: string): CalendarEvent[] => {
    return events.filter(
      (event) =>
        event.createdBy === userId || event.sharedWith.includes(userId)
    );
  },

  add: (event: CalendarEvent): CalendarEvent => {
    events.push(event);
    return event;
  },

  remove: (id: string): boolean => {
    const initialLength = events.length;
    events = events.filter((event) => event.id !== id);
    return events.length < initialLength;
  },

  update: (id: string, updates: Partial<CalendarEvent>): CalendarEvent | null => {
    const index = events.findIndex((event) => event.id === id);
    if (index === -1) return null;
    
    events[index] = { ...events[index], ...updates };
    return events[index];
  },

  shareEvent: (eventId: string, userId: string): CalendarEvent | null => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return null;

    if (!event.sharedWith.includes(userId)) {
      event.sharedWith.push(userId);
    }
    return event;
  },

  unshareEvent: (eventId: string, userId: string): CalendarEvent | null => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return null;

    event.sharedWith = event.sharedWith.filter((id) => id !== userId);
    return event;
  },
};
