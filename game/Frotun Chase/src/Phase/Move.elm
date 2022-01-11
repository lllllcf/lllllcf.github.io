module Phase.Move exposing (..)

import List.Extra exposing (..)
import Debug exposing (toString)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing ( style)
import Html.Styled.Events exposing (onClick)
import List.Extra exposing (getAt)
import Round exposing (roundNum)
import Map exposing (..)
import Style exposing (..)
import Html.Styled.Attributes exposing (style, title)
import Definition exposing (..)
import Condition exposing (..)
import Event.Event exposing (..)

----------------------movePhase-----------------------------------------------------------
movePhase:  Model -> SubRoundPhase -> ClickState -> Model
movePhase model subPhase clickState=
    case subPhase of
        Move ->
           regularRefresh (move model clickState)
        ManageEvent ->
           regularRefresh (manageEvent model clickState)
        AfterMove->
           regularRefresh (judgeActionAfterMove model clickState)
        AttackAfterMove ->
           regularRefresh (attackAfterMove model clickState)
        UpgradeAfterMove ->
           regularRefresh (upgrade model clickState)
        _ ->
          model

setStoryRound: Model -> Model
setStoryRound model =
    let
        players = model.players
        round = model.round
        newPlayers = List.map (\x -> {x | storyRound = round.index }) players
    in
        {model | players = newPlayers }

move: Model -> ClickState -> Model
move model clickState=
    let
        storyRoundModel = setStoryRound model
        newModel = chooseAnEvent storyRoundModel

        chooseEventButtons: Int -> List (Html Msg)
        chooseEventButtons numbers=
            if numbers == 1 then
                    [
                        button [ onClick (StartGameMessage MovePhase ManageEvent Click1)
                       , style "width" "75%"
                       , style "height" "10%"
                       , style "left" "12.5%"
                       , style "top" "77%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title (get 0 newModel.event.hint)
                       , buttonYes
                       ]
                       [ text (get 0 newModel.event.optionDescription) ]
                    ]
            else
                [
                    button [ onClick (StartGameMessage MovePhase ManageEvent Click1)
                       , style "width" "75%"
                       , style "height" "10%"
                       , style "left" "12.5%"
                       , style "top" "70%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title (get 0 newModel.event.hint)
                       , buttonYes
                       ]
                       [ text (get 0 newModel.event.optionDescription) ],
                    button [ onClick (StartGameMessage MovePhase ManageEvent Click2)
                       , style "width" "75%"
                       , style "height" "10%"
                       , style "left" "12.5%"
                       , style "top" "85%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title (get 1 newModel.event.hint)
                       , buttonYes
                       ]
                       [ text (get 1 newModel.event.optionDescription) ]
                ]
        eventPopUp =
                { backgroundImage = "url(./src/image/event.jpg)"
                , title = "Event"
                , descriptionText = newModel.event.description
                , buttons =  chooseEventButtons (List.length newModel.event.optionFunc)
                }

        finalPopUp =
            if throughHome model then
                    { backgroundImage = "url(./src/image/event.jpg)"
                    , title = "Reward"
                    , descriptionText = "Welcome home, you get Wealth +5000 and Popular Will +10%."
                    , buttons = [
                        button [ onClick (StartGameMessage MovePhase Move Click4)
                            , style "width" "20%"
                            , style "height" "10%"
                            , style "left" "40%"
                            , style "top" "80%"
                            , style "position" "absolute"
                            , style "font-size" "1vw"
                            , style "font-weight" "bold"
                            , buttonYes
                            ]
                            [ text "I deserve it." ] ]
                    }
            else
                eventPopUp

        player = get model.currentPlayer model.players
        newPlayer = {player | wealth = player.wealth + 5000, popularWill = player.popularWill + 0.1}
    in
        case clickState of
            Click4 ->
                {newModel | viewPopUp = eventPopUp, showPopUp = True, players = setAt model.currentPlayer newPlayer model.players, showEndButton = False }
            _ ->
                {newModel | viewPopUp = finalPopUp, showPopUp = True, showEndButton = False }


throughHome: Model -> Bool
throughHome model =
    let
        player = get model.currentPlayer model.players
        initIndex = 17 * model.currentPlayer
    in
        if player.currentIndex >= initIndex && player.currentIndex - model.dice < initIndex then
            True
        else
            False

