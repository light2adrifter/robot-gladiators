// creates players name as a variable via prompt input
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, "Health " + playerHealth, "Attack " + playerAttack + " Money " + playerMoney);

var enemyNames = ["Zero", "Chill Penguin", "Volt Catfish", "Overdrive Ostrich", "Omega"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {

 
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "SKIP" to leave.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has ceased to function!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
        console.log( "Gained 20 dollars! Currently owned: " + (playerMoney) + "!")
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has ceased to function!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
      
    }
  };
  

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );


  // use switch to carry out action
  switch (shopOptionPrompt) {
  case "refill":
  case "REFILL":  
    if (playerMoney >= 7) {
    window.alert("Refilling player's health by 20 for 7 dollars.");

    // increase health and decrease money
    playerHealth = playerHealth + 20;
    playerMoney = playerMoney - 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
    break;

  case "upgrade":
  case "UPGRADE":  
    if (playerMoney >= 7) {
    window.alert("Upgrading player's attack by 6 for 7 dollars.");

    // increase attack and decrease money
    playerAttack = playerAttack + 6;
    playerMoney = playerMoney - 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
    break;

  case "leave":
  case "LEAVE":  
    window.alert("Leaving the store.");

    // do nothing, so function will end
    break;
  default:
    window.alert("You did not pick a valid option. Try again.");

    // call shop() again to force player to pick a valid option
    shop();
    break;
  }
}
//  function to start a new game
var startGame = function() { 
  // reset player stats
  playerHealth = 100
  playerAttack = 10
  playerMoney = 10
  for(var i = 0; i < enemyNames.length; i++) {
   if (playerHealth > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    // reset enemyHealth before starting new fight
    enemyHealth = 50;

    // use debugger to pause script from running and check what's going on at that moment in the code
    // debugger;

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
    // if we,re not at the last enemy in the array
    if  (playerHealth >0 && i < enemyNames.length - 1) {
      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
        shop ();
      }
  }
  else {
    window.alert(playerName + " is unable to continue...");
    // after loop ends, player is either out of health or enemies to fight
 endGame();
  }
 }
}; 


};

var endGame = function() {
  // if player is alive, you win
  if (playerHealth > 0) {
    window.alert("Great job, you have survived! You have a score of " + (playerMoney) + "!")
  }
  else {
    window.alert("You've lost your robot in battle. Game Over")
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// start the game when the page loads
startGame();