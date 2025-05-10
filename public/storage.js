// Storage key
const STORAGE_KEY = 'memories';

// Get all memories
function getMemories() {
    const memories = localStorage.getItem(STORAGE_KEY);
    return memories ? JSON.parse(memories) : [];
}

// Save a new memory
function saveMemory(memory) {
    const memories = getMemories();
    memory.id = Date.now();
    memory.date = new Date().toISOString();
    memories.push(memory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    return memory;
}

// Delete a memory
function deleteMemory(id) {
    const memories = getMemories();
    const updatedMemories = memories.filter(memory => memory.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemories));
}

// Convert image to base64
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
} 