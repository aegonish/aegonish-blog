import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`❌ Google credentials.json file not found at ${CREDENTIALS_PATH}`);
}

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
} else {
    console.log('No token found, generate one using OAuth flow.');
}

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

// Upload a file
export async function uploadToDrive(req, res) {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file provided' });
        }
        const file = req.files.file;
        const filePath = path.join(process.cwd(), 'uploads', file.name);
        await file.mv(filePath);

        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
            },
            media: {
                body: fs.createReadStream(filePath)
            }
        });

        res.json({
            message: 'File uploaded successfully',
            id: response.data.id,
            link: `https://drive.google.com/file/d/${response.data.id}/view?usp=drivesdk`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

// Rename a file
export async function renameFile(req, res) {
    try {
        const fileId = req.params.id;
        const { newName } = req.body;
        const response = await drive.files.update({
            fileId,
            requestBody: { name: newName }
        });
        res.json({ message: 'File renamed', id: response.data.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

// List files in folder
export async function listFiles(req, res) {
    try {
        const response = await drive.files.list({
            q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents`,
            fields: 'files(id, name, mimeType, webViewLink)'
        });
        res.json(response.data.files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

// Delete file
export async function deleteFile(req, res) {
    try {
        const fileId = req.params.id;
        await drive.files.delete({ fileId });
        res.json({ message: 'File deleted', id: fileId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
