const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory contact messages storage (can be swapped for a database)
const messages = [];

// API Route: Get Profile Details
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Deepanath',
    tagline: 'Full Stack Web Developer & Tech Enthusiast',
    bio: 'Passionate about crafting fast, modern, and engaging web applications. Specialized in JavaScript, Node.js, and modern frontend technologies.',
    location: 'India',
    email: 'contact@deepanath.dev',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    skills: [
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'Node.js & Express', level: 85 },
      { name: 'REST APIs & Web Services', level: 88 },
      { name: 'Git & Version Control', level: 82 },
      { name: 'Responsive Web Design', level: 92 }
    ],
    stats: {
      projectsCompleted: 15,
      happyClients: 12,
      yearsExperience: 2
    }
  });
});

// API Route: Handle Contact Form Submissions
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and a message.'
    });
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const newMessage = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : 'General Inquiry',
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  messages.push(newMessage);
  console.log(`[New Message Received] From: ${newMessage.name} <${newMessage.email}> - "${newMessage.subject}"`);

  return res.status(200).json({
    success: true,
    message: `Thank you, ${newMessage.name}! Your message has been received successfully.`
  });
});

// Fallback route: serve index.html for client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server with dynamic fallback if port is busy
function startServer(portToUse) {
  const server = app.listen(portToUse, () => {
    console.log(`===============================================`);
    console.log(`🚀 Deepanath's website is running!`);
    console.log(`🌐 Local URL: http://localhost:${portToUse}`);
    console.log(`===============================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${portToUse} is in use, trying port ${portToUse + 1}...`);
      startServer(portToUse + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
