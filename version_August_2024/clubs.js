// Function to get club by id
function getClubById(id) {
    return clubs_db.find(club => club.club_id === id);
}

// Function to get players by club id
function getPlayersByClubId(id) {
    return players_db.filter(player => player.current_club_id === id);
}


// Function to display club details and players in the table
        function displayClubDetails(clubId) {
            const club = getClubById(clubId);
            const players = getPlayersByClubId(clubId);

            if (club) {
                document.getElementById('clubName').textContent = club.name;
            } else {
                document.getElementById('clubName').textContent = 'Unknown Club';
            }

            populateTable(players);
        }

    function populateTable(players) {
        const tbody = document.querySelector('#playersTable tbody');
        tbody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');

            const playerIdCell = document.createElement('td');
            playerIdCell.textContent = player.player_id;
            row.appendChild(playerIdCell);

            const playerNameCell = document.createElement('td');
            playerNameCell.textContent = `${player.first_name} ${player.last_name}`;
            row.appendChild(playerNameCell);

            const positionCell = document.createElement('td');
            positionCell.textContent = player.position;
            row.appendChild(positionCell);

            const dobCell = document.createElement('td');
            dobCell.textContent = player.date_of_birth;
            row.appendChild(dobCell);

            const cobCell = document.createElement('td');
            cobCell.textContent = player.country_of_birth;
            row.appendChild(cobCell);

            const marketValueCell = document.createElement('td');
            marketValueCell.textContent = player.market_value_in_eur;
            row.appendChild(marketValueCell);

            const HighestMarketValueCell = document.createElement('td');
            HighestMarketValueCell.textContent = player.highest_market_value_in_eur;
            row.appendChild(HighestMarketValueCell);

            tbody.appendChild(row);
        });
    }

function applyFilters() {
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            const position = document.getElementById('position').value.toLowerCase();
            let dob = document.getElementById('dob').value;

            if (dob !==''){
                dob = convertDateFormat(dob);
            }

            const players = getPlayersByClubId(clubId);
            console.log(players);
            console.log(minPrice);

            console.log(maxPrice);
            console.log(position);
            console.log(dob);
            const filteredPlayers = players.filter(player => {
                const playerMarketValue = player.market_value_in_eur;
                const playerPosition = player.position.toLowerCase();
                const playerDob = player.date_of_birth;

                return playerMarketValue >= minPrice &&
                    playerMarketValue <= maxPrice &&
                    (position === '' || playerPosition.includes(position)) &&
                    (dob === '' || playerDob === dob);
            });
            console.log(filteredPlayers);
            populateTable(filteredPlayers);
}

function convertDateFormat(dateStr) {

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateStr)) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD.');
    }


    const [year, month, day] = dateStr.split('-');


    return `${day}/${month}/${year}`;
}

// Extract club_id from URL and display club details
const urlParams = new URLSearchParams(window.location.search);
const clubId = parseInt(urlParams.get('club_id'), 10);
displayClubDetails(clubId);