let currentPage = 1;
const itemsPerPage = 10;
var filteredPlayers = players_db;

// Function to get club name by id
function getClubNameById(id) {
    const club = clubs_db.find(club => club.club_id === id);
    return club ? club.name : 'Unknown Club';
}


// Function to display games in the table
function displayPlayers(players, page = 1) {
    const tbody = document.querySelector('#playerTable tbody');
    tbody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const lastPage = Math.ceil(players.length / itemsPerPage);

    players.slice(start, end).forEach(player => {
        const row = document.createElement('tr');



        const playerIDCell = document.createElement('td');
        playerIDCell.textContent = player.player_id;
        row.appendChild(playerIDCell);

        const playerNameCell = document.createElement('td');
        playerNameCell.textContent = player.first_name+" "+player.last_name; //change if I add independent player page
        row.appendChild(playerNameCell);
        //const playerNameLink = document.createElement('a');
        //playerNameLink.href = `players.html?player_id=${player.player_id}`;
        //playerNameLink.textContent = player.first_name+" "+player.last_name;
        //playerNameCell.appendChild(playerNameLink);
        //row.appendChild(playerNameCell);

        const playerPositionCell = document.createElement('td');
        playerPositionCell.textContent = player.position;
        row.appendChild(playerPositionCell);

        const playerDOBCell = document.createElement('td');
        playerDOBCell.textContent = player.date_of_birth;
        row.appendChild(playerDOBCell);

        const playerCOBCell = document.createElement('td');
        playerCOBCell.textContent = player.country_of_birth;
        row.appendChild(playerCOBCell);

         const playercurrentMarketValCell = document.createElement('td');
         playercurrentMarketValCell.textContent = player.market_value_in_eur;
         row.appendChild(playercurrentMarketValCell);

         const playerhighestMarketValCell = document.createElement('td');
         playerhighestMarketValCell.textContent = player.highest_market_value_in_eur;
         row.appendChild(playerhighestMarketValCell);

            tbody.appendChild(row);
        });

        document.getElementById('pageNumber').textContent = page + "/"+lastPage;
    }


// Function to filter games by search input
function filterGames() {
    const searchInput = document.getElementById('search_club').value.toLowerCase();
    const searchInputDate = document.getElementById('search_date').value.toLowerCase();
    filteredGames = games_db.filter(game => {
        const gameDate = game.date;
        const homeClubName = getClubNameById(game.home_club_id).toLowerCase();
        const awayClubName = getClubNameById(game.away_club_id).toLowerCase();

        if (searchInput.length > 0 && searchInputDate.length > 0) {
                return (homeClubName.includes(searchInput) || awayClubName.includes(searchInput)) && gameDate.includes(searchInputDate);
        }

        if (searchInput.length == 0 && searchInputDate.length > 0) {
                return gameDate.includes(searchInputDate);
        }

        return homeClubName.includes(searchInput) || awayClubName.includes(searchInput);
    });

    currentPage = 1; // Reset to first page
    displayGames(filteredGames, currentPage);
}


// Event listeners for pagination
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPlayers(filteredPlayers, currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredPlayers.length) {
        currentPage++;
        displayPlayers(filteredPlayers, currentPage);
    }
});

function applyFilters() {
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            const position = document.getElementById('position').value.toLowerCase();
            let dob = document.getElementById('dob').value;

            if (minPrice == 0 && maxPrice == Infinity && position == '' && dob == '') filteredPlayers = players_db;


            if (dob !==''){
                dob = convertDateFormat(dob);
            }

            const players = filteredPlayers;
            const fPlayers = players.filter(player => {
                const playerMarketValue = player.market_value_in_eur;
                const playerPosition = player.position.toLowerCase();
                const playerDob = player.date_of_birth;

                return playerMarketValue >= minPrice &&
                    playerMarketValue <= maxPrice &&
                    (position === '' || playerPosition.includes(position)) &&
                    (dob === '' || playerDob === dob);
            });
            console.log(filteredPlayers);
            filteredPlayers = fPlayers;

            displayPlayers(fPlayers,currentPage);
}

function convertDateFormat(dateStr) {

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateStr)) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD.');
    }


    const [year, month, day] = dateStr.split('-');


    return `${day}/${month}/${year}`;
}

displayPlayers(players_db);


