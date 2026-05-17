import express from 'express';
import cors from 'cors';

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/user', (req, res) => {
    res.json({ user: "Admin" });
});

app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from Express Backend" });
});

app.get('/', (req, res) => {
    res.json({ message: "Express API Server is running", user: "Admin" });
});

// Start server
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});