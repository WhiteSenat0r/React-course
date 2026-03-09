# React Course - User Management Application

## Overview

A modern React + TypeScript user management application demonstrating full-stack web development concepts with authentication, protected routes, and CRUD operations. This project showcases best practices in React development using Material-UI components, custom hooks, and a feature-based architecture.

The application provides a complete user management interface with sign-in authentication and a data grid for viewing, creating, editing, and deleting users. All API interactions are powered by the [reqres.in](https://reqres.in) mock API service.

## Features

- **Authentication System**
  - Sign-in form with email and password validation
  - Error alert display for failed authentication attempts
  - Protected routes using localStorage-based auth status
  - Custom `useAuth` hook for authentication logic

- **User Management (CRUD)**
  - Paginated user data grid with MUI X DataGrid
  - Create new users with dialog form
  - Edit existing user details
  - Delete users with confirmation dialog
  - View user details in read-only dialog
  - Dedicated hooks per CRUD operation (`useCreateUser`, `useEditUser`, `useDeleteUser`)

- **Modern UI/UX**
  - Material-UI (MUI) component library with Emotion CSS-in-JS
  - Tailwind CSS for utility styling
  - Responsive layout with top bar and collapsible side drawer navigation
  - Theme provider for consistent styling
  - Toast notifications via Toolpad Core `NotificationsProvider`
  - 404 Not Found page with navigation back to users

## Tech Stack

**Core Framework:**
- React 18.3 - Modern React with hooks and StrictMode
- TypeScript 5.2 - Type-safe development
- Vite 5.3 - Fast build tool and dev server

**UI Libraries:**
- Material-UI (MUI) 5.16 - Component library (`@mui/material`, `@mui/icons-material`)
- MUI X Data Grid 7.12 - Advanced data grid component
- Toolpad Core 0.5 - Notifications provider (`@toolpad/core`)
- Emotion 11.13 - CSS-in-JS styling (`@emotion/react`, `@emotion/styled`)
- styled-components 6.1 - Additional CSS-in-JS support (`styled-components`, `@mui/styled-engine-sc`)
- Tailwind CSS 3.4 - Utility-first CSS framework
- Roboto Font - Material Design typeface (`@fontsource/roboto`)

**Routing & HTTP:**
- React Router DOM 6.26 - Client-side routing with protected routes
- Axios 1.7 - HTTP client with interceptors

**Utilities:**
- lodash 4.17 - General-purpose utility library

**Developer Tools:**
- ESLint 8.57 - Code linting with zero warnings policy (`--max-warnings 0`)
- TypeScript ESLint 7.15 - TypeScript-specific linting rules
- PostCSS 8.4 + Autoprefixer 10.4 - CSS post-processing

## Project Architecture

This project follows a **feature-based architecture** where code is organized by feature under `src/features/`:

- **`auth/`** - Authentication with sign-in form, error alert component, email/password inputs, `useAuth` hook, and `AuthHttpService`
- **`users/`** - User management with data grid, CRUD dialogs (create, edit, delete, details), custom hooks per operation, and `UsersHttpService`
- **`home/`** - Home page component
- **`not-found/`** - 404 Not Found page with link back to users

### Key Patterns

- **HTTP Service Pattern:** Abstract `HttpService` base class (`src/shared/services/http/httpService.ts`) wraps Axios with response interceptors and returns `IHttpResponse<T>`. Feature-specific services extend it:
  - `AuthHttpService` - login endpoint
  - `UsersHttpService` - users CRUD endpoints
  - Interceptors: 5xx errors reject the promise; 4xx errors return the error object for caller handling
- **Custom Hooks:** Feature-specific hooks for state management (`useUsersState`, `useCreateUser`, `useEditUser`, `useDeleteUser`, `useDialog`, `useUsersTableColumns`, `useUsersTableRows`, `useAuth`)
- **Provider Structure:** `BrowserRouter` > `AppThemeProvider` > `NotificationsProvider` (Toolpad) > `RoutesProvider`
- **Interface Naming:** TypeScript interfaces use `I` prefix (e.g., `IUser`, `IHttpResponse`, `ILoginData`, `IPaginationModel`)
- **Interface Filenames:** Use `i` prefix (e.g., `iUser.ts`, `iHttpResponse.ts`)
- **Protected Routes:** `ProtectedRoute` component checks localStorage auth status to guard routes

### Routing

Routes are defined in `src/providers/route/RoutesProvider.tsx` with route constants in `src/shared/variables/appRoutes.ts`:
- `/sign-in` - Authentication page (public)
- `/users` - User management page (protected, wrapped in Layout)
- `/` - Redirects to `/users`
- `*` - 404 Not Found page

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

> **Note:** There is no test framework configured in this project.

## API Integration

This application uses the [reqres.in](https://reqres.in/api) mock API for all backend operations:
- Authentication endpoint: `/api/login`
- Users endpoint: `/api/users`

The API provides realistic mock data for testing and demonstration purposes.

## Project Structure

```
src/
├── features/                    # Feature-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── components/
│   │   │   ├── inputs/
│   │   │   │   ├── EmailInput.tsx
│   │   │   │   └── PasswordInput.tsx
│   │   │   ├── SignInAuthErrorAlert.tsx
│   │   │   └── SignInForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authHttpService.ts
│   │   └── types/
│   │       └── interfaces/
│   │           ├── iAuthToken.ts
│   │           └── iLoginData.ts
│   ├── home/                    # Home page
│   │   └── Home.tsx
│   ├── not-found/               # 404 Not Found page
│   │   └── NotFound.tsx
│   └── users/                   # User management feature
│       ├── components/
│       │   ├── dialogs/
│       │   │   ├── UserCreateDialog.tsx
│       │   │   ├── UserDeleteDialog.tsx
│       │   │   ├── UserDetailsDialog.tsx
│       │   │   └── UserEditDialog.tsx
│       │   ├── UsersDataGrid.tsx
│       │   └── UsersTableContainer.tsx
│       ├── hooks/
│       │   ├── useCreateUser.ts
│       │   ├── useDeleteUser.ts
│       │   ├── useDialog.ts
│       │   ├── useEditUser.ts
│       │   ├── useUsersState.ts
│       │   ├── useUsersTableColumns.tsx
│       │   └── useUsersTableRows.ts
│       ├── interfaces/
│       │   ├── iPaginationModel.ts
│       │   ├── iUser.ts
│       │   ├── iUserResponse.ts
│       │   └── iUserTableRow.ts
│       ├── services/
│       │   └── usersHttpService.ts
│       └── UsersPage.tsx
├── layout/                      # Layout components
│   ├── components/
│   │   ├── side-drawer/
│   │   │   ├── AppDrawer.tsx
│   │   │   └── SideDrawer.tsx
│   │   ├── top-bar/
│   │   │   ├── AppBar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── TopBarHeader.tsx
│   │   │   └── TopBarMenuButton.tsx
│   │   ├── AppContent.tsx
│   │   └── SideDrawerListItems.tsx
│   ├── variables/
│   │   └── layoutConstants.ts
│   └── Layout.tsx
├── providers/                   # React context providers
│   ├── route/
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx
│   │   └── RoutesProvider.tsx
│   └── theme/
│       ├── styles/
│       │   └── index.css
│       └── AppThemeProvider.tsx
├── shared/                      # Shared utilities and services
│   ├── services/
│   │   └── http/
│   │       ├── interfaces/
│   │       │   └── iHttpResponse.ts
│   │       └── httpService.ts
│   └── variables/
│       └── appRoutes.ts
├── assets/
│   └── react.svg
├── vite-env.d.ts
├── App.tsx                      # Root component with provider nesting
└── main.tsx                     # Application entry point
```

## Contributing

When contributing to this project, please follow the existing patterns:
- Use the `I` prefix for TypeScript interfaces (with `i` prefix for filenames)
- Organize code by feature in `src/features/`
- Extend the `HttpService` base class for new API services
- Use custom hooks for complex state management (one hook per CRUD operation)
- Follow the ESLint rules (zero warnings policy)
- CSS: Use MUI components + Tailwind utilities; theme customization via `AppThemeProvider`

## License

This project is for educational purposes as part of a React development course.
