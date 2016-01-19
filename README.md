## README

This is a project I completed while a student at Hack Reactor. It is the snake-game. [Enjoy!](https://snake-kweng2.herokuapp.com/)

![image](http://i.imgur.com/hApgbLb.png?1)
![image](http://i.imgur.com/B58HoLh.png?1)

This project uses Node and Express to build the server, MongoDB and Mongoose to store users and highscores, and Angular on the front end along with canvas API to display the game.

The backend server conforms to RESTful api conventions.

### Features
- There is a selector at the top of the screen to change the speed of the snake.
- The score is a counter of the snake's length. Eating each food will increase the snake's length by 3.
- When a player gets a personal highscore, it is recorded and stored in the database.
- Top 8 scores are displayed.

### API End-Points
URL|METHOD|REQ BODY|RES BODY|
|---|---|---|---|
|api/users|GET|   |JSON(user)|
|api/users|POST|{name: String}|JSON(user)|
|api/users|PUT|{name: String, highScore: Number}|JSON(user)|
|api/users|DELETE|{name: String}|JSON(user)|


### Roadmap
- The game currently does not increase in speed as the snake gets longer, or as time passes. It is possible to implement a feature that increases the snake speed as time passes or as the snake gets longer. This is a potential feature that can make the game feel more progressive.

- Secondly, the scoring is linear, and increments by 3 each time the snake eats food. The scoring system can be more dynamic, and made a function of the time between eating, snake speed, and time. The basic building blocks are all present to make this possible. 

- Thirdly, since most of the game is controlled by the keyboard already, the game difficulty selector can be refactored be controlled by the keyboard as well.
