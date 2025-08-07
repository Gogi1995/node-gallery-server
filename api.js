const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// CORS middleware to allow requests from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// File paths
const GALLERY_FILE = 'gallery.json';
const SCHEDULE_FILE = 'schedule.json';
const EVENTS_FILE = 'events.json';

// Helper functions for gallery
function loadGallery() {
  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const data = fs.readFileSync(GALLERY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading gallery file:', e);
  }
  return [];
}

function saveGallery(data) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving gallery file:', e);
  }
}

// Helper functions for schedule
function loadSchedule() {
  try {
    if (fs.existsSync(SCHEDULE_FILE)) {
      const data = fs.readFileSync(SCHEDULE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading schedule file:', e);
  }
  return [];
}

function saveSchedule(data) {
  try {
    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving schedule file:', e);
  }
}

// Helper functions for events
function loadEvents() {
  try {
    if (fs.existsSync(EVENTS_FILE)) {
      const data = fs.readFileSync(EVENTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading events file:', e);
  }
  return [];
}

function saveEvents(data) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving events file:', e);
  }
}

// Gallery routes
app.get('/gallery', (req, res) => {
  res.json(loadGallery());
});

app.post('/gallery', (req, res) => {
  const images = loadGallery();
  const { url } = req.body;
  if (url) {
    images.push(url);
    saveGallery(images);
  }
  res.json(images);
});

app.put('/gallery/:index', (req, res) => {
  let images = loadGallery();
  const idx = parseInt(req.params.index, 10);
  const { url } = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < images.length && url) {
    images[idx] = url;
    saveGallery(images);
  }
  res.json(images);
});

app.delete('/gallery/:index', (req, res) => {
  let images = loadGallery();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < images.length) {
    images.splice(idx, 1);
    saveGallery(images);
  }
  res.json(images);
});

// Schedule routes
app.get('/schedule', (req, res) => {
  res.json(loadSchedule());
});

app.post('/schedule', (req, res) => {
  const items = loadSchedule();
  const newItem = req.body;
  items.push(newItem);
  saveSchedule(items);
  res.json(items);
});

app.put('/schedule/:index', (req, res) => {
  let items = loadSchedule();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < items.length) {
    items[idx] = req.body;
    saveSchedule(items);
  }
  res.json(items);
});

app.delete('/schedule/:index', (req, res) => {
  let items = loadSchedule();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < items.length) {
    items.splice(idx, 1);
    saveSchedule(items);
  }
  res.json(items);
});

// Events routes
app.get('/events', (req, res) => {
  res.json(loadEvents());
});

app.post('/events', (req, res) => {
  const items = loadEvents();
  const newItem = req.body;
  items.push(newItem);
  saveEvents(items);
  res.json(items);
});

app.put('/events/:index', (req, res) => {
  let items = loadEvents();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < items.length) {
    items[idx] = req.body;
    saveEvents(items);
  }
  res.json(items);
});

app.delete('/events/:index', (req, res) => {
  let items = loadEvents();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < items.length) {
    items.splice(idx, 1);
    saveEvents(items);
  }
  res.json(items);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
