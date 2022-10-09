function generateTournament() {
  let teamsArr = [
    {
      id: 1,
      name: "Polska",
      points: 0,
      games: 0,
      bs: 0,
      bl: 0,
    },
    {
      id: 2,
      name: "Senegal",
      points: 0,
      games: 0,
      bs: 0,
      bl: 0,
    },
    {
      id: 3,
      name: "Kolumbia",
      points: 0,
      games: 0,
      bs: 0,
      bl: 0,
    },
    {
      id: 4,
      name: "Japonia",
      points: 0,
      games: 0,
      bs: 0,
      bl: 0,
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
    for (let i = 0; i < scheduleArr.length; i++) {
      for (let j = 0; j < scheduleArr[i].length; j++) {
        shuffleArray(scheduleArr[i][j]);
      }
    }

    // losowe mecze w kolejce
    for (let i = 0; i < scheduleArr.length; i++) {
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

    for (let i = 0; i < scheduleArr.length; i++) {
      let roundDiv = document.createElement("div");
      roundDiv.innerHTML = "<h4>Kolejka " + (i + 1) + "</h4>";
      roundDiv.classList.add("round", "mb-3");

      for (let j = 0; j < scheduleArr[i].length; j++) {
        let teams = scheduleArr[i][j];
        let team1 = teamsArr.find((team) => team.id == teams[0]);
        let team2 = teamsArr.find((team) => team.id == teams[1]);
        let gameDiv = document.createElement("div");
        gameDiv.innerHTML =
          "<div class='col'>" +
          team1.name +
          " - " +
          team2.name +
          "</div><div class='col'><input class='score-input' type='text' data-name='score1'> : <input class='score-input' type='text' data-name='score2'></div>";
        gameDiv.classList.add("game", "mb-2", "row", "align-items-center");
        gameDiv.dataset.team1Id = team1.id;
        gameDiv.dataset.team2Id = team2.id;
        gameDiv.dataset.team1Score = -1;
        gameDiv.dataset.team2Score = -1;

        roundDiv.appendChild(gameDiv);

        console.log(scheduleArr[i][j]);
      }

      tournamentDiv.appendChild(roundDiv);
    }
  }

  function calculateScores() {
    teamsArr.map(function (t) {
      t.points = 0;
      t.games = 0;
      return t;
    });

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

    tablesDisplay();

    // console.log(teamsArr);
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

  function getScores() {
    let inputScore = document.querySelectorAll(".score-input");

    for (let i = 0; i < inputScore.length; i++) {
      inputScore[i].addEventListener("input", function (ev) {
        let game = ev.currentTarget.closest(".game");
        if (ev.currentTarget.dataset.name == "score1") {
          game.dataset.team1Score = parseInt(ev.currentTarget.value);
        } else {
          game.dataset.team2Score = parseInt(ev.currentTarget.value);
        }
        // calculateScores();
      });
    }
  }

  function calculateButton() {
    let tournamentDiv = document.getElementById("tournament");
    let calculateButton = document.createElement("button");
    calculateButton.innerHTML = "Przelicz wyniki";
    calculateButton.dataset.id = "calculate";
    calculateButton.addEventListener("click", function () {
      calculateScores();
    });
    tournamentDiv.appendChild(calculateButton);
  }

  function tablesDisplay() {
    let tournamentDiv = document.getElementById("tournament");
    let currTable = document.querySelector(".table-scores");
    if(currTable != null) {
      while (currTable.firstChild) {
        currTable.removeChild(currTable.firstChild);
      }
    }
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    tableHead.innerHTML =
      "<th>Lp.</th><th>Drużyna</th><th>Mecze</th><th>Punkty</th><th>Bz</th><th>Bs</th><th>+/-</th>";
    for (let i = 0; i < teamsArr.length; i++) {
      let tableRow = document.createElement("tr");
      let teamRow =
        "<td>" +
        (i + 1) +
        ".</td>" +
        "<td>" +
        teamsArr[i].name +
        "</td>" +
        "<td>" +
        teamsArr[i].games +
        "</td>" +
        "<td>" +
        teamsArr[i].points +
        "</td>" +
        "<td>" +
        teamsArr[i].bs +
        "</td>" +
        "<td>" +
        teamsArr[i].bl +
        "</td>" +
        "<td>" +
        (teamsArr[i].bs - teamsArr[i].bl) +
        "</td>";
      tableRow.innerHTML = teamRow;
      tableBody.appendChild(tableRow);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    table.classList.add("table", "mt-4", "table-scores");
    tournamentDiv.appendChild(table);
  }

  generateRoundsDisplay();
  calculateScores();
  getScores();
  calculateButton();
}

setTimeout(function () {
  generateTournament();
}, 1000);
