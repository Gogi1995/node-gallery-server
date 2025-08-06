// Простой сервер на Express для галереи.
// Данные хранятся в JSON-файле и доступны по REST-эндпоинтам.
// Запуск: установи Node.js, выполни `npm install express` и затем `node server.js`.

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const GALLERY_FILE = 'gallery.json';

// Загружаем список изображений из файла, если он существует
function loadGallery() {
  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const data = fs.readFileSync(GALLERY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Не удалось прочитать файл галереи:', e);
  }
  return [];
}

// Сохраняем список изображений в файл
function saveGallery(data) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Не удалось сохранить файл галереи:', e);
  }
}

// Получить список всех изображений
app.get('/gallery', (req, res) => {
  res.json(loadGallery());
});

// Добавить новое изображение по ссылке
app.post('/gallery', (req, res) => {
  const images = loadGallery();
  const { url } = req.body;
  if (url) {
    images.push(url);
    saveGallery(images);
  }
  res.json(images);
});

// Обновить ссылку на изображение по индексу
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

// Удалить изображение по индексу
app.delete('/gallery/:index', (req, res) => {
  let images = loadGallery();
  const idx = parseInt(req.params.index, 10);
  if (Number.isInteger(idx) && idx >= 0 && idx < images.length) {
    images.splice(idx, 1);
    saveGallery(images);
  }
  res.json(images);
});

// Настраиваем порт
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
