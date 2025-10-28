const FILM_URL = 'https://swapi.dev/api/films/1/';
const CHARACTER_URL = 'https://swapi.dev/api/people/1/';
const fetchButton = document.getElementById('fetch-character-btn');

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
        // Return an error object that can be checked by the caller
        return { error: 'Failed to load data.' };
    }
}

// --- Data Point 1: Film Data (A New Hope) ---
async function fetchFilmData() {
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

    // REQUIRED STEP 1 & 2: Display Title and Release Date
    titleEl.textContent = filmData.title;
    releaseEl.textContent = `Release Date: ${filmData.release_date}`;

    // ACCOMPLISHING INSTRUCTION 1: DIGGING DEEPER (Opening Crawl, Director/Producer)
    crawlEl.textContent = filmData.opening_crawl;
    directorProducerEl.textContent = `Director: ${filmData.director} | Producer: ${filmData.producer}`;
}

// --- Data Point 2: Character Data (Luke Skywalker) ---
// ACCOMPLISHING INSTRUCTION 3: BUILDING SECOND FETCH/FUNCTIONALITY
async function fetchCharacterData() {
    // Disable button while loading
    fetchButton.disabled = true;
    fetchButton.textContent = 'Loading Character...';
    document.getElementById('additional-data-card').classList.add('hidden');

    const characterData = await fetchData(CHARACTER_URL);
    const dataContainer = document.getElementById('character-data');
    const card = document.getElementById('additional-data-card');

    // Re-enable button
    fetchButton.textContent = 'Fetch Luke Skywalker Details';
    fetchButton.disabled = false;
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

    console.log('Second Data Point (Character Data) Received:', characterData);
}

// Event Listener to trigger the second fetch (Instruction #3)
fetchButton.addEventListener('click', fetchCharacterData);

// Initial fetch for the film data when the page loads
document.addEventListener('DOMContentLoaded', fetchFilmData);