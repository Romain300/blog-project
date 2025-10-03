# MyBlog - Public-Facing React App

## Overview
MyBlog is a public-facing blogging platform built with **React** and **React Router**. It allows users to **sign up**, **log in**, view posts, comment on posts, and manage their own comments. The app also features authentication-aware routing, a responsive dashboard, and a simple 404 page for unknown routes.

---

## Features

- **User Authentication**
  - Sign up with name, email, and password.
  - Log in with email and password.
  - Logout functionality.
  - Session management with JWT tokens and automatic expiration handling.

- **Public & Private Routes**
  - Public pages: login, registration, homepage.
  - Private pages: post details with commenting functionality.
  - Protected routes using `PrivateRoutePublic`.

- **Post Management**
  - View all published posts in a dashboard (`DashboardPublic`).
  - View individual posts (`PostPagePublic`) and their comments.
  - Logged-in users can reply to posts and delete their own comments.

- **Custom Input Components**
  - Reusable components for text input, textarea, and checkboxes (`InputPublic`, `TextareaPublic`, `CheckboxPublic`).

- **Navigation**
  - Auth-aware navbar (`NavBarPublic`) showing login/sign-in buttons for unauthenticated users, and logout for authenticated users.

- **Error Handling**
  - Handles network errors and API errors gracefully.
  - 404 Not Found page (`NotFoundPublic`) for unmatched routes.

---

## Tech Stack

- **Frontend:** React, React Router v6, JavaScript, CSS Modules  
- **Authentication:** JWT (JSON Web Tokens)  
- **Data Fetching:** Fetch API (CORS enabled)  
- **State Management:** React Context (`AuthContextPublic`) and hooks  
- **Styling:** CSS Modules for component-level styles  

---

## Project Structure

```
src/
├─ components/
│  ├─ AuthProviderPublic.jsx
│  ├─ useAuthPublic.jsx
│  ├─ HomepagePublic.jsx
│  ├─ DashboardPublic.jsx
│  ├─ PostPagePublic.jsx
│  ├─ LogFormPublic.jsx
│  ├─ SignFormPublic.jsx
│  ├─ InputPublic.jsx
│  ├─ NavBarPublic.jsx
│  ├─ PrivateRoutePublic.jsx
│  ├─ NotFoundPublic.jsx
├─ styles/
│  ├─ DashboardPublic.module.css
│  ├─ InputPublic.module.css
│  ├─ FormPublic.module.css
│  ├─ NavBarPublic.module.css
├─ App.jsx
├─ index.jsx
```

## Setup & Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

## Features

- User authentication with JWT
- Public and private routes
- Create, view, and delete comments
- Responsive UI components with modular CSS
- 404 Not Found page handling

## Usage

- Log in using your credentials to access posts.
- Sign up if you don’t have an account.
- View individual posts and reply via the comment dialog.
- Delete your own comments.
- Navigate using the navbar for login, logout, and sign-in options.
