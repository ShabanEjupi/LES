# Copilot Instructions for Customs Administration System

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a comprehensive customs administration document management system similar to OpenText Documentum, designed specifically for managing customs violations, import/export documentation, case management, and compliance tracking.

## Architecture & Technologies
- **Frontend**: React 18 + TypeScript + Material-UI (MUI)
- **Backend**: Netlify Functions (Node.js)
- **State Management**: React Context + hooks
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup validation
- **Data Visualization**: Recharts
- **File Management**: File upload/download with encryption
- **PDF Generation**: jsPDF + html2canvas
- **Drag & Drop**: react-dnd

## Key Features to Implement
1. **Case Management** - Customs violation cases with full lifecycle
2. **Document Repository** - Version-controlled document storage
3. **Workflow Engine** - Automated approval processes
4. **User Management** - Role-based access control (RBAC)
5. **Audit System** - Complete activity logging
6. **Reporting Dashboard** - Analytics and KPIs
7. **Search Engine** - Advanced document search
8. **Integration APIs** - External customs authority connections

## Code Guidelines
- Use TypeScript with strict typing
- Follow Material-UI design system
- Implement responsive design (mobile-first)
- Use proper error handling and loading states
- Include comprehensive comments for complex logic
- Follow React best practices (hooks, functional components)
- Implement proper security measures for sensitive data
- Use modular architecture with reusable components

## Albanian Language Support
- All user-facing text should support Albanian (Shqip) localization
- Date/time formatting should follow Albanian standards
- Include proper RTL support where needed
- Use Albanian government terminology for customs processes

## File Structure
- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages
- `/src/hooks` - Custom React hooks
- `/src/services` - API services and utilities
- `/src/types` - TypeScript type definitions
- `/src/contexts` - React contexts for state management
- `/netlify/functions` - Backend API functions
- `/src/assets` - Static assets and icons

## Security Considerations
- Implement proper authentication and authorization
- Use encrypted storage for sensitive documents
- Include audit trails for all actions
- Follow GDPR compliance for data handling
- Implement proper input validation and sanitization

## Performance Guidelines
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Lazy load components and routes
- Optimize bundle size with code splitting
- Use proper caching strategies
