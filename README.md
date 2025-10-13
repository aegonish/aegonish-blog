# 🌀 Aegonish Blog

A full-stack blog/gallery application featuring CRUD posts, image uploads (via Google Drive), and full Dockerized development + production setups.

---

## 🚀 Features

- **Frontend:** React + Vite + Tailwind + Nginx (for production serving)
- **Backend:** Node.js + Express + MongoDB + Google Drive API integration
- **Database:** MongoDB (containerized)
- **File Storage:** Google Drive via service API
- **Containerization:** Docker Compose for both dev and prod
- **Modes:**  
  - `docker-compose.yml` → local dev setup  
  - `docker-compose.prod.yml` → full production build (Nginx + backend + Mongo)

---

## 🧩 Folder Structure

```
aegonish-blog/
├── backend/               # Express + Mongo + GDrive backend
│   ├── server.js
│   ├── start.js
│   ├── routes/
│   ├── models/
│   ├── Dockerfile
│   └── .env.example
│
├── aegonish-frontend/     # React + Tailwind frontend
│   ├── src/
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml     # Local dev setup
├── docker-compose.prod.yml# Production setup
└── README.md
```

---

## 🧰 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js 20+](https://nodejs.org/) (only needed for non-Docker local runs)
- A `.env` file in `/backend` with the following:

```bash
PORT=4000
MONGO_URI=mongodb://mongo:27017/aegonish_blog
GOOGLE_CLIENT_EMAIL=your_service_account_email@developer.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
XYZ
-----END PRIVATE KEY-----
"
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id
FRONTEND_URL=http://localhost
```

*(These keys are only required for the Google Drive upload feature to work.)*

---

## 🧑‍💻 Local Development

This spins up backend + MongoDB. Frontend runs separately via `npm run dev`.

```bash
# Start local dev environment
docker compose up -d

# (Optional) check logs
docker compose logs -f backend

# Access backend at:
http://localhost:4000/api/posts
```

Then, inside `aegonish-frontend`:

```bash
npm install
npm run dev
```

Frontend → `http://localhost:5173`  
Backend → `http://localhost:4000`

---

## 🏗️ Production (Full Dockerized Setup)

This builds everything — backend, frontend (served by Nginx), and MongoDB — into an isolated production network.

### 1️⃣ Build images

```bash
docker compose -f docker-compose.prod.yml build --no-cache
```

### 2️⃣ Run containers

```bash
docker compose -f docker-compose.prod.yml up -d
```

### 3️⃣ Verify

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml logs -f frontend
```

Then open:

👉 **Frontend:** http://localhost  
👉 **Backend API:** http://localhost:4000/api/posts

---

## 🧹 Stop & Clean

```bash
# Stop all containers
docker compose -f docker-compose.prod.yml down

# Remove unused images/volumes
docker system prune -a --volumes
```

---

## 💡 Troubleshooting

| Symptom | Fix |
|----------|-----|
| Images not rendering | Ensure `/image/` and `/uploads/` are proxied in `nginx.conf` |
| MongoDB connection refused | Check `MONGO_URI` uses `mongo:27017` inside Docker |
| Frontend shows blank | Rebuild frontend image → `docker compose -f docker-compose.prod.yml build frontend` |
| Google Drive upload fails | Verify `.env` credentials and `GOOGLE_DRIVE_FOLDER_ID` |

---

## 🧱 Commit Best Practice

Whenever production or local Docker setup runs cleanly:

```bash
git add .
git commit -m "✅ Stable Docker setup (frontend + backend + mongo working)"
git push origin main
```

---

## 🌍 Summary

| Environment | Command | URL |
|--------------|----------|-----|
| Local Dev | `docker compose up -d` + `npm run dev` | `localhost:5173` / `localhost:4000` |
| Production | `docker compose -f docker-compose.prod.yml up -d` | `localhost` (frontend) / `localhost:4000` (backend) |

---

### 🎉 You’re Done!

Aegonish Blog now runs locally **and** in production Docker flawlessly.
