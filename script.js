// Mock Caterer Data
const caterers = [
    { 
        id: 1, 
        name: 'Rama Caterers', 
        emoji: '🍛', 
        distance: 5, 
        rating: 4.8, 
        staff: 12, 
        type: 'both', 
        price: 250, 
        event: 'wedding' 
    },
    { 
        id: 2, 
        name: 'Sharma Catering', 
        emoji: '🍜', 
        distance: 8, 
        rating: 4.6, 
        staff: 15, 
        type: 'veg', 
        price: 200, 
        event: 'birthday' 
    },
    { 
        id: 3, 
        name: 'Delhi Delights', 
        emoji: '🍖', 
        distance: 12, 
        rating: 4.9, 
        staff: 20, 
        type: 'non-veg', 
        price: 300, 
        event: 'corporate' 
    },
    { 
        id: 4, 
        name: 'Golden Plate', 
        emoji: '🥘', 
        distance: 3, 
        rating: 4.7, 
        staff: 10, 
        type: 'both', 
        price: 280, 
        event: 'wedding' 
    },
    { 
        id: 5, 
        name: 'Spice Master', 
        emoji: '🌶️', 
        distance: 15, 
        rating: 4.5, 
        staff: 18, 
        type: 'veg', 
        price: 220, 
        event: 'birthday' 
    },
    { 
        id: 6, 
        name: 'Feast Furnish', 
        emoji: '🍲', 
        distance: 7, 
        rating: 4.8, 
        staff: 14, 
        type: 'both', 
        price: 270, 
        event: 'corporate' 
    }
];

// State
let currentRadius = 10;
let currentCaterer = null;

// Render caterers to grid
function renderCaterers(data) {
    const grid = document.getElementById('catererGrid');
    grid.innerHTML = data.map(cat => `
        <div class="caterer-card" onclick="viewDetail(${cat.id})">
            <div class="caterer-image">
                ${cat.emoji}
                <div class="caterer-badge">${cat.rating} ⭐</div>
            </div>
            <div class="caterer-content">
                <div class="caterer-name">${cat.name}</div>
                <div class="caterer-meta">
                    <span class="rating">${cat.rating} ⭐</span>
                    <span class="distance">${cat.distance} km</span>
                </div>
                <div class="caterer-tags">
                    <span class="tag">${
                        cat.type === 'veg' ? '🟢 Veg' : 
                        cat.type === 'non-veg' ? '🔴 Non-Veg' : 
                        '🟢🔴 Both'
                    }</span>
                    <span class="tag">${cat.staff} Staff</span>
                </div>
                <div class="caterer-price">₹${cat.price}/plate from</div>
                <div class="caterer-footer">
                    <button class="btn btn-secondary" onclick="event.stopPropagation();">View</button>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openModal('contact');">Book</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update radius value
function updateRadius() {
    currentRadius = document.getElementById('radiusSlider').value;
    document.getElementById('radiusVal').textContent = currentRadius;
    filterCaterers();
}

// Filter caterers
function filterCaterers() {
    const search = document.getElementById('searchCaterer').value.toLowerCase();
    const filtered = caterers.filter(cat => {
        const matchRadius = cat.distance <= currentRadius;
        const matchSearch = cat.name.toLowerCase().includes(search);
        return matchRadius && matchSearch;
    });
    renderCaterers(filtered);
}

// Filter by type
function filterByType(type) {
    const search = document.getElementById('searchCaterer').value.toLowerCase();
    const filtered = caterers.filter(cat => {
        const matchRadius = cat.distance <= currentRadius;
        const matchSearch = cat.name.toLowerCase().includes(search);
        const matchType = type === 'both' || cat.type === type || cat.type === 'both';
        return matchRadius && matchSearch && matchType;
    });
    renderCaterers(filtered);
}

// View caterer details
function viewDetail(id) {
    currentCaterer = caterers.find(c => c.id === id);
    
    if (!currentCaterer) return;
    
    document.getElementById('detailName').textContent = currentCaterer.name;
    document.getElementById('detailStaff').textContent = currentCaterer.staff;
    document.getElementById('detailDistance').textContent = currentCaterer.distance;
    document.getElementById('detailImage').textContent = currentCaterer.emoji;
    document.getElementById('detailRating').textContent = currentCaterer.rating + ' ⭐';
    document.getElementById('footerPrice').textContent = '₹' + currentCaterer.price + '/plate';
    
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('detail-page').classList.add('active');
    window.scrollTo(0, 0);
}

// Go back to home
function goHome() {
    document.getElementById('home-page').classList.add('active');
    document.getElementById('detail-page').classList.remove('active');
    window.scrollTo(0, 0);
}

// Switch tabs
function switchTab(e, tabName) {
    e.preventDefault();
    const target = e.target;
    
    // Remove active from all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // Add active to clicked tab and corresponding content
    target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Open modal
function openModal(name) {
    document.getElementById(name + '-modal').classList.add('active');
}

// Close modal
function closeModal(name) {
    document.getElementById(name + '-modal').classList.remove('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    renderCaterers(caterers);
    
    // Radius slider
    const radiusSlider = document.getElementById('radiusSlider');
    if (radiusSlider) {
        radiusSlider.addEventListener('input', updateRadius);
    }
    
    // Search input
    const searchInput = document.getElementById('searchCaterer');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterCaterers);
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you soon.');
            contactForm.reset();
            closeModal('contact');
        });
    }
    
    // Modal backdrop click to close
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id.split('-')[0];
            closeModal(modalId);
        }
    });
});

// Prevent default form submission
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contactForm') {
        e.preventDefault();
    }
});
