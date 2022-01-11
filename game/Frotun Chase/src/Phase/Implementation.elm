module Phase.Implementation exposing (..)

import List.Extra exposing (..)
import Debug exposing (toString)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style, title)
import Html.Styled.Events exposing (onClick)
import Round
import Map exposing (..)
import Style exposing (..)
import Condition exposing (..)
import Definition exposing (..)

----------------------implementPhase-----------------------------------------------------------
implementPhase:  Model -> SubRoundPhase -> ClickState -> Model
implementPhase model subPhase clickState=
    case subPhase of
        RollActionDice ->
            regularRefresh model
        UseActionDice diceKind buttonNumber->
            regularRefresh (useActionDice model diceKind clickState buttonNumber)
        _ ->
          model

testFunctionVanish: Model -> Int -> Model
testFunctionVanish model buttonNumber =
        { model | showActionDiceRespectively = setAt buttonNumber (not (get buttonNumber model.showActionDiceRespectively)) model.showActionDiceRespectively, showPopUp = False }

useActionDice: Model -> DiceKind -> ClickState -> Int -> Model
useActionDice model diceKind clickState buttonNumber=
    let
        offSEModel = seAllFalse model
    in
        case diceKind of
            MoveDice ->
                { offSEModel | showDice = RollingDice
                        , showActionDiceRespectively = setAt buttonNumber (not (get buttonNumber offSEModel.showActionDiceRespectively)) offSEModel.showActionDiceRespectively
                        , viewPopUp = implementationEnd offSEModel
                        , showPopUp = judgePopUp offSEModel }
            FightDice ->
                fightDice offSEModel buttonNumber clickState
            AddDice ->
                addDice offSEModel buttonNumber clickState
            FightOrAdd ->
                fightOrAdd offSEModel clickState buttonNumber
            Lucky ->
                changeToOtherDice offSEModel clickState buttonNumber
            Reform ->
                reform offSEModel clickState buttonNumber
            _ ->
                testFunctionVanish offSEModel buttonNumber


reform: Model -> ClickState -> Int -> Model
reform model clickState buttonNumber =
    let
        model1 = testFunctionVanish model buttonNumber
        player = get model.currentPlayer model.players
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Reform"
            , descriptionText = "Select one of the following bonus! Once you select, you can get Wealth +1000 or Prestige +5% or Police Attention -5% or Popular Will +5%."
            , buttons = [
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Reform buttonNumber) Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "4%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Wealth +1000"
                       , buttonYes
                       ]
                       [ text ("Money") ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Reform buttonNumber) Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "28%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Prestige +5%"
                       , buttonYes
                       ]
                       [ text ("Prestige") ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Reform buttonNumber) Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "52%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Police Attention -5%"
                       , buttonYes
                       ]
                       [ text ("Police Attention") ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Reform buttonNumber) Click4)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "76%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Popular Will +5%"
                       , buttonYes
                       ]
                       [ text "Popular Will" ]
                ]
            }
    in
        case clickState of
            Click1 ->
                {model1 | reformSE = True, players = setAt model.currentPlayer {player | wealth = player.wealth + 1000 } model.players, viewPopUp = implementationEnd model1, showPopUp = judgePopUp model1 }
            Click2 ->
                {model1 | reformSE = True, players = setAt model.currentPlayer {player | prestige = min 1 (player.prestige + 0.05) } model.players, viewPopUp = implementationEnd model1, showPopUp = judgePopUp model1}
            Click3 ->
                {model1 | reformSE = True, players = setAt model.currentPlayer {player | policeAttention = max 0 (player.policeAttention - 0.05) } model.players, viewPopUp = implementationEnd model1, showPopUp = judgePopUp model1}
            Click4 ->
                {model1 | reformSE = True, players = setAt model.currentPlayer {player | popularWill = min 1 (player.popularWill + 0.05) } model.players, viewPopUp = implementationEnd model1, showPopUp = judgePopUp model1}
            _ ->
                {model | viewPopUp = viewPopUp, showPopUp = True, battleHighlight = False, highlight = False}

