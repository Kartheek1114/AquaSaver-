import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const SECRET_KEY = process.env.JWT_SECRET || 'aquasaver-secret-key-change-this-in-prod';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const DB_FILE = path.join(__dirname, 'users.json');

let mongoReady = false;

app.use(cors());
app.use(express.json());

function isStrongPassword(password) {
  if (typeof password !== 'string') return false;
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

// JSON fallback DB (used only when MongoDB is not configured/connected)
async function getUsers() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2));
}

// MongoDB model
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'CONSUMER', required: true },
    provider: { type: String, default: 'local' },
    passwordHash: { type: String },
    googleSub: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function initMongo() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn('MONGODB_URI not set; using JSON fallback for auth.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    mongoReady = true;
    console.log('MongoDB connected');
  } catch (err) {
    mongoReady = false;
    console.error('MongoDB connection failed; using JSON fallback.', err);
  }
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Helper to issue JWT in the existing format expected by the frontend
function issueToken(user) {
  return jwt.sign(
    {
      id: String(user.id),
      email: user.email,
      role: user.role,
      name: user.name,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
}

// Routes
// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and include 1 capital letter, 1 number, and 1 special character.',
    });
  }

  if (mongoReady) {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const role = email === 'kartheek04112004@gmail.com' ? 'ADMIN' : 'CONSUMER';
    const created = await User.create({
      name,
      email,
      passwordHash,
      role,
      provider: 'local',
    });

    const token = issueToken({ id: created._id.toString(), email: created.email, role: created.role, name: created.name });
    return res.status(201).json({
      token,
      user: { id: created._id.toString(), name: created.name, email: created.email, role: created.role },
    });
  }

  // JSON fallback
  const users = await getUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = email === 'kartheek04112004@gmail.com' ? 'ADMIN' : 'CONSUMER';
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role,
  };

  users.push(newUser);
  await saveUsers(users);

  const token = issueToken(newUser);
  return res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
  });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (mongoReady) {
    const user = await User.findOne({ email });
    if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = issueToken({ id: user._id.toString(), email: user.email, role: user.role, name: user.name });
    return res.json({
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  }

  // JSON fallback
  const users = await getUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = issueToken(user);
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// Google Sign-In Route
app.post('/api/auth/google', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'Google idToken is required' });
  }

  if (!GOOGLE_CLIENT_ID) {
    console.error('CRITICAL: GOOGLE_CLIENT_ID is not defined in backend environment variables.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    if (mongoReady) {
      let user = await User.findOne({ email });
      const role = email === 'kartheek04112004@gmail.com' ? 'ADMIN' : 'CONSUMER';

      if (!user) {
        // Create new user if not found
        user = await User.create({
          name,
          email,
          googleSub: sub,
          provider: 'google',
          role,
        });
      } else if (user.provider !== 'google') {
        // Link existing local account to Google if it's the same email
        user.googleSub = sub;
        user.provider = 'google';
        user.role = role;
        await user.save();
      } else if (user.role !== role) {
        // Ensure role is updated if it should be admin
        user.role = role;
        await user.save();
      }

      const token = issueToken({ id: user._id.toString(), email: user.email, role: user.role, name: user.name });
      return res.status(200).json({
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role, picture },
      });
    }

    // JSON fallback
    const users = await getUsers();
    let user = users.find((u) => u.email === email);
    const role = email === 'kartheek04112004@gmail.com' ? 'ADMIN' : 'CONSUMER';

    if (!user) {
      user = {
        id: Date.now().toString(),
        name,
        email,
        googleSub: sub,
        provider: 'google',
        role,
      };
      users.push(user);
      await saveUsers(users);
    } else if (user.provider !== 'google') {
      user.googleSub = sub;
      user.provider = 'google';
      user.role = role;
      await saveUsers(users);
    } else if (user.role !== role) {
      user.role = role;
      await saveUsers(users);
    }

    const token = issueToken(user);
    return res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, picture },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(401).json({ message: 'Invalid Google token' });
  }
});

// Get Current User (Protected)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  if (!mongoReady) return res.json(req.user);

  const u = await User.findById(req.user.id).select('name email role');
  if (!u) return res.sendStatus(404);

  return res.json({ id: u._id.toString(), name: u.name, email: u.email, role: u.role });
});

initMongo().finally(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
