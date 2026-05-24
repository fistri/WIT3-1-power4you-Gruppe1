// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./src/types/express-session.d.ts" />
import express from 'express';
import session from 'express-session';
import cors from 'cors';

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";
import { env } from "prisma/config";
import { Resend } from "resend";
import { Request, Response, NextFunction } from "express";

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

const requireApiKey = async (req: Request, res: Response, next: NextFunction) => {
    let auth = req.headers.authorization;

    if (!auth) {
        res.status(401).send("Unauthorized");
        return;
    }
    if (!auth.startsWith("Bearer ")) {
        res.status(401).send("Unauthorized");
        return;
    }

    auth = auth.split(" ")[1];

    const user = await prisma.user.findFirst({
        where: { Api_key: auth }
    });

    if (!user) {
        res.status(401).send("Unauthorized");
        return;
    }

    next();
};

// API Routes
app.get("/api/customer/:User_ID", requireApiKey, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.User_ID);

    if (Number.isNaN(userId)) {
      return res.status(400).json({ message: "Wrong User_ID." });
    }

    const customer = await prisma.kunde.findUnique({
      where: {
        User_ID: userId,
      }
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error in /api/customer/:User_ID", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/solarmodule/:customerNumber", requireApiKey, async (req: Request, res: Response) => {
  try {
    const customerNumber = Number(req.params.customerNumber);

    if (Number.isNaN(customerNumber)) {
      return res.status(400).json({ message: "Invalid customer number." });
    }

    const module = await prisma.solarmodul.findMany({
      where: {
        Kundennummer: customerNumber,
      },
      select: {
        Modulnummer: true,
        Solarmodultyp: {
          select: {
            Solarmodultypnummer: true,
            Bezeichnung: true,
            Umpp: true,
            Impp: true,
            Pmpp: true,
          }
        }
      },
      orderBy: {
        Modulnummer: "asc",
      },
    });

    const result = module.map((m) => ({
      ...m.Solarmodultyp,
      Modulnummer: m.Modulnummer,
    }));

    return res.status(200).json(result);

  } catch (error) {
    console.error("Error in /api/solarmodule/:customerNumber", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/solarmodule/:moduleNumber/power", requireApiKey, async (req: Request, res: Response) => {
  try {
    const moduleNumber = Number(req.params.moduleNumber);

    if (Number.isNaN(moduleNumber)) {
      return res.status(400).json({ message: "Invalid module number." });
    }

    const fromParam = req.query.from as string | undefined;
    const toParam = req.query.to as string | undefined;

    const to = toParam ? new Date(toParam) : new Date();

    const from = fromParam
      ? new Date(fromParam)
      : new Date(to.getTime() - 24 * 60 * 60 * 1000);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return res.status(400).json({
        message: "Invalid time range.",
      });
    }

    const power = await prisma.leistung.findMany({
      where: {
        Modulnummer: moduleNumber,
        Timestamp: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        Timestamp: "asc",
      },
      select: {
        Timestamp: true,
        Modulnummer: true,
        Power_Out: true,
      },
    });

    // Just one per hour
    const hourlyData = power.filter((entry) => {
      const date = new Date(entry.Timestamp);

      return (
        date.getMinutes() === 0
      );
    });

    return res.status(200).json(
      hourlyData
    );

  } catch (error) {
    console.error("Error in /api/solarmodule/:moduleNumber/power", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ message: 'Missing credentials' });

  try {
    const user = await prisma.user.findFirst({ where: { Username: username } });
    if (!user) return res.status(401).send({ message: 'Invalid credentials' });

    if (user.Password !== password) return res.status(401).send({ message: 'Invalid credentials' });

    req.session.user = { id: user.User_ID, username: user.Username };
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).send({ message: 'Session save failed' });
      }
      res.send({ isLoggedIn: true, user });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Login failed' });
  }
});

app.post('/api/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error occurred while destroying session:', err);
      res.status(500).send({ message: 'Failed to logout' });
    } else {
      res.clearCookie('connect.sid');
      res.send({ isLoggedIn: false });
    }
  });
});

//Email
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {

  try {

    const { name, email, message, subject } = req.body;

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'power4you@gbs-labor.de', //<--- USE A DIFFERENT EMAIL ADRESS FOR TESTING
      template: {
        id: 'contactformular',
        variables: {
          NAME: name,
          EMAILADDRESS: email,
          MESSAGE: message,
          SUBJECT: subject
        },
      },
    });

    res.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});

export default app;