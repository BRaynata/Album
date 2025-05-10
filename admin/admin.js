document.addEventListener('DOMContentLoaded', function() {
    const memoryForm = document.getElementById('memory-form');
    const imageInput = document.getElementById('image');
    const previewImage = document.getElementById('preview');
    const memoryList = document.getElementById('memory-list');

    // Preview image before upload
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    memoryForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageFile = imageInput.files[0];

        if (!imageFile) {
            alert('Silakan pilih foto kenangan');
            return;
        }

        try {
            // Convert image to base64
            const imageData = await saveImage(imageFile);

            // Create memory object
            const memory = {
                title,
                description,
                image: imageData
            };

            // Save memory
            const savedMemory = await saveMemory(memory);
            if (savedMemory) {
                alert('Kenangan berhasil disimpan!');
                memoryForm.reset();
                previewImage.style.display = 'none';
                loadMemories();
            } else {
                alert('Gagal menyimpan kenangan');
            }
        } catch (error) {
            console.error('Error saving memory:', error);
            alert('Terjadi kesalahan saat menyimpan kenangan');
        }
    });

    // Load existing memories
    function loadMemories() {
        const memories = getAllMemories();
        memoryList.innerHTML = '';

        memories.forEach(memory => {
            const li = document.createElement('li');
            li.className = 'memory-item';
            li.innerHTML = `
                <div class="memory-info">
                    <h4>${memory.title}</h4>
                    <p>${memory.description}</p>
                    <small>${new Date(memory.date).toLocaleDateString('id-ID')}</small>
                </div>
                <button class="delete-btn" data-id="${memory.id}">Hapus</button>
            `;
            memoryList.appendChild(li);
        });

        // Add delete event listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if (confirm('Apakah Anda yakin ingin menghapus kenangan ini?')) {
                    if (deleteMemory(id)) {
                        loadMemories();
                    } else {
                        alert('Gagal menghapus kenangan');
                    }
                }
            });
        });
    }

    // Initial load
    loadMemories();
}); 