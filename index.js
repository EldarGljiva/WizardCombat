onLoad = swal(
  "Instructions",
  "Welcome to Wizard's Duel!\n\nYou are a wizard facing Merlin, the Male Wizard. Your goal is to defeat him, but be careful! If your health reaches 0, you lose.\n\nTo win, press the key displayed on the screen within a second. Guess right, and victory is yours. Guess wrong, and the duel goes to Merlin.\n\nMay the best wizard prevail!"
);

//array of random keys that are displayed on screen each second randomly
const keys = ["A", "B", "C", "D", "E"];

var button = document.querySelector("button");

function randomKeyword() {
  var randomIndex = Math.floor(Math.random() * keys.length); // 0-2 ( floor ( 2.99) = 2)
  var randomKey = keys[randomIndex];
  button.textContent = randomKey;
}

randomKeyword();
setInterval(randomKeyword, 1000);
handleHealthColorEnemy(); //calling it here to ensure that health of enemy is always green when we start
handleHealthColor(); //same for our health
healthProccess();

function healthProccess() {
  document.addEventListener("keydown", function (event) {
    var click = new Audio("./sounds/click.mp3");
    click.play();
    handleHealthColorEnemy();
    if (event.key.toUpperCase() === button.textContent) {
      // Get the current male wizard's health
      var maleHealth = document.querySelector("#male-wizard-health");
      // Reduce the health by 2
      var newHealth = parseInt(maleHealth.textContent) - 2;
      // Update the male wizard's health
      maleHealth.textContent = newHealth;
      if (newHealth <= 0) {
        var win = new Audio("./sounds/win.mp3");
        win.play();
        swal(
          "Male Wizard is defeated!",
          "Press 'R' to reset the game",
          "success"
        );
      }
    }
    //if we pressed the key that is not displayed at the wanted moment
    else if (event.key.toUpperCase() !== button.textContent) {
      handleHealthColor();
      var ourHealth = document.querySelector("#female-wizard-health");
      var newHealth = parseInt(ourHealth.textContent) - 2;
      ourHealth.textContent = newHealth;
      //if we are defeated
      if (newHealth <= 0) {
        var lose = new Audio("./sounds/lose.mp3");
        lose.play();
        swal("You Lost!", "Press 'R' to reset the game", "error");
        document.addEventListener("keydown", function (event) {
          // Check if the pressed key is "R" (uppercase or lowercase)
          if (event.key === "R" || event.key === "r") {
            // Reload the page
            location.reload();
          }
        });
      }
    }
  });
}

function handleHealthColorEnemy() {
  var enemyHealthColor = document.querySelector("#male-wizard-health");
  var enemyHealth = parseInt(enemyHealthColor.textContent);

  if (enemyHealth >= 14) {
    enemyHealthColor.style.color = "green";
  } else if (enemyHealth >= 8) {
    enemyHealthColor.style.color = "orange";
  } else if (enemyHealth >= 1) {
    enemyHealthColor.style.color = "red";
  } else {
    location.reload();
  }
}
function handleHealthColor() {
  var enemyHealthColor = document.querySelector("#female-wizard-health");
  var enemyHealth = parseInt(enemyHealthColor.textContent);

  if (enemyHealth >= 8) {
    enemyHealthColor.style.color = "green";
  } else if (enemyHealth >= 4) {
    enemyHealthColor.style.color = "orange";
  } else if (enemyHealth >= 1) {
    enemyHealthColor.style.color = "red";
  } else {
    location.reload();
  }
}
//code to make image not draggable
document.querySelector("#female-img").setAttribute("draggable", false);
document.querySelector("#male-img").setAttribute("draggable", false);
