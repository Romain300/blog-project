# Background Application - MyBlog API

## Overview
This is the backend API for the MyBlog application. It provides user authentication, post management, and comment functionality using Node.js, Express, Passport.js, and PostgreSQL (via `db/queries`).

## Features
- User registration (sign-in) and authentication (login) with JWT.
- CRUD operations for posts.
- Publish/unpublish posts.
- Comment creation and deletion.
- JWT-based protected routes.

## Technologies Used
- Node.js
- Express
- Passport.js (Local and JWT strategies)
- bcryptjs (password hashing)
- express-validator (request validation)
- CORS
- dotenv
- PostgreSQL (via custom queries in `db/queries`)

## Installation
1. Clone the repository:
```bash
git clone <repo-url>
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
PORT=3000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
```
4. Start the server:
```bash
node app.js
```

The server will run on `http://localhost:3000`.

## Folder Structure
```
├── app.js                 # Entry point of the application
├── controllers            # Request handlers for posts, users, comments, login
├── middlewares            # Passport strategies (Local & JWT)
├── routes                 # Express routers for posts, comments, signIn, logIn
├── db                     # Database queries (PostgreSQL)
├── package.json
├── .env
```

## API Endpoints

### Users
- **POST /signIn**: Register a new user.
  - Body: `{ name, email, password, cpassword }`
  - Returns: `201` and created user data.

- **POST /logIn**: Authenticate a user and return a JWT.
  - Body: `{ email, password }`
  - Returns: `200` and token.

### Posts
- **GET /posts**: Get all posts.
- **POST /posts**: Create a new post (JWT protected).
  - Body: `{ title, content, published }`
- **GET /posts/:postId**: Get a specific post by ID.
- **PUT /posts/:postId**: Update a post (JWT protected).
  - Body: `{ title, content }`
- **PUT /posts/:postId/updateStatus**: Update post published status (JWT protected).
  - Body: `{ published }`
- **DELETE /posts/:postId**: Delete a post (JWT protected).

### Comments
- **POST /comments/:postId**: Create a comment on a post (JWT protected).
  - Body: `{ content }`
- **DELETE /comments/:commentId**: Delete a comment (JWT protected).

## Authentication
- Uses **JWT** for protecting routes.
- **Local strategy** with email/password for login.
- Tokens expire in **15 minutes**.

## Notes
- Ensure PostgreSQL is running and accessible via the `DATABASE_URL` in `.env`.
- Handle CORS appropriately if connecting to a frontend on a different domain.
- All endpoints expect JSON requests and return JSON responses.

## License
MIT