// Star Wars API endpoint for a specific film (Film 1 is 'A New Hope')
const SWAPI_URL = 'https://swapi.dev/api/films/1/';

fetch(SWAPI_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // REQUIRED STEP: Log the data to the console to confirm the fetch is working.
        console.log('SWAPI Data Received (Film 1 - A New Hope):', data); 
    })
    .catch(error => {
        console.error('Fetch Error:', error);
    });