var enemies = [
    {name: 'Voltorb', img: 'images/voltorb.png', health: 100},
    {name: 'Charizard', img: 'images/charizard.png', health: 200},
    {name: 'Gyarados', img: 'images/gyarados.png', health: 125},
    {name: 'Mew', img: 'images/mew.png', health: 75},
    {name: 'Geodude', img: 'images/geodude.png', health: 90},
    {name: 'Snorlax', img: 'images/snorlax.png', health: 110},
    {name: 'Kabutops', img: 'images/kabutops.png', health: 95},
    {name: 'Eevee', img: 'images/eevee.png', health: 60},
    {name: 'Beedrill', img: 'images/beedrill.png', health: 70},
    {name: 'Magikarp', img: 'images/magikarp.gif', health: 40},
    {name: 'Gastly', img: 'images/gastly.png', health: 50}
];

var pickachu = { name: 'Pikachu', img: 'images/pikachu.png', health: 100 };

function Pokemon(name, img, health) {
  this.name = name;
  this.img = img;
  this.health = health;

  this.attack = function(enemy) {
    if(isSuccessful(0.9)){
      enemy.takeDamage(generateRandom(5, 30));
      return true;
    } else {
      return false;
    }
  };

  this.takeDamage = function(damage){
    if(isSuccessful(0.9)){
      this.health -= damage;
      return true;
    } else {
      return false;
    }
  };

  this.heal = function(){
    this.health += generateRandom(25, 30);
  };

  this.isDead = function(){
    return this.health <= 0;
  };
  // Helper to that returns true p fraction of the time
  var isSuccessful = function(p){
    return Math.random() < p;
  };
  // Returns a random int between min and max inclusive
  var generateRandom = function(min, max){
    return Math.floor(Math.random()*max + min+1);
  };
}

var game = {
  player: {},
  enemy: {},
  currentPlayer: {},
  start: function(enemy, player){
    // Set the player and enemy
    this.player = new Pokemon(player.name, player.img,
       player.health);
    this.enemy = new Pokemon(enemy.name, enemy.img,
    enemy.health);
    // Set the currentPlayer to player
    this.currentPlayer = this.player;
  },
  attack: function(){
    if(this.currentPlayer === this.player){
        this.player.attack(this.enemy);
        this.currentPlayer = this.enemy;
    } else {
      this.enemy.attack(this.player);
      this.currentPlayer = this.player;
    }
  },
  heal: function(){
    if(this.currentPlayer === this.player){
      this.player.heal();
      this.currentPlayer = this.enemy;
    } else {
      this.enemy.heal();
      this.currentPlayer = this.player;
    }
  },
  win: function(){
    return this.enemy.isDead();
  },
  lose: function(){
    return this.player.isDead();
  }
};

$(document).ready(function(){
  console.log('Loaded');
  var $attackBtn = $('#attack_btn'),
    $enemyImg = $('#enemy_img'),
    $enemyName = $('#enemy .name'),
    $enemyHealth = $('#enemy .health'),
    $playerHealth = $('#pikachu .health'),
    $statusTxt = $('#status_text'),
    $healBtn = $('#heal_btn');

    var timerId;

  // Start Game
  game.start(enemies[Math.floor(Math.random()*enemies.length)], pickachu);
  // Set name and attributes for enemy
  $enemyImg.attr('src', game.enemy.img);
  $enemyName.text(game.enemy.name + '!');
  $enemyHealth.text('Health: ' + game.enemy.health);
  // Set the status to text to a wild <> appears
  $statusTxt.text('A wild ' + game.enemy.name + ' appears!');
  // When Attack is clicked
  $attackBtn.click(function(event){
    // Hide the butttons
    $attackBtn.hide();
    $healBtn.hide();
    // Store the health before attack
    var healthBeforeAttack = game.enemy.health;
    // Run the attack action
    game.attack();
    // Update health info
    $enemyHealth.text('Health: ' + game.enemy.health);
    // Update status text
    var healthAfterAttack = game.enemy.health;
    $statusTxt.text(game.player.name + ' attacks and deliver ' +
      (healthBeforeAttack - healthAfterAttack) +
      ' points of damage');
    // Check for win
    if(game.win()){
      $statusTxt.text(game.player.name + " has defeated " + game.enemy.name + "!");
      return;
    }
    // Timout for 3 seconds while showing enemies turn
    window.setTimeout(function(){
        $statusTxt.text(game.enemy.name + '\'s turn ...');
        window.setTimeout(enemyTurn, 1000);
    }, 1000);

  });

  function enemyTurn(){
    // Attack 75% of the time
    if(Math.random() < 0.75){
      var healthBeforeAttack = game.player.health;
      game.attack();
      var healthAfterAttack = game.player.health;
      // Update player health and info
      $playerHealth.text('Health: ' + game.player.health);
      $statusTxt.text(game.enemy.name + ' attacks and delivers ' +
      (healthBeforeAttack - healthAfterAttack) + ' points of damage.');
    } else {
      var healthBeforeHeal = game.enemy.health;
      game.heal();
      var healthAfterHeal = game.enemy.health;
      // Update player health and info
      $enemyHealth.text('Health: ' + game.enemy.health);
      $statusTxt.text(game.enemy.name + ' heals by ' +
      (healthAfterHeal - healthBeforeHeal) + ' points.');
    }

    // Check for loss
    if(game.lose()){
      $statusTxt.text(game.player.name + " has been defeated by " + game.enemy.name + "!");
      return;
    }

    // Show the buttons
    $attackBtn.show();
    $healBtn.show();
  }

  // Add handler to heal button
  $healBtn.click(function(event){
    // Hide the buttons
    $healBtn.hide();
    $attackBtn.hide();
    // Save health before heal
    var healthBeforeHeal = game.player.health;
    // Heal
    game.heal();
    // Save health after healing and print difference to status
    var healthAfterHeal = game.player.health;
    $statusTxt.text(game.player.name + ' heals by ' +
    (healthAfterHeal - healthBeforeHeal) + ' points.');
    $playerHealth.text('Health: ' + game.player.health);

    // Timout for 2 seconds while showing enemies turn
    window.setTimeout(function(){
        $statusTxt.text(game.enemy.name + '\'s turn ...');
        window.setTimeout(enemyTurn, 1000);
    }, 1000);
  });
});
