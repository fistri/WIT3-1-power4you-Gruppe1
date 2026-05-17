// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./src/types/express-session.d.ts" />
import express from 'express';
import session from 'express-session'; 
import cors from 'cors';

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";
import { env } from "prisma/config";

const url = new URL(env("DATABASE_URL"));

//TODO: Was haben Sie sich unter API-Keys als Absicherung vorgestellt?

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

app.use(express.json());
app.use(
    cors({
        origin: env("FRONTEND_ORIGIN") || "http://localhost:5173",
        credentials: true,
    })
);

app.use(
    session({
        secret: env("SESSION_SECRET") || "dev-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

// API Routes
app.get('/api/user', (req, res) => {
    res.send({ user: "Admin" });
});

app.get('/api/session', (req, res) => {
    const sess = req.session;
    res.send({ user: sess?.user ?? null });
});

app.get('/api/module/:module_id', async (req, res) => {
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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ error: 'Missing credentials' });

    try {
        const user = await prisma.user.findFirst({ where: { Username: username } });
        if (!user) return res.status(401).send({ error: 'Invalid credentials' });

        if (user.Password !== password) return res.status(401).send({ error: 'Invalid credentials' });

        req.session.user = { id: user.User_ID, username: user.Username };
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send({ error: 'Session save failed' });
            }
            res.send({ isLoggedIn: true, user: { id: user.User_ID, username: user.Username } });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'Login failed' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error occurred while destroying session:', err);
            res.status(500).send({ error: 'Failed to logout' });
        } else {
            res.clearCookie('connect.sid');
            res.send({ isLoggedIn: false, message: 'Logged out successfully' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});