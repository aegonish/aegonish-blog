import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.js';
import filesRoutes from './routes/files.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Middlewares
app.use(bodyParser.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Routes
app.use('/upload', uploadRoutes);
app.use('/files', filesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
