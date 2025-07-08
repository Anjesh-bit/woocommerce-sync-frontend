# Frontend Dashboard Application

A modern, type-safe React application built with domain-driven architecture for managing products and orders through an intuitive dashboard interface.

## 🚀 Overview

This application provides a clean, minimal dashboard for managing business operations with dedicated pages for products and orders. Built with performance and maintainability in mind, it leverages modern React patterns and tools to deliver a smooth user experience.

## 🏗️ Architecture

### Domain-Driven Design

The project follows a domain-driven approach where related functionality is co-located:

- **Domain Isolation**: Each domain (order, product, home) has its own dedicated folder at the root level
- **Flat Structure**: Each domain contains its own API, types, constants, styles, and services in dedicated files
- **Shared Resources**: Common components, hooks, and utilities are organized in the `/app` folder
- **Clean Architecture**: Clear separation between business logic, UI components, and configuration

### File Organization Pattern

Each domain follows a consistent naming pattern:

- `*.api.ts` - API calls and HTTP request handlers
- `*.types.ts` - TypeScript interfaces and type definitions
- `*.constant.ts` - Domain-specific constants and configurations
- `*.module.css` - CSS modules for scoped styling
- `use-*-services.ts` - Custom React hooks for business logic
- `index.tsx` - Main page component and entry point

### Folder Structure

```
src/
├── app/
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Library configurations
│   ├── navigation/               # Navigation components
│   └── pages/                    # Application pages
├── home/
│   ├── home.module.css           # Home page styles
│   └── index.tsx                 # Home dashboard component
├── order/
│   ├── index.tsx                 # Order listing page
│   ├── order.api.ts              # Order API calls and endpoints
│   ├── order.constant.ts         # Order-related constants
│   ├── order.module.css          # Order-specific styles
│   ├── order.types.ts            # Order TypeScript definitions
│   └── use-order-services.ts     # Order custom hooks
├── product/
│   ├── product.api.ts            # Product API calls and endpoints
│   ├── product.module.css        # Product-specific styles
│   ├── product.types.ts          # Product TypeScript definitions
│   └── use-product-services.ts   # Product custom hooks
├── assets/                       # Static assets
├── config/                       # Configuration files
├── types/                        # Global TypeScript definitions
├── utils/                        # Utility functions
│   └── index.css                 # Global styles
├── app.module.css                # App-level styles
├── app.tsx                       # Main app component
├── main.tsx                      # Application entry point
└── vite-env.d.ts                 # Vite environment types
```

## 🛠️ Tech Stack

### Core Technologies

- **React** - UI library with modern hooks
- **TypeScript** - Type safety throughout the application
- **Vite** - Fast build tool and development server

### State Management & Data Fetching

- **TanStack React Query** - Server state management and caching
- **Axios** - HTTP client for API communication

### UI Components

- **Mantine DataTable** - Flexible and feature-rich data tables for listing orders and products
- **CSS Modules** - Scoped styling with `.module.css` files for component isolation

### Performance Optimizations

- **useMemo** - Memoizing expensive calculations
- **useCallback** - Preventing unnecessary re-renders
- **Debouncing** - Optimizing search functionality
- **Vite optimizations** - Fast HMR and optimized builds

## 🔄 Data Flow

### API Architecture

1. **Sync API** - Initial synchronization call
2. **Parallel Fetching** - Order and product listing APIs called simultaneously
3. **Caching** - TanStack Query handles response caching and invalidation

### Navigation Flow

```
Home Dashboard → Products/Orders → Detailed Views
```

## 🎯 Features

### Dashboard

- **Simple Navigation** - Clean button-based navigation to orders and products
- **Minimal UI** - Focus on functionality with basic, clean design
- **Responsive Design** - Works across different screen sizes

### Data Management

- **Real-time Updates** - Efficient data fetching with React Query
- **Search Functionality** - Debounced search for better performance
- **Flexible Tables** - Mantine DataTable for customizable data display

### Developer Experience

- **Type Safety** - Full TypeScript integration
- **Hot Reload** - Instant feedback during development
- **Domain Organization** - Easy to navigate and maintain codebase

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
```

## 📁 Key Files & Structure

### `/home`

Dashboard landing page with navigation:

- **home.module.css**: Home page specific styling
- **index.tsx**: Main dashboard component with navigation buttons

### `/order`

Complete order management system with flat file structure:

- **order.api.ts**: All order-related API endpoints and HTTP calls
- **order.types.ts**: TypeScript interfaces for order data structures
- **order.constant.ts**: Order status constants, API endpoints, and configuration
- **order.module.css**: Scoped CSS styles specific to order components
- **use-order-services.ts**: Custom React hooks for order business logic
- **index.tsx**: Main order page component with listing and interactions

### `/product`

Product management functionality with consistent structure:

- **product.api.ts**: Product-related API calls and data fetching
- **product.types.ts**: Product interfaces and type definitions
- **product.module.css**: Product-specific styling with CSS modules
- **use-product-services.ts**: Custom hooks for product operations

### `/app`

Shared application resources:

- **components/**: Reusable UI components across domains
- **hooks/**: Common custom React hooks
- **lib/**: Library configurations and setup
- **navigation/**: Navigation components and routing
- **pages/**: Main page components and routing structure

### `/utils`

Common utilities and helper functions

### `/types`

Global TypeScript definitions and interfaces

### `/config`

Application configuration files and environment setup

## 🔧 API Integration

### Sync Process

1. Initial sync API call establishes connection
2. Parallel API calls fetch orders and products data
3. React Query manages caching and background updates

### Error Handling

- Comprehensive error boundaries
- Graceful fallbacks for failed API calls
- User-friendly error messages

## 🎨 UI Philosophy

The application follows a **minimal design approach**:

- Clean, uncluttered interfaces
- Focus on functionality over decoration
- Consistent spacing and typography
- Accessible color schemes and interactions

## 🔍 Search & Filtering

- **Debounced Search**: Prevents excessive API calls during typing
- **Real-time Results**: Instant feedback as users type
- **Flexible Filtering**: Multiple criteria support through Mantine DataTable

## 📈 Performance Considerations

- **Memoization**: Strategic use of useMemo and useCallback
- **Code Splitting**: Lazy loading for route-based components
- **Optimized Builds**: Vite's efficient bundling and tree-shaking
- **Caching Strategy**: React Query handles intelligent caching

## 🔒 Type Safety

- **Full TypeScript Coverage**: All components, utilities, and API calls are typed
- **Strict Mode**: Enabled for catching common errors
- **Interface Definitions**: Clear contracts for data structures
- **Props Validation**: Comprehensive prop type definitions

## 🚀 Future Enhancements

This foundation supports easy extension for:

- Advanced filtering and sorting options
- Real-time notifications
- Bulk operations
- Enhanced UI components
- Mobile-first responsive design
- Internationalization support

## 🤝 Contributing

1. Follow the domain-driven structure
2. Maintain type safety
3. Write reusable components
4. Keep minimal UI philosophy
5. Add proper error handling
6. Include performance optimizations

## 📝 Notes

- The application prioritizes functionality and performance over complex UI design
- Domain-driven architecture makes it easy to scale and maintain
- TypeScript ensures reliability and developer productivity
- Modern React patterns provide excellent user experience

---

_Built with ❤️ using modern web technologies and best practices_
