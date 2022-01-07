// Challenge 1: Your Age in Day

function ageInDays() {
  var birthYear = prompt("What year were you born?");
  var daysOfLiving = (new Date().getFullYear() - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + daysOfLiving + " days of"
  );
  h1.setAttribute("id", "daysOfLiving");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("daysOfLiving").remove();
}

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
  console.log(yourChoice);

  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log("Computer choice: ", botChoice);
  results = decideWinner(humanChoice, botChoice);
  console.log(results);
  message = finalMessage(results); // "You won" {"message": "You won", "color": "green"}
  console.log(message);
  rpsFrontEnd(humanChoice, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "Your lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tied!", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  // Remove all images
  document.getElementById("rock").parentElement.remove();
  document.getElementById("paper").parentElement.remove();
  document.getElementById("scissors").parentElement.remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML = `<img src='${imagesDatabase[humanImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>`;
  botDiv.innerHTML = `<img src='${imagesDatabase[botImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>`;
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 50px; padding: 15px;'>" +
    finalMessage["message"] +
    "</h1> <button class='btn btn-success' onclick='location.reload()' style='width: 100px; height: 40px; border-radius: 50px;'>Reset</button>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4: Change color of all buttons

// Get all buttons in Array from HTML collection
var all_buttons = [].slice.call(document.getElementsByTagName("button"));

// Copy all buttons class
var copyAllButtonsClass = [];
for (btn of all_buttons) {
  copyAllButtonsClass.push(btn.classList[1]);
}

// Storing all classes for buttons
var class_list = [
  "btn-primary",
  "btn-danger",
  "btn-warning",
  "btn-success",
  "btn-dark",
  "btn-info",
  "btn-secondary",
];

// Main action
function buttonColorChange() {
  // Get option's value from the form
  var select = document.getElementById("background");
  var option = select.value;

  // Get random class
  function randomChoice() {
    return class_list[Math.floor(Math.random() * class_list.length)];
  }

  // Loop through the buttons: Remove classes and add respective ones
  for (let [i, btn] of all_buttons.entries()) {
    btn.classList.remove(btn.classList[1]);
    switch (option) {
      case "red":
        btn.classList.add("btn-danger");
        break;
      case "green":
        btn.classList.add("btn-success");
        break;
      case "random":
        // code block
        btn.classList.add(randomChoice());
        break;
      case "reset":
        // code block
        btn.classList.add(copyAllButtonsClass[i]);
        break;
    }
  }
}

// Challenge 5: Blackjack

// Declaring card suits and their ranks
const suit = ["Spades", "Hearts", "Diamonds", "Clubs"];
const rank = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  Jack: 10,
  Queen: 10,
  King: 10,
  Ace: [1, 11],
};

// Declare user and dealer objects
let blackjackGame = {
  user: { scoreSpan: "#user-blackjack-result", div: "#user-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
};

// Reference to user and dealer objects
const USER = blackjackGame["user"];
const DEALER = blackjackGame["dealer"];

// Sounds
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const looseSound = new Audio("static/sounds/aww.mp3");

// Card choice randomizer
function randomCard() {
  let randSuit = Math.floor(Math.random() * 4);
  let randRank = Math.floor(Math.random() * 13);
  return [Object.keys(rank)[randRank], suit[randSuit]];
}

// Score counter
function countScore(activePlayer) {
  let cards = document.querySelector(activePlayer).querySelectorAll("card-t");
  let score = 0;

  for (card of cards) {
    if (card.rank === "Ace" && score + 11 > 21) {
      score += rank[card.rank][0];
    } else if (card.rank === "Ace" && score + 11 <= 21) {
      score += rank[card.rank][1];
    } else {
      score += rank[card.rank];
    }
  }
  return score;
}

// Show card
function showCard(activePlayer) {
  let card = document.createElement("card-t");
  card.rank = randomCard()[0];
  card.suit = randomCard()[1];

  // Remove allready shown card from the deck (do not show card that already on the table)
  let allCards = document.querySelectorAll("card-t");
  for (i of allCards) {
    console.log(i.rank);
    // while (i.rank === card.rank && i.suit === card.suit) {
    //   // card.rank = randomCard()[0];
    //   // card.suit = randomCard()[1];
    // }
  }

  document.querySelector(activePlayer["div"]).appendChild(card);
  hitSound.play();
}

// Event listeners for buttons
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

// Button actions
function blackjackHit() {
  showCard(USER);
  USER.score = countScore(USER["div"]);
  document.querySelector(USER.scoreSpan).innerHTML = USER.score;
}

function blackjackStand() {
  // Logic that allows to stop and continue getting cards for dealer
  // If dealer count < 17 continue getting cards
  setTimeout(function () {
    //  call a 1s setTimeout when the loop is called
    showCard(DEALER);
    DEALER.score = countScore(DEALER["div"]);
    if (DEALER.score < 17) {
      //  if the score < 17, call the loop function
      blackjackStand();
    } //  ..  setTimeout()
    document.querySelector(DEALER.scoreSpan).innerHTML = DEALER.score;
  }, 1000);
}

function blackjackDeal() {
  // Remove all cards from user and dealer boxex
  let userCards = document
    .querySelector(USER["div"])
    .querySelectorAll("card-t");

  let dealerCards = document
    .querySelector(DEALER["div"])
    .querySelectorAll("card-t");

  for (card of userCards) {
    card.remove();
  }

  for (card of dealerCards) {
    card.remove();
  }
  gameHistory();
}

// Losses, wins, draws counter
let losses = 0;
let wins = 0;
let draws = 0;

// Count Game History
function gameHistory() {
  let userScore = USER.score;
  let dealerScore = DEALER.score;
  if (
    (dealerScore < userScore && userScore <= 21) ||
    (dealerScore > 21 && userScore <= 21)
  ) {
    wins += 1;
    document.querySelector("#wins").innerHTML = wins;
  } else if (
    dealerScore === userScore &&
    dealerScore <= 21 &&
    userScore <= 21
  ) {
    draws += 1;
    document.querySelector("#draws").innerHTML = draws;
  } else {
    losses += 1;
    document.querySelector("#losses").innerHTML = losses;
  }

  document.querySelector(USER.scoreSpan).innerHTML = 0;
  document.querySelector(DEALER.scoreSpan).innerHTML = 0;
  USER.score = 0;
  DEALER.score = 0;
}
