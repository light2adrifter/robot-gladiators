var fightOrSkip = function () {
  // ask player if they'd like to fight or skip using this new function.
  var promptFight = window.prompt("would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
  // conditional recursive function call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();
  // iff skip, confirm and stop loop
  if (promptFight === 'skip') {
    // player confirmation
    var confirmSkip = window.confirm ("Are you sure you'd like to skip?");
    // if yes (true) skip fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      return true;
      return false;
    }
  }
}
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;
  // if randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
      // ask player if they'd like to fight or run
    if (fightOrSkip() ) {
        break;

    }
  
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has ceased to function!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        console.log( "Gained 20 dollars! Currently owned: " + (playerInfo.money) + "!")
  
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    }
  
      // remove players's health by subtracting the amount set in the enemy.attack variable
      else { var damage = randomNumber(enemy.attack -3, enemy.attack);
        playerInfo.health = Math.max (0, playerInfo.health - damage);
        console.log(
          enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has ceased to function!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
      
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
    
  };
  
// function to open shop
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 3 'LEAVE'."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt) {
  case 1:
    playerInfo.refillHealth();
    break;

  case 2:  
    playerInfo.upgradeAttack();
    break;

  case 3:  
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
  playerInfo.reset ();
  for(var i = 0; i < enemyInfo.length; i++) {
   if (playerInfo.health > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    // pick new enemy to fight based on the index of the enemy.names array
    var pickedEnemyObj = enemyInfo[i];

    // reset enemy.health before starting new fight
    pickedEnemyObj.health = randomNumber(40, 60);

    // use debugger to pause script from running and check what's going on at that moment in the code
    // debugger;

    // pass the pickedEnemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
    fight(pickedEnemyObj);
    // if we,re not at the last enemy in the array
    if  (playerInfo.health >0 && i < enemyInfo.length - 1) {
      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
        shop ();
      }
  }
  else {
    window.alert(playerInfo.name + " has reached the gauntlets end.");
    // after loop ends, player is either out of health or enemies to fight
 endGame();
  }
 }
}; 


};
// function to the end game
var endGame = function() {
  // if player is alive, you win
  if (playerInfo.health > 0) {
    window.alert("Great job, you have survived! You have a score of " + (playerInfo.money) + "!")
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
// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to set name
var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }
  console.log("Tour robot's name is " + name);
  return name;
  
};
// creates players name as a variable via prompt input
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      this.health += 20;
      this.money -= 7;
      console.log("Current health is " + playerInfo.health + ".");
    }
    else {
      window.alert("You don't have enough money!");
    }  
  },
  upgradeAttack: function() {
    if (this.money >=7) {
      this.attack +=6;
      this.money -=7;
      console.log("Current attack is " + playerInfo.attack + ".")
    }
    else window.alert("You don't have enough money!");  
  }
};

console.log(playerInfo.name, "Health " + playerInfo.health, "Attack " + playerInfo.attack + " Money " + playerInfo.money);

var enemyInfo = [
  {
    name: "Zero",
    attack: randomNumber (10, 14)
  },
  {
    name: "Sigma",
    attack: randomNumber (10, 14)
  },
  {
    name: "Omega",
    attack: randomNumber (11, 15)
  }
];
// start the game when the page loads
startGame();