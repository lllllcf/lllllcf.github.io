# README
## Game Name: **Fortun Chase**
## Group Information
1. Group Name: **Heretical Idea**
2. Members:
- Chengfan Li
- Kaixin Shen
- Zihao Xu
- Yiwen Yang
## Getting Start
1. Visit our course website <http://focs.ji.sjtu.edu.cn/vg100/project/p2> and find Group 12 to enjoy the game.
2. Open `./build/ index.html` and have fun!
## Basic Instruction
1. Click **Help** in the main menu of the game and you will find a brief instruction to get you through the basic element and flow of the game.
2. Check our instruction booklet to get more detailed information.
## Tech Communication Documents
You can check this out in `./doc` directory.
1. **Instruction Booklet**
A detailed document which covers background story of the game to overall game mechanism.
2. **Poster**
A fancy document used for promoting.
3. **Trailer Video**
A fancy video used to catch audience's eye.
## Code Structure
All codes are stored in `./src` directory.
- All `*.css` files inside `./src/css` directory are used to define some fancy styles of HTML elements.
- Files inside `./src/Event` directory:
	1. `Event.elm` includes frames of event system inside our game.
	2. `Event**(some digits).elm` includes all the random events inside our game.
	3. `SEvent*(2-5).elm` include all the story events(corresponding to 4 characters) inside our game.
- Files inside `./src/Phase` directory:
	1. `Prepare.elm` is related to the prepare phase of our game flow, such as adjusting your maintenance and loading family motto and introduction.
	2. `Move.elm` is related to the move phase of our game flow, namely all the actions during and after you move.
	3. `Implementation.elm` is related to the implementation phase of our game flow, all the functions of action dices are written here.
	4. `End.elm` is related to the end phase of our game flow, it includes budget counting and player attributes updating procedure.
- Other files:
	1. `Ai.elm` defined all AI actions to make AI more intelligent and competent.
	2. `Animation.elm` renders animations related player movement and dice rolling.
	3. `Condition.elm` defines winning and losing condition of the game.
	4. `Definition.elm` stores all the variable declaration used inside the program,
	5. `Main.elm`': Just main function: takes in `init`, `update`, `view` and `subscription`.
	6. `Map.elm` fulfills map(tiles) initialization, information implementation and related visual elements.
	7. `Model.elm` includes `init` function.
	8. `PopUp.elm` defines pop-up windows used inside our game.
	9. `Style.elm` defines CSS styles inside Elm.
	10. `Update.elm` offers API for game information updating and processes various messages.
## Acknowledgement
Check this inside game. Go to **More** -> **Links** to see all the attributions.