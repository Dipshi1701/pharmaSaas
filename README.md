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

## ⚡ Quick Start for Knowledge System

### For New Developers Working on Knowledge Features

If you're specifically working on the knowledge management system:

1. **Essential Files to Know**:
   ```
   src/components/KnowledgeSearch.tsx  # Main search with AI
   src/components/KnowledgeBase.tsx    # Knowledge browsing
   src/components/InbentaDeflection.tsx # Smart deflection
   public/inbenta-chatbot.js           # Chatbot config
   src/index.css                       # Inbenta styling
   ```

2. **Test Knowledge Components**:
   ```bash
   # Start development server
   npm run dev
   
   # Navigate to test pages
   # Search: http://localhost:8080/research (has KnowledgeSearch)
   # Knowledge Base: Integrated in various pages
   # Chatbot: Appears on all pages (bottom-right)
   ```

3. **Debug Knowledge Issues**:
   ```javascript
   // Open browser console and run:
   console.log('Search SDK:', window.InbentaSearchSDK);
   console.log('KM SDK:', window.InbentaKmSDK);
   console.log('Chatbot SDK:', window.buildChatbot);
   ```

4. **Key Configuration Files**:
   - API Keys: Check each component file for hardcoded keys
   - Styling: `src/index.css` contains all Inbenta customizations
   - Chatbot: `public/inbenta-chatbot.js` for chatbot settings

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
│   │   ├── KnowledgeSearch.tsx # AI-powered search component
│   │   ├── KnowledgeBase.tsx   # Knowledge base browser
│   │   ├── InbentaDeflection.tsx # Smart deflection system
│   │   ├── inbentaKnowledge.tsx # Full knowledge widget
│   │   ├── inbentaKnowledge.css # Knowledge widget styles
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

## 🧠 Knowledge Management System

This application features a comprehensive knowledge management system powered by Inbenta, providing AI-enhanced search, knowledge base access, chatbot interaction, and intelligent deflection capabilities.

### 🔍 Knowledge Search Component (`KnowledgeSearch.tsx`)

**Purpose**: Advanced search with AI-powered responses and traditional result display.

**Key Features**:
- **AI-Generated Responses**: Comprehensive answers using Generative AI
- **GDPR Consent Management**: Privacy-compliant AI consent dialog
- **Streaming Responses**: Character-by-character display for better UX
- **Source Attribution**: Links to original knowledge base content
- **Fallback Handling**: Graceful degradation when AI fails

**Configuration**:
```typescript
// Key SDK components initialized:
- searchBox: User input with autocomplete
- results: Search results with highlighting
- generativeAi: AI response generation
- stats: Search statistics display
- pagination: Result navigation
```

**API Keys Required**:
- Domain Key: `eXJUZXN0...` (Development)
- Search API Key: `BhiVmPg0dhpVX0rVqQiyoA2EmBykU7bBny2M8skgoPk=`

### 📚 Knowledge Base Component (`KnowledgeBase.tsx`)

**Purpose**: Browse and search through structured knowledge content.

**Key Features**:
- **Category Navigation**: Hierarchical content organization
- **Autocomplete Search**: Real-time search suggestions
- **Popular Content**: Frequently accessed articles
- **Push Recommendations**: Contextual content suggestions
- **Content Rating**: User feedback on article helpfulness

**Configuration**:
```typescript
// SDK Components:
- searchBox: Knowledge base search
- autocompleter: Search suggestions
- results: Knowledge articles with ratings
- categories: Content categorization
- popular: Trending content
- push: Recommended articles
```

### 🤖 Chatbot Integration (`inbenta-chatbot.js`)

**Purpose**: Interactive AI assistant for real-time user support.

**Key Features**:
- **Healthcare-focused responses**
- **Custom styling** matching application design
- **Rating system** for conversation quality
- **Form integration** for data collection
- **Responsive positioning** for all devices

**Configuration**:
```javascript
// Chatbot Settings:
- Product: "chatbot"
- Environment: "development"
- Launcher Title: "Need Help?"
- Position: Bottom-right with custom positioning
- Rating Options: Yes/No with optional comments
```

**Files**:
- `public/inbenta-chatbot.js` - Main configuration
- `public/chatbot/style.css` - Custom styling
- `public/chatbot/test-chatbot.html` - Testing interface