manageEvent: Model -> ClickState -> Model
manageEvent model clickState =
    let
        currentPlayer = get model.currentPlayer model.players
        newModel = model
    in
        if (List.length newModel.event.optionFunc) == 2 then
            let
                playerOption1 = refreshPlayer ((get 0 newModel.event.optionFunc) currentPlayer)
                playerOption2 = refreshPlayer ((get 1 newModel.event.optionFunc) currentPlayer)
                model1 = {newModel | players = setAt newModel.currentPlayer playerOption1 newModel.players, diceState = ActionDice, canClick = True, showPopUp = False }
                model2 = {newModel | players = setAt newModel.currentPlayer playerOption2 newModel.players, diceState = ActionDice, canClick = True, showPopUp = False }
            in
                case clickState of
                    Click1 -> --option 1
                        judgeActionAfterMove model1 NotClick
                    Click2 -> --option 2
                        judgeActionAfterMove model2 NotClick
                    _ ->
                        model
        else
            let
                playerOption1 = refreshPlayer ((get 0 newModel.event.optionFunc) currentPlayer)
                model1 = {newModel | players = setAt newModel.currentPlayer playerOption1 model.players, diceState = ActionDice, canClick = True, showPopUp = False }
            in
                case clickState of
                    Click1 -> --option 1
                        judgeActionAfterMove model1 NotClick
                    _ ->
                        model

buildingName: Tile -> String
buildingName tile =
    case tile.building of
        Casino level ->
            "level" ++ (toString level) ++ " casino"
        Disco level ->
            "level" ++ (toString level) ++ " disco"
        NightMarket level ->
            "level" ++ (toString level) ++ " night market"
        BoxingGym level ->
            "level" ++ (toString level) ++ " boxing gym"
        _ ->
            "  "

ifBoxing: Tile -> String
ifBoxing tile =
    case tile.building of
        BoxingGym level ->
            "(Warning: Your enemy has a level " ++ (toString level) ++ " boxing gym here. They may be more stronger!)"
        _ ->
            ""


