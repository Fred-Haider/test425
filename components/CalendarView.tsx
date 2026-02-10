'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types/calendar';

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showShareForm, setShowShareForm] = useState<string | null>(null);
  const [currentUser] = useState('user@example.com'); // Simulated current user

  // Form state for adding events
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  // Load events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Omit<CalendarEvent, 'id' | 'createdAt'> = {
      ...formData,
      sharedWith: [],
      createdBy: currentUser,
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        await fetchEvents();
        setFormData({ title: '', description: '', date: '', startTime: '', endTime: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const handleRemoveEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchEvents();
      }
    } catch (error) {
      console.error('Failed to remove event:', error);
    }
  };

  const handleShareEvent = async (eventId: string, email: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: email }),
      });

      if (response.ok) {
        await fetchEvents();
        setShowShareForm(null);
      }
    } catch (error) {
      console.error('Failed to share event:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Calendar</h1>
        <p className="text-gray-600">Logged in as: {currentUser}</p>
      </div>

      {/* Add Event Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          {showAddForm ? 'Cancel' : 'Add New Event'}
        </button>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              Add Event
            </button>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No events yet. Add your first event!</p>
        ) : (
          events
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                      <p>⏰ Time: {event.startTime} - {event.endTime}</p>
                      <p>👤 Created by: {event.createdBy}</p>
                      {event.sharedWith.length > 0 && (
                        <p>🤝 Shared with: {event.sharedWith.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowShareForm(event.id === showShareForm ? null : event.id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Share Form */}
                {showShareForm === event.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formElement = e.target as HTMLFormElement;
                        const emailInput = formElement.elements.namedItem('email') as HTMLInputElement;
                        const email = emailInput.value;
                        handleShareEvent(event.id, email);
                        formElement.reset();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email to share with"
                        required
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      />
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowShareForm(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm transition"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
