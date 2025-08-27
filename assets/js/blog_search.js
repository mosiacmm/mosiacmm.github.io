

(function () {
    let searchIndex;
    let searchData;
    let searchResults = [];
    let isSearchActive = false;
    let originalContent;

    // Pagination variables
    let currentPage = 1;
    let itemsPerPage = 3; // Reduced for testing - should show pagination with fewer results
    let totalPages = 1;

    // Initialize search when DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOM loaded, initializing search...');
        initializeSearch();
        checkURLParams();
    });

    function initializeSearch() {
        // Load search data and build index
        fetch('/search.json')
            .then(response => response.json())
            .then(data => {
                console.log('Search data loaded:', data.length, 'items');
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
        console.log('Search index built successfully');
    }

    function bindSearchEvents() {
        const searchForm = document.querySelector('.search_widget form');
        const searchInput = document.querySelector('.search_widget input[type="text"]');
        const searchButton = document.querySelector('.search_widget .btns');
        const submitButton = document.querySelector('.search_widget button[type="submit"]');
        const blogContainer = document.querySelector('.blog_left_sidebar');

        console.log('Search elements found:', {
            form: !!searchForm,
            input: !!searchInput,
            button: !!searchButton,
            submit: !!submitButton,
            container: !!blogContainer
        });

        if (!searchForm || !searchInput || !blogContainer) return;

        // Store original content
        originalContent = blogContainer.innerHTML;
        console.log('Original content stored, length:', originalContent.length);

        // Prevent form submission and handle search
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            console.log('Form submitted with query:', query);
            performSearchWithURL(query);
        });

        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', function (e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                console.log('Search button clicked with query:', query);
                performSearchWithURL(query);
            });
        }

        // Search on submit button click
        if (submitButton) {
            submitButton.addEventListener('click', function (e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                console.log('Submit button clicked with query:', query);
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
                    console.log('Real-time search with query:', query);
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

    function performSearch(query, page = 1) {
        if (!query || query.length < 1) {
            clearSearch();
            return;
        }

        console.log('Performing search for:', query, 'page:', page);
        currentPage = page;

        try {
            const results = searchIndex.search(query);
            searchResults = results.map(result => {
                return searchData.find(post => post.id === result.ref);
            });

            console.log('Search results found:', searchResults.length);
            console.log('Items per page:', itemsPerPage);
            console.log('Should show pagination:', searchResults.length > itemsPerPage);

            displaySearchResults(searchResults, query, currentPage);
            isSearchActive = true;
        } catch (error) {
            console.error('Search error:', error);
            showNoResults(query);
        }
    }

    function performSearchWithURL(query, page = 1) {
        if (!query || query.length < 1) {
            clearSearchWithURL();
            return;
        }

        // Update URL with search parameter and page
        const url = new URL(window.location);
        url.searchParams.set('search', query);
        if (page > 1) {
            url.searchParams.set('page', page);
        } else {
            url.searchParams.delete('page');
        }

        // Push state for browser history
        window.history.pushState(
            { search: true, query: query, page: page },
            `Search: ${query}`,
            url.toString()
        );

        performSearch(query, page);
    }

    function displaySearchResults(results, query, page = 1) {
        const blogContainer = document.querySelector('.blog_left_sidebar');
        if (!blogContainer) {
            console.error('Blog container not found');
            return;
        }

        if (results.length === 0) {
            console.log('No results found, showing no results message');
            showNoResults(query);
            return;
        }

        // Calculate pagination
        totalPages = Math.ceil(results.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedResults = results.slice(startIndex, endIndex);

        console.log('Pagination calculation:', {
            totalResults: results.length,
            itemsPerPage: itemsPerPage,
            totalPages: totalPages,
            currentPage: page,
            startIndex: startIndex,
            endIndex: endIndex,
            paginatedResults: paginatedResults.length
        });

        let searchHTML = `
            <div class="search-results-header mb-4">
                <h4 style="color: #2d2d2d;">Search Results for "${query}" (${results.length} found) - Page ${page} of ${totalPages}</h4>
                <button class="btn btn-sm btn-outline-secondary clear-search">Clear Search</button>
            </div>
        `;

        // Display current page results
        paginatedResults.forEach(post => {
            searchHTML += `
<article class="blog_item">
                                            <a class="d-inline-block" href="${post.url}"><div class="blog_item_img">
                        ${post.image ? `<img class="card-img rounded-0" src="${post.image}" alt="${post.image_alt || ''}">` : ''}
                        <a href="${post.url}" class="blog_item_date">
                            <h3>${new Date(post.date).getDate()}</h3>
                            <p>${new Date(post.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                        </a>
                    </div>
                    </a>
                    <div class="blog_details">
                        <a class="d-inline-block" href="${post.url}">
                            <h2 class="blog-head" style="color: #2d2d2d;">${post.title}</h2>
                        </a>
                        <p>${post.description || post.excerpt || ''}</p>
                        <ul class="blog-info-link">
                            ${post.categories ? `<li><a href="#"><i class="fa fa-user"></i> ${post.categories}</a></li>` : ''}
                            ${post.comments && post.comments > 0 ? `<li><a href="#"><i class="fa fa-comments"></i> ${post.comments} Comments</a></li>` : ''}
                        </ul>
                    </div>
                </article>
            `;
        });
        // Add pagination if needed
        if (totalPages > 1) {
            console.log('Adding pagination to results');
            const paginationHTML = generateSearchPagination(query, page, totalPages);
            console.log('Generated pagination HTML length:', paginationHTML.length);
            searchHTML += paginationHTML;
        } else {
            console.log('Not adding pagination - only', totalPages, 'page(s)');
        }

        console.log('Setting search HTML, length:', searchHTML.length);
        blogContainer.innerHTML = searchHTML;

        // Bind events
        bindSearchResultEvents(query);

        // Verify pagination was added to DOM
        const paginationElement = blogContainer.querySelector('.blog-pagination');
        console.log('Pagination element in DOM:', !!paginationElement);
        if (paginationElement) {
            console.log('Pagination HTML in DOM:', paginationElement.outerHTML.substring(0, 200));
        }
    }

    // Replace the generateSearchPagination function with this version that doesn't use icons:

    function generateSearchPagination(query, currentPage, totalPages) {
        console.log('Generating pagination for:', { query, currentPage, totalPages });

        let paginationHTML = `
        <nav class="blog-pagination justify-content-center d-flex mt-4" style="display: flex !important;">
            <ul class="pagination" >
    `;

        // Previous button
        if (currentPage > 1) {
            paginationHTML += `
            <li class="page-item">
                <a href="#" class="page-link search-page-link" data-page="${currentPage - 1}" data-query="${encodeURIComponent(query)}" aria-label="Previous">
<i class="ti-angle-left"></i>
                </a>
            </li>
        `;
        } else {
            paginationHTML += `
            <li class="page-item disabled">
                <span class="page-link" aria-label="Previous" style="color: #ccc;">
<i class="ti-angle-left"></i>
                </span>
            </li>
        `;
        }

        // Page numbers - simplified for debugging
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += `
                <li class="page-item active">
                    <span class="page-link" >${i}</span>
                </li>
            `;
            } else {
                paginationHTML += `
                <li class="page-item">
                    <a href="#" class="page-link search-page-link" data-page="${i}" data-query="${encodeURIComponent(query)}" >${i}</a>
                </li>
            `;
            }
        }

        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `
            <li class="page-item">
                <a href="#" class="page-link search-page-link" data-page="${currentPage + 1}" data-query="${encodeURIComponent(query)}" aria-label="Next">
<i class="ti-angle-right"></i>
                </a>
            </li>
        `;
        } else {
            paginationHTML += `
            <li class="page-item disabled">
                <span class="page-link" aria-label="Next" style="color: #ccc;">

<i class="ti-angle-right"></i>
                </span>
            </li>
        `;
        }

        paginationHTML += `
            </ul>
        </nav>
        <div style="text-align: center; margin-top: 10px; color: #666;">
            Showing page ${currentPage} of ${totalPages}
        </div>
    `;

        console.log('Generated pagination HTML preview:', paginationHTML.substring(0, 300));
        return paginationHTML;
    }

    function bindSearchResultEvents(query) {
        const blogContainer = document.querySelector('.blog_left_sidebar');

        // Bind clear search event
        const clearButton = blogContainer.querySelector('.clear-search');
        if (clearButton) {
            clearButton.addEventListener('click', clearSearchWithURL);
            console.log('Clear button event bound');
        }

        // Bind pagination events
        const paginationLinks = blogContainer.querySelectorAll('.search-page-link');
        console.log('Found pagination links:', paginationLinks.length);

        paginationLinks.forEach((link, index) => {
            console.log('Binding event to pagination link', index, 'data:', {
                page: link.dataset.page,
                query: link.dataset.query
            });

            link.addEventListener('click', function (e) {
                e.preventDefault();
                const page = parseInt(this.dataset.page);
                const query = decodeURIComponent(this.dataset.query);
                console.log('Pagination link clicked:', { page, query });
                performSearchWithURL(query, page);

                // Smooth scroll to top of results
                const searchHeader = document.querySelector('.search-results-header');
                if (searchHeader) {
                    searchHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
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
        console.log('Clearing search');
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

        // Reset pagination variables
        currentPage = 1;
        totalPages = 1;
        isSearchActive = false;
        searchResults = [];
    }

    function clearSearchWithURL() {
        // Remove search parameter from URL
        const url = new URL(window.location);
        url.searchParams.delete('search');
        url.searchParams.delete('page');

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
        const pageParam = urlParams.get('page');
        const page = pageParam ? parseInt(pageParam) : 1;

        if (searchQuery) {
            console.log('URL contains search params:', { searchQuery, page });
            const searchInput = document.querySelector('.search_widget input[type="text"]');
            if (searchInput) {
                searchInput.value = searchQuery;
                // Wait for search index to be ready
                if (searchIndex) {
                    performSearch(searchQuery, page);
                } else {
                    // If search index isn't ready yet, wait for it
                    setTimeout(() => {
                        if (searchIndex) {
                            performSearch(searchQuery, page);
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
        console.log('Re-binding original pagination events for', paginationLinks.length, 'links');
        // Add any specific pagination event handlers here if needed
    }

    // Expose functions globally if needed
    window.blogSearch = {
        performSearch: performSearch,
        performSearchWithURL: performSearchWithURL,
        clearSearch: clearSearch,
        clearSearchWithURL: clearSearchWithURL,
        isSearchActive: () => isSearchActive,
        setItemsPerPage: (items) => {
            itemsPerPage = items;
            console.log('Items per page set to:', items);
        },
        // Debug functions
        getSearchResults: () => searchResults,
        getCurrentPage: () => currentPage,
        getTotalPages: () => totalPages,
        getItemsPerPage: () => itemsPerPage
    };

    console.log('Blog search initialized');
})();

window.blogSearch.setItemsPerPage(3);