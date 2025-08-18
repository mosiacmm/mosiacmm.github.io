(function () {
    let searchIndex;
    let searchData;
    let searchResults = [];
    let isSearchActive = false;
    let originalContent;

    // Initialize search when DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        initializeSearch();
        checkURLParams();
    });

    function initializeSearch() {
        // Load search data and build index
        fetch('/search.json')
            .then(response => response.json())
            .then(data => {
                searchData = data;
                buildSearchIndex();
                bindSearchEvents();
            })
            .catch(error => {
                console.error('Error loading search data:', error);
            });
    }

    function buildSearchIndex() {
        searchIndex = lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('content');
            this.field('excerpt', { boost: 5 });
            this.field('categories', { boost: 3 });
            this.field('tags', { boost: 3 });

            searchData.forEach(function (post) {
                this.add(post);
            }, this);
        });
    }

    function bindSearchEvents() {
        const searchForm = document.querySelector('.search_widget form');
        const searchInput = document.querySelector('.search_widget input[type="text"]');
        const searchButton = document.querySelector('.search_widget .btns');
        const submitButton = document.querySelector('.search_widget button[type="submit"]');
        const blogContainer = document.querySelector('.blog_left_sidebar');

        if (!searchForm || !searchInput || !blogContainer) return;

        // Store original content
        originalContent = blogContainer.innerHTML;

        // Prevent form submission and handle search
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            performSearchWithURL(query);
        });

        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', function (e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                performSearchWithURL(query);
            });
        }

        // Search on submit button click
        if (submitButton) {
            submitButton.addEventListener('click', function (e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                performSearchWithURL(query);
            });
        }

        // Real-time search on input (optional - with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.trim();
                if (query.length === 0) {
                    clearSearchWithURL();
                } else if (query.length >= 2) {
                    performSearchWithURL(query);
                }
            }, 300);
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function (event) {
            if (event.state && event.state.search) {
                const searchInput = document.querySelector('.search_widget input[type="text"]');
                if (searchInput) {
                    searchInput.value = event.state.query || '';
                }
                performSearch(event.state.query || '');
            } else {
                clearSearch();
            }
        });
    }

    function performSearch(query) {
        if (!query || query.length < 1) {
            clearSearch();
            return;
        }

        try {
            const results = searchIndex.search(query);
            searchResults = results.map(result => {
                return searchData.find(post => post.id === result.ref);
            });

            displaySearchResults(searchResults, query);
            isSearchActive = true;
        } catch (error) {
            console.error('Search error:', error);
            showNoResults(query);
        }
    }

    function performSearchWithURL(query) {
        if (!query || query.length < 1) {
            clearSearchWithURL();
            return;
        }

        // Update URL with search parameter
        const url = new URL(window.location);
        url.searchParams.set('search', query);

        // Push state for browser history
        window.history.pushState(
            { search: true, query: query },
            `Search: ${query}`,
            url.toString()
        );

        performSearch(query);
    }

    function displaySearchResults(results, query) {
        const blogContainer = document.querySelector('.blog_left_sidebar');
        if (!blogContainer) return;

        if (results.length === 0) {
            showNoResults(query);
            return;
        }

        let searchHTML = `
            <div class="search-results-header mb-4">
                <h4 style="color: #2d2d2d;">Search Results for "${query}" (${results.length} found)</h4>
                <button class="btn btn-sm btn-outline-secondary clear-search">Clear Search</button>
            </div>
        `;

        results.forEach(post => {
            searchHTML += `
                <article class="blog_item">
                    <div class="blog_item_img">
                        ${post.image ? `<img class="card-img rounded-0" src="${post.image}" alt="${post.image_alt}">` : ''}
                        <a href="#" class="blog_item_date">
                            <h3>${new Date(post.date).getDate()}</h3>
                            <p>${new Date(post.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                        </a>
                    </div>
                    <div class="blog_details">
                        <a class="d-inline-block" href="${post.url}">
                            <h2 class="blog-head" style="color: #2d2d2d;">${post.title}</h2>
                        </a>
                        <p>${post.excerpt}</p>
                        <ul class="blog-info-link">
                            ${post.categories ? `<li><a href="#"><i class="fa fa-user"></i> ${post.categories}</a></li>` : ''}
                            ${post.comments && post.comments > 0 ? `<li><a href="#"><i class="fa fa-comments"></i> ${post.comments} Comments</a></li>` : ''}
                        </ul>
                    </div>
                </article>
            `;
        });

        blogContainer.innerHTML = searchHTML;

        // Bind clear search event
        const clearButton = blogContainer.querySelector('.clear-search');
        if (clearButton) {
            clearButton.addEventListener('click', clearSearchWithURL);
        }
    }

    function showNoResults(query) {
        const blogContainer = document.querySelector('.blog_left_sidebar');
        if (!blogContainer) return;

        const noResultsHTML = `
            <div class="search-results-header mb-4">
                <h4 style="color: #2d2d2d;">No results found for "${query}"</h4>
                <button class="btn btn-sm btn-outline-secondary clear-search">Clear Search</button>
            </div>
            <div class="no-results text-center py-5">
                <i class="fa fa-search fa-3x text-muted mb-3"></i>
                <p class="text-muted">Try different keywords or check your spelling.</p>
            </div>
        `;

        blogContainer.innerHTML = noResultsHTML;

        // Bind clear search event
        const clearButton = blogContainer.querySelector('.clear-search');
        if (clearButton) {
            clearButton.addEventListener('click', clearSearchWithURL);
        }

        isSearchActive = true;
    }

    function clearSearch() {
        const blogContainer = document.querySelector('.blog_left_sidebar');
        const searchInput = document.querySelector('.search_widget input[type="text"]');

        if (blogContainer && originalContent) {
            blogContainer.innerHTML = originalContent;
            // Re-bind any pagination events if needed
            bindPaginationEvents();
        }

        if (searchInput) {
            searchInput.value = '';
        }

        isSearchActive = false;
        searchResults = [];
    }

    function clearSearchWithURL() {
        // Remove search parameter from URL
        const url = new URL(window.location);
        url.searchParams.delete('search');

        // Update URL without search parameter
        window.history.pushState(
            { search: false },
            document.title,
            url.toString()
        );

        clearSearch();
    }

    function checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');

        if (searchQuery) {
            const searchInput = document.querySelector('.search_widget input[type="text"]');
            if (searchInput) {
                searchInput.value = searchQuery;
                // Wait for search index to be ready
                if (searchIndex) {
                    performSearch(searchQuery);
                } else {
                    // If search index isn't ready yet, wait for it
                    setTimeout(() => {
                        if (searchIndex) {
                            performSearch(searchQuery);
                        }
                    }, 500);
                }
            }
        }
    }

    function bindPaginationEvents() {
        // Re-bind pagination events after restoring original content
        // This ensures pagination works after clearing search
        const paginationLinks = document.querySelectorAll('.blog-pagination a');
        // Add any specific pagination event handlers here if needed
    }

    // Expose functions globally if needed
    window.blogSearch = {
        performSearch: performSearch,
        performSearchWithURL: performSearchWithURL,
        clearSearch: clearSearch,
        clearSearchWithURL: clearSearchWithURL,
        isSearchActive: () => isSearchActive
    };
})();