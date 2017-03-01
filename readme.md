# Pokemon Battle Game!

![PIKA](http://49.media.tumblr.com/f151c12a0af53d864ebb413101f64e32/tumblr_nqm3q02d0y1tros9go1_500.gif)

### Introduction

In tonight's assignment you will create a pokemon game. You character (the player) will be Pikachu and you will able fight against any of the following opponents

```javascript
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
```

### Game Rules/Workflow:

-You have 100 health. 

-Enemy is picked randomly at the start. 

-You can attack or heal by clicking the buttons provided in the starter code. 

-When you attack, there is a 10% chance you miss (nothing happens). 

-If you attack successfully, it will subtract 5-30 from the overall health of the opponent. 

-When the enemy attacks, there is a 10% chance the enemy misses (nothing happens). 
 
-If they attack successfully, you subtract between 5-30 from your health. 

-If you heal, you are healed for 25-50 health points. 

-After you heal or attack, it waits 3 seconds, then the enemy will auto attack. **During this time the buttons should be hidden.**

-If at any time your health is less than or equal to zero, display a game over message. **Buttons should not reappear.**

-If at any time the enemy heath drops at or below 0, display a win message. 

Bonus:

- Game restarts automatically after win/lose state is triggered. 
- Build interface to choose starting pokemon.

### Example Videos:

-There are two example videos in the folder. Pay careful attenton to the text being displayed and what elements are changing. 


### Getting Started: 

-You won't need to edit the pokemon.html file. You will need to look at it to get IDs and class names of elements.

-You won't need to edit the pokemon.css file. 

-Use the pokemon.js file provided to get started. (or don't)


### Building your game logic

Use the OOP principles we learned about today, when designing you object.

Create a `Pokemon` constructor which will be used to create pokemon objects which should have the following signature

Attributes:
1. `name`: type `string`
2. `img`: type `string`
3. `health`: type `number`

Methods:
1. `attack(enemy)`
    The `attack` method takes an enemy object of type Pokemon as an argument and will attempt to attack that object. There is a 10% chance the attack misses so nothing happens. If the attack goes through the enemy pokemon should take between 5 - 30 damage.
2. `takeDamage(damage)`
    The `takeDamage` method takes a number as its argument.  There is a 10% chance to dodge the incoming attack which means nothing happens. Otherwise the `damage` number should be subtracted from the pokemon's health.
3. `heal()`
    Increase the pokemon's health by a random amount between 25 and 50.
4. `isDead()`
    Returns a boolean indicating if the pokemon's health is less than or equal to zero

Create a `game` object literal which should handle the game logic. It should have the following signature

Attributes:
1. `player`: type `Pokemon`
2. `enemy`: type `Pokemon`
3. `currentPlayer`: type `Pokemon`

Methods:

1. `start()`
    - Create a new `Pokemon` with the name of *pikachu* and assign in to the player attribute.
    - Create a new `Pokemon` with properties from the array of enemies and assign it to enemy.
2. `attack()`
    The current player attacks the other player. 
3. `heal()`
    The current player heals.    
4. `win()`
    Returns a boolean indicating if player wins
5. `lose()`
    Returns a boolean indicating if enemy wins



### Bonus:

-Add animations to the game. Start by making the pokemon wiggle left and right when damaged and tip over when defeated! Like so: http://gfycat.com/InsignificantExaltedBlowfish

-Explore adding a 'damage multiplier' to the Pokemon objects. Use this to have stronger/weaker pokemon do more/less damage. 