addDice: Model -> Int -> ClickState ->Model
addDice model buttonNumber clickState =
    let
        addResult = addFamily model
        modelClickYes = testFunctionVanish addResult buttonNumber
    in
        case clickState of
            NotClick ->
                {model | addOrFight = "add", canSelectTile = True, fightButtonNumber = buttonNumber, battleHighlight = False, highlight = True}
            Click4 -> ---yes
                {modelClickYes | addSE = True, addOrFight = "add", canSelectTile = False, highlight = False, viewPopUp = implementationEnd modelClickYes, showPopUp = judgePopUp modelClickYes }
            Click5 -> ----No
                {model | addOrFight = "add",canSelectTile = False, showPopUp = False, highlight = False }
            _ ->
                {model | addOrFight = "add",showPopUp = True}

addFamily: Model -> Model
addFamily model =
    let
        currentTile = get model.selectedTileIndex model.map
        currentPlayer = get model.currentPlayer model.players
        familyMemberPlus2 = setAt model.currentPlayer ((get model.currentPlayer currentTile.familyMember) + addBonus) currentTile.familyMember
        familyMemberPlus1 = setAt model.currentPlayer ((get model.currentPlayer currentTile.familyMember) + 1) currentTile.familyMember
        addBonus =
            case currentPlayer.character of
                Blair ->
                    3
                _ ->
                    2
        addedTile =
            case currentTile.owner of
                Just player ->
                    if player.character == currentPlayer.character then
                        { currentTile | familyMember = familyMemberPlus2 }
                    else
                        { currentTile | familyMember = familyMemberPlus1 }
                Nothing ->
                    { currentTile | familyMember = familyMemberPlus2 }
        addedPlayer =
            case currentTile.owner of
                Just player ->
                    if player.character == currentPlayer.character then
                        { currentPlayer | family = currentPlayer.family + addBonus }
                    else
                        { currentPlayer | family = currentPlayer.family + 1 }
                Nothing ->
                    { currentPlayer | family = currentPlayer.family + addBonus }

        updatedPlayers = setAt model.currentPlayer addedPlayer model.players
    in
        { model | map = setAt model.selectedTileIndex addedTile model.map, players = updatedPlayers }

