module Fire exposing (..)

import Debug exposing (toString)
import Svg exposing (Svg, image)
import Svg.Attributes exposing (height, width, x, xlinkHref, y)
import Debug exposing (toString)
import List exposing (..)

import Model exposing (..)
import Ball exposing (..)

--Move one given fire
moveOneFire : Model-> Ball -> (Ball, Model)
moveOneFire model fire =
    let
        fire0 = fire
        crashN = {fire | dy = abs(fire0.dy), yPos = fire0.yPos + 0.7}
        crashW = {fire | dx = abs(fire0.dx), xPos = fire0.xPos + 0.7}
        crashE = {fire | dx = -1 * abs(fire0.dx), xPos = fire0.xPos - 0.7}
        dx = fire.dx * model.diffClass.ballSpeed
        dy = fire.dy * model.diffClass.ballSpeed
    in
        if (Tuple.second (fireThePaddle model fire) ) then
            ({fire | exist = False, xPos = 200, yPos = 200}, judgeFiredLose (Tuple.first (fireThePaddle model fire)))
        else if fire.exist == True && fire.yPos > 54 then
            ({fire | exist = False, xPos = 200, yPos = 200}, model)
        else if fire.exist == True && fire.yPos <= 1.4 then
            (crashN, model)
        else if fire.exist == True && fire.xPos <= 1.4 then
            (crashW, model)
        else if fire.exist == True && fire.xPos >= 74 then
            (crashE, model)
        else if fire.exist == True then
            ({fire |  xPos = fire.xPos + dx, yPos = fire.yPos + dy}, model)
        else
            (fire, model)

--Lose or Not
judgeFiredLose: Model -> Model
judgeFiredLose model =
    if model.player.lives <= 0 then
        {model | state = Lose}
    else
        model

--Whether fires attack the paddle or not
fireThePaddle : Model -> Ball -> (Model, Bool)
fireThePaddle model fire =
    let
        player = model.player
        newLives = player.lives - 1
        newPlayer = {player | lives = newLives}
    in
        if (judgePaddleCrash model fire) == "S" ||  (judgePaddleCrash model fire) == "W" ||  (judgePaddleCrash model fire) == "E" then
            ({model | player = newPlayer}, True)
        else
            (model, False)

--If you are "lucky" enough, this function will create endless fires to attack you
judgeCreateFires: Model -> Model
judgeCreateFires model =
    if modBy (fireWrtDiff model) model.prob == 0 && (List.length (List.filter (\fire -> fire.exist == True) model.fires) ) == 0 then
        {model | fires = [ createFire 2 15 0.25 0.25 True, createFire 26 2 0.25 0.25 True, createFire 64 2 -0.25 0.25 True, createFire 73 15 -0.25 0.25 True] }
    else
        model

-- organize other functions to let all the fire moves
moveFires: Model -> Model
moveFires model =
    let
        createdModel = judgeCreateFires model

        fire1 = Tuple.first (oneBall createdModel "f")
        fire2 = Tuple.first (twoBall createdModel "f")
        fire3 = Tuple.first (threeBall createdModel "f")
        fire4 = Tuple.first (fourBall createdModel "f")

        newFire1 = Tuple.first (moveOneFire createdModel fire1)
        newFire2 = Tuple.first (moveOneFire createdModel fire2)
        newFire3 = Tuple.first (moveOneFire createdModel fire3)
        newFire4 = Tuple.first (moveOneFire createdModel fire4)

        finalFires = [newFire1, newFire2, newFire3, newFire4]

        newModel1 = Tuple.second (moveOneFire createdModel fire1)
        newModel2 = Tuple.second (moveOneFire newModel1 fire2)
        newModel3 = Tuple.second (moveOneFire newModel2 fire3)
        newModel4 = Tuple.second (moveOneFire newModel3 fire4)

    in
        {newModel4 | fires = finalFires}

--Let you see the fires
svgFire : Ball -> Svg msg
svgFire fire =
    image
        [ x (toString (fire.xPos - 1))
        , y (toString (fire.yPos - 1))
        , xlinkHref fire.texture
        , width "4"
        , height "4"
        ]
        []