// Research Publications Search and Pagination
document.addEventListener('DOMContentLoaded', function () {
    // Configuration
    const itemsPerPage = 6;
    let currentPage = 1;
    let filteredItems = [];
    let searchIndex;

    // Initialize Lunr.js search index
    function initializeSearch() {
        searchIndex = lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('author', { boost: 5 });
            this.field('abstract');

            window.searchData.forEach(function (doc) {
                this.add(doc);
            }, this);
        });
    }

    // Get all publication items
    function getAllItems() {
        return Array.from(document.querySelectorAll('.publication-item'));
    }

    // Show/hide items based on current page
    function displayItems(items, page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Hide all items first
        getAllItems().forEach(item => {
            item.style.display = 'none';
        });

        // Show items for current page
        items.slice(startIndex, endIndex).forEach(item => {
            item.style.display = 'block';
        });

        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        if (items.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    // Generate pagination
    function generatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationContainer = document.getElementById('pagination');

        if (totalPages <= 1) {
            document.getElementById('pagination-container').style.display = 'none';
            return;
        }

        document.getElementById('pagination-container').style.display = 'block';
        paginationContainer.innerHTML = '';

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a href="#" class="page-link" aria-label="Previous"><i class="ti-angle-left"></i></a>`;
        prevLi.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayItems(filteredItems, currentPage);
                generatePagination(filteredItems.length);
            }
        });
        paginationContainer.appendChild(prevLi);

        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a href="#" class="page-link">${i}</a>`;
            li.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage = i;
                displayItems(filteredItems, currentPage);
                generatePagination(filteredItems.length);
            });
            paginationContainer.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a href="#" class="page-link" aria-label="Next"><i class="ti-angle-right"></i></a>`;
        nextLi.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayItems(filteredItems, currentPage);
                generatePagination(filteredItems.length);
            }
        });
        paginationContainer.appendChild(nextLi);
    }

    // Perform search
    function performSearch(query) {
        if (!query.trim()) {
            // Show all items if no search query
            filteredItems = getAllItems();
        } else {
            const results = searchIndex.search(query);
            const resultIds = results.map(result => parseInt(result.ref));

            // Filter DOM items based on search results
            filteredItems = getAllItems().filter((item, index) => {
                return resultIds.includes(index);
            });
        }

        currentPage = 1;
        displayItems(filteredItems, currentPage);
        generatePagination(filteredItems.length);
    }

    // Initialize the component
    function initialize() {
        initializeSearch();
        filteredItems = getAllItems();
        displayItems(filteredItems, currentPage);
        generatePagination(filteredItems.length);

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const clearBtn = document.getElementById('clear-search');

        searchBtn.addEventListener('click', function () {
            const query = searchInput.value;
            performSearch(query);
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                performSearch(query);
            }
        });

        clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            performSearch('');
        });

        // Real-time search (optional)
        searchInput.addEventListener('input', function () {
            const query = this.value;
            if (query.length >= 2 || query.length === 0) {
                performSearch(query);
            }
        });
    }

    // Start the application
    initialize();
});