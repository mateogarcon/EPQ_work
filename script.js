

// Function to get club name by id
function getClubNameById(id) {
    const club = clubs_db.find(club => club.club_id === id);
    return club ? club.name : 'Unknown Club';
}

// Function to display games in the table
function displayGames(games) {
    const body = document.querySelector('#gamesTable body');
    body.innerHTML = '';

    games.slice(0, 10).forEach(game => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = game.date;
        row.appendChild(dateCell);

        const homeClubCell = document.createElement('td');
        const homeClubLink = document.createElement('a');
        homeClubLink.href = `clubs.html?club_id=${game.home_club_id}`;
        homeClubLink.textContent = getClubNameById(game.home_club_id);
        homeClubCell.appendChild(homeClubLink);
        row.appendChild(homeClubCell);

        const awayClubCell = document.createElement('td');
        const awayClubLink = document.createElement('a');
        awayClubLink.href = `clubs.html?club_id=${game.away_club_id}`;
        awayClubLink.textContent = getClubNameById(game.away_club_id);
        awayClubCell.appendChild(awayClubLink);
        row.appendChild(awayClubCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = `${game.home_club_goals} - ${game.away_club_goals}`;
        row.appendChild(scoreCell);

        const stadiumCell = document.createElement('td');
        stadiumCell.textContent = game.stadium;
        row.appendChild(stadiumCell);

        const competitionCell = document.createElement('td');
        competitionCell.textContent = game.competition_type;
        row.appendChild(competitionCell);

        body.appendChild(row);
    });
}

// Function to filter games by search input
function filterGames() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredGames = games_db.filter(game => {
        const homeClubName = getClubNameById(game.home_club_id).toLowerCase();
        const awayClubName = getClubNameById(game.away_club_id).toLowerCase();
        return homeClubName.includes(searchInput) || awayClubName.includes(searchInput);
    });

    displayGames(filteredGames);
}

// Display the initial list of games
displayGames(games_db.slice(0, 10));

// Add event listener to the search input
document.getElementById('search').addEventListener('input', filterGames);
