module Ai exposing (..)

import List.Extra exposing (..)
import Css.Animations exposing (Property, custom)
import Debug exposing (toString)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style)
import Html.Styled.Events exposing (onClick)
import List.Extra exposing (getAt)
import Maybe exposing (withDefault)
import Round
import String exposing (fromInt)
import Map exposing (..)
import Style exposing (..)
import Phase.Move exposing (..)
import Definition exposing (..)
import Style exposing (..)
import Animation exposing (..)
import Phase.Implementation exposing (..)
import Condition exposing (..)
import Event.Event exposing (..)

ai: Model -> Model
ai model =
    let
        -----------------------------prepare--------------------------
        aiIndex1 = modBy 4 (model.currentPlayer + 1)
        aiIndex2 = modBy 4 (model.currentPlayer + 2)
        aiIndex3 = modBy 4 (model.currentPlayer + 3)

        ai1 = get aiIndex1 model.players
        ai2 = get aiIndex2 model.players
        ai3 = get aiIndex3 model.players

        playerZero: Player -> Player
        playerZero player =
            {player | wealth = 0, prestige = 0, popularWill = 0, policeAttention = 0}

        propertyZero: Model -> Model
        propertyZero modelZ =
            {modelZ | players = List.map (\x -> if x.exist == False then playerZero x else x) modelZ.players}

        -----------------------------refresh model------------------------
        newModel = {model | currentPlayer = modBy 4 (model.currentPlayer + 1)}
        model1 =
            if ai1.exist == True then
                removeLosePlayer (aiRound newModel ai1)
            else
                removeLosePlayer { newModel | currentPlayer = modBy 4 (newModel.currentPlayer + 1), players = setAt (elemIndexSure ai1 newModel.players) (playerZero ai1) newModel.players }

        model2 =
            if ai2.exist == True then
                removeLosePlayer (aiRound model1 ai2)
            else
                removeLosePlayer { model1 | currentPlayer = modBy 4 (model1.currentPlayer + 1), players = setAt (elemIndexSure ai2 model1.players) (playerZero ai2) model1.players}

        model3 =
            if ai3.exist == True then
                removeLosePlayer (aiRound model2 ai3)
            else
                removeLosePlayer { model2 | currentPlayer = modBy 4 (model2.currentPlayer + 1), players = setAt (elemIndexSure ai3 model2.players) (playerZero ai3) model2.players}


        -------------------------things for next round-----------------------
        round = model.round
        newRound = { round | index = round.index + 1}
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Round" ++ toString (model.round.index + 1)
            , descriptionText = "Defeat them all!"
            , buttons = [
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Let's Go!!!" ]
            ]
            }
        model4 = aiRecord model3

        model5 = propertyZero (removeLosePlayer (regularRefresh model4))
    in
       {model5 |  canClick = True
                , showPopUp = True
                , showDice = NoDice
                , round = newRound
                , actionDice = [NoActionDice, NoActionDice, NoActionDice]
                , viewPopUp = viewPopUp
                , diceState = NotShowDice
                , showActionDice = False
                , showActionDiceRespectively = [False, False, False]
                , canSelectTile = False
                , fightButtonNumber = -1
                , selectedTileIndex = -1
                , actionDiceNumber = [-1,-1,-1]
                , aiRandomNumberIndex = 0
                , currentPlayer = model.currentPlayer
                }

aiRound: Model -> Player -> Model
aiRound model player =
    let
        eventModel = aiChooseEvent player model

        ---------prepare phase -----------
        prepareModel = aiPrepare eventModel player

        ---------move phase --------------
        moveModel = aiMove prepareModel player

        ---------implementation phase-----
        impleModel = aiImple moveModel player
        ---------end phase----------------
        finalModel = aiEnd impleModel
        aiJail = aiEnd model
    in
        if player.jailRound <= 0 then
            {finalModel | currentPlayer = modBy 4 (model.currentPlayer + 1)}
        else
            {aiJail | currentPlayer = modBy 4 (model.currentPlayer + 1)}

randInt: Model -> Int
randInt model =
    let
        dice =get (modBy (List.length model.aiRandomNumber) model.aiRandomNumberIndex) model.aiRandomNumber
    in
        if dice <= 0 || dice > 6 then
            1
        else
            dice

