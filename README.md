# NextJS Authentication Simple System

A complete authentication system built with Next.js, featuring user registration, login, session management, and protected routes.

## Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT sessions with jose library
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm

## Features

- User registration and login
- Secure password hashing
- JWT-based session management
- Protected routes with middleware
- Form validation with error handling
- Responsive design
- Database integration with Prisma

## Project Structure

```
app/
├── dashboard/          # Protected dashboard page
├── login/             # Login page and actions
├── sign-in/           # Registration page and actions
├── globals.css        # Global styles
├── layout.tsx         # Root layout
└── page.tsx           # Home page

components/
└── ui/                # Reusable UI components

lib/
├── actions.ts         # Session management functions
├── prisma.ts          # Prisma client configuration
└── utils.ts           # Utility functions

prisma/
└── schema.prisma      # Database schema

middleware.ts          # Route protection middleware
```

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- pnpm package manager

## Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a new database:
```sql
CREATE DATABASE nextjs_auth;
```

### Option 2: Cloud PostgreSQL (Recommended)

Use a cloud provider like:
- **Neon** (neon.tech)
- **Supabase** (supabase.com)
- **Railway** (railway.app)
- **PlanetScale** (planetscale.com)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-auth
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp example.env .env
```

4. Update the `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://username:password@host:port/database_name"
DIRECT_URL="postgresql://username:password@host:port/database_name"
SESSION_SECRET="your-32-character-secret-key"
NODE_ENV=development
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Push database schema:
```bash
npx prisma db push
```

7. Run the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations) | Yes |
| `SESSION_SECRET` | Secret key for JWT signing (32+ characters) | Yes |
| `NODE_ENV` | Environment mode (development/production) | Yes |

## Database Schema

The application uses a simple User model:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String   # Hashed with bcryptjs
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API Routes

### Authentication Actions

- `POST /login` - User login
- `POST /sign-in` - User registration
- `POST /logout` - User logout

### Protected Routes

- `/dashboard` - Requires authentication
- `/profile` - Requires authentication

### Public Routes

- `/` - Home page
- `/login` - Login page
- `/sign-in` - Registration page

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma db reset

# Generate Prisma client
npx prisma generate
```

## Deployment

### Environment Setup

1. Set up your production database
2. Update environment variables in your hosting platform
3. Ensure `SESSION_SECRET` is cryptographically secure

### Database Migration

```bash
# Generate and apply migrations
npx prisma migrate deploy
```
