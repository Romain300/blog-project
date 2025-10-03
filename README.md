# Blog Project

A full-stack blog application with **user-facing public site**, **admin dashboard**, and a **Node.js/Express backend API**.  
This project allows admins to manage posts and comments, while public users can read blog posts and leave comments.

---

## 📂 Project Structure

```
blog-project/
│
├── backend/         # Node.js + Express REST API with JWT authentication
├── admin-frontend/  # React app for admins (create, update, delete posts)
├── public-frontend/ # React app for public users (view posts, add comments)
└── README.md        # This file
```

---

## ⚙️ Features

### Public Frontend
- Browse all published blog posts
- View post details with comments
- Add comments (requires authentication)

### Admin Frontend
- Authentication for admin users
- Create, update, and delete posts
- Publish/unpublish posts
- Moderate comments

### Backend API
- RESTful API built with **Express**
- JWT authentication with **Passport.js**
- PostgreSQL database queries
- Secure user registration and login
- CRUD endpoints for posts and comments

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/blog-project.git
cd blog-project
```

### 2. Install Dependencies
Each folder (`backend`, `admin-frontend`, `public-frontend`) has its own dependencies.  
Install them separately:

```bash
cd backend
npm install

cd ../admin-frontend
npm install

cd ../public-frontend
npm install
```

### 3. Set Environment Variables

Create a `.env` file inside `backend/`:

```
PORT=3000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

---

## 🖥️ Running the Apps

### Start Backend
```bash
cd backend
npm start
```
Backend will run on **http://localhost:3000**

### Start Admin Frontend
```bash
cd admin-frontend
npm run dev
```
Admin app runs on **http://localhost:5173**

### Start Public Frontend
```bash
cd public-frontend
npm run dev
```
Public app runs on **http://localhost:5174**

---

## 🔑 Authentication Flow
1. User registers via **/signIn** endpoint.  
2. User logs in via **/logIn** endpoint → receives a JWT token.  
3. Token is stored in localStorage (frontend).  
4. Protected routes (new post, delete post, etc.) require a valid token.  

---

## 📡 API Endpoints (Backend)

### Auth
- `POST /signIn` → Register user
- `POST /logIn` → Login user, returns JWT

### Posts
- `GET /posts` → Get all posts
- `GET /posts/:postId` → Get single post
- `POST /posts` → Create post (auth required)
- `PUT /posts/:postId` → Update post (auth required)
- `DELETE /posts/:postId` → Delete post (auth required)
- `PUT /posts/:postId/updateStatus` → Publish/unpublish (auth required)

### Comments
- `POST /comments/:postId` → Add comment (auth required)
- `DELETE /comments/:commentId` → Delete comment (auth required)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Passport.js, JWT, PostgreSQL
- **Frontend (Admin + Public):** React, React Router
- **Database:** PostgreSQL
- **Auth:** bcryptjs for password hashing, JWT for authentication

---

## 📌 Notes
- Make sure PostgreSQL is running and database tables are created.
- Adjust CORS settings if deploying to different domains.
- You can deploy backend separately (e.g., Heroku/Railway) and frontends on Netlify/Vercel.

---

## 📜 License
This project is licensed under the MIT License.  
You are free to use and modify it for your own purposes.