# Calendar App - Next.js Starter

A modern, responsive calendar application built with Next.js, TypeScript, and Tailwind CSS. This starter code allows users to create, manage, and share calendar events.

## Features

- ✅ **Add Calendar Events**: Create new events with title, description, date, and time
- ✅ **Remove Events**: Delete events you no longer need
- ✅ **Share Events**: Share events with other users via email
- ✅ **View All Events**: See all your events sorted by date
- ✅ **Event Details**: View comprehensive details including who created and shared each event
- ✅ **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **In-Memory Storage**: Simple data storage (can be replaced with a database)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Fred-Haider/test425.git
cd test425
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
test425/
├── app/
│   ├── api/
│   │   └── events/          # API routes for event management
│   │       ├── route.ts     # GET all events, POST new event
│   │       └── [id]/
│   │           ├── route.ts         # GET/DELETE specific event
│   │           └── share/
│   │               └── route.ts     # Share/unshare events
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   └── CalendarView.tsx     # Main calendar component
├── lib/
│   └── eventStore.ts        # In-memory event storage
├── types/
│   └── calendar.ts          # TypeScript type definitions
└── package.json
```

## API Endpoints

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get a specific event
- `DELETE /api/events/[id]` - Delete an event
- `POST /api/events/[id]/share` - Share an event with a user
- `DELETE /api/events/[id]/share` - Unshare an event

## Usage

### Adding an Event

1. Click the "Add New Event" button
2. Fill in the event details:
   - Title
   - Description
   - Date
   - Start time
   - End time
3. Click "Add Event"

### Removing an Event

- Click the "Delete" button on any event card

### Sharing an Event

1. Click the "Share" button on an event
2. Enter the email address of the person you want to share with
3. Click "Share"

## Customization

### Replacing In-Memory Storage

The current implementation uses in-memory storage (`lib/eventStore.ts`). For production use, replace this with a database:

**Options:**
- PostgreSQL with Prisma
- MongoDB with Mongoose
- Supabase
- Firebase

### Adding Authentication

To add user authentication:
1. Integrate NextAuth.js or Clerk
2. Update the `currentUser` state in `CalendarView.tsx`
3. Add authentication checks in API routes

### Styling

The app uses Tailwind CSS. Customize styles by:
- Modifying `tailwind.config.js`
- Updating component classes in `components/CalendarView.tsx`
- Editing global styles in `app/globals.css`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Future Enhancements

Potential features to add:
- User authentication and authorization
- Persistent database storage
- Calendar view with monthly/weekly/daily layouts
- Event reminders and notifications
- Recurring events
- Event categories and tags
- Search and filter functionality
- Export events to iCal/Google Calendar
- Real-time updates with WebSockets
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the ISC License.

## Support

For issues and questions, please open an issue on GitHub.
