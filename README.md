# Wallets Dashboard

A modern web application built with Vue 3, TypeScript, and Vuetify for managing and visualizing wallet data. The application uses GraphQL for data fetching and includes a mock server for development purposes.

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wallets-dashboard
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

The application consists of two parts: a frontend Vue application and a mock GraphQL server.

Run these commands in separate terminal windows:

1. Start the mock GraphQL server:
```bash
npm run start:mock-server
```

2. Start the frontend development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable Vue components
├── composables/    # Vue composition API hooks
├── graphql/        # GraphQL queries and mutations
├── mock-data/      # Mock server implementation
├── pages/          # Page components
├── plugins/        # Vue plugins (Vuetify, Apollo, etc.)
├── router/         # Vue Router configuration
├── styles/         # Global styles and theme
├── App.vue         # Root component
└── main.ts         # Application entry point
```

## 🛠️ Technology Stack

- **Frontend Framework**: Vue 3 with Composition API
- **UI Framework**: Vuetify 3
- **Type System**: TypeScript
- **State Management**: Apollo Client for GraphQL
- **Routing**: Vue Router
- **Build Tool**: Vite
- **Development Tools**:
    - ESLint for code linting
    - TypeScript for type checking
    - SASS for styling


