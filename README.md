# Socorro Community Help App Admin

A Next.js-based admin dashboard for the Socorro Community Help App, designed to assist the community in connecting with public offices. This application was developed by BGFC College students to facilitate real-world connections between community members and public services.

## 🚀 Features

- **Admin Dashboard**: Comprehensive overview of community reports and announcements
- **User Management**: Department-based user authentication (Police, Hospital, Fire Department)
- **Report Management**: Track and manage community reports with status updates
- **Announcement System**: Create and manage public announcements
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Authentication**: Secure login system with NextAuth.js
- **Database Integration**: PostgreSQL database with Vercel Postgres

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v5
- **Database**: PostgreSQL (Vercel Postgres)
- **UI Components**: Heroicons
- **Password Hashing**: bcrypt
- **Validation**: Zod

## 📋 Prerequisites

- Node.js >= 18.17.0
- PostgreSQL database (or Vercel Postgres)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd help-app-admin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Database
POSTGRES_URL="your-postgres-connection-string"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url"
POSTGRES_USER="your-postgres-username"
POSTGRES_HOST="your-postgres-host"
POSTGRES_PASSWORD="your-postgres-password"
POSTGRES_DATABASE="your-postgres-database"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup

Run the database seeding script to create tables and initial data:

```bash
npm run seed
```

This will create the following tables:
- `users` - Admin users with department assignments
- `announcements` - Public announcements
- `reports` - Community reports

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
help-app-admin/
├── app/
│   ├── dashboard/          # Admin dashboard pages
│   │   ├── (overview)/     # Dashboard overview
│   │   ├── announcements/  # Announcement management
│   │   └── reports/        # Report management
│   ├── login/              # Authentication pages
│   ├── ui/                 # Reusable UI components
│   └── lib/                # Utility functions and data
├── auth.config.ts          # NextAuth configuration
├── auth.ts                 # Authentication setup
├── middleware.ts           # Next.js middleware
├── scripts/
│   └── seed.js            # Database seeding script
└── public/                # Static assets
```

## 🔐 Authentication

The application uses NextAuth.js for authentication with the following features:

- **Department-based Access**: Users are assigned to specific departments (Police, Hospital, Fire)
- **Secure Login**: Password hashing with bcrypt
- **Protected Routes**: Dashboard routes require authentication
- **Auto-redirect**: Authenticated users are redirected to dashboard

### Default Users

The seeding script creates the following test users:

- **Police Department**: `user@nextmail.com` / `123456`
- **Hospital Department**: `jeann@nextmail.com` / `123456`
- **Fire Department**: `kaijay@nextmail.com` / `123456`

## 📊 Dashboard Features

### Overview Dashboard
- User statistics and department information
- Recent reports overview
- Quick access to main features

### Report Management
- View community reports
- Update report status
- Filter by department
- Track report progress

### Announcement System
- Create public announcements
- Manage announcement content
- Schedule announcement dates

## 🚀 Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prettier` - Format code with Prettier
- `npm run prettier:check` - Check code formatting
- `npm run seed` - Seed database with initial data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

Developed by BGFC College students for the Socorro Community Help App project.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is an admin dashboard for the Socorro Community Help App. Make sure to configure your database and environment variables properly before running the application.