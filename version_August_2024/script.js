let currentPage = 1;
const itemsPerPage = 10;
let filteredGames = games_db;

// Function to get club name by id
function getClubNameById(id) {
    const club = clubs_db.find(club => club.club_id === id);
    return club ? club.name : 'Unknown Club';
}


// Function to display games in the table
function displayGames(games, page = 1) {
    const tbody = document.querySelector('#gamesTable tbody');
    tbody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const lastPage = Math.ceil(games.length / itemsPerPage);

    games.slice(start, end).forEach(game => {
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
        displayGames(filteredGames, currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredGames.length) {
        currentPage++;
        displayGames(filteredGames, currentPage);
    }
});

// Display the initial list of games
displayGames(filteredGames, currentPage);

// Add event listener to the search input
document.getElementById('search_club').addEventListener('input', filterGames);

document.getElementById('search_date').addEventListener('input', filterGames);



const suggestions = [
    "Real Zaragoza",
    "Beerschot AC",
    "Reading FC",
    "Wigan Athletic",
    "Siena FC",
    "SC Beira-Mar",
    "Orduspor",
    "Spartak Vladikavkaz (-2020)",
    "Eintracht Braunschweig",
    "FC Sochaux-Montbéliard",
    "US Livorno 1915",
    "RAEC Mons (- 2015)",
    "Valenciennes FC",
    "Catania FC",
    "SK Tavriya Simferopol ( - 2022)",
    "Elazigspor",
    "SC Olhanense",
    "Volga Nizhniy Novgorod (- 2016)",
    "FK Sevastopol (- 2014)",
    "Lierse SK (- 2018)",
    "Córdoba CF",
    "Queens Park Rangers",
    "Cesena FC",
    "FC Dordrecht",
    "Metalurg Donetsk (- 2015)",
    "FC Penafiel",
    "GS Ergotelis",
    "Niki Volou",
    "Kayseri Erciyesspor",
    "Thonon Évian Grand Genève FC",
    "FC Vestsjaelland",
    "Balikesirspor",
    "Eskisehirspor",
    "CF União Madeira (-2021)",
    "Kuban Krasnodar (-2018)",
    "Académica Coimbra",
    "Mersin Talimyurdu SK",
    "GFC Ajaccio",
    "AC Carpi",
    "Metalist Kharkiv (- 2016)",
    "Metalurg Zaporizhya (-2016)",
    "Goverla Uzhgorod (- 2016)",
    "Panthrakikos Komotini",
    "Mordovia Saransk (-2020)",
    "AEL Kalloni",
    "Adanaspor",
    "Iraklis Thessaloniki",
    "Sunderland AFC",
    "Dnipro Dnipropetrovsk (-2020)",
    "Palermo FC",
    "Gaziantepspor (- 2020)",
    "SC Bastia",
    "Middlesbrough FC",
    "AS Nancy-Lorraine",
    "Veria NPS",
    "Sporting Gijón",
    "Inverness Caledonian Thistle FC",
    "Delfino Pescara 1936",
    "Hull City",
    "Tom Tomsk",
    "Volyn Lutsk",
    "FC Ingolstadt 04",
    "Hamburger SV",
    "Roda JC Kerkrade",
    "Stoke City",
    "Deportivo de La Coruña",
    "Málaga CF",
    "Kardemir Karabükspor",
    "Swansea City",
    "Partick Thistle FC",
    "Ankaraspor",
    "SKA Khabarovsk",
    "Amkar Perm",
    "AOK Kerkyra",
    "Zirka Kropyvnytskyi",
    "PFK Stal Kamyanske (-2018)",
    "AO Platanias",
    "FC Helsingør",
    "FC Tosno (-2018)",
    "CF Os Belenenses",
    "1.FC Nuremberg",
    "Bursaspor",
    "Hannover 96",
    "NAC Breda",
    "KSC Lokeren (- 2020)",
    "Cardiff City",
    "De Graafschap Doetinchem",
    "EA Guingamp",
    "Chievo Verona",
    "Huddersfield Town",
    "SM Caen",
    "Anzhi Makhachkala ( -2022)",
    "CD Feirense",
    "Enisey Krasnoyarsk",
    "Arsenal Kyiv",
    "Vendsyssel FF",
    "Akhisarspor",
    "Brescia Calcio",
    "Fortuna Düsseldorf",
    "SC Paderborn 07",
    "AO Xanthi",
    "Panionios Athens",
    "Vitória Setúbal FC",
    "CD Leganés",
    "Amiens SC",
    "Karpaty Lviv (-2021)",
    "SPAL",
    "Desportivo Aves (- 2020)",
    "Esbjerg fB",
    "Hobro IK",
    "Parma Calcio 1913",
    "Genclerbirligi Ankara",
    "Denizlispor",
    "CD Nacional",
    "West Bromwich Albion",
    "Nîmes Olympique",
    "ADO Den Haag",
    "VVV-Venlo",
    "SD Eibar",
    "Dijon FCO",
    "Hamilton Academical FC",
    "Rotor Volgograd",
    "FC Crotone",
    "Benevento Calcio",
    "AE Larisa",
    "SD Huesca",
    "Olimpik Donetsk",
    "SK Beveren",
    "Royal Excel Mouscron (-2022)",
    "Erzurumspor FK",
    "PFK Tambov (-2021)",
    "Arminia Bielefeld",
    "FC Girondins Bordeaux",
    "SpVgg Greuther Fürth",
    "Willem II Tilburg",
    "Apollon Smyrnis",
    "Venezia FC",
    "AS Saint-Étienne",
    "Watford FC",
    "Norwich City",
    "Göztepe",
    "Altay SK",
    "B SAD",
    "Levante UD",
    "Arsenal Tula",
    "SønderjyskE",
    "FK Mariupol",
    "CD Tondela",
    "Desna Chernigiv",
    "Yeni Malatyaspor",
    "FK Ufa",
    "Beerschot V.A.",
    "FC Schalke 04",
    "Hertha BSC",
    "SC Cambuur Leeuwarden",
    "Southampton FC",
    "FC Groningen",
    "AJ Auxerre",
    "Real Valladolid CF",
    "Leeds United",
    "Ionikos Nikeas",
    "RCD Espanyol Barcelona",
    "Leicester City",
    "UC Sampdoria",
    "Aalborg BK",
    "ESTAC Troyes",
    "AC Ajaccio",
    "Torpedo Moscow",
    "FC Emmen",
    "CS Marítimo",
    "Angers SCO",
    "Dundee United FC",
    "Elche CF",
    "US Cremonese",
    "AC Horsens",
    "CD Santa Clara",
    "APO Levadiakos",
    "RFC Seraing",
    "KV Oostende",
    "FC Paços de Ferreira",
    "SV Zulte Waregem",
    "Spezia Calcio",
    "FK Khimki",
    "Giresunspor",
    "PFK Lviv",
    "Ümraniyespor",
    "Ingulets Petrove",
    "Metalist Kharkiv",
    "1. Fußball-Club Köln",
    "Associazione Calcio Milan",
    "Arsenal Football Club",
    "Associazione Sportiva Roma",
    "Club Atlético de Madrid S.A.D.",
    "Bayer 04 Leverkusen Fußball",
    "Borussia Dortmund",
    "Borussia Verein für Leibesübungen 1900 Mönchengladbach",
    "Eintracht Frankfurt Fußball AG",
    "FC Bayern München",
    "Everton Football Club",
    "Liverpool Football Club",
    "Fenerbahçe Spor Kulübü",
    "1. Fußball- und Sportverein Mainz 05",
    "Heart of Midlothian Football Club",
    "Football Club Internazionale Milano S.p.A.",
    "Royal Sporting Club Anderlecht",
    "Sport-Club Freiburg",
    "Verein für Bewegungsspiele Stuttgart 1893",
    "Verein für Leibesübungen Bochum 1848 – Fußballgemeinschaft",
    "Verein für Leibesübungen Wolfsburg",
    "Sportverein Werder Bremen von 1899",
    "1. FC Union Berlin",
    "Sportverein Darmstadt 1898 e. V.",
    "Beşiktaş Jimnastik Kulübü",
    "FK Dinamo Moskva",
    "Rangers Football Club",
    "Çaykur Rizespor Kulübü",
    "Futbol Club Barcelona",
    "Galatasaray Spor Kulübü",
    "Tottenham Hotspur Football Club",
    "Real Betis Balompié S.A.D.",
    "Samsunspor",
    "Koninklijke Atletiek Associatie Gent",
    "Association sportive de Monaco Football Club",
    "FC Augsburg 1907",
    "Royal Charleroi Sporting Club",
    "Odense Boldklub",
    "Football Club København",
    "Football Club Utrecht",
    "Brøndby Idrætsforening",
    "FK Spartak Moskva",
    "Feyenoord Rotterdam",
    "Rooms Katholieke Combinatie Waalwijk",
    "Real Club Deportivo Mallorca S.A.D.",
    "Olympique de Marseille",
    "Genoa Cricket and Football Club",
    "Panathinaikos Athlitikos Omilos",
    "Stade Rennais Football Club",
    "Verona Hellas Football Club",
    "Manchester City Football Club",
    "Sport Lisboa e Benfica",
    "Sportclub Heerenveen",
    "Football Club Twente",
    "Club Atlético Osasuna",
    "Sporting Clube de Portugal",
    "Futbolniy Klub Dynamo Kyiv",
    "Football Club de Metz",
    "Sheffield United Football Club",
    "Yellow-Red Koninklijke Voetbalclub Mechelen",
    "Rayo Vallecano de Madrid S.A.D.",
    "Sevilla Fútbol Club S.A.D.",
    "Lyngby Boldklubben af 1921",
    "Aberdeen Football Club",
    "The Celtic Football Club",
    "West Ham United Football Club",
    "U.S. Salernitana 1919 S.r.l.",
    "Eindhovense Voetbalvereniging Philips Sport Vereniging",
    "Fortuna Sittardia Combinatie",
    "Società Sportiva Lazio S.p.A.",
    "Aston Villa Football Club",
    "Udinese Calcio",
    "Toulouse Football Club",
    "Torino Calcio",
    "Olympique Gymnaste Club Nice Côte d'Azur",
    "Real Madrid Club de Fútbol",
    "Associazione Calcio Fiorentina",
    "Vejle Boldklub",
    "Trabzonspor Kulübü",
    "Saint Mirren Football Club",
    "Nijmegen Eendracht Combinatie",
    "Sparta Rotterdam",
    "Unión Deportiva Las Palmas S.A.D.",
    "Koninklijke Sint-Truidense Voetbalvereniging",
    "Stichting Betaald Voetbal Vitesse Arnhem",
    "Juventus Football Club",
    "Dundee Football Club",
    "Cercle Brugge Koninklijke Sportvereniging",
    "TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH",
    "Wolverhampton Wanderers Football Club",
    "Paris Saint-Germain Football Club",
    "Antalyaspor",
    "Koninklijke Voetbalclub Kortrijk",
    "Aris Thessalonikis",
    "AFC Ajax Amsterdam",
    "Athletic Club Bilbao",
    "Chelsea Football Club",
    "Omilos Filathlon Irakliou FC",
    "FC Shakhtar Donetsk",
    "Racing Club de Strasbourg Alsace",
    "Aarhus Gymnastik Forening",
    "Real Sociedad de Fútbol S.A.D.",
    "Olympiakos Syndesmos Filathlon Peiraios",
    "Nottingham Forest Football Club",
    "Futebol Clube do Porto",
    "Almere City Football Club",
    "Football Club Volendam",
    "Le Havre Athletic Club",
    "Empoli Football Club S.r.l.",
    "Newcastle United Football Club",
    "Excelsior Rotterdam",
    "Atalanta Bergamasca Calcio S.p.a.",
    "Racing Club de Lens",
    "Fodbold Club Midtjylland",
    "Makina ve Kimya Endüstrisi Ankaragücü Spor Kulübü",
    "Crystal Palace Football Club",
    "Hibernian Football Club",
    "İstanbulspor A.Ş.",
    "Fulham Football Club",
    "Футбольный клуб 'Локомотив' Москва",
    "Real Club Celta de Vigo S. A. D.",
    "AO FK Zenit Sankt-Peterburg",
    "Koninklijke Voetbal Club Westerlo",
    "Montpellier Hérault Sport Club",
    "Moreirense Futebol Clube",
    "Manchester United Football Club",
    "Motherwell Football Club",
    "Association Football Club Bournemouth",
    "Football Club de Nantes",
    "Unione Sportiva Lecce",
    "Bologna Football Club 1909",
    "Luton Town Football Club",
    "Olympique Lyonnais",
    "Valencia Club de Fútbol S. A. D.",
    "Villarreal Club de Fútbol S.A.D.",
    "Viborg Fodsports Forening",
    "Sporting Clube de Braga",
    "Lille Olympique Sporting Club Lille Métropole",
    "FK Rostov",
    "Alkmaar Zaanstreek",
    "Panthessalonikios Athlitikos Omilos Konstantinoupoliton",
    "Royal Antwerp Football Club",
    "Deportivo Alavés S.A.D.",
    "FK Fakel Voronezh",
    "Burnley Football Club",
    "Brentford Football Club",
    "Football Club Lorient-Bretagne Sud",
    "Silkeborg Idrætsforening",
    "Koninklijke Racing Club Genk",
    "Brighton and Hove Albion Football Club",
    "Livingston Football Club",
    "Königliche Allgemeine Sportvereinigung Eupen",
    "Prins Hendrik Ende Desespereert Nimmer Combinatie Zwolle",
    "Heracles Almelo",
    "Cagliari Calcio",
    "Stade de Reims",
    "Go Ahead Eagles",
    "Grupo Desportivo Estoril Praia",
    "Hvidovre Idrætsforening",
    "1. Fußballclub Heidenheim 1846",
    "Club Brugge Koninklijke Voetbalvereniging",
    "Konyaspor",
    "Sivasspor Kulübü",
    "PFK CSKA Moskva",
    "Vitória Sport Clube",
    "Gil Vicente Futebol Clube",
    "Rio Ave Futebol Clube",
    "Club Football Estrela da Amadora",
    "Athlitiki Enosi Konstantinoupoleos",
    "Boavista Futebol Clube",
    "Kilmarnock Football Club",
    "Saint Johnstone Football Club",
    "Panipirotikos Athlitikos Syllogos Giannina",
    "Cádiz Club de Fútbol S.A.D",
    "PFK Krylya Sovetov Samara",
    "FC Rubin Kazan",
    "Oud-Heverlee Leuven",
    "Vorskla Poltava",
    "FK Baltika",
    "Ross County Football Club",
    "Fodbold Club Nordsjælland",
    "Gaziantep Futbol Kulübü A.Ş.",
    "Associazione Calcio Monza",
    "Royal Standard Club de Liège",
    "APS Atromitos Athinon",
    "Kayserispor Kulübü",
    "Pendikspor",
    "Casa Pia Atlético Clube",
    "Unión Deportiva Almería S.A.D.",
    "Grupo Desportivo de Chaves",
    "Futebol Clube de Famalicão",
    "Panserraikos Serres",
    "Clermont Foot 63",
    "FK Kryvbas Kryvyi Rig",
    "Getafe Club de Fútbol S.A.D. Team Dubai",
    "RFK Akhmat Grozny",
    "Adana Demirspor Kulübü",
    "Stade brestois 29",
    "Royale Union Saint-Gilloise",
    "PAS Lamia 1964",
    "Sporting Clube Farense",
    "Randers Fodbold Club",
    "Società Sportiva Calcio Napoli",
    "Panetolikos Agrinio",
    "Unione Sportiva Sassuolo Calcio",
    "Fatih Karagümrük Sportif Faaliyetler San. Tic. A.Ş.",
    "A.G.S Asteras Tripolis",
    "İstanbul Başakşehir Futbol Kulübü",
    "Futebol Clube de Vizela",
    "ZAO FK Chornomorets Odessa",
    "Portimonense Futebol SAD",
    "Hatayspor Futbol Kulübü",
    "Futebol Clube de Arouca",
    "Frosinone Calcio S.r.l.",
    "Kasimpasa Spor Kulübü",
    "FK Zarya Lugansk",
    "FK Ural Yekaterinburg",
    "Alanyaspor",
    "Girona Fútbol Club S. A. D.",
    "FC Orenburg",
    "FK Krasnodar",
    "Granada Club de Fútbol S.A.D.",
    "FK Oleksandriya",
    "RasenBallsport Leipzig",
    "NK Veres Rivne",
    "Athlitiki Enosi Kifisias",
    "FK Obolon Kyiv",
    "FK Sochi",
    "FK Kolos Kovalivka",
    "FC Rukh Lviv",
    "FK Nizhny Novgorod",
    "FK Polissya Zhytomyr",
    "Racing White Daring Molenbeek",
    "TOV FK Metalist 1925 Kharkiv",
    "Sport Klub Dnipro-1",
    "Neos Podosferikos Syllogos Volou",
    "FK Minaj",
    "LNZ Cherkasy",
];



let debounceTimeout;

function debounce(func, delay) {
    return function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

function showSuggestions(value) {
    const suggestionBox = document.getElementById('suggestions');
    suggestionBox.innerHTML = '';
    if (value.length === 0) {
        return;
    }

    const filteredSuggestions = suggestions.filter(item => item.toLowerCase().startsWith(value.toLowerCase()));

    filteredSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.innerText = suggestion;
        suggestionItem.onclick = function() {
            document.getElementById('search-bar').value = suggestion;
            suggestionBox.innerHTML = '';
        };
        suggestionBox.appendChild(suggestionItem);
    });
}

document.getElementById('search-bar').onkeyup = debounce(function() {
    showSuggestions(this.value);
}, 300);