### 🔄 Deflection Component (`InbentaDeflection.tsx`)

**Purpose**: Intelligently redirect users to self-service options before form submission.

**Key Features**:
- **Instant Suggestions**: Real-time content recommendations
- **Last Chance Dialog**: Pre-submission intervention
- **Form Integration**: Monitors contact form interactions
- **Smart Triggers**: Context-aware deflection timing

**Configuration**:
```typescript
// Deflection Settings:
- Subject Input Monitoring: Watches form subject field
- Message Analysis: Analyzes user intent
- Instant Results: Shows relevant content immediately
- Last Chance: Final deflection before submission
```

## 🚀 Knowledge System Setup Guide

### Prerequisites for Knowledge Features
1. **Inbenta Account**: Active account with API access
2. **Domain Configuration**: Properly configured knowledge domain
3. **API Keys**: Valid keys for development and production
4. **Content Setup**: Knowledge base with content and categories

### Step-by-Step Setup

#### 1. Install Dependencies
```bash
npm install
# All Inbenta SDKs are loaded via CDN
```

#### 2. Configure API Keys
Update the following files with your Inbenta credentials:

**KnowledgeSearch.tsx**:
```typescript
const domainKey = "YOUR_DOMAIN_KEY";
const inbentaKey = "YOUR_SEARCH_API_KEY";
```

**KnowledgeBase.tsx**:
```typescript
const domainKey = "YOUR_DOMAIN_KEY"; 
const apiKey = "YOUR_KM_API_KEY";
```

**InbentaDeflection.tsx**:
```typescript
const domainKey = "YOUR_DOMAIN_KEY";
const apiKey = "YOUR_DEFLECTION_API_KEY";
```

**inbenta-chatbot.js**:
```javascript
const keyvars = {
  inbentakeyvar: "YOUR_CHATBOT_API_KEY",
  domainkeyvar: "YOUR_CHATBOT_DOMAIN_KEY"
};
```

#### 3. Environment Configuration
Create environment-specific configurations:

```typescript
// For development
const config = {
  environment: "development",
  userType: 0,
  lang: "en"
};

// For production  
const config = {
  environment: "production",
  userType: 0,
  lang: "en"
};
```

#### 4. SDK Script Loading
Ensure Inbenta SDKs are loaded in `index.html`:
```html
<!-- Knowledge Management SDK -->
<script src="https://sdk.inbenta.io/chatbot/1.72.0/inbenta-chatbot-sdk.js"></script>
<script src="https://sdk.inbenta.io/search/latest/inbenta-search-sdk.js"></script>
<script src="https://sdk.inbenta.io/km/latest/inbenta-km-sdk.js"></script>
```

#### 5. Custom Styling
The knowledge components use custom CSS in `src/index.css`:
- `.inbenta-search-*` classes for search styling
- `.inbenta-km-*` classes for knowledge base styling  
- `.inbenta-generative-ai-*` classes for AI responses
- Responsive design with mobile-first approach

### Content Management

#### Knowledge Base Content
1. **Categories**: Organize content hierarchically
2. **Articles**: Create comprehensive knowledge articles
3. **Tags**: Add relevant tags for better search
4. **Ratings**: Enable user feedback collection

#### Search Optimization
1. **Synonyms**: Configure search synonyms in Inbenta admin
2. **Autocomplete**: Set up search suggestions
3. **Filters**: Configure content filters and facets
4. **Analytics**: Monitor search performance and popular queries

## 🔧 Advanced Configuration

### AI Response Configuration
```typescript
const generativeAi = sdk.component('generative-ai-response', container, {
  enable: true,
  consent: {
    enable: true,
    title: 'AI-Generated Responses',
    body: 'We use AI to provide comprehensive answers...',
    acceptButton: 'Accept',
    declineButton: 'Decline'
  },
  charsPerChunk: 5,
  delayOnChunk: 30,
  context: {
    enable: true,
    answer: { enable: true },
    showTotal: true
  }
});
```

### Chatbot Customization
```javascript
const sdkChatbotConfig = {
  chatbotId: "your_chatbot_id",
  environment: "development", // or "production"
  ratingOptions: [
    { id: 1, label: "Helpful", comment: false },
    { id: 2, label: "Not Helpful", comment: true }
  ],
  conversationWindow: {
    position: { bottom: 30, right: 15 }
  }
};
```

