// Fungsi untuk menyimpan data ke localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
    }
}

// Fungsi untuk mengambil data dari localStorage
function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting from storage:', error);
        return null;
    }
}

// Fungsi untuk menyimpan gambar
function saveImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

// Fungsi untuk menyimpan kenangan baru
async function saveMemory(memory) {
    try {
        const memories = getFromStorage('memories') || [];
        const newMemory = {
            ...memory,
            id: Date.now().toString(),
            date: new Date().toISOString()
        };
        memories.unshift(newMemory);
        if (saveToStorage('memories', memories)) {
            return newMemory;
        }
        return null;
    } catch (error) {
        console.error('Error saving memory:', error);
        return null;
    }
}

// Fungsi untuk mengambil semua kenangan
function getAllMemories() {
    return getFromStorage('memories') || [];
}

// Fungsi untuk menghapus kenangan
function deleteMemory(id) {
    try {
        const memories = getFromStorage('memories') || [];
        const updatedMemories = memories.filter(memory => memory.id !== id);
        return saveToStorage('memories', updatedMemories);
    } catch (error) {
        console.error('Error deleting memory:', error);
        return false;
    }
}

// Fungsi untuk memfilter kenangan
function filterMemories(filter) {
    const memories = getAllMemories();
    switch (filter) {
        case 'recent':
            return memories.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'oldest':
            return memories.sort((a, b) => new Date(a.date) - new Date(b.date));
        default:
            return memories;
    }
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