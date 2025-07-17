# LES - Legal Evidence System

A comprehensive Document Management System for Customs Administration built with React, TypeScript, and Netlify Functions.

## 🚀 Recent Fixes (January 2025)

### ✅ Resolved Issues
- **TypeScript Errors**: Fixed all property 'message' does not exist errors in admin components
- **Authentication System**: Restored proper login functionality with token verification
- **Error Handling**: Improved error handling across all components
- **Development Setup**: Created comprehensive development guide

### 🛠️ Fixed Files
- `src/pages/admin/SystemDiagnostics.tsx` - Fixed error handling and removed unused imports
- `src/pages/admin/DatabaseInit.tsx` - Fixed error handling
- `src/contexts/AuthContext.tsx` - Restored proper authentication flow
- `src/services/authService.ts` - Improved token verification

## 🏗️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database (free tier available)

### Development Setup

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd LES
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Start Development Server**:
   ```bash
   # Frontend only
   npm run dev

   # OR Full stack with serverless functions
   npm install -g netlify-cli
   netlify dev
   ```

4. **Initialize Database**:
   - Navigate to http://localhost:5173/admin/database-init
   - Click "Initialize Database"
   - Wait for success confirmation

5. **Test Login**:
   - Go to http://localhost:5173/login
   - Use credentials: `admin` / `admin123`

## 📋 System Diagnostics

Visit `/admin/diagnostics` to run comprehensive system tests that check:
- ✅ Website connectivity
- ✅ Database initialization function
- ✅ Authentication login function  
- ✅ Admin credentials test

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Material-UI**: Modern component library
- **React Router**: Client-side routing
- **Context API**: State management for authentication
- **TypeScript**: Type safety and better developer experience

### Backend (Netlify Functions)
- **Serverless Functions**: Authentication and database operations
- **Neon PostgreSQL**: Cloud database with automatic scaling
- **JWT Authentication**: Secure token-based authentication
- **bcrypt**: Password hashing

### Key Features
- 🔐 **Secure Authentication**: JWT-based with role management
- 📊 **Admin Dashboard**: System diagnostics and user management
- 📁 **Document Management**: Upload, organize, and search documents
- 🔍 **Advanced Search**: Full-text search across documents
- 📈 **Reporting**: Comprehensive audit logs and analytics
- 🌐 **Multilingual**: Albanian and English support

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── auth/           # Login and authentication
│   ├── admin/          # Admin panel components
│   └── dashboard/      # Main application views
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── services/           # API service functions
└── types/              # TypeScript type definitions

netlify/functions/      # Serverless functions
├── auth-login.js       # Authentication endpoint
├── db-init.js          # Database initialization
└── db-config.js        # Database configuration
```

## 🚀 Deployment

### Netlify Deployment
1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Environment Variables**: Set up in Netlify dashboard:
   ```
   DATABASE_URL=your-neon-production-url
   JWT_SECRET=secure-production-secret
   ```
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

### Database Setup (Neon)
1. Create account at https://neon.tech
2. Create new database
3. Copy connection string to environment variables
4. Initialize database using admin panel

## 🔧 Development

For detailed development instructions, see [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

### Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build

netlify dev          # Start with functions support
netlify deploy       # Deploy to Netlify
```

## 🐛 Troubleshooting

### Login Issues
1. Ensure database is initialized via `/admin/database-init`
2. Check browser console for errors
3. Verify environment variables are set
4. Run system diagnostics at `/admin/diagnostics`

### Function Errors
1. Use `netlify dev` instead of `npm run dev` for function testing
2. Check Netlify function logs
3. Verify database connection string

### Build Issues
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Check TypeScript errors: `npx tsc --noEmit`

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built for Albanian Customs Administration** 🇦🇱
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