fightDice: Model -> Int -> ClickState ->Model
fightDice model buttonNumber clickState =
    let
        findCharacter: Int -> String
        findCharacter number =
            case modBy 4 (number + model.currentPlayer) of
                0 -> "Lance"
                1 -> "Gorman"
                2 -> "Doherty"
                3 -> "Blair"
                _ -> " "

        battleResult playerIndex= calculateActionAttackResult model playerIndex -1 (get 0 model.map)
        modelClickYes playerIndex= testFunctionVanish (Tuple.first (battleResult playerIndex buttonNumber)) buttonNumber
        modelChoose1 = modelClickYes (modBy 4 (model.currentPlayer + 1))
        modelChoose2 = modelClickYes (modBy 4 (model.currentPlayer + 2))
        modelChoose3 = modelClickYes (modBy 4 (model.currentPlayer + 3))

        playerIndexList = [((modBy 4 (model.currentPlayer + 1)), 0), ((modBy 4 (model.currentPlayer + 2)), 1), ((modBy 4 (model.currentPlayer + 3)), 2)]
        canFightIndex = judgeCanFightWith playerIndexList

        judgeCanFightWith: List (Int, Int) -> List (Int, Int)
        judgeCanFightWith list =
            let
                family = (get model.selectedTileIndex model.map).familyMember
                zeroMember list0 = List.filter (\x -> (get (Tuple.first x) family) > 0 ) list0
                playerExist list1 = List.filter (\x -> (get (Tuple.first x) model.players).exist == True) list1
            in
                if get model.currentPlayer family == 0 then
                    []
                else
                    zeroMember (playerExist list)

        getButton: List (List (Attribute Msg), List (Html Msg)) -> List (Int, Int) -> List (List (Attribute Msg), List (Html Msg))
        getButton buttons filteredList=
            let
                tranIndex list = List.map (\x -> Tuple.second x) list
            in
                List.map (\x -> get x buttons) (tranIndex filteredList)

        usefulButton = changeLeft (getButton buttonList canFightIndex)

        changeLeft: List (List (Attribute Msg), List (Html Msg)) -> (List (List (Attribute Msg), List (Html Msg)), Int)
        changeLeft buttons =
            case List.length buttons of
                1 ->
                    let
                        abm0 = Tuple.first (get 0 buttons)
                        html0 = Tuple.second (get 0 buttons)

                        newABM0 = setAt 3 (style "left" "20%") abm0
                    in
                        ((setAt 0 (newABM0, html0) buttons), 1)
                2 ->
                    let
                        abm0 = Tuple.first (get 0 buttons)
                        html0 = Tuple.second (get 0 buttons)
                        abm1 = Tuple.first (get 1 buttons)
                        html1 = Tuple.second (get 1 buttons)

                        newABM0 = setAt 3 (style "left" "10%") abm0
                        newABM1 = setAt 3 (style "left" "40%") abm1
                    in
                        (setAt 1 (newABM1, html1) (setAt 0 (newABM0, html0) buttons), 2)
                _ ->
                    (buttons, List.length buttons)


        buttonList =
            [
            ([ onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click6)
               , style "width" "20%"
               , style "height" "10%"
               , style "left" "4%"
               , style "top" "80%"
               , style "position" "absolute"
               , style "font-size" "1vw"
               , style "font-weight" "bold"
               , buttonYes
               ], [ text (findCharacter 1) ])
               ,
            ([ onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click7)
               , style "width" "20%"
               , style "height" "10%"
                , style "left" "28%"
                , style "top" "80%"
                , style "position" "absolute"
                , style "font-size" "1vw"
                , style "font-weight" "bold"
                , buttonYes
               ],
               [ text (findCharacter 2) ])
               ,
            ([ onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click8)
               , style "width" "20%"
               , style "height" "10%"
               , style "left" "52%"
               , style "top" "80%"
               , style "position" "absolute"
               , style "font-size" "1vw"
               , style "font-weight" "bold"
               , buttonYes
               ],
               [ text (findCharacter 3) ])
            ]

        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Who do you want to fight with?"
            , descriptionText = "Click to select a family to fight with."
            , buttons = List.append (List.map (\x -> button (Tuple.first x) (Tuple.second x)) (Tuple.first usefulButton))
                [
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click5)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" chooseGiveUp
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Give Up" ]
                ]
            }
        chooseGiveUp: String
        chooseGiveUp =
            case Tuple.second usefulButton of
                0 -> "40%"
                1 -> "60%"
                2 -> "70%"
                3 -> "76%"
                _ -> "70%"
    in
        case clickState of
            NotClick ->
                {model | addOrFight = "fight",canSelectTile = False, battleHighlight = False, fightButtonNumber = buttonNumber, viewPopUp = implementationEnd model, showPopUp = judgePopUp model}
            Click4 -> ---yes
                {model | addOrFight = "fight",canSelectTile = False, battleHighlight = False, showPopUp = True, viewPopUp = viewPopUp }
            Click5 -> ----No
                {model | addOrFight = "fight",canSelectTile = False, battleHighlight = False, showPopUp = False }
            Click6 -> ---Player+1
                {modelChoose1 | fightSE = True, addOrFight = "fight",canSelectTile = False, battleHighlight = False, showPopUp = True, fightIndicator = 1 }
            Click7 -> ---Player+2
                {modelChoose2 | fightSE = True, addOrFight = "fight",canSelectTile = False, battleHighlight = False, showPopUp = True, fightIndicator = 2 }
            Click8 -> ---Player+3
                {modelChoose3 | fightSE = True, addOrFight = "fight",canSelectTile = False, battleHighlight = False, showPopUp = True, fightIndicator = 3 }
            _ ->
               {model | addOrFight = "fight",canSelectTile = True, highlight = False, battleHighlight = True, fightButtonNumber = buttonNumber, showPopUp = False}


