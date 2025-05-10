// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Function to create memory card
function createMemoryCard(memory) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    
    const image = document.createElement('img');
    image.className = 'memory-image';
    image.src = memory.image || '../images/default-memory.jpg';
    image.alt = memory.title;
    
    const content = document.createElement('div');
    content.className = 'memory-content';
    
    const title = document.createElement('h3');
    title.className = 'memory-title';
    title.textContent = memory.title;
    
    const description = document.createElement('p');
    description.className = 'memory-description';
    description.textContent = memory.description;
    
    const date = document.createElement('p');
    date.className = 'memory-date';
    date.textContent = formatDate(memory.date);
    
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(date);
    
    card.appendChild(image);
    card.appendChild(content);
    
    // Add click event for modal
    card.addEventListener('click', () => {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDate = document.getElementById('modal-date');
        
        modalImage.src = memory.image || '../images/default-memory.jpg';
        modalTitle.textContent = memory.title;
        modalDescription.textContent = memory.description;
        modalDate.textContent = formatDate(memory.date);
        
        modal.style.display = 'block';
    });
    
    return card;
}

// Function to load memories
async function loadMemories() {
    try {
        const response = await fetch('/api/memories');
        const memories = await response.json();
        
        const container = document.getElementById('memories-container') || 
                         document.getElementById('featured-memories-container');
        
        if (container) {
            container.innerHTML = '';
            
            // Sort memories by date (newest first)
            memories.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // If it's the featured container, only show the 6 most recent memories
            const memoriesToShow = container.id === 'featured-memories-container' 
                ? memories.slice(0, 6) 
                : memories;
            
            memoriesToShow.forEach(memory => {
                container.appendChild(createMemoryCard(memory));
            });
        }
    } catch (error) {
        console.error('Error loading memories:', error);
    }
}

// Close modal when clicking the close button or outside the modal
document.addEventListener('DOMContentLoaded', function() {
    const memoriesContainer = document.getElementById('memories-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const modalClose = document.querySelector('.modal-close');

    // Load and display memories
    function loadMemories(filter = 'all') {
        const memories = filterMemories(filter);
        memoriesContainer.innerHTML = '';

        memories.forEach(memory => {
            const memoryCard = document.createElement('div');
            memoryCard.className = 'memory-card';
            memoryCard.innerHTML = `
                <img src="${memory.image}" alt="${memory.title}" loading="lazy">
                <div class="memory-info">
                    <h3>${memory.title}</h3>
                    <p>${memory.description}</p>
                    <small>${new Date(memory.date).toLocaleDateString('id-ID')}</small>
                </div>
            `;

            // Add click event to show modal
            memoryCard.addEventListener('click', () => {
                modalImage.src = memory.image;
                modalTitle.textContent = memory.title;
                modalDescription.textContent = memory.description;
                modalDate.textContent = new Date(memory.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                modal.style.display = 'block';
            });

            memoriesContainer.appendChild(memoryCard);
        });
    }

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Load memories with selected filter
            loadMemories(this.getAttribute('data-filter'));
        });
    });

    // Modal close button
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initial load
    loadMemories();
}); 