import express from 'express';
import cors from 'cors';

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";
import { env } from "prisma/config";

const url = new URL(env("DATABASE_URL"));

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: parseInt(url.port),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
//app.use(express.json());

// API Routes
app.get('/api/user', (req, res) => {
    res.send({ user: "Admin" });
});

app.get('/api/:module_id', async (req, res) => {
    try {
        const moduleId = Number(req.params.module_id);
        if (Number.isNaN(moduleId)) {
            return res.status(400).send({ error: 'Invalid module id' });
        }

        const rows = await prisma.leistung.findMany({
            where: { Modulnummer: moduleId },
            orderBy: { Timestamp: 'desc' },
            take: 10
        });
        res.send(rows);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).send({ error: 'Database request failed' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});