calculateActionAttackResult: Model -> Int -> Int -> Tile -> Int -> (Model, (Bool, Int))
calculateActionAttackResult model enemyIndex aiDice tile0 buttonNumber=
    let
        currentPlayerIndex = model.currentPlayer
        currentPlayer = get currentPlayerIndex model.players
        enemy = get enemyIndex model.players
        selectedTile =
            if aiDice == -1 then
                get model.selectedTileIndex model.map
            else
                tile0
        findRandom1: Int -> Int
        findRandom1  num =
            if num == -1 then
                modBy 10 model.randomNumber -- model.random = 0-100
            else
                num

        findRandom2: Int -> Int
        findRandom2 num =
           if num == -1 then
               if selectedTile.building == BoxingGym 1 || selectedTile.building == BoxingGym 2 then 
                    (model.randomNumber - random1) // 10 + 1
               else if selectedTile.building == BoxingGym 3 then
                    (model.randomNumber - random1) // 10 + 2
               else
                    (model.randomNumber - random1) // 10
           else
                num

        random1 = findRandom1 aiDice
        random2 = findRandom2 aiDice

        factorFromDice: Int -> Float
        factorFromDice diceNumber=
            case diceNumber of
                0 ->
                    0.8
                _ ->
                   0.05 * (toFloat diceNumber) + 0.95

        factorFromAdjacentTiles : Int -> Float -- factor of adjacent tiles under control
        factorFromAdjacentTiles num =
            case num of
                1 ->
                    1.1
                2 ->
                    1.3
                _ ->
                    1

        avoidOverflowInt : Int -> Int
        avoidOverflowInt int = max 0 int

        avoidOverflowFloat : Float -> Float
        avoidOverflowFloat float =
            if float >= 1 then
                1
            else
                max 0 float

        familyLevelFactor : Level -> Float
        familyLevelFactor level =
            case level of
                Low ->
                    0.9
                Medium ->
                    1
                High ->
                    1.1

        countAdjacentTiles : Player -> Int --count the adjacent tiles which is under control of a player
        countAdjacentTiles player =
            let
                index = player.currentIndex
                adjacentIndex = [ modBy (List.length model.map) (index - 1), modBy (List.length model.map) (index + 1) ]
                adjacentTiles = List.map (\x -> get x model.map) adjacentIndex
                judge : Tile -> Int
                judge thisTile =
                    case thisTile.owner of
                        Just thisPlayer ->
                            if thisPlayer.character == player.character then
                                1
                            else
                                0
                        Nothing ->
                            0
            in
                List.sum (List.map judge adjacentTiles)
        point : Player -> Tile -> Int -> Float -- winning condition formula
        point thisPlayer thisTile diceNumber=
            let
                thisOrder = thisPlayer.order
                thisFamily = get thisOrder thisTile.familyMember
            in
                toFloat thisFamily * sqrt(thisPlayer.prestige) * factorFromAdjacentTiles (countAdjacentTiles thisPlayer) * (factorFromDice diceNumber)

        point1 = point currentPlayer selectedTile random1 --float
        point2 = point enemy selectedTile random2
        family1 = get currentPlayerIndex selectedTile.familyMember --int
        family2 = get enemyIndex selectedTile.familyMember
        familyBonus1 = familyLevelFactor currentPlayer.familyLevel
        familyBonus2 = familyLevelFactor enemy.familyLevel
        combatEf1 = (1 + sqrt prestige1) * familyBonus1 * (factorFromDice random1) * factorFromAdjacentTiles (countAdjacentTiles currentPlayer) --float
        combatEf2 = (1 + sqrt prestige2) * familyBonus2 * (factorFromDice random2) * factorFromAdjacentTiles (countAdjacentTiles enemy)
        totalLoss = round(sqrt(toFloat(family1 + family2))) --(family1 + family2) |> toFloat |> sqrt |> round --int
        prestige1 = currentPlayer.prestige --float
        prestige2 = enemy.prestige
        popular1 = currentPlayer.popularWill --float
        popular2 = enemy.popularWill
        police1 = currentPlayer.policeAttention --float
        police2 = enemy.policeAttention
        tilesOwned1 = List.length (List.filter (judgeOwner currentPlayer) model.map) --int
        tilesOwned2 = List.length (List.filter (judgeOwner enemy) model.map)
        prestigeBonus : Player -> Float
        prestigeBonus thisPlayer =
            case thisPlayer.character of
                Gorman ->
                    1.5
                _ ->
                    1
        policeBonus : Player -> Float
        policeBonus thisPlayer =
            case thisPlayer.character of
                Doherty ->
                    1.5
                _ ->
                    1

        judgeOwner : Player -> Tile -> Bool
        judgeOwner thisPlayer thisTile =
            case thisTile.owner of
                Just aPlayer ->
                    if thisPlayer.character == aPlayer.character then
                        True
                    else
                        False
                Nothing ->
                    False

        win =
            if point1 > point2 then
                True
            else
                if point1 < point2 then
                    False
                else
                    if family1 > family2 then
                        True
                    else
                        if family1 < family2 then
                            False
                        else
                            if prestige1 >= prestige2 then
                                True
                            else
                                False

        popularDelta1 = if win then --float
                            0.02
                        else
                            -(min 0.1 (0.01 * toFloat tilesOwned1))

        popularDelta2 = if win then
                            -(min 0.1 (0.01 * toFloat tilesOwned2))
                        else
                            0.02

        familyDelta1 = negate(round(toFloat totalLoss * combatEf2 / (combatEf1 + combatEf2))) --int
        familyDelta2 = negate(round(toFloat totalLoss * combatEf1 / (combatEf1 + combatEf2)))

        popularPoliceFactor : Float -> Float
        popularPoliceFactor popular =
            if popular <= 0.3 then
                -10.0 / 3.0 * popular + 2.0
            else
                -5.0 / 7.0 * popular + 17.0 / 14.0


        policeDelta1 = if win then --float
                   ((popularPoliceFactor popular1) * 0.04) / policeBonus currentPlayer
               else
                   ((popularPoliceFactor popular1) * 0.02) / policeBonus currentPlayer
        policeDelta2 = if enemy.jailRound < 0 then
                   ((popularPoliceFactor popular2) * 0.02) / policeBonus enemy
               else
                   0

        prestigeDelta1 = if win then --float
                              0.05 * prestige2 * prestigeBonus currentPlayer
                         else
                             -0.05 * prestige2
        prestigeDelta2 = if win then
                             -0.05 * prestige1
                         else
                             0.05 * prestige1 * prestigeBonus enemy

        updateFamily =
            setAt enemyIndex (avoidOverflowInt (family2 + familyDelta2))
                (setAt currentPlayerIndex (avoidOverflowInt (family1 + familyDelta1)) selectedTile.familyMember)
        updateTile = { selectedTile | familyMember = updateFamily }
        updateMap =
            setAt selectedTile.index updateTile model.map

        updatePlayer1 = { currentPlayer | popularWill = avoidOverflowFloat (popular1 + popularDelta1)
                                        , family = avoidOverflowInt (currentPlayer.family + familyDelta1)
                                        , policeAttention = avoidOverflowFloat (police1 + policeDelta1)
                                        , prestige = avoidOverflowFloat (prestige1 + prestigeDelta1)
                        }
        updatePlayer2 = { enemy | popularWill = avoidOverflowFloat (popular2 + popularDelta2)
                                , family = avoidOverflowInt (enemy.family + familyDelta2)
                                , policeAttention = avoidOverflowFloat (police2 + policeDelta2)
                                , prestige = avoidOverflowFloat (prestige2 + prestigeDelta2)
                        }
        updatePlayers =
            setAt enemyIndex updatePlayer2
                (setAt currentPlayerIndex (updatePlayer1) model.players)

        updateModel = { model | players = updatePlayers, map = updateMap, viewPopUp = viewPopUp, showPopUp = True }


        viewPopUp1 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "LOSE"
            , descriptionText = "We lose " ++ Round.round 0 ((prestige1 - updatePlayer1.prestige) * 100) ++ "% Prestige." ++ "\n"
                             ++ "We lose " ++ (toString (family1 - avoidOverflowInt (family1 + familyDelta1))) ++ " Family members." ++ "\n"
                             ++ "We get " ++ Round.round 0 ((updatePlayer1.policeAttention - police1) * 100) ++ "% Police Attention." ++ "\n"
                             ++ "\n"
                             ++ "Enemy get " ++ Round.round 0 ((updatePlayer2.prestige - prestige2) * 100) ++ "% Prestige." ++ "\n"
                             ++ "Enemy lose " ++ (toString (family2 - avoidOverflowInt (family2 + familyDelta2))) ++ " Family members." ++ "\n"
                             ++ "Enemy get " ++ Round.round 0 ((updatePlayer2.policeAttention - police2) * 100) ++ "% Police Attention."
            , buttons = [
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) NotClick)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Damn!" ]
            ]
            }

        viewPopUp2 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "WIN!"
            , descriptionText = "We get " ++ Round.round 0 ((updatePlayer1.prestige - prestige1) * 100) ++ "% Prestige." ++ "\n"
                             ++ "We lose " ++ (toString (family1 - avoidOverflowInt (family1 + familyDelta1))) ++ " Family members." ++ "\n"
                             ++ "We get " ++ Round.round 0 ((updatePlayer1.policeAttention - police1) * 100) ++ "% Police Attention." ++ "\n"
                             ++ "\n"
                             ++ "Enemy lose " ++ Round.round 0 ((prestige2 - updatePlayer2.prestige) * 100) ++ "% Prestige." ++ "\n"
                             ++ "Enemy lose " ++ (toString (family2 - avoidOverflowInt (family2 + familyDelta2))) ++ " Family members." ++ "\n"
                             ++ "Enemy get " ++ Round.round 0 ((updatePlayer2.policeAttention - police2) * 100) ++ "% Police Attention."
            , buttons = [
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) NotClick)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "God bless us!" ]
            ]
            }
        viewPopUp =
            if win then
                viewPopUp2
            else
                viewPopUp1
        judgeFamily =
            (family2 - get enemyIndex updateTile.familyMember) - (family1 - get model.currentPlayer updateTile.familyMember)
    in

        (updateModel, (win, judgeFamily))

