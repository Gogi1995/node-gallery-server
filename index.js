const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Enable CORS for all origins and methods
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Generic file read function
function loadFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u0442\u044c \u0444\u0430\u0439\u043b ${filePath}:`, e);
  }
  return [];
}

// Generic file write function
function saveFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(`\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0444\u0430\u0439\u043b ${filePath}:`, e);
  }
}

// Gallery file path
const GALLERY_FILE = 'gallery.json';

function loadGallery() {
  return loadFile(GALLERY_FILE);
}

function saveGallery(data) {
  saveFile(GALLERY_FILE, data);
}

// Gallery endpoints
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

// Schedule file path
const SCHEDULE_FILE = 'schedule.json';

function loadSchedule() {
  return loadFile(SCHEDULE_FILE);
}

function saveSchedule(data) {
  saveFile(SCHEDULE_FILE, data);
}

// Schedule endpoints
app.get('/schedule', (req, res) => {
  res.json(loadSchedule());
});

app.post('/schedule', (req, res) => {
  const schedules = loadSchedule();
  const { day, time, style, teacher } = req.body;
  if (day && time && style && teacher) {
    schedules.push({ day, time, style, teacher });
    saveSchedule(schedules);
  }
  res.json(schedules);
});

app.put('/schedule/:index', (req, res) => {
  let schedules = loadSchedule();
  const idx = parseInt(req.params.index, 10);
  const { day, time, style, teacher } = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < schedules.length) {
    schedules[idx] = {
      day: day || schedules[idx].day,
      time: time || schedules[idx].time,
      style: style || schedules[idx].style,
      teacher: teacher || schedules[idx].teacher
    };
    saveSchedule(schedules);
  }
  res.json(schedules);
});

app.delete('/schedule/:index', (req, res) => {
  let schedules = loadSchedule();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < schedules.length) {
    schedules.splice(idx, 1);
    saveSchedule(schedules);
  }
  res.json(schedules);
});

// Events file path
const EVENTS_FILE = 'events.json';

function loadEvents() {
  return loadFile(EVENTS_FILE);
}

function saveEvents(data) {
  saveFile(EVENTS_FILE, data);
}

// Events endpoints
app.get('/events', (req, res) => {
  res.json(loadEvents());
});

app.post('/events', (req, res) => {
  const events = loadEvents();
  const { title, date, location, description, image } = req.body;
  if (title && date && location && description) {
    events.push({ title, date, location, description, image });
    saveEvents(events);
  }
  res.json(events);
});

app.put('/events/:index', (req, res) => {
  let events = loadEvents();
  const idx = parseInt(req.params.index, 10);
  const { title, date, location, description, image } = req.body;
  if (Number.isInteger(idx) && idx >= 0 && idx < events.length) {
    const event = events[idx];
    events[idx] = {
      title: title || event.title,
      date: date || event.date,
      location: location || event.location,
      description: description || event.description,
      image: image || event.image
    };
    saveEvents(events);
  }
  res.json(events);
});

app.delete('/events/:index', (req, res) => {
  let events = loadEvents();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < events.length) {
    events.splice(idx, 1);
    saveEvents(events);
  }
  res.json(events);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
