import express from 'express';
import { listFiles } from '../controllers/drive.js';

const router = express.Router();

// List all files
router.get('/list', listFiles);

export default router;
