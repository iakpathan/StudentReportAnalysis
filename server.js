const express = require('express');
const fs = require('fs'); // Add this line at the top
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/charts', express.static(path.join(__dirname, 'charts')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pathan@2005', // your MySQL password
  database: 'student_dashboard', // your database name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database ✅');
});

// Route: Add Marks
app.post('/add-marks', (req, res) => {
  const { roll_no, semester, subjects } = req.body;

  if (!roll_no || !semester || !subjects) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const values = subjects.map(sub => [roll_no, semester, sub.name, sub.marks]);

  const query = 'INSERT INTO marks (roll_no, semester, subject_name, marks) VALUES ?';

  db.query(query, [values], (err) => {
    if (err) {
      console.error('Error inserting marks:', err);
      return res.status(500).json({ message: 'Database error while saving marks' });
    }
    res.json({ message: 'Marks added successfully ✅' });
  });
});

// Route: Add Attendance
app.post('/add-attendance', (req, res) => {
  const { roll_no, semester, subjects, overall_percentage } = req.body;

  if (!roll_no || !semester || !subjects || overall_percentage == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const values = subjects.map(cls => [
    roll_no,
    semester,
    cls.name,
    cls.attended,
    cls.total,
    cls.percentage
  ]);

  const insertQuery = `
    INSERT INTO attendance (roll_no, semester, class_name, attended_classes, total_classes, percentage) 
    VALUES ?
  `;

  db.query(insertQuery, [values], (err) => {
    if (err) {
      console.error('Error inserting attendance:', err);
      return res.status(500).json({ message: 'Database error while saving attendance' });
    }

    const updateQuery = `
      UPDATE students 
      SET overall_attendance = ? 
      WHERE roll_no = ?
    `;

    db.query(updateQuery, [overall_percentage, roll_no], (err) => {
      if (err) {
        console.error('Error updating overall attendance:', err);
        return res.status(500).json({ message: 'Database error while updating overall attendance' });
      }

      res.json({ message: 'Attendance added successfully ✅' });
    });
  });
});
const { exec } = require('child_process');


 // Route: Generate Chart
app.get('/generate-chart', (req, res) => {
  const { roll_no, semester, type } = req.query;

  if (!roll_no || !semester || !type) {
    return res.status(400).json({ message: 'Missing required query parameters' });
  }

  let scriptName = '';
  
  if (type === 'marks') {
    scriptName = 'generate_marks_chart.py';
  } else if (type === 'attendance') {
    scriptName = 'generate_attendance_chart.py';
  } else {
    return res.status(400).json({ message: 'Invalid chart type' });
  }

  // Spawn a Python process to generate the chart
  const python = spawn('python', [path.join(__dirname, scriptName), roll_no, semester]);

  let chartData = '';

  python.stdout.on('data', (data) => {
    chartData += data.toString(); // Capture the base64 string from Python
  });

  python.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0 && chartData.trim()) {
      // Return the base64-encoded image
      res.json({
        message: 'Chart generated successfully',
        chartUrl: `data:image/png;base64,${chartData.trim()}`, // Send base64 data
      });
    } else {
      res.status(500).json({ message: 'Failed to generate chart.' });
    }
  });
});
 
 
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