fightOrAdd: Model -> ClickState -> Int -> Model
fightOrAdd model clickState buttonNumber=
    let
        changeDice: List DiceKind -> DiceKind -> List DiceKind
        changeDice listDices dice =
            let
                index =  buttonNumber
                changedList = setAt index dice listDices
            in
                changedList

        refreshModel: Model -> DiceKind -> Model
        refreshModel model0 dice =
            {model0 | actionDice = changeDice model0.actionDice dice, showPopUp = False}
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Fight or Send members"
            , descriptionText = "Click to change the dice to other Dice."
            , buttons = [
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice FightOrAdd buttonNumber) Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "10%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Fight against our enemies!"
                       , buttonYes
                       ]
                       [ text "Launch a fight" ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice FightOrAdd buttonNumber) Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Send brothers to protect our properties!"
                       , buttonYes
                       ]
                       [ text "Send families" ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice FightOrAdd buttonNumber) Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "70%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Let me think twice..."
                       , buttonYes
                       ]
                       [ text "Give Up" ]
                ]
            }
    in
        case clickState of
            Click1 -> ---AddDice
                refreshModel model AddDice
            Click2 -> ---FightDice
                refreshModel model FightDice
            Click3 -> ---Suanle
                refreshModel model FightOrAdd
            NotClick ->
                {model | showPopUp = True, viewPopUp = viewPopUp, battleHighlight = False, highlight = False }
            _ ->
               {model | showPopUp = True}