### Deflection Triggers
```typescript
const deflectionConfig = {
  subjects: ["support", "help", "question"],
  triggers: {
    onSubjectChange: true,
    onMessageLength: 50,
    beforeSubmission: true
  }
};
```

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

#### 2. Knowledge Search Not Working
**Problem**: Search component doesn't load or shows errors
**Solution**:
- Check Inbenta Search SDK is loaded in `index.html`
- Verify API keys in `KnowledgeSearch.tsx`
- Check browser console for "InbentaSearchSDK is not defined" errors
- Ensure domain configuration in Inbenta admin panel

#### 3. AI Responses Not Appearing
**Problem**: Search works but AI responses don't show
**Solution**:
- Check if Generative AI is enabled in Inbenta admin
- Verify consent dialog appears and is accepted
- Check console for AI initialization errors
- Ensure content sources are properly configured

#### 4. Knowledge Base Components Failing
**Problem**: Categories, popular content, or search autocomplete not working
**Solution**:
- Verify `InbentaKmSDK` is loaded correctly
- Check API keys for Knowledge Management service
- Ensure content is published in Inbenta admin
- Check network tab for failed API calls

#### 5. Chatbot Not Loading
**Problem**: Chatbot shows error or doesn't appear
**Solution**: 
- Check Inbenta API keys in `public/inbenta-chatbot.js`
- Verify chatbot domain configuration
- Check browser console for SDK loading errors
- Ensure chatbot is properly trained and published

#### 6. Deflection Not Triggering
**Problem**: Deflection suggestions don't appear on forms
**Solution**:
- Check form element IDs match configuration
- Verify deflection component is properly initialized
- Ensure knowledge base has relevant content
- Check console for deflection SDK errors

#### 7. Build Failures
**Problem**: `npm run build` fails
**Solution**:
- Check Node.js version (requires v18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

#### 8. CORS Errors
**Problem**: API calls fail with CORS errors
**Solution**:
- Ensure backend is running on correct port
- Check backend CORS configuration
- Verify API URLs in environment variables
- Check Inbenta domain whitelist configuration

#### 9. SDK Loading Issues
**Problem**: "InbentaXXXSDK is not defined" errors
**Solution**:
```html
<!-- Ensure these scripts are in index.html -->
<script src="https://sdk.inbenta.io/chatbot/1.72.0/inbenta-chatbot-sdk.js" 
        integrity="sha384-HlSG7tD87XsgPLEqQ/y0pomXhrEH32bVQQ4HopRNHYF2fBPfBTrJFCJkdeSeWhKk" 
        crossorigin="anonymous"></script>
<script src="https://sdk.inbenta.io/search/latest/inbenta-search-sdk.js"></script>
<script src="https://sdk.inbenta.io/km/latest/inbenta-km-sdk.js"></script>
```

#### 10. Content Not Displaying
**Problem**: Knowledge base shows "No content found"
**Solution**:
- Check content is published in Inbenta admin panel
- Verify content has proper categories and tags
- Check user permissions for content access
- Ensure search index is up to date

### Knowledge System Debug Commands

```javascript
// Check SDK availability
console.log('Search SDK:', typeof window.InbentaSearchSDK);
console.log('KM SDK:', typeof window.InbentaKmSDK);

// Check AI consent status
console.log('AI Consent:', localStorage.getItem('inbenta_ai_consent'));

// Monitor SDK initialization
window.addEventListener('inbenta-sdk-ready', () => {
  console.log('Inbenta SDK is ready');
});

// Check component initialization status
// (Components will log their status to console)
```

### API Key Validation

Verify your API keys are correct:

1. **Domain Keys**: Should be JWT tokens starting with "eyJ"
2. **API Keys**: Should be base64 encoded strings ending with "="
3. **Environment**: Ensure development keys are used for development
4. **Permissions**: Verify keys have access to required features

### Performance Optimization

If knowledge components are slow:

1. **Reduce Results**: Limit search results per page
2. **Optimize Content**: Keep articles concise and well-structured
3. **Cache Settings**: Configure appropriate caching in Inbenta admin
4. **Image Optimization**: Ensure images in content are optimized
5. **Network**: Check for slow API responses in Network tab

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
