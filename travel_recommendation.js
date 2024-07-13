function sendContact() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        resetForm();
        alert('Thank you for contacting us!');
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

function performSearch() {
    const keywordCategories = {
        beach: ['beach', 'beaches', 'coast', 'shore', 'seaside'],
        temple: ['temple', 'temples', 'shrine', 'sanctuary'],
        country: ['country', 'countries', 'nation', 'state', 'city', 'cities']
    };

    const input = document.getElementById('search').value.toLowerCase().trim();
    const apiUrl = `travel_recommendation_api.json`;
    const resultsContainer = document.getElementById('results');
    let results = [];

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Check each category
        if (keywordCategories.beach.some(keyword => input.includes(keyword))) {
            results = results.concat(data.beaches);
        }
        if (keywordCategories.temple.some(keyword => input.includes(keyword))) {
            results = results.concat(data.temples);
        }
        if (keywordCategories.country.some(keyword => input.includes(keyword))) {
            results = results.concat(data.country);
        }
        
        // Display results
        if (results.length > 0) {
            resultsContainer.innerHTML = '<h3>Search Results:</h3>';
            results.forEach(result => {
                resultsContainer.innerHTML += `
                    <div class="search-result">
                        <img src="images/${result.imageUrl}" alt="${result.name}">
                        <p id="name">${result.name}</p>
                        <p id="desc">${result.description}</p>
                    </div>
                `;
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found. Try a different keyword.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = `<p>Failed to fetch data. Please try again.</p>`;
    });
}

function clearResult() {
    document.getElementById('search').value = '';
    const resultsContainer = document.getElementById('results').innerHTML = '';
}

// Add event listener to the search button
document.getElementById('searchBtn').addEventListener('click', performSearch);
// Add event listener to the clear button
document.getElementById('clearBtn').addEventListener('click', clearResult);