changeToOtherDice: Model -> ClickState -> Int -> Model
changeToOtherDice model clickState buttonNumber=
    let
        changeDice: List DiceKind -> DiceKind -> List DiceKind
        changeDice listDices dice =
            let
                luckyIndex =  elemIndexSure Lucky listDices
                changedList = setAt luckyIndex dice listDices
            in
                changedList
        refreshModel: Model -> DiceKind -> Model
        refreshModel model0 dice =
            {model0 | actionDice = changeDice model0.actionDice dice, showPopUp = False}
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "LuckyDice"
            , descriptionText = "Click to change the dice to other Dice."
            , buttons = [
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Lucky buttonNumber) Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "4%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Fight against our enemies!"
                       , buttonYes
                       ]
                       [ text "Launch a fight" ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Lucky buttonNumber) Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "28%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Send brothers to protect our properties!"
                       , buttonYes
                       ]
                       [ text "Send families" ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Lucky buttonNumber) Click4)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "52%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "God bless us! Let's see what will I get..."
                       , buttonYes
                       ]
                       [ text "Bonus" ],
                button [ onClick (StartGameMessage ImplementationPhase (UseActionDice Lucky buttonNumber) Click5)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "76%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "Let me think twice..."
                       , buttonYes
                       ]
                       [ text "GiveUp" ]
                ]
            }
    in
        case clickState of
            Click2 -> ---FightDice
                refreshModel model FightDice
            Click3 -> ---AddDice
                refreshModel model AddDice
            Click4 -> ---UnknownDice
                refreshModel model Reform
            Click5 -> ---Suanle
                refreshModel model Lucky
            NotClick ->
                {model | showPopUp = True, viewPopUp = viewPopUp, battleHighlight = False, highlight = False }
            _ ->
               {model | showPopUp = True}

calculatePF: Model -> Float
calculatePF model =
    let
        judgeOwner: Tile -> Bool
        judgeOwner tile =
            case tile.owner of
                Just current ->
                    if current.character == (get model.currentPlayer model.players).character then
                        True
                    else
                        False
                _ ->
                    False
        prestige = (get model.currentPlayer model.players).prestige
        popular = (get model.currentPlayer model.players).popularWill
        police = (get model.currentPlayer model.players).policeAttention
        prestigeBlockFactor = 0.4 * prestige + 0.8
        prestigeAssetFactor = 0.5 + sqrt prestige
        popularFactor = 0.6 + sqrt popular
        controlTile = List.filter judgeOwner model.map
        calculateBuildingPF: Tile -> Float
        calculateBuildingPF tile =
            case tile.building of
                Block ->
                    popularFactor * prestigeBlockFactor * assetBasicIncome tile.building / (police + 1)
                _ ->
                    prestigeAssetFactor * assetBasicIncome tile.building / (police + 1)
    in
        List.sum (List.map calculateBuildingPF controlTile)

