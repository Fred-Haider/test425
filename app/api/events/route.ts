import { NextRequest, NextResponse } from 'next/server';
import { eventStore } from '@/lib/eventStore';
import { CalendarEvent } from '@/types/calendar';

// GET all events
export async function GET() {
  try {
    const events = eventStore.getAll();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newEvent: CalendarEvent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date().toISOString(),
    };

    const event = eventStore.add(newEvent);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
