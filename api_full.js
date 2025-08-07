const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const GALLERY_FILE = 'gallery.json';
const SCHEDULE_FILE = 'schedule.json';
const EVENTS_FILE = 'events.json';
const TARIFFS_FILE = 'tariffs.json';

function loadData(file) {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading', file, e);
  }
  return [];
}

function saveData(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving', file, e);
  }
}

// Gallery endpoints
app.get('/gallery', (req, res) => {
  res.json(loadData(GALLERY_FILE));
});

app.post('/gallery', (req, res) => {
  const list = loadData(GALLERY_FILE);
  const { url } = req.body;
  if (url) {
    list.push(url);
    saveData(GALLERY_FILE, list);
  }
  res.json(list);
});

app.put('/gallery/:index', (req, res) => {
  const list = loadData(GALLERY_FILE);
  const idx = parseInt(req.params.index, 10);
  const { url } = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length && url) {
    list[idx] = url;
    saveData(GALLERY_FILE, list);
  }
  res.json(list);
});

app.delete('/gallery/:index', (req, res) => {
  const list = loadData(GALLERY_FILE);
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list.splice(idx, 1);
    saveData(GALLERY_FILE, list);
  }
  res.json(list);
});

// Schedule endpoints
app.get('/schedule', (req, res) => {
  res.json(loadData(SCHEDULE_FILE));
});

app.post('/schedule', (req, res) => {
  const list = loadData(SCHEDULE_FILE);
  const item = req.body;
  if (item && item.day) {
    list.push(item);
    saveData(SCHEDULE_FILE, list);
  }
  res.json(list);
});

app.put('/schedule/:index', (req, res) => {
  const list = loadData(SCHEDULE_FILE);
  const idx = parseInt(req.params.index, 10);
  const item = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list[idx] = item;
    saveData(SCHEDULE_FILE, list);
  }
  res.json(list);
});

app.delete('/schedule/:index', (req, res) => {
  const list = loadData(SCHEDULE_FILE);
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list.splice(idx, 1);
    saveData(SCHEDULE_FILE, list);
  }
  res.json(list);
});

// Events endpoints
app.get('/events', (req, res) => {
  res.json(loadData(EVENTS_FILE));
});

app.post('/events', (req, res) => {
  const list = loadData(EVENTS_FILE);
  const item = req.body;
  if (item && item.title) {
    list.push(item);
    saveData(EVENTS_FILE, list);
  }
  res.json(list);
});

app.put('/events/:index', (req, res) => {
  const list = loadData(EVENTS_FILE);
  const idx = parseInt(req.params.index, 10);
  const item = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list[idx] = item;
    saveData(EVENTS_FILE, list);
  }
  res.json(list);
});

app.delete('/events/:index', (req, res) => {
  const list = loadData(EVENTS_FILE);
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list.splice(idx, 1);
    saveData(EVENTS_FILE, list);
  }
  res.json(list);
});

// Tariffs endpoints
app.get('/tariffs', (req, res) => {
  res.json(loadData(TARIFFS_FILE));
});

app.post('/tariffs', (req, res) => {
  const list = loadData(TARIFFS_FILE);
  const item = req.body;
  if (item && item.title) {
    list.push(item);
    saveData(TARIFFS_FILE, list);
  }
  res.json(list);
});

app.put('/tariffs/:index', (req, res) => {
  const list = loadData(TARIFFS_FILE);
  const idx = parseInt(req.params.index, 10);
  const item = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list[idx] = item;
    saveData(TARIFFS_FILE, list);
  }
  res.json(list);
});

app.delete('/tariffs/:index', (req, res) => {
  const list = loadData(TARIFFS_FILE);
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < list.length) {
    list.splice(idx, 1);
    saveData(TARIFFS_FILE, list);
  }
  res.json(list);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
