// ==UserScript==
// @name         qobuz-lib-check.js
// @description  Check if an artist from Qobuz is in your local library with async handling.
// @version      1.0.1
// @namespace    https://github.com/rkeaves
// @downloadURL  https://github.com/rkeaves/qobuz-lib-check/raw/main/qobuz-lib-check.js
// @updateURL    https://github.com/rkeaves/qobuz-lib-check/raw/main/qobuz-lib-check.js
// @license      GPL-3.0-or-later
// @match        https://play.qobuz.com/*
// @grant        GM_xmlhttpRequest
// @author       rkeaves
// ==/UserScript==

(function() {
    'use strict';

    const localLibraryFile = 'https://tornadost.github.io/assets/music.txt';
    let libraryData = {};
    let checkButton;
    let inputField;
    let refreshButton;
    let copyUrlButton;

    function fetchLibraryData() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: localLibraryFile,
            onload: function(response) {
                if (response.status === 200) {
                    libraryData = parseLibraryData(response.responseText);
                    console.log("Library data loaded:", libraryData);
                    checkButton.disabled = false;
                    checkButton.textContent = 'Check Artist';
                } else {
                    console.error("Failed to load library data.");
                    checkButton.textContent = 'Error Loading Data';
                }
            },
            onerror: function() {
                console.error("Error fetching library data.");
                checkButton.textContent = 'Connection Error';
            }
        });
    }

    function parseLibraryData(data) {
        const artistData = {};
        const lines = data.split('\n');

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            // Normalize artist names by removing accents
            const normalizedLine = normalizeString(line.toLowerCase());
            artistData[normalizedLine] = true;
        });
        return artistData;
    }

    function normalizeString(str) {
        // Normalize the string to remove accents
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function checkArtistInLibrary(artistName) {
        if (!Object.keys(libraryData).length) {
            alert('Library data still loading...');
            return;
        }

        const normalized = normalizeString(artistName.trim());
        const matchedArtists = Object.keys(libraryData).filter(artist =>
            artist.includes(normalized)
        );

        if (matchedArtists.length > 0) {
            alert(`Artist(s) found in library: ${matchedArtists.join(', ')}`);
        } else {
            alert(`Artist not found in library.`);
        }
    }

    function createSearchInterface() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 5%;
            left: 87%;
            transform: translateX(-50%);
            padding: 20px;
            background: #121212;
            border-radius: 10px;
            z-index: 9999;
            box-shadow: 0 0 15px rgba(0,255,255,0.7);
            font-family: 'Courier New', Courier, monospace;
            color: #00ff00;
            font-size: 16px;
        `;

        inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter artist name...';
        inputField.style.cssText = `
            padding: 12px;
            font-size: 16px;
            width: 280px;
            border-radius: 8px;
            border: 2px solid #00ff00;
            background: #121212;
            color: #00ff00;
            margin-bottom: 15px;
            outline: none;
            transition: all 0.3s ease;
        `;
        inputField.addEventListener('focus', function() {
            this.style.borderColor = '#ff00ff';
        });
        inputField.addEventListener('blur', function() {
            this.style.borderColor = '#00ff00';
        });

        checkButton = document.createElement('button');
        checkButton.textContent = 'Loading Library...';
        checkButton.disabled = true;
        checkButton.style.cssText = `
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            background: linear-gradient(145deg, #ff00ff, #00ffff);
            border: none;
            border-radius: 8px;
            color: white;
            margin-right: 10px;
            box-shadow: 0 4px 6px rgba(0, 255, 255, 0.5);
            transition: all 0.3s ease;
        `;
        checkButton.addEventListener('click', () => {
            if (inputField.value) checkArtistInLibrary(inputField.value);
        });

        // Create Refresh button
        refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh Page';
        refreshButton.style.cssText = `
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            background: linear-gradient(145deg, #ff00ff, #00ffff);
            border: none;
            border-radius: 8px;
            color: white;
            margin-top: 10px;
            box-shadow: 0 4px 6px rgba(0, 255, 255, 0.5);
            transition: all 0.3s ease;
        `;
        refreshButton.addEventListener('click', () => {
            location.reload(); // Refresh the page
        });

        // Create Copy URL button
        copyUrlButton = document.createElement('button');
        copyUrlButton.textContent = 'Copy URL';
        copyUrlButton.style.cssText = `
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            background: linear-gradient(145deg, #ff00ff, #00ffff);
            border: none;
            border-radius: 8px;
            color: white;
            margin-top: 10px;
            box-shadow: 0 4px 6px rgba(0, 255, 255, 0.5);
            transition: all 0.3s ease;
        `;
        copyUrlButton.addEventListener('click', () => {
            const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl); // Just copy the URL
        });

        container.appendChild(inputField);
        container.appendChild(checkButton);
        container.appendChild(refreshButton);
        container.appendChild(copyUrlButton);
        document.body.appendChild(container);
    }

    function populateArtistFromPage() {
        const artistElement = document.querySelector('h1.header-page__name');

        if (artistElement && !inputField.value) {
            const artistName = artistElement.textContent.trim();
            console.log("Found artist on the page:", artistName);
            inputField.value = artistName;
        } else {
            console.log("Artist element not found or input already filled.");
        }
    }

    // Initialize
    createSearchInterface();
    fetchLibraryData();

    // Wait for the page content to load and then populate the input field
    const checkForArtist = setInterval(() => {
        populateArtistFromPage();
        if (inputField.value) {
            clearInterval(checkForArtist);
            console.log("Artist name set in the input field.");
        }
    }, 1000); // Checks every second

})();