--------------------------------------prepare phase--------------------------------------
aiPrepare: Model -> Player -> Model
aiPrepare model player =
    let
        eventModel =
            if (List.length model.event.optionFunc) == 2 then
                let
                    playerOption1 = refreshPlayer ((get 0 model.event.optionFunc) player)
                    playerOption2 = refreshPlayer ((get 1 model.event.optionFunc) player)
                    model1 = {model | players = setAt (elemIndexSure player model.players) playerOption1 model.players }
                    model2 = {model | players = setAt (elemIndexSure player model.players) playerOption2 model.players }
                in
                    if modBy 2 (randInt model) == 0 then
                        model1
                    else
                        model2
            else
                let
                    playerOption1 = refreshPlayer ((get 0 model.event.optionFunc) player)
                    model1 = {model | players = setAt (elemIndexSure player model.players) playerOption1 model.players }
                in
                    model1

        ------------change money-----------------
        judgePolice = Medium
        judgeFamily = Medium
        newPlayer = {player | familyLevel = judgeFamily, policeReduceLevel = judgePolice }
        newPlayers = setAt eventModel.currentPlayer newPlayer eventModel.players
        changeMoneyModel = {eventModel | players = newPlayers}

        ----------------move---------------------
        rollDiceModel = {changeMoneyModel | dice = randInt changeMoneyModel, aiRandomNumberIndex = changeMoneyModel.aiRandomNumberIndex + 1}
        movedModel = checkMap rollDiceModel
        finalModel = { movedModel | players = updatePlayer movedModel, isMoving = True }

        aiActionModel = aiActionMove finalModel player.order player.order finalModel.dice
    in
        judgeHome aiActionModel

judgeHome: Model -> Model
judgeHome model =
    let
        player = (get model.currentPlayer model.players)
        newPlayer = {player | wealth = player.wealth + 5000, popularWill = player.popularWill + 0.1 }
    in
        if (throughHome model) then
            {model | players = setAt model.currentPlayer newPlayer model.players}
        else
            model

--------------------------------------move phase--------------------------------------
aiGenerateRandomNumber: Model -> Int
aiGenerateRandomNumber model =
    let
        usefulNumber = List.filter (\number -> (((elemIndexSure number model.aiRandomNumber) >= model.aiRandomNumberIndex) && ((elemIndexSure number model.aiRandomNumber) <= model.aiRandomNumberIndex + 15))) model.aiRandomNumber
    in
        List.sum usefulNumber

