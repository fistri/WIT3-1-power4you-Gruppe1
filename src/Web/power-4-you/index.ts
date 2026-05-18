// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./src/types/express-session.d.ts" />
import express from 'express';
import session from 'express-session'; 
import cors from 'cors';

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";
import { env } from "prisma/config";

// Import route creators
import { createTypesRouter } from "./src/routes/types.js";
import { createModulesRouter } from "./src/routes/modules.js";
import { createCustomersRouter } from "./src/routes/customers.js";
import { createPerformanceRouter } from "./src/routes/performance.js";

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

app.get('/api/user/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id);
        if (Number.isNaN(userId)) {
            return res.status(400).send({ error: 'Invalid user id' });
        }

        const user = await prisma.user.findUnique({
            where: { User_ID: userId },
            select: { User_ID: true, Username: true, Api_key: true }
        });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send(user);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).send({ error: 'Database request failed' });
    }
});

app.get('/api/session', (req, res) => {
    const sess = req.session;
    res.send({ user: sess?.user ?? null });
});

app.post('/api/login', async (req, res) => {
    const { username, password, api_key } = req.body;
    if (!username || !password || !api_key) {
        return res.status(400).send({ error: 'Missing credentials: username, password, and api_key required' });
    }

    try {
        const user = await prisma.user.findFirst({ where: { Username: username } });
        if (!user) return res.status(401).send({ error: 'Invalid credentials' });

        // Validate password
        if (user.Password !== password) return res.status(401).send({ error: 'Invalid credentials' });

        // Validate api_key
        if (user.Api_key !== api_key) return res.status(401).send({ error: 'Invalid credentials' });

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

// Register modular CRUD routers
app.use(createTypesRouter(prisma));
app.use(createModulesRouter(prisma));
app.use(createCustomersRouter(prisma));
app.use(createPerformanceRouter(prisma));

// Start server
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});