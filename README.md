# 🧩 Aegonish Blog — Phase 0 (Docker & Compose Setup)

### ✅ Current Status
- Full MERN stack running successfully in Docker.
- Backend connected to MongoDB inside Docker (`mongo:27017`).
- Google Drive image/video uploads working.
- Frontend connected to backend (`/posts` and `/upload` routes).
- Docker Compose spins up full environment:
  - `frontend`
  - `backend`
  - `mongo`
- MongoDB data persists via named volume.

---

## 🐋 Local Docker Setup

### 1️⃣ Build & Run
```bash
docker compose up --build
2️⃣ Access Points
Frontend: http://localhost:5173

Backend API: http://localhost:4000

MongoDB: mongodb://mongo:27017/aegonish_blog

3️⃣ Logs
bash
Copy code
docker compose logs -f
4️⃣ Stop Containers
bash
Copy code
docker compose down
🧾 Project Folder Structure
bash
Copy code
aegonish-blog/
├── backend/
│   ├── server.js
│   ├── start.js
│   ├── routes/
│   ├── models/
│   ├── .env
│   ├── Dockerfile          # (dev build)
│   └── ...
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   ├── .env
│   ├── Dockerfile          # (dev build)
│   └── ...
├── docker-compose.yml      # root-level (dev) compose
└── README.md

⚙️ Environment 

Backend .env example:
PORT=4000
MONGO_URI=mongodb://mongo:27017/aegonish_blog
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_REDIRECT_URI=https://developers.google.com/oauthplayground
GOOGLE_DRIVE_FOLDER_ID=...

Frontend .env example:
VITE_API_BASE=http://localhost:4000
✅ Verified Output
When running via Docker Compose:


📦 Using Mongo URI: mongodb://mongo:27017/aegonish_blog
✅ MongoDB Connected
🚀 Server running on port 4000