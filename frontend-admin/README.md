# Admin Panel React App

## Project Description
This is a React-based admin panel for managing blog posts. Users can log in, create new posts, update existing posts, delete posts, and manage comments. Authentication is handled with JWT tokens.

## Project Structure
```
src/
├─ components/
│  ├─ AuthProvider.jsx
│  ├─ useAuth.jsx
│  ├─ Homepage.jsx
│  ├─ Dashboard.jsx
│  ├─ PostPage.jsx
│  ├─ LogForm.jsx
│  ├─ SignForm.jsx
│  ├─ Input.jsx
│  ├─ NavBar.jsx
│  ├─ PrivateRoute.jsx
│  ├─ NewPostForm.jsx
│  ├─ NotFound.jsx
├─ styles/
│  ├─ Dashboard.module.css
│  ├─ Input.module.css
│  ├─ Form.module.css
│  ├─ NavBar.module.css
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
- User authentication (login and signup)
- JWT-based session management
- Dashboard for viewing posts
- Create, update, and delete posts
- Comment management
- Protected routes for authenticated users
- Responsive UI with modular CSS

## Components Overview
- **AuthProvider.jsx**: Provides authentication context.
- **useAuth.jsx**: Custom hook to access authentication context.
- **Homepage.jsx**: Displays `Dashboard` if logged in, otherwise `LogForm`.
- **Dashboard.jsx**: Lists posts, allows publish/unpublish, delete.
- **PostPage.jsx**: Update a post and manage comments.
- **LogForm.jsx**: Login form.
- **SignForm.jsx**: Registration form.
- **Input.jsx**: Reusable input, textarea, and checkbox components.
- **NavBar.jsx**: Navigation bar with login/logout buttons.
- **PrivateRoute.jsx**: Protects routes that require authentication.
- **NewPostForm.jsx**: Form to create new posts.
- **NotFound.jsx**: 404 page.

## License
This project is open-source and available under the MIT License.
