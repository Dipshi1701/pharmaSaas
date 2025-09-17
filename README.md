# PharmaSaas Frontend

A modern React-based frontend for the PharmaSaas pharmaceutical research and development platform, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at: `http://localhost:8080`

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start development server (localhost:8080)

# Building
npm run build            # Build for production
npm run build:dev        # Build for development
npm run build:staging    # Build for staging
npm run build:prod       # Build for production (same as build)

# Analysis
npm run build:analyze    # Build and analyze bundle size

# Code Quality
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

## 🏗️ Project Structure

```
pharmaSaas-frontend/
├── public/                 # Static assets
│   ├── chatbot/           # Chatbot styling and configuration
│   │   ├── style.css      # Custom chatbot styles
│   │   └── inbenta-chatbot-style.css
│   ├── inbenta-chatbot.js # Chatbot integration
│   ├── favicon.ico
│   └── robots.txt
├── src/                   # Source code
│   ├── auth/             # Authentication components
│   │   ├── Login.tsx     # Login page
│   │   ├── ProtectedOutlet.tsx # Route protection
│   │   └── session.ts    # Session management
│   ├── components/       # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Header.tsx   # Site header
│   │   ├── Footer.tsx   # Site footer
│   │   ├── Hero.tsx     # Hero section
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Index.tsx    # Home page
│   │   ├── About.tsx    # About page
│   │   ├── Dashboard.tsx # User dashboard
│   │   ├── Login.tsx    # Login page
│   │   └── ...
│   ├── services/        # API services
│   │   ├── authService.ts # Authentication API
│   │   ├── dashboardService.ts # Dashboard API
│   │   └── index.ts     # Service exports
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── assets/          # Images and static assets
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── dist/                # Built files (generated)
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Technology Stack

### Core Technologies
- **React 18** - UI framework with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Unstyled, accessible UI primitives
- **shadcn/ui** - Beautiful, accessible components built with Radix UI
- **Lucide React** - Beautiful & consistent icon toolkit
- **Framer Motion** - Production-ready motion library

### Routing & State
- **React Router DOM** - Declarative routing for React
- **React Hook Form** - Performant, flexible forms with easy validation
- **Zod** - TypeScript-first schema validation

### Data Visualization
- **Recharts** - Composable charting library built on React and D3
- **TanStack Query** - Powerful data synchronization for React

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎯 Key Features

### Authentication System
- **JWT-based authentication** with secure token handling
- **Protected routes** that require authentication
- **Session management** with automatic token refresh
- **Login/logout functionality** with proper state management

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Responsive breakpoints** for all screen sizes
- **Touch-friendly interface** for mobile devices
- **Accessible design** following WCAG guidelines

### Component Library
- **50+ reusable components** built with shadcn/ui
- **Consistent design system** with Tailwind CSS
- **Accessible components** with proper ARIA attributes
- **Customizable themes** and styling

### Chatbot Integration
- **AI-powered healthcare assistant** using Inbenta platform
- **Custom styling** to match the application design
- **Responsive chatbot** that works on all devices
- **Error handling** and fallback mechanisms

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=PharmaSaas
```

### Vite Configuration
The `vite.config.ts` file includes:
- **React plugin** with SWC for fast compilation
- **Path aliases** for clean imports (`@/` for src)
- **Build optimization** with manual chunk splitting
- **Asset optimization** with proper file naming

### Tailwind Configuration
The `tailwind.config.ts` includes:
- **Custom color palette** for the pharmaceutical theme
- **Extended spacing** and typography
- **Component-specific utilities**
- **Dark mode support** (if needed)

## 🚀 Development Workflow

### 1. Starting Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Making Changes
- Edit files in the `src/` directory
- Changes are automatically reflected in the browser
- Use TypeScript for type safety
- Follow the existing component patterns

### 3. Building for Production
```bash
# Build the application
npm run build

# The built files will be in the dist/ directory
```

### 4. Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

## 📱 Pages & Routes

### Public Routes
- `/` - Home page with hero section and features
- `/about` - About the company and mission
- `/services` - Services offered
- `/research` - Research and development information
- `/contact` - Contact information and form

### Protected Routes (Require Authentication)
- `/dashboard` - User dashboard with analytics
- `/login` - Login page (redirects if already logged in)

### API Integration
- **Authentication**: Login, logout, token verification
- **Dashboard**: User data, analytics, charts
- **Error Handling**: Proper error states and user feedback

## 🤖 Chatbot Configuration

### Files
- `public/inbenta-chatbot.js` - Chatbot integration and configuration
- `public/chatbot/style.css` - Custom chatbot styling
- `public/chatbot/inbenta-chatbot-style.css` - Additional chatbot styles

### Configuration
The chatbot is configured with:
- **Custom title**: "Pharma Assistant"
- **Healthcare-focused responses**
- **Branded styling** to match the application
- **Responsive design** for all devices

### Development vs Production
- **Development**: Uses development API keys and endpoints
- **Production**: Uses production API keys and endpoints
- **Local Testing**: Mock chatbot for CSS testing without API calls

## 🎨 Styling Guidelines

### CSS Architecture
- **Tailwind CSS** for utility-first styling
- **Component-scoped styles** for complex components
- **CSS custom properties** for theming
- **Responsive design** with mobile-first approach

### Design System
- **Color palette**: Professional pharmaceutical theme
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable, accessible components

### Best Practices
- Use Tailwind utilities for most styling
- Create custom components for complex UI patterns
- Maintain consistent spacing and typography
- Ensure accessibility with proper ARIA attributes

## 🚀 Deployment

### Building for Production
```bash
# Build the application
npm run build

# The dist/ folder contains all built files
```

### Deployment Steps
1. **Build the application**: `npm run build`
2. **Upload dist/ contents** to your web server
3. **Upload .htaccess file** for SPA routing (if using Apache)
4. **Configure server** to serve index.html for all routes

### Server Configuration
For Single Page Application (SPA) routing:
- **Apache**: Use the provided `.htaccess` file
- **Nginx**: Configure try_files directive
- **IIS**: Use the provided `web.config` file

## 🐛 Troubleshooting

### Common Issues

#### 1. Page Not Found on Refresh
**Problem**: Getting 404 errors when refreshing pages like `/login`
**Solution**: Ensure `.htaccess` file is uploaded to server root directory

#### 2. Chatbot Not Loading
**Problem**: Chatbot shows error or doesn't appear
**Solution**: 
- Check Inbenta API keys in `public/inbenta-chatbot.js`
- Verify domain configuration
- Check browser console for errors

#### 3. Build Failures
**Problem**: `npm run build` fails
**Solution**:
- Check Node.js version (requires v18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

#### 4. CORS Errors
**Problem**: API calls fail with CORS errors
**Solution**:
- Ensure backend is running on correct port
- Check backend CORS configuration
- Verify API URLs in environment variables

### Development Tips
- Use browser dev tools for debugging
- Check the Network tab for API call issues
- Use React DevTools for component debugging
- Check console for JavaScript errors

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Learning Resources
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [React Hook Form Guide](https://react-hook-form.com/get-started)
- [Zod Schema Validation](https://zod.dev/)

---

**Need Help?** Check the main project README or create an issue in the repository.
