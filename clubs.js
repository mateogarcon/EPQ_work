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

        tbody.appendChild(row);
    });
}

// Extract club_id from URL and display club details
const urlParams = new URLSearchParams(window.location.search);
const clubId = parseInt(urlParams.get('club_id'), 10);
displayClubDetails(clubId);