## Press Release

This project's goal is to create a basic snake game. 
The game will have a user input using arrow keys, or the w,a,s,d keys to control the snake

### The game should have the following rules:

1. When the snake head reaches the edge of the gameboard, game is over
2. When the snake head touches a segment of itself, the game is also over
3. Occasionally, food will appear
4. When the snake head reaches the food, the snake increases in length
5. When the snake eats food, the score increments
6. Display the current score, highscore, and list of highscores

### The user interface should contain:

1. User name log-in
2. Display current high score with username next to it
3. Display list of high scores with usernames next to it

Given the above outlines, the username and score should be stored in a database, but only store one entry per player, storing the highest score for that player. When the game ends, compare current score and high-score for that player and store if current score is higher than the high-score.

Attempt to use Mongoose to store the players and player highscore. User Angular to display players and their highscores.

Attempt to use window canvas to display the gameboard.
