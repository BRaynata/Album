const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// File to store memories
const MEMORIES_FILE = 'memories.json';

// Initialize memories file if it doesn't exist
if (!fs.existsSync(MEMORIES_FILE)) {
    fs.writeFileSync(MEMORIES_FILE, JSON.stringify([]));
}

// Routes
app.get('/api/memories', (req, res) => {
    const memories = JSON.parse(fs.readFileSync(MEMORIES_FILE));
    res.json(memories);
});

app.post('/api/memories', upload.single('image'), (req, res) => {
    const memories = JSON.parse(fs.readFileSync(MEMORIES_FILE));
    const newMemory = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        image: req.file ? `/images/${req.file.filename}` : null,
        date: new Date().toISOString()
    };
    
    memories.push(newMemory);
    fs.writeFileSync(MEMORIES_FILE, JSON.stringify(memories, null, 2));
    res.json(newMemory);
});

app.delete('/api/memories/:id', (req, res) => {
    const memories = JSON.parse(fs.readFileSync(MEMORIES_FILE));
    const memoryId = parseInt(req.params.id);
    const memoryIndex = memories.findIndex(m => m.id === memoryId);
    
    if (memoryIndex !== -1) {
        const memory = memories[memoryIndex];
        if (memory.image) {
            const imagePath = path.join(__dirname, 'public', memory.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        memories.splice(memoryIndex, 1);
        fs.writeFileSync(MEMORIES_FILE, JSON.stringify(memories, null, 2));
        res.json({ message: 'Memory deleted successfully' });
    } else {
        res.status(404).json({ message: 'Memory not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 