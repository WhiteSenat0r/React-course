# React Course - User Management Application

## Overview

A modern React + TypeScript user management application demonstrating full-stack web development concepts with authentication, protected routes, and CRUD operations. This project showcases best practices in React development using Material-UI components, custom hooks, and a feature-based architecture.

The application provides a complete user management interface with sign-in authentication and a data grid for viewing, creating, editing, and deleting users. All API interactions are powered by the [reqres.in](https://reqres.in) mock API service.

## Features

- **Authentication System**
  - Sign-in form with email and password validation
  - Protected routes using localStorage-based auth status
  - Custom `useAuth` hook for authentication logic

- **User Management (CRUD)**
  - Paginated user data grid with Material-UI DataGrid
  - Create new users with dialog form
  - Edit existing user details
  - Delete users with confirmation dialog
  - View user details in read-only mode

- **Modern UI/UX**
  - Material-UI (MUI) component library
  - Tailwind CSS for utility styling
  - Responsive layout with top bar and side drawer navigation
  - Theme provider for consistent styling

## Tech Stack

**Core Framework:**
- React 18.3 - Modern React with hooks
- TypeScript 5.2 - Type-safe development
- Vite 5.3 - Fast build tool and dev server

**UI Libraries:**
- Material-UI (MUI) 5.16 - Component library
- MUI X Data Grid 7.12 - Advanced data grid
- Emotion - CSS-in-JS styling
- Tailwind CSS 3.4 - Utility-first CSS

**Routing & HTTP:**
- React Router DOM 6.26 - Client-side routing
- Axios 1.7 - HTTP client

**Developer Tools:**
- ESLint - Code linting with zero warnings policy
- TypeScript ESLint - TypeScript-specific linting rules

## Project Architecture

This project follows a **feature-based architecture** where code is organized by feature under `src/features/`:

- **`auth/`** - Authentication with sign-in form, `useAuth` hook, and `AuthHttpService`
- **`users/`** - User management with data grid, CRUD dialogs, and custom hooks

### Key Patterns

- **HTTP Service Pattern:** Abstract `HttpService` base class extended by feature-specific services (`AuthHttpService`, `UsersHttpService`)
- **Custom Hooks:** Feature-specific hooks for state management (`useUsersState`, `useCreateUser`, `useEditUser`, `useDeleteUser`, `useDialog`)
- **Provider Structure:** `BrowserRouter` → `AppThemeProvider` → `NotificationsProvider` → `RoutesProvider`
- **Interface Naming:** TypeScript interfaces use `I` prefix (e.g., `IUser`, `IHttpResponse`, `ILoginData`)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement (HMR):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Other Commands

- **Build for production:**
  ```bash
  npm run build
  ```

- **Run linter:**
  ```bash
  npm run lint
  ```

- **Preview production build:**
  ```bash
  npm run preview
  ```

## API Integration

This application uses the [reqres.in](https://reqres.in/api) mock API for all backend operations:
- Authentication endpoint: `/api/login`
- Users endpoint: `/api/users`

The API provides realistic mock data for testing and demonstration purposes.

## Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── auth/         # Authentication feature
│   ├── users/        # User management feature
│   └── home/         # Home page
├── layout/           # Layout components (TopBar, SideDrawer, AppContent)
├── providers/        # React context providers (theme, routes, notifications)
├── shared/           # Shared utilities, services, and types
│   ├── services/     # HTTP service base class
│   └── variables/    # App-wide constants (routes, etc.)
└── main.tsx          # Application entry point
```

## Contributing

When contributing to this project, please follow the existing patterns:
- Use the `I` prefix for TypeScript interfaces
- Organize code by feature in `src/features/`
- Extend the `HttpService` base class for new API services
- Use custom hooks for complex state management
- Follow the ESLint rules (zero warnings policy)

## License

This project is for educational purposes as part of a React development course.