aiMove: Model -> Player -> Model
aiMove model player =
    let
        currentPlayerSure = get model.currentPlayer model.players
        playerSure = get model.currentPlayer model.players
        currentTile = get player.currentIndex model.map
        owner =
            case currentTile.owner of
                Just thisPlayer ->
                    thisPlayer
                Nothing ->
                    dummyPlayer
        playerAtTile = get (playerSure.currentIndex) model.map
        fee = Tuple.first (assetUpgrade playerAtTile.building)

        judgeUpgrade =
            let
                newModel = {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
            in
            -----------------------------condition!---------------------
                if (fee - player.wealth) >= 100 * toFloat (randInt model) then
                    let
                        model1 = upgradeBuilding newModel
                    in
                        aiActionUpgrade model1 player.order playerAtTile.index
                else
                    aiActionUpgrade model player.order -1

        judgeFight =
            let
                pointTry1 = Tuple.second (calculateAttackResult model (randInt model))
                newModel1 = {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
                pointTry2 = Tuple.second (calculateAttackResult model (randInt model))
                newModel2 = {newModel1 | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}

                randomNumberModel = {newModel2 | randomNumber = aiGenerateRandomNumber model, aiRandomNumberIndex = model.aiRandomNumberIndex + 16}
                point1 = Tuple.first pointTry1
                point2 = Tuple.second pointTry2

                fightModel = Tuple.first (calculateAttackResult randomNumberModel -1)
                payTollModel = payToll randomNumberModel
            in
                if point1 >= point2 then
                    {fightModel | showPopUp = False}
                else
                    {payTollModel | showPopUp = False}
    in
        if owner.character == currentPlayerSure.character && (currentTile.building == Casino 1 || currentTile.building == Disco 1 || currentTile.building == NightMarket 1 || currentTile.building == BoxingGym 1 || currentTile.building == Casino 2 || currentTile.building == Disco 2 || currentTile.building == NightMarket 2 || currentTile.building == BoxingGym 2) then
            judgeUpgrade
        else if owner.character /= dummyPlayer.character && owner.character /= currentPlayerSure.character then
            judgeFight
        else
            model

-------------------------------------implementation phase-----------------------------
aiImple: Model -> Player -> Model
aiImple model player =
    let
        actionDice = generateActionDice [randInt model, randInt {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}, randInt {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}]
        newModel = {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 3}

        reformModel = Tuple.first (reform newModel)
        addModel = Tuple.first (add reformModel)
        fightModel = Tuple.first (fight addModel)
        finalModel = aiActionCount fightModel player.order (Tuple.second (add reformModel), Tuple.second (fight addModel))

        reform: Model -> (Model, Int)
        reform model0=
            if not (List.isEmpty (List.filter (\dice -> dice == Reform) actionDice)) then
                (judgeReform model0 (List.length (List.filter (\dice -> dice == Reform) actionDice)) , List.length (List.filter (\dice -> dice == Reform) actionDice) )
            else
                (model, List.length (List.filter (\dice -> dice == Reform) actionDice))

        add: Model -> (Model, Int)
        add model1=
            if not (List.isEmpty (List.filter (\dice -> dice == AddDice) actionDice)) then
                (judgeAdd model1 player (List.length (List.filter (\dice -> dice == AddDice) actionDice)) 0, List.length (List.filter (\dice -> dice == AddDice) actionDice))
            else
                (model1, List.length (List.filter (\dice -> dice == AddDice) actionDice) )

        fight: Model -> (Model, Int)
        fight model2=
            if not (List.isEmpty (List.filter (\dice -> dice == FightDice) actionDice)) then
                (judgeActionFight model2 player (List.length (List.filter (\dice -> dice == FightDice) actionDice)) 0, List.length (List.filter (\dice -> dice == FightDice) actionDice) )
            else
                (model2, List.length (List.filter (\dice -> dice == FightDice) actionDice) )
    in
        finalModel

judgeReform: Model -> Int -> Model
judgeReform model times =
    let
        dice = randInt model + randInt {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
        newModel = {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 2}
        player = get newModel.currentPlayer newModel.players

        wealthPoint = player.wealth / 2000
        prestigePoint = player.prestige
        policePoint = 1 - player.policeAttention
        popularPoint = player.popularWill
        eleList = [wealthPoint, prestigePoint, policePoint, popularPoint]

        minPoint: List Float -> Float
        minPoint eleList1=
            case List.minimum eleList1 of
                Just current ->
                    current
                _ ->
                    1

        indexNeedChange: List Float-> Int
        indexNeedChange eleList0 =
            if List.length (List.filter (\int -> int == minPoint eleList0) eleList0) == 1 then
                elemIndexSure (minPoint eleList0) eleList0
            else
                let
                    newDice = modBy (List.length (List.filter (\int -> int == minPoint eleList0) eleList0)) dice
                in
                    case newDice of
                        0 ->
                            elemIndexSure (minPoint eleList0) eleList0
                        1 ->
                            indexNeedChange (setAt (elemIndexSure (minPoint eleList0) eleList0) 100 eleList0)
                        2 ->
                            indexNeedChange (setAt (elemIndexSure (minPoint eleList0) eleList0) 100 eleList0)
                        3 ->
                            3
                        _ ->
                            3

        finalModel: Model -> Model
        finalModel model0 =
            case indexNeedChange eleList of
                0 ->
                    {model0 | players = setAt model.currentPlayer {player | wealth = player.wealth + 10 } model.players }
                1 ->
                    {model0 | players = setAt model.currentPlayer {player | prestige = min 1 (player.prestige + 0.1) } model.players}
                2 ->
                    {model0 | players = setAt model.currentPlayer {player | policeAttention = max 0 (player.policeAttention - 0.1) } model.players}
                3 ->
                    {model0 | players = setAt model.currentPlayer {player | popularWill = min 1 (player.popularWill + 0.1) } model.players}
                _ ->
                    model0
    in
        if times == 1 then
            finalModel newModel
        else
            judgeReform (finalModel newModel) (times - 1)

judgeAdd: Model -> Player -> Int -> Int -> Model
judgeAdd model player addTimes showTimes =
    let
        tileIndex = Tuple.first (autoAddMembers model)
        newModel = {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 12}
        indicator = Tuple.second (autoAddMembers model)
        tile = get tileIndex newModel.map
        familyMember num= setAt newModel.currentPlayer ((get newModel.currentPlayer tile.familyMember) + num) tile.familyMember
        addedModel =
            if indicator == 1 then
                {newModel | map = setAt tile.index {tile | familyMember = familyMember 1} model.map}
            else
                if player.character == Blair then
                    {newModel | map = setAt tile.index {tile | familyMember = familyMember 3} model.map}
                else
                    {newModel | map = setAt tile.index {tile | familyMember = familyMember 2} model.map}
        finalModel = addedModel

        judgeBlair int = if int == 2 && player.character == Blair then 3 else int

        add = (tileIndex, judgeBlair indicator)
        aaModel = aiActionAdd finalModel player.order showTimes add
    in
        if addTimes == 1 then
            aaModel
        else
            judgeAdd aaModel player (addTimes - 1) (showTimes + 1)

judgeActionFight: Model -> Player -> Int -> Int -> Model
judgeActionFight model player times order =
    let
        chooseModel = chooseTileToFight model
        enemy = Tuple.second (Tuple.first (chooseModel))
        aimedTile = get (Tuple.first (Tuple.first (chooseModel)) ) model.map
        newModel = {model | randomNumber = aiGenerateRandomNumber model, aiRandomNumberIndex = model.aiRandomNumberIndex + 2000}
        attackNow = calculateActionAttackResult newModel enemy (randInt model) aimedTile -1
        finalModel = Tuple.first (attackNow)
        fight = ((Tuple.first (Tuple.first (chooseModel)) ), enemy, Tuple.first (Tuple.second attackNow))
        aaModel = aiActionFight finalModel player.order order fight
    in
        if Tuple.second (chooseModel) == True then
            if times == 1 then
                aaModel
            else
                judgeActionFight aaModel player (times - 1) (order + 1)
        else
            if times == 1 then
                (aiActionFight finalModel player.order order (100, enemy, Tuple.first (Tuple.second attackNow)))
            else
                judgeActionFight  (aiActionFight finalModel player.order order (100, enemy, Tuple.first (Tuple.second attackNow))) player (times - 1) (order + 1)

chooseTileToFight: Model -> ((Int, Int), Bool)
chooseTileToFight model =
    let
        -------------------------get other players--------------------------
        playerIndex1 = modBy 4 (model.currentPlayer + 1)
        playerIndex2 = modBy 4 (model.currentPlayer + 2)
        playerIndex3 = modBy 4 (model.currentPlayer + 3)
        playerIndexList = [playerIndex1, playerIndex2, playerIndex3]
        ---------------------------tiles and testFight Prepration-----------
        tiles = model.map
        canAttackTiles = List.filter (\tile -> (get model.currentPlayer tile.familyMember) > 0) tiles
        newModel = {model | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
        ---------------------------test fight--------------------------------
        tiles0 = List.map resetScore canAttackTiles
        scoreList = List.map generateScore tiles0
        resetScore: Tile -> Tile
        resetScore tile0 =
            {tile0 | score = [-1, -1, -1]}
        generateScore: Tile -> Tile
        generateScore tile0 =
            let
                owner =
                    case tile0.owner of
                        Just player ->
                            player
                        Nothing ->
                            dummyPlayer
                fightTry1 = calculateActionAttackResult newModel playerIndex1 (randInt model) tile0 1
                newModel1 = {newModel | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
                fightTry2 = calculateActionAttackResult newModel1 playerIndex2 (randInt model) tile0 1
                newModel2 = {newModel1 | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
                fightTry3 = calculateActionAttackResult newModel2 playerIndex3 (randInt model) tile0 1
                newModel3 = {newModel2 | aiRandomNumberIndex = model.aiRandomNumberIndex + 1}
                score1 = ifWin [fightTry1, fightTry2, fightTry3]
                score2 = familyLose [fightTry1, fightTry2, fightTry3]
                score3 = ifSafe (get model.currentPlayer tile0.familyMember) (get playerIndex1 tile0.familyMember) (get playerIndex2 tile0.familyMember) (get playerIndex3 tile0.familyMember)
                score4 = ifConquer [fightTry1, fightTry2, fightTry3]
                score5 = punishOnNoMember (get model.currentPlayer tile0.familyMember) (get playerIndex1 tile0.familyMember) (get playerIndex2 tile0.familyMember) (get playerIndex3 tile0.familyMember)
                ifWin: (List (Model, (Bool, Int))) -> List Int
                ifWin list =
                    List.map (\item -> if Tuple.first (Tuple.second item) == True then 0 else -500 ) list
                familyLose: (List (Model, (Bool, Int))) -> List Int
                familyLose list =
                    List.map (\item -> Tuple.second (Tuple.second item)*1000 ) list
                punishOnNoMember: Int -> Int -> Int -> Int -> List Int
                punishOnNoMember me e1 e2 e3 =
                    let
                        tran: Int -> Int
                        tran int= if int == 0 || me == 0 then -1000000 else 0
                    in
                        [tran e1, tran e2, tran e3]
                ifSafe: Int -> Int -> Int -> Int -> List Int
                ifSafe me e1 e2 e3 =
                    let
                        tran: Int -> Int
                        tran int= if int == tile0.stability || int == tile0.stability + 1 then 10000 else -10000
                    in
                        if owner == get model.currentPlayer model.players then
                            [tran (me - e1), tran (me - e2), tran (me - e3)]
                        else
                            [0, 0, 0]
                ifConquer: (List (Model, (Bool, Int))) -> List Int
                ifConquer list =
                    let
                        canConquer: Model -> Bool
                        canConquer modelc =
                            let
                                newTile0 = get (elemIndexSure tile0 model.map) modelc.map
                                ownerc =
                                    case newTile0.owner of
                                        Just playerc ->
                                            playerc
                                        Nothing ->
                                            dummyPlayer
                            in
                                if ownerc == dummyPlayer then True else False
                    in
                        List.map (\item -> if canConquer (Tuple.first item) == True then 5000 else 0 ) list
            in
                if owner /= get model.currentPlayer model.players && owner /= dummyPlayer then
                    { tile0 | score = totals (totals (totals score1 score2) (totals score3 score4)) score5}
                else
                    { tile0 | score = totals (totals (totals score1 score2) score3) score5}

        justScore = List.map (\x -> x.score) scoreList
        maxScoreEach = List.map (\x -> maxSure x) justScore
        maxScore = maxSure maxScoreEach
        tileHaveMax = List.filter (\x -> maxSure x.score == maxScore) scoreList
        randomInt = getRandomNumber newModel (List.length tileHaveMax)
        finalIndex = (get randomInt tileHaveMax).index
        playerIndex =
            let
                tileScore = (get finalIndex scoreList).score
                maxSingle = maxSure tileScore
            in
                elemIndexSure maxSingle tileScore
    in
        if maxScore > 0 then
            ((finalIndex, get playerIndex playerIndexList), True)
        else
            ((finalIndex, get playerIndex playerIndexList), False)

totals : List Int -> List Int -> List Int
totals xs ys =
  List.map2 (+) xs ys

pairs : List a -> List b -> List (a,b)
pairs xs ys =
  List.map2 Tuple.pair xs ys

maxSure: List Int -> Int
maxSure list =
    case List.maximum list of
        Just a ->
            a
        Nothing ->
            -1

generateActionDice: (List Int) -> (List DiceKind)
generateActionDice list =
    let
        judgeKind: Int -> DiceKind
        judgeKind int =
            case int of
                1 -> AddDice
                2 -> FightDice
                3 -> Reform
                4 -> AddDice
                5 -> FightDice
                6 -> AddDice
                _ -> AddDice
    in
        List.map judgeKind list

--------------------------------ai End-----------------------------------------------------------------
aiEnd: Model -> Model
aiEnd model =
    let
        player = get model.currentPlayer model.players
        newPlayer = {player | jailRound = player.jailRound - 1, wealth = player.wealth + (calculatePF model) - ((familyCost (get model.currentPlayer model.players)) / 3) - (policeReduceCost (get model.currentPlayer model.players))}
        newModel = {model | players = setAt model.currentPlayer (refreshPlayer newPlayer) model.players}

        jailPlayer = {player | jailRound = 2, policeAttention = 0.25, wealth = player.wealth + (calculatePF model) - (familyCost (get model.currentPlayer model.players)) / 3 - (policeReduceCost (get model.currentPlayer model.players)), currentIndex = 24, currentPos = (90, 40)}
        jailModel = {model | players = setAt model.currentPlayer (refreshPlayer jailPlayer) model.players}
        finalPlayers = updatePlayerJail jailModel

    in
        if player.policeAttention > 0.99 then
            {jailModel | players = finalPlayers }
        else
            newModel

------------------from update--------------------
updatePlayer : Model -> List Player
updatePlayer model =
    let
        currentPlayer = getCurrentPlayer model
        modList =
            let
                fun : Int -> Int
                fun num =
                    modBy (List.length model.map) num
            in
                List.map fun (List.range currentPlayer.currentIndex (currentPlayer.currentIndex + model.dice))
        frameList = convertToFrame (modList) model.map
        newIndex = modBy (List.length model.map) (currentPlayer.currentIndex + model.dice)
        newPos = Maybe.withDefault (0, 0) (getAt newIndex (List.map (\this -> this.position) model.map))
        updated = { currentPlayer | currentIndex = newIndex, frameList = frameList, currentPos = newPos }
    in
        (List.take model.currentPlayer model.players) ++ [updated] ++ (List.drop (model.currentPlayer + 1) model.players)

--------------------------jail related function--------------------------------
updatePlayerJail : Model -> List Player
updatePlayerJail model =
    let
        currentPlayer = getCurrentPlayer0 model
        modList =
            let
                fun : Int -> Int
                fun num =
                    modBy (List.length model.map) num
            in
                List.map fun (List.range currentPlayer.currentIndex (currentPlayer.currentIndex))
        frameList = convertToFrame0 (modList) model.map
        newIndex = modBy (List.length model.map) (currentPlayer.currentIndex)
        newPos = Maybe.withDefault (0, 0) (getAt newIndex (List.map (\this -> this.position) model.map))
        updated = { currentPlayer | currentIndex = newIndex, frameList = frameList, currentPos = newPos }
    in
        (List.take model.currentPlayer model.players) ++ [updated] ++ (List.drop (model.currentPlayer + 1) model.players)


getCurrentPlayer0 : Model -> Player
getCurrentPlayer0 model =
    model.players
        |> getAt model.currentPlayer
        |> withDefault
        dummyPlayer

--convert list of data to frame list
convertToFrame0 : List Int -> List Tile -> List(Int, List Property)
convertToFrame0 indexList map =
    let
        length = List.length indexList
        timeGap = Basics.round (100 / (toFloat length))
        fullTimeList =
            List.append (List.map ((*) timeGap) (List.range 0 (length - 2))) [100]
        getTuple : Int -> Int -> (Int, List Property)
        getTuple percent index =
            let
                x = Tuple.first (Maybe.withDefault (0, 0) (getAt index (List.map (\this -> this.position) map)))
                y = Tuple.second (Maybe.withDefault (0, 0) (getAt index (List.map (\this -> this.position) map)))
            in
                (percent, [custom "left" (fromInt x ++ "%"), custom "top" (fromInt y ++ "%")])
    in
        List.map2 getTuple fullTimeList indexList

-------------------------------aiAction for log---------------------------------------
aiActionMove: Model -> Int -> Int -> Int -> Model
aiActionMove model playerIndex order move =
    let
        human = get 0 (List.filter (\x -> x.isHuman) model.players)
        humanIndex = human.order
        aiAction1 = get (playerIndex - 1) model.aiAction
        newAA1 = {aiAction1 | order = order, move = move}

        aiAction2 = get playerIndex model.aiAction
        newAA2 = {aiAction2 | order = order, move = move}
    in
        if playerIndex > humanIndex then
            {model | aiAction = setAt (playerIndex - 1) newAA1 model.aiAction}
        else
            {model | aiAction = setAt playerIndex newAA2 model.aiAction}

aiActionUpgrade: Model -> Int -> Int -> Model
aiActionUpgrade model playerIndex upgrade =
    let
        human = get 0 (List.filter (\x -> x.isHuman) model.players)
        humanIndex = human.order
        aiAction1 = get (playerIndex - 1) model.aiAction
        newAA1 = {aiAction1 | upgrade = upgrade}

        aiAction2 = get playerIndex model.aiAction
        newAA2 = {aiAction2 | upgrade = upgrade}
    in
        if playerIndex > humanIndex then
            {model | aiAction = setAt (playerIndex - 1) newAA1 model.aiAction}
        else
            {model | aiAction = setAt playerIndex newAA2 model.aiAction}

aiActionCount: Model -> Int -> (Int, Int) -> Model
aiActionCount model playerIndex count =
    let
        human = get 0 (List.filter (\x -> x.isHuman) model.players)
        humanIndex = human.order
        aiAction1 = get (playerIndex - 1) model.aiAction
        newAA1 = {aiAction1 | count = count}

        aiAction2 = get playerIndex model.aiAction
        newAA2 = {aiAction2 | count = count}
    in
        if playerIndex > humanIndex then
            {model | aiAction = setAt (playerIndex - 1) newAA1 model.aiAction}
        else
            {model | aiAction = setAt playerIndex newAA2 model.aiAction}

aiActionAdd: Model -> Int -> Int -> (Int, Int) -> Model
aiActionAdd model playerIndex times add =
    let
        human = get 0 (List.filter (\x -> x.isHuman) model.players)
        humanIndex = human.order
        aiAction1 = get (playerIndex - 1) model.aiAction
        newAA1 = {aiAction1 | add = setAt times add aiAction1.add}

        aiAction2 = get playerIndex model.aiAction
        newAA2 = {aiAction2 | add = setAt times add aiAction2.add}
    in
        if playerIndex > humanIndex then
            {model | aiAction = setAt (playerIndex - 1) newAA1 model.aiAction}
        else
            {model | aiAction = setAt playerIndex newAA2 model.aiAction}


aiActionFight: Model -> Int -> Int -> (Int, Int, Bool) -> Model
aiActionFight model playerIndex times fight =
    let
        human = get 0 (List.filter (\x -> x.isHuman) model.players)
        humanIndex = human.order
        aiAction1 = get (playerIndex - 1) model.aiAction
        newAA1 = {aiAction1 | fight = setAt times fight aiAction1.fight}

        aiAction2 = get playerIndex model.aiAction
        newAA2 = {aiAction2 | fight = setAt times fight aiAction2.fight}
    in
        if playerIndex > humanIndex then
            {model | aiAction = setAt (playerIndex - 1) newAA1 model.aiAction}
        else
            {model | aiAction = setAt playerIndex newAA2 model.aiAction}

aiRecord : Model -> Model
aiRecord model =
    let
        round = model.round.index
        roundRec = "----- ROUND " ++ toString round ++ " -----\n"

        parseRecord : AiAction -> String
        parseRecord aiAction =
            let
                aiPlayer = get aiAction.order model.players
                aiName = playerName aiPlayer
                atTileIndex = aiAction.upgrade -- -1 means no upgrading
                buildingName =
                    if atTileIndex == -1 then
                        ""
                    else
                        Tuple.first (buildingLevel model.map atTileIndex)
                level =
                    if atTileIndex == -1 then
                        ""
                    else
                        Tuple.second (buildingLevel model.map atTileIndex)
                move = aiAction.move
                addTimes = Tuple.first aiAction.count
                fightTimes = Tuple.second aiAction.count
                moveRec = aiName ++ " moved " ++ toString move ++ " tiles.\n"
                upgradeRec =
                    if aiAction.upgrade == -1 then
                        ""
                    else
                        aiName ++ " upgraded " ++ buildingName ++ " to " ++ level ++ ".\n"
                addRec =
                    let
                        aiAdd = List.indexedMap (\index x -> if index > addTimes - 1 then (100, 0) else x) aiAction.add
                        single : (Int, Int) -> String
                        single (place, quantity) =
                            if place == 100 then
                                ""
                            else
                                aiName ++ " sent " ++ toString quantity ++ " member(s) to Tile No." ++ toString place ++ ".\n"
                    in
                        if addTimes == 0 then
                            ""
                        else
                            String.concat (List.map single aiAdd)

                aiFight = List.indexedMap (\index x -> if index > fightTimes - 1 then (100, 0, False) else x) aiAction.fight
                fightRec =
                    let
                        single : (Int, Int, Bool) -> String
                        single (place, enemy, result) =
                            let
                                winLose =
                                    if result then
                                        "won"
                                    else
                                        "lost"
                            in
                                if place == 100 then
                                    ""
                                else
                                    if fightTimes == 0 then
                                        ""
                                    else
                                        aiName ++ " attacked " ++ playerName (get enemy model.players) ++ " on Tile No." ++ toString place ++ " and " ++ winLose ++ ".\n"
                   in
                        String.concat (List.map single aiFight)
            in
                if aiPlayer.exist then
                    if aiPlayer.jailRound >= 0 then
                        aiName ++ " is in jail...\n"
                    else
                        moveRec ++ upgradeRec ++ addRec ++ fightRec
                else
                    aiName ++ " has been kicked out from Fortun...\n"

        appended = roundRec ++ String.concat (List.map parseRecord model.aiAction)
    in
        { model | aiRecord = String.append model.aiRecord appended }