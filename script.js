
function generateTournament() {
  let teams = [
    {
      id: 0,
      name: "Polska",
      points: 0,
      games: 0,
    },
    {
      id: 1,
      name: "Senegal",
      points: 0,
      games: 0,
    },
    {
      id: 2,
      name: "Kolumbia",
      points: 0,
      games: 0,
    },
    {
      id: 3,
      name: "Japonia",
      points: 0,
      games: 0,
    },
  ];

  let numberOfRounds = teams.length - 1;

  function generateRounds() {
    let tournamentDiv = document.getElementById("tournament");

    for (i = 0; i < numberOfRounds; i++) {
      let roundDiv = document.createElement("div");
      roundDiv.innerHTML = "Kolejka " + (i + 1);
      roundDiv.classList.add("round");

      for (let j = 0; j < teams.length / 2; j++) {
        let gameDiv = document.createElement("div");
        gameDiv.innerHTML =
          teams[j].name + " - " + teams[teams.length - 1 - j].name;
        gameDiv.classList.add("game");
        gameDiv.dataset.team1Id = teams[j].id;
        gameDiv.dataset.team2Id = teams[teams.length - 1 - j].id;
        gameDiv.dataset.team1Score = 1;
        gameDiv.dataset.team2Score = 0;

        roundDiv.appendChild(gameDiv);
      }

      teams.splice(1, 0, teams[teams.length - 1]);
      teams.pop();

      tournamentDiv.appendChild(roundDiv);
    }
  }

  function calculateScores() {
    let games = document.querySelectorAll(".game");

    for (let i = 0; i < games.length; i++) {
      let score1 = parseInt(games[i].dataset.team1Score);
      let score2 = parseInt(games[i].dataset.team2Score);
      let team1 = teams.find((team) => team.id == games[i].dataset.team1Id);
      let team2 = teams.find((team) => team.id == games[i].dataset.team2Id);
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
    console.log(teams);
  }

  function shuffle() {
    let container = document.getElementById("tournament");
    let elementsArray = Array.prototype.slice.call(
      container.getElementsByClassName("round")
    );
    elementsArray.forEach(function (element) {
      container.removeChild(element);
    });
    shuffleArray(elementsArray);
    elementsArray.forEach(function (element) {
      container.appendChild(element);
    });
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

  generateRounds();
  calculateScores();
  shuffle();
}

setTimeout(function () {
  generateTournament();
}, 3000);

