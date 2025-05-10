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
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Load memories when the page loads
    loadMemories();
    
    // Add filter functionality for gallery page
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                const container = document.getElementById('memories-container');
                
                if (container) {
                    const cards = container.querySelectorAll('.memory-card');
                    cards.forEach(card => {
                        const date = new Date(card.querySelector('.memory-date').textContent);
                        const now = new Date();
                        
                        switch (filter) {
                            case 'recent':
                                // Show memories from the last 30 days
                                const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                                card.style.display = date >= thirtyDaysAgo ? 'block' : 'none';
                                break;
                            case 'oldest':
                                // Show memories older than 30 days
                                const thirtyDaysAgo2 = new Date(now.setDate(now.getDate() - 30));
                                card.style.display = date < thirtyDaysAgo2 ? 'block' : 'none';
                                break;
                            default:
                                // Show all memories
                                card.style.display = 'block';
                        }
                    });
                }
            });
        });
    }
}); 