judgeActionAfterMove: Model -> ClickState -> Model
judgeActionAfterMove model clickState =
    let
        currentPlayerSure = get model.currentPlayer model.players
        currentTile = get currentPlayerSure.currentIndex model.map
        owner =
            case currentTile.owner of
                Just player ->
                    player
                Nothing ->
                    dummyPlayer

        viewPopUp1 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Fight or Pay"
            , descriptionText = "You can start a fight against the owner or pay toll." ++ "\n" ++ ifBoxing currentTile
            , buttons = [
                button [ onClick (StartGameMessage MovePhase AttackAfterMove Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "20%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "title" "Kill'em all!"
                       , buttonYes
                       ]
                       [ text "Fight!" ],
                button [ onClick (StartGameMessage MovePhase AttackAfterMove Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "60%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "title" "Keep a low profile..."
                       , buttonYes
                       ]
                       [ text "Pay toll" ]
            ]
            }

        viewPopUp2 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Building Upgrading"
            , descriptionText = "Do you want to pay " ++ (toString (assetUpgrade currentTile.building)) ++ " to upgrade your " ++ buildingName currentTile ++ "?"
            , buttons = [
                button [ onClick (StartGameMessage MovePhase UpgradeAfterMove Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "20%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "title" "Expand our business!"
                       , buttonYes
                       ]
                       [ text "Sure" ],
                button [ onClick (StartGameMessage MovePhase UpgradeAfterMove Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "60%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "title" "I'm running out of money..."
                       , buttonYes
                       ]
                       [ text "Give Up." ]
            ]
            }

        viewPopUp3 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "You have no members here"
            , descriptionText = "You have no family members here. You have to pay the toll fee. Hope you have a good luck!"
            , buttons = [
                button [ onClick (StartGameMessage MovePhase AttackAfterMove Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "title" "Damn it!"
                       , buttonYes
                       ]
                       [ text "Fine..." ]
            ]
            }
    in
        --upgrade--
        if owner.character == currentPlayerSure.character && ( currentTile.building == Casino 1 || currentTile.building == Disco 1 || currentTile.building == NightMarket 1 || currentTile.building == BoxingGym 1 || currentTile.building == Casino 2 || currentTile.building == Disco 2 || currentTile.building == NightMarket 2 || currentTile.building == BoxingGym 2) then
            {model | showPopUp = True, viewPopUp = viewPopUp2}
        --fight or pay--
        else if owner.character /= dummyPlayer.character && owner.character /= currentPlayerSure.character then
            --have members here--
            if get currentPlayerSure.order (get (currentPlayerSure.currentIndex) model.map).familyMember /= 0 then
                {model | showPopUp = True, viewPopUp = viewPopUp1}
            --no members here--
            else
                { model | showPopUp = True, viewPopUp = viewPopUp3 }
        else
            model

attackAfterMove: Model -> ClickState -> Model
attackAfterMove model clickState =
    case clickState of
        Click1 ->
            Tuple.first (calculateAttackResult model -1)
        Click2 ->
            payToll model
        Click3 ->
            {model | showPopUp = False}
        _ ->
            model


upgrade: Model -> ClickState -> Model
upgrade model clickState =
    case clickState of
        Click1 ->
            upgradeBuilding model
        Click2 ->
            {model | showPopUp = False }
        _ ->
            model

calculateAttackResult: Model -> Int -> (Model,  (Float, Float)) -- 普通attack，非action dice，一定会有主人
calculateAttackResult model aiDice =
    let
        currentPlayerIndex = model.currentPlayer
        currentPlayer = get currentPlayerIndex model.players
        playerAtTile = get (currentPlayer.currentIndex) model.map
        owner =
            case playerAtTile.owner of
                Just player ->
                    player
                Nothing ->
                    dummyPlayer
        ownerIndex = elemIndexSure owner model.players

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

        findRandom1: Int -> Int
        findRandom1  num =
            if num == -1 then
                modBy 10 model.randomNumber
            else
                num

        findRandom2: Int -> Int
        findRandom2 num =
           if num == -1 then
               if playerAtTile.building == BoxingGym 1 || playerAtTile.building == BoxingGym 2 then
                    (model.randomNumber - random1) // 10 + 1
               else if playerAtTile.building == BoxingGym 3 then
                    (model.randomNumber - random1) // 10 + 2
               else
                    (model.randomNumber - random1) // 10
           else
                num

        random1 = findRandom1 aiDice
        random2 = findRandom2 aiDice

        factorFromAdjacentTiles : Int -> Float -- factor of adjacent tiles under control
        factorFromAdjacentTiles num =
            case num of
                1 ->
                    1.1
                2 ->
                    1.3
                _ ->
                    1

        factorFromDice : Int -> Float
        factorFromDice diceNumber=
            case diceNumber of
                0 ->
                    0.8
                10 ->
                    1.4
                _ ->
                   0.1 * (toFloat diceNumber) + 0.8

        factorFromFee : Player -> Float
        factorFromFee thisPlayer =
            case thisPlayer.familyLevel of
                Low ->
                    0.8
                Medium ->
                    1
                High ->
                    2

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

        judgeOwner : Player -> Tile -> Bool
        judgeOwner thisPlayer thisTile =
            case thisTile.owner of
                Just aPlayer ->
                    if aPlayer.character == thisPlayer.character then
                        True
                    else
                        False
                Nothing ->
                    False

        point : Player -> Tile -> Int -> Float -- winning condition formula
        point thisPlayer thisTile diceNumber=
            let
                thisOrder = thisPlayer.order
                thisFamily = get thisOrder thisTile.familyMember
            in
                toFloat thisFamily * sqrt(thisPlayer.prestige) * factorFromAdjacentTiles (countAdjacentTiles thisPlayer) * factorFromDice diceNumber

        point1 = point currentPlayer playerAtTile random1 --float
        point2 = point owner playerAtTile random2
        family1 = get currentPlayerIndex playerAtTile.familyMember --int
        family2 = get ownerIndex playerAtTile.familyMember
        familyBonus1 = familyLevelFactor currentPlayer.familyLevel
        familyBonus2 = familyLevelFactor owner.familyLevel
        combatEf1 = (1 + sqrt prestige1) * familyBonus1 * (factorFromDice random1) * factorFromAdjacentTiles (countAdjacentTiles currentPlayer) * factorFromFee currentPlayer --float
        combatEf2 = (1 + sqrt prestige2) * familyBonus2 * (factorFromDice random2) * factorFromAdjacentTiles (countAdjacentTiles owner) * factorFromFee owner
        totalLoss = (family1 + family2) |> toFloat |> sqrt |> round --int
        prestige1 = currentPlayer.prestige --float
        prestige2 = owner.prestige
        popular1 = currentPlayer.popularWill --float
        popular2 = owner.popularWill
        police1 = currentPlayer.policeAttention --float
        police2 = owner.policeAttention
        tilesOwned1 = List.length (List.filter (judgeOwner currentPlayer) model.map) --int
        tilesOwned2 = List.length (List.filter (judgeOwner owner) model.map)
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
        policeDelta2 = if owner.jailRound < 0 then
                   ((popularPoliceFactor popular2) * 0.02) / policeBonus owner
               else
                   0

        prestigeDelta1 = if win then --float
                              0.05 * prestige2 * prestigeBonus currentPlayer
                         else
                             -0.05 * prestige2
        prestigeDelta2 = if win then
                             -0.05 * prestige1
                         else
                             0.05 * prestige1 * prestigeBonus owner

        updateFamily =
            setAt ownerIndex (avoidOverflowInt (family2 + familyDelta2))
                (setAt currentPlayerIndex (avoidOverflowInt (family1 + familyDelta1)) playerAtTile.familyMember)
        updateTile = { playerAtTile | familyMember = updateFamily }
        updateMap =
            setAt playerAtTile.index updateTile model.map

        updatePlayer1 = { currentPlayer | popularWill = avoidOverflowFloat (popular1 + popularDelta1)
                                        , family = avoidOverflowInt (currentPlayer.family + familyDelta1)
                                        , policeAttention = avoidOverflowFloat (police1 + policeDelta1)
                                        , prestige = avoidOverflowFloat (prestige1 + prestigeDelta1)
                        }
        updatePlayer2 = { owner | popularWill = avoidOverflowFloat (popular2 + popularDelta2)
                                , family = avoidOverflowInt (owner.family + familyDelta2)
                                , policeAttention = avoidOverflowFloat (police2 + policeDelta2)
                                , prestige = avoidOverflowFloat (prestige2 + prestigeDelta2)
                        }
        updatePlayers =
            setAt ownerIndex updatePlayer2
                (setAt currentPlayerIndex (updatePlayer1) model.players)

        updateModel = { model | players = updatePlayers, map = updateMap, viewPopUp = viewPopUp, showPopUp = True }

        viewPopUp1 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "LOSE"
            , descriptionText = "We lose " ++ Round.round 0 ((prestige1 - updatePlayer1.prestige) * 100) ++ "% Prestige." ++ "\n"
                             ++ "We lose " ++ Round.round 0 (toFloat (family1 - avoidOverflowInt (family1 + familyDelta1))) ++ " Family members." ++ "\n"
                             ++ "We get " ++ Round.round 0 ((updatePlayer1.policeAttention - police1) * 100) ++ "% Police Attention." ++ "\n"
                             ++ "\n"
                             ++ "Enemy get " ++ Round.round 0 ((updatePlayer2.prestige - prestige2) * 100) ++ "% Prestige." ++ "\n"
                             ++ "Enemy lose " ++ Round.round 0 (toFloat(family2 - avoidOverflowInt (family2 + familyDelta2))) ++ " Family members." ++ "\n"
                             ++ "Enemy get " ++ Round.round 0 ((updatePlayer2.policeAttention - police2) * 100) ++ "% Police Attention."
            , buttons = [
                button [ onClick (StartGameMessage MovePhase AttackAfterMove Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "style" "I'll be back."
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
                button [ onClick (StartGameMessage MovePhase AttackAfterMove Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , style "title" "Surrender to me!!"
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
    in
        (updateModel, (point1, point2))

payToll : Model -> Model
payToll model =
    let
        currentPlayerIndex = model.currentPlayer
        currentPlayer = get currentPlayerIndex model.players --withDefault dummyPlayer (getAt currentPlayerIndex model.players)
        playerAtTile = get (currentPlayer.currentIndex) model.map
        owner = playerAtTile.owner
    in
        case owner of
            Just thisPlayer ->
                if thisPlayer.character /= currentPlayer.character then
                    let
                        tollBonus =
                            case thisPlayer.character of
                                Lance ->
                                    1.1
                                _ ->
                                    1
                        getMoneyPlayer = { thisPlayer | wealth = thisPlayer.wealth + roundNum 0 ((assetBasicToll playerAtTile.building) * tollBonus) }
                        loseMoneyPlayer = { currentPlayer | wealth = currentPlayer.wealth - roundNum 0 ((assetBasicToll playerAtTile.building) * tollBonus) }
                        updatedPlayers = setAt thisPlayer.order getMoneyPlayer
                                         (setAt currentPlayerIndex loseMoneyPlayer model.players)
                        viewPopUp =
                            { backgroundImage = "url(./src/image/event.jpg)"
                            , title = "Pay Toll"
                            , descriptionText = "We lose " ++ Round.round 0 ((assetBasicToll playerAtTile.building) * tollBonus) ++" money."
                            , buttons = [
                                button [ onClick (StartGameMessage MovePhase AttackAfterMove Click3)
                                       , style "width" "40%"
                                       , style "height" "10%"
                                       , style "left" "30%"
                                       , style "top" "80%"
                                       , style "position" "absolute"
                                       , style "font-size" "1vw"
                                       , style "font-weight" "bold"
                                       , style "title" "(I care"
                                       , buttonYes
                                       ]
                                       [ text "Who cares about this little money." ]
                            ]
                            }
                    in
                        { model | players = updatedPlayers, showPopUp = True, viewPopUp = viewPopUp }

                else
                    { model | showPopUp = False }
            Nothing ->
                { model | showPopUp = False }

upgradeBuilding: Model -> Model
upgradeBuilding model =
    let
        currentPlayerIndex = model.currentPlayer
        currentPlayer = get currentPlayerIndex model.players
        playerAtTile = get (currentPlayer.currentIndex) model.map
        updatedTile = { playerAtTile | building = Tuple.second (assetUpgrade playerAtTile.building) }
        updatedPlayer = { currentPlayer | wealth = currentPlayer.wealth - Tuple.first (assetUpgrade playerAtTile.building) }
        updatedMap = setAt playerAtTile.index updatedTile model.map
        updatedPlayers = setAt currentPlayerIndex updatedPlayer model.players
    in
        { model | players = updatedPlayers, map = updatedMap, showPopUp = False }

maxOther: Int -> List Int -> Int
maxOther current list =
    let
        max = List.maximum (setAt current 0 list)
    in case max of
        Just x -> x
        Nothing -> 0

judgeTileStatus: Model -> Tile -> Tile
judgeTileStatus model thisTile =
    let
        index = thisTile.index
        adjacentIndex = [ modBy (List.length model.map) (index - 1), modBy (List.length model.map) (index + 1) ]
        adjacentTiles = List.map (\x -> get x model.map) adjacentIndex
        adjacentLeft = get 0 adjacentTiles
        adjacentRight = get 1 adjacentTiles
    in
        if (get model.currentPlayer thisTile.familyMember /= 0) then
            if ((thisTile.owner /= Nothing)||(adjacentLeft.owner /= Nothing)||(adjacentRight.owner /= Nothing)) then {thisTile| status = Controlled}
            else if ((get model.currentPlayer thisTile.familyMember) - (maxOther model.currentPlayer thisTile.familyMember) + 2 >= thisTile.stability) then {thisTile | status = ToControl}
            else if ((get model.currentPlayer adjacentLeft.familyMember) - (maxOther model.currentPlayer adjacentLeft.familyMember) + 2 >= adjacentLeft.stability) then {thisTile | status = LeftToControl}
            else if ((get model.currentPlayer adjacentRight.familyMember) - (maxOther model.currentPlayer adjacentRight.familyMember) + 2 >= adjacentRight.stability) then {thisTile | status = RightToControl}
            else if ((adjacentLeft.owner /= Nothing)&&(adjacentLeft.owner /= getAt model.currentPlayer model.players))&&((adjacentRight.owner /= Nothing)&&(adjacentRight.owner /= Just (get model.currentPlayer model.players))) then {thisTile| status = Surrounded}
            else if (adjacentLeft.owner == Nothing)&&(adjacentRight.owner == Nothing) then {thisTile| status = FreeBoth}
            else if (adjacentLeft.owner /= getAt model.currentPlayer model.players)&&(adjacentRight.owner == Nothing) then {thisTile| status = FreeRight}
            else if (adjacentLeft.owner == Nothing)&&(adjacentRight.owner /= getAt model.currentPlayer model.players) then {thisTile| status = FreeLeft}
            else {thisTile| status = NotSelf}
        else {thisTile| status = NotSelf}

isToControl: Tile -> Bool
isToControl tile=
    tile.status == ToControl

isLeftToControl: Tile -> Bool
isLeftToControl tile=
    tile.status == LeftToControl

isRightToControl: Tile -> Bool
isRightToControl tile=
    tile.status == RightToControl

isFreeBoth: Tile -> Bool
isFreeBoth tile=
    tile.status == FreeBoth

isFreeLeft: Tile -> Bool
isFreeLeft tile=
    tile.status == FreeLeft

isFreeRight: Tile -> Bool
isFreeRight tile=
    tile.status == FreeRight

isSurrounded: Tile -> Bool
isSurrounded tile=
    tile.status == Surrounded

isControlled: Tile -> Bool
isControlled tile=
    tile.status == Controlled

isSafe: Tile -> Bool
isSafe tile=
    tile.status == Safe

randOne: Model -> Int -> Int
randOne model index=
    get (modBy (List.length model.aiRandomNumber) (model.aiRandomNumberIndex + index)) model.aiRandomNumber

getRandomNumber: Model -> Int -> Int
getRandomNumber model range =
    let
        randomList = List.map (\x -> randOne model x) (List.range 0 11)
        randSum = List.sum randomList
    in
        modBy range randSum

autoAddMembers: Model -> (Int, Int)
autoAddMembers model =
    let
        currentPlayerIndex = model.currentPlayer
        priorMap = List.map (\x -> judgeTileStatus model x) model.map
        toControlTiles = List.filter (isToControl) priorMap
        leftToControlTiles = List.filter (isLeftToControl) priorMap
        rightToControlTiles = List.filter (isRightToControl) priorMap
        freebothTiles = List.filter (isFreeBoth) priorMap
        freeleftTiles = List.filter (isFreeLeft) priorMap
        freerightTiles = List.filter (isFreeRight) priorMap
        surroundedTiles = List.filter (isSurrounded) priorMap
        controlledTiles = List.filter (isControlled) priorMap
        safeTiles = List.filter (isSafe) priorMap
    in
       if not(List.isEmpty toControlTiles) then
          ((modBy (List.length model.map) (get (getRandomNumber model (List.length (toControlTiles))) toControlTiles).index), 2)
       else if not(List.isEmpty freebothTiles) then
          ((modBy (List.length model.map) ((get (getRandomNumber model (List.length (freebothTiles))) freebothTiles).index + 1) ), 2)
       else if not(List.isEmpty freeleftTiles) then
          ((modBy (List.length model.map) ((get (getRandomNumber model (List.length (freeleftTiles))) freeleftTiles).index - 1) ), 2)
       else if not(List.isEmpty freerightTiles) then
          ((modBy (List.length model.map) ((get (getRandomNumber model (List.length (freerightTiles))) freerightTiles).index + 1) ), 2)
       else if not(List.isEmpty leftToControlTiles) then
          ((modBy (List.length model.map) (get (getRandomNumber model (List.length (leftToControlTiles))) leftToControlTiles).index - 1), 2)
       else if not(List.isEmpty rightToControlTiles) then
          ((modBy (List.length model.map) (get (getRandomNumber model (List.length (rightToControlTiles))) rightToControlTiles).index + 1), 2)
       else if not(List.isEmpty surroundedTiles) then
          ((get (getRandomNumber model (List.length (surroundedTiles))) surroundedTiles).index, 2)
       else if not(List.isEmpty controlledTiles) then
           ((get (getRandomNumber model (List.length (controlledTiles))) controlledTiles).index, 1)
       else if not(List.isEmpty safeTiles) then
           ((get (getRandomNumber model (List.length (safeTiles))) safeTiles).index, 2)
       else
           (-1, 2)