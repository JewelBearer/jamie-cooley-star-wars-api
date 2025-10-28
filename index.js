const FILM_URL = 'https://swapi.dev/api/films/1/';
// --- CHANGE 1: Use a base URL for characters ---
const CHARACTER_BASE_URL = 'https://swapi.dev/api/people/';

// --- CHANGE 2: Select both new buttons ---
const lukeButton = document.getElementById('fetch-luke-btn');
const vaderButton = document.getElementById('fetch-vader-btn');

// --- Utility Function to Handle API Calls with Error Handling ---
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return { error: 'Failed to load data.' };
    }
}

// --- Data Point 1: Film Data (A New Hope) ---
async function fetchFilmData() {
    // This function doesn't need to change
    const filmData = await fetchData(FILM_URL);
    const titleEl = document.getElementById('film-title');
    const releaseEl = document.getElementById('release-date');
    const crawlEl = document.getElementById('opening-crawl');
    const directorProducerEl = document.getElementById('director-producer');

    if (filmData.error) {
        titleEl.textContent = 'Error loading film data.';
        releaseEl.textContent = '';
        crawlEl.textContent = filmData.error;
        directorProducerEl.textContent = '';
        return;
    }

    titleEl.textContent = filmData.title;
    releaseEl.textContent = `Release Date: ${filmData.release_date}`;
    crawlEl.textContent = filmData.opening_crawl;
    directorProducerEl.textContent = `Director: ${filmData.director} | Producer: ${filmData.producer}`;
}

// --- Data Point 2: Character Data ---
// --- CHANGE 3: Modify function to accept a character ID ---
async function fetchCharacterData(characterId) {
    // Disable both buttons while loading
    lukeButton.disabled = true;
    vaderButton.disabled = true;
    lukeButton.textContent = 'Loading...';
    vaderButton.textContent = 'Loading...';
    
    document.getElementById('additional-data-card').classList.add('hidden');

    // --- CHANGE 4: Build the URL using the base URL and the passed-in ID ---
    const characterData = await fetchData(`${CHARACTER_BASE_URL}${characterId}/`);
    
    const dataContainer = document.getElementById('character-data');
    const card = document.getElementById('additional-data-card');

    // Re-enable buttons and restore text
    lukeButton.disabled = false;
    vaderButton.disabled = false;
    lukeButton.textContent = 'Fetch Luke Skywalker';
    vaderButton.textContent = 'Fetch Darth Vader';
    
    card.classList.remove('hidden'); // Show the card

    if (characterData.error) {
        dataContainer.innerHTML = `<p class="text-red-400">${characterData.error}</p>`;
        return;
    }

    // Displaying a few key details for the second data point
    dataContainer.innerHTML = `
        <p><strong class="text-green-300">Name:</strong> ${characterData.name}</p>
        <p><strong class="text-green-300">Height:</strong> ${characterData.height} cm</p>
        <p><strong class="text-green-300">Mass:</strong> ${characterData.mass} kg</p>
        <p><strong class="text-green-300">Hair Color:</strong> ${characterData.hair_color}</p>
        <p><strong class="text-green-300">Homeworld URL:</strong> <a href="${characterData.homeworld}" target="_blank" class="underline text-blue-400">${characterData.homeworld}</a></p>
    `;

    console.log('Character Data Received:', characterData);
}

// --- CHANGE 5: Add event listeners for BOTH buttons ---
// (Luke is ID 1 in SWAPI)
lukeButton.addEventListener('click', () => fetchCharacterData(1));
// (Vader is ID 4 in SWAPI)
vaderButton.addEventListener('click', () => fetchCharacterData(4));


// Initial fetch for the film data when the page loads
document.addEventListener('DOMContentLoaded', fetchFilmData);