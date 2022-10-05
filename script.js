
function generateTournament() {
  let teamsArr = [
    {
      id: 1,
      name: "Polska",
      points: 0,
      games: 0,
    },
    {
      id: 2,
      name: "Senegal",
      points: 0,
      games: 0,
    },
    {
      id: 3,
      name: "Kolumbia",
      points: 0,
      games: 0,
    },
    {
      id: 4,
      name: "Japonia",
      points: 0,
      games: 0,
    },
  ];

  function generateRounds(teams) {
    let numberOfRounds = teams.length - 1;
    let scheduleArray = [];

    for (i = 0; i < numberOfRounds; i++) {
      let roundArray = [];

      for (let j = 0; j < teams.length / 2; j++) {
        roundArray.push([teams[j].id, teams[teams.length - 1 - j].id]);
      }

      teams.splice(1, 0, teams[teams.length - 1]);
      teams.pop();

      scheduleArray.push(roundArray);
    }

    return scheduleArray;
  }

  function shuffleGames(scheduleArr) {

    // losowa kolejnosc gospodarz - gosc
    for(let i = 0; i < scheduleArr.length; i++) {
        for(let j = 0; j < scheduleArr[i].length; j++) {
            shuffleArray(scheduleArr[i][j]);
        }
    }

    // losowe mecze w kolejce
    for(let i = 0; i < scheduleArr.length; i++) {
        shuffleArray(scheduleArr[i]);
    }

    // losowe kolejki
    shuffleArray(scheduleArr);

    return scheduleArr;
  }

  function generateRoundsDisplay() {
    let scheduleArr = generateRounds(teamsArr);
    scheduleArr = shuffleGames(scheduleArr);
    let tournamentDiv = document.getElementById("tournament");
    
    for(let i = 0; i < scheduleArr.length; i++) {
        let roundDiv = document.createElement("div");
        roundDiv.innerHTML = "Kolejka " + (i + 1);
        roundDiv.classList.add("round");

        for(let j = 0; j < scheduleArr[i].length; j++) {
            let teams = scheduleArr[i][j];
            let team1 = teamsArr.find((team) => team.id == teams[0]);
            let team2 = teamsArr.find((team) => team.id == teams[1]);
            let gameDiv = document.createElement("div");
            gameDiv.innerHTML = team1.name + " - " + team2.name;
            gameDiv.classList.add("game");
            gameDiv.dataset.team1Id = team1.id;
            gameDiv.dataset.team2Id = team2.id;
            gameDiv.dataset.team1Score = 1;
            gameDiv.dataset.team2Score = 0;

            roundDiv.appendChild(gameDiv);

            console.log(scheduleArr[i][j]);
        }

        tournamentDiv.appendChild(roundDiv);
    }
  }

  function calculateScores() {
    let games = document.querySelectorAll(".game");

    for (let i = 0; i < games.length; i++) {
      let score1 = parseInt(games[i].dataset.team1Score);
      let score2 = parseInt(games[i].dataset.team2Score);
      let team1 = teamsArr.find((team) => team.id == games[i].dataset.team1Id);
      let team2 = teamsArr.find((team) => team.id == games[i].dataset.team2Id);
      if (score1 && score2 >= 0) {
        if (score1 > score2) {
          team1.points += 3;
        } else if (score1 < score2) {
          team2.points += 3;
        } else {
          team1.points += 1;
          team2.points += 1;
        }
        team1.games++;
        team2.games++;
      }
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  generateRoundsDisplay();
  calculateScores();
}

setTimeout(function () {
  generateTournament();
}, 1000);