implementationEnd: Model -> ViewPopUp
implementationEnd model=
    if model.showActionDiceRespectively == [False, False, False] then
        let
            player = get model.currentPlayer model.players
            wealthBonus =
                case player.character of
                    Lance ->
                        1.1
                    _ ->
                        1
        in
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Count Wealth"
            , descriptionText = "Income: \n Protection fee: " ++ Round.round 0 (wealthBonus * (calculatePF model)) ++ " \n Expenditure: Family cost: -" ++ Round.round 0 ((familyCost (get model.currentPlayer model.players)) / 3) ++ " \n Bribe: -" ++ Round.round 0 (policeReduceCost (get model.currentPlayer model.players))
                                ++ ".          " ++ prestigeCount model ++ policeAttentionCount model ++ popularWillCount model ++ policeAttentionBribe model
            , buttons = [
                button [
                        onClick LoadNextRound
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "OK" ]
                ]
            }
    else
        model.viewPopUp

prestigeCount: Model -> String
prestigeCount model =
    let
        controlTile = ownedTile model
        decreasePerDisco : Building -> Float
        decreasePerDisco thisBuilding =
            case thisBuilding of
                Disco level ->
                    case level of
                        1 ->
                            0.01
                        2 ->
                            0.02
                        _ ->
                            0.03
                _ ->
                    0
        prestigeDecrease = List.sum (List.map (\x -> decreasePerDisco x.building) controlTile)
    in
        if prestigeDecrease == 0 then
            ""
        else
            "You lose " ++ Round.round 0 (prestigeDecrease * 100) ++ "% prestige due to your disco(s). "

policeAttentionCount: Model -> String
policeAttentionCount model =
    let
        controlTile = ownedTile model
        increasePerCasino : Building -> Float
        increasePerCasino thisBuilding =
            case thisBuilding of
                Casino level ->
                    case level of
                        1 ->
                            0.01
                        2 ->
                            0.02
                        _ ->
                            0.04
                _ ->
                    0
        policeIncrease = List.sum (List.map (\x -> increasePerCasino x.building) controlTile)
    in
        if policeIncrease == 0 then
            ""
        else
            "You get " ++ Round.round 0 (policeIncrease * 100) ++ "% police attention due to your casino(s). "
policeAttentionBribe: Model -> String
policeAttentionBribe model =
    let
        countLevel level=
            case level of
                Low -> 1
                Medium -> 2
                High -> 3
    in
            "You lose " ++ toString (countLevel (get model.currentPlayer model.players).policeReduceLevel) ++ "% police attention due to police bribe fee."
popularWillCount: Model -> String
popularWillCount model =
    let
        controlTile = ownedTile model
        increasePerMarket : Building -> Float
        increasePerMarket thisBuilding =
            case thisBuilding of
                NightMarket level ->
                    case level of
                        1 ->
                            0.01
                        2 ->
                            0.02
                        _ ->
                            0.03
                _ ->
                    0
        popularIncrease = List.sum (List.map (\x -> increasePerMarket x.building) controlTile)
        block = toFloat (List.length (List.filter (\x -> x.building == Block) controlTile))
        allBlock =
            if block > 6.0 then
                6 / 100
            else
                block / 100
    in
        if popularIncrease + allBlock <= 0 then
            ""
        else
            "You get " ++ Round.round 0 (popularIncrease * 100 + allBlock * 100) ++ "% popular will due to your night market(s). "
ownedTile: Model -> List Tile
ownedTile model =
    let
        judgeOwner: Tile -> Bool
        judgeOwner tile =
            case tile.owner of
                Just current ->
                    if current.character == (get model.currentPlayer model.players).character then
                        True
                    else
                        False
                _ ->
                    False
    in
        List.filter judgeOwner model.map
judgePopUp: Model -> Bool
judgePopUp model =
    if model.showActionDiceRespectively == [False, False, False] then
        True
    else
        False