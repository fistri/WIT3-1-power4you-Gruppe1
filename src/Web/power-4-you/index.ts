import express from 'express';
import cors from 'cors';

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