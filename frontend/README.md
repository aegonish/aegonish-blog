# 🌌 Aegonish Blog

A full-stack **CRUD blog platform** built with **React, TypeScript, TailwindCSS, Node.js, Express, MongoDB**, and **Google Drive image storage**.  
This app features a stylish neon-glass UI, dynamic animations, and full CRUD functionality — all powered by a clean MERN architecture.

---

## 🚀 Features

✅ Create, Read, Update, Delete blog posts  
🖼 Upload and serve images via **Google Drive API**  
🔁 Secure proxy to serve Drive images without CORS issues  
🎨 Sleek modern **Neon Glass UI** with TailwindCSS + Framer Motion  
⚡ Blazing-fast frontend powered by **Vite + React**  
💾 Persistent storage with **MongoDB**  
🔐 `.env`-secured credentials  

---

## 🧩 Tech Stack

**Frontend**
- React + TypeScript
- Vite
- TailwindCSS
- Axios
- React Router DOM
- Framer Motion

**Backend**
- Node.js + Express
- Mongoose (MongoDB)
- Multer (for uploads)
- Googleapis (Drive API)
- Cors
- Dotenv
- Axios (for proxy)
- Nodemon (for dev)

---

## 📂 Folder Structure

aegonish-blog/
├── backend/
│ ├── models/
│ │ └── Post.js
│ ├── routes/
│ │ ├── posts.js
│ │ ├── upload.js
│ │ └── imageProxy.js
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── UploadModal.tsx
│ │ ├── pages/
│ │ │ ├── Home.tsx
│ │ │ ├── PostPage.tsx
│ │ │ ├── UploadPost.tsx
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── index.css
│ ├── vite.config.ts
│ └── package.json
│
└── README.md

yaml
Copy code

---

## 🧱 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/aegonish-blog.git
cd aegonish-blog
📦 2. Install Dependencies
🔹 Backend
bash
Copy code
cd backend
npm install
Required backend dependencies (auto-installed via package.json):

bash
Copy code
npm install express mongoose multer googleapis cors dotenv axios nodemon
🔹 Frontend
bash
Copy code
cd ../frontend
npm install
Required frontend dependencies (auto-installed via package.json):

bash
Copy code
npm install react react-dom react-router-dom axios framer-motion tailwindcss postcss autoprefixer
npm install -D typescript vite @types/react @types/react-dom
🔑 3. Setup Environment Variables
Create a .env file inside /backend:

env
Copy code
PORT=4000
MONGO_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://developers.google.com/oauthplayground
GOOGLE_REFRESH_TOKEN=your_google_oauth_refresh_token
DRIVE_FOLDER_ID=your_google_drive_folder_id
🧠 How to get your Google credentials:

Go to Google Cloud Console.

Create a new project → Enable Google Drive API.

Create OAuth 2.0 credentials → Get client_id and client_secret.

Visit OAuth 2.0 Playground:

Enable Drive API v3 scope.

Exchange authorization code → Get your refresh token.

Copy the values into .env.

⚙️ 4. Run the Application
🖥 Start the Backend
bash
Copy code
cd backend
node server.js
You should see:

arduino
Copy code
🚀 Server running on port 4000
✅ MongoDB Connected
💻 Start the Frontend
In another terminal:

bash
Copy code
cd frontend
npm run dev
Open your browser →
👉 http://localhost:5173

🪄 5. Running After Cloning (When .env and node_modules Are Missing)
If someone else clones your repo, or if you deleted local files:

Create a new .env file in /backend with the variables above.

Run npm install in both /backend and /frontend.

Start backend (node server.js).

Start frontend (npm run dev).

Visit the frontend URL and test CRUD operations.

🧾 API Endpoints
Method	Endpoint	Description
GET	/api/posts	Fetch all posts
GET	/api/posts/:id	Fetch single post
POST	/api/upload	Upload new post with image
PUT	/api/posts/:id	Update existing post
DELETE	/api/posts/:id	Delete post
GET	/image/:id	Serve Drive image via proxy

🧠 How the Image System Works
Images are uploaded via the backend using the Google Drive API.

The backend returns a Drive file link with the file ID.

The frontend uses a proxy route (/image/:id) to fetch the image securely from Google Drive.

The image loads normally — no “403 Forbidden” issues.

🪩 Design Highlights
🎇 Neon Glass style with gradients and glow
🖱 Mouse-reactive background effects
📱 Fully responsive grid layout
⚡ Smooth animations with Framer Motion

🧰 Troubleshooting
Issue	Cause	Fix
Cannot POST /upload	Wrong endpoint	Use /api/upload
No access, refresh token...	Invalid OAuth credentials	Regenerate in OAuth Playground
Image 403 Forbidden	Google file not public	Set file sharing to “Anyone with the link”
MongoDB not connecting	Wrong URI	Check MONGO_URI in .env
Frontend blank	Backend not running	Start backend first
Upload fails	Wrong Drive permissions	Ensure correct folder ID and refresh token

🧩 Development Tips
Use nodemon server.js for auto-reload backend

Clear node_modules and reinstall if dependency errors occur

If images stop rendering, check proxy route:
http://localhost:4000/image/<drive-file-id>

🧰 Example Commands Recap
bash
Copy code
# In /backend
npm install
node server.js

# In /frontend
npm install
npm run dev
🧑‍💻 Author
Aegonish
💫 Building vibrant web experiences with art and engineering.

📜 License
This project is open source under the MIT License.

yaml
Copy code

---
