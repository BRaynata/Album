document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('memory-form');
    const imageInput = document.getElementById('image');
    const preview = document.getElementById('preview');
    const memoryList = document.getElementById('memory-list');

    // Preview image before upload
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const imageFile = imageInput.files[0];

            if (!imageFile) {
                throw new Error('Pilih foto terlebih dahulu');
            }

            const imageBase64 = await imageToBase64(imageFile);
            const memory = {
                title,
                description,
                image: imageBase64
            };

            saveMemory(memory);

            // Clear form
            form.reset();
            preview.style.display = 'none';
            
            // Show success message
            alert('Kenangan berhasil disimpan!');
            
            // Reload memory list
            loadMemories();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menyimpan kenangan');
        }
    });

    // Function to load existing memories
    function loadMemories() {
        const memories = getMemories();

        // Sort memories by date (newest first)
        memories.sort((a, b) => new Date(b.date) - new Date(a.date));

        memoryList.innerHTML = '';
        memories.forEach(memory => {
            const li = document.createElement('li');
            li.className = 'memory-item';

            const info = document.createElement('div');
            info.className = 'memory-info';

            const title = document.createElement('h4');
            title.textContent = memory.title;

            const date = document.createElement('p');
            date.textContent = new Date(memory.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            info.appendChild(title);
            info.appendChild(date);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Hapus';
            deleteBtn.addEventListener('click', () => {
                if (confirm('Apakah Anda yakin ingin menghapus kenangan ini?')) {
                    try {
                        deleteMemory(memory.id);
                        li.remove();
                        alert('Kenangan berhasil dihapus!');
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Terjadi kesalahan saat menghapus kenangan');
                    }
                }
            });

            li.appendChild(info);
            li.appendChild(deleteBtn);
            memoryList.appendChild(li);
        });
    }

    // Load memories when the page loads
    loadMemories();
}); 