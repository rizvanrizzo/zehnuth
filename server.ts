import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'db.json');

// Initialize DB with seed data if not exists
if (!fs.existsSync(DB_PATH)) {
  const initialData = {
    students: [
      { id: '1', name: 'Alex Rivera', points: 820, mentorId: 'm1' },
      { id: '2', name: 'Sarah Chen', points: 540, mentorId: 'm1' },
      { id: '3', name: 'Marcus Wong', points: 280, mentorId: 'm2' },
      { id: '4', name: 'Elena Petrova', points: 120, mentorId: 'm1' },
      { id: '5', name: 'David Kim', points: 85, mentorId: 'm1' },
      { id: '6', name: 'Julianne Moore', points: 755, mentorId: 'm2' },
      { id: '7', name: 'Liam Neeson', points: 410, mentorId: 'm1' },
    ],
    history: [
      { id: 'h1', studentId: '1', category: 'Exam', points: 50, date: new Date(Date.now() - 86400000 * 2).toISOString(), mentorId: 'm1' },
      { id: 'h2', studentId: '2', category: 'Writings', points: 20, date: new Date(Date.now() - 86400000).toISOString(), mentorId: 'm1' },
      { id: 'h3', studentId: '1', category: 'Presentation', points: 40, date: new Date().toISOString(), mentorId: 'm1' },
    ]
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
}

function getDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function saveDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function calculateLeague(points: number) {
  if (points >= 750) return 'Diamond';
  if (points >= 500) return 'Platinum';
  if (points >= 250) return 'Emerald';
  if (points >= 100) return 'Gold';
  return 'Bronze';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/students', (req, res) => {
    const db = getDB();
    const studentsWithLeagues = db.students.map((s: any) => ({
      ...s,
      league: calculateLeague(s.points)
    })).sort((a: any, b: any) => b.points - a.points);
    res.json(studentsWithLeagues);
  });

  app.get('/api/mentees', (req, res) => {
    const db = getDB();
    const mentorId = 'm1'; // Mock current mentor ID
    const mentees = db.students
      .filter((s: any) => s.mentorId === mentorId)
      .map((s: any) => ({
        ...s,
        league: calculateLeague(s.points)
      }))
      .sort((a: any, b: any) => b.points - a.points);
    res.json(mentees);
  });

  app.get('/api/history', (req, res) => {
    const db = getDB();
    const historyWithNames = db.history.map((h: any) => {
      const student = db.students.find((s: any) => s.id === h.studentId);
      return {
        ...h,
        studentName: student ? student.name : 'Unknown'
      };
    }).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(historyWithNames);
  });

  app.post('/api/award', (req, res) => {
    const { studentId, category, points, mentorId } = req.body;
    const db = getDB();
    
    const studentIndex = db.students.findIndex((s: any) => s.id === studentId);
    if (studentIndex === -1) return res.status(404).json({ error: 'Student not found' });

    db.students[studentIndex].points += points;

    const newAward = {
      id: `h${Date.now()}`,
      studentId,
      category,
      points,
      date: new Date().toISOString(),
      mentorId: mentorId || 'm1'
    };

    db.history.push(newAward);
    saveDB(db);

    res.json({ success: true, award: newAward, newTotal: db.students[studentIndex].points });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZEHNUTH Server running on http://localhost:${PORT}`);
  });
}

startServer();
