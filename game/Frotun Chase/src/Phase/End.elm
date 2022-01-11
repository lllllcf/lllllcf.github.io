module Phase.End exposing (..)

import List.Extra exposing (..)
import Css.Animations exposing (Property, custom)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style)
import Html.Styled.Events exposing (onClick)
import List.Extra exposing (getAt)
import Maybe exposing (withDefault)
import Round exposing (roundNum)
import String exposing (fromInt)
import Map exposing (..)
import Style exposing (..)
import Condition exposing (..)
import Definition exposing (..)
import Ai exposing (..)
import Style exposing (..)

----------------------endPhase-----------------------------------------------------------
endPhase:  Model -> SubRoundPhase -> ClickState -> Model
endPhase model subPhase clickState=
    case subPhase of
        CountWealth ->
            regularRefresh (countWealth model clickState)
        _ ->
          model

countWealth: Model -> ClickState -> Model
countWealth model clickState =
    case clickState of
        Click1 ->
            let
                player = get model.currentPlayer model.players
                wealthBonus =
                    case player.character of
                        Lance ->
                            1.1
                        _ ->
                            1
                newPlayer = {player | wealth = player.wealth + roundNum 0 (wealthBonus * (calculatePF model)) - ((familyCost (get model.currentPlayer model.players)) / 3) - roundNum 0 (policeReduceCost (get model.currentPlayer model.players))}
                finalPlayer = {newPlayer | policeAttention = newPlayer.policeAttention + roundNum 2 (policeAttentionCount model) - (policeAttentionBribe model),
                                           prestige = newPlayer.prestige - roundNum 2 (prestigeCount model),
                                           popularWill = newPlayer.popularWill + roundNum 2 (popularWillCount model) }
                newModel = {model | players = setAt model.currentPlayer (refreshPlayer finalPlayer) model.players, showPopUp = False }

                jailPlayer = { player | policeAttention = 0.25, jailRound = 2, currentIndex = 24, currentPos = (90, 40) }
                viewPopUp =
                    { backgroundImage = "url(./src/image/event.jpg)"
                    , title = "Jail"
                    , descriptionText = "You're sent to jail for high police attention."
                    , buttons = [
                        button [ onClick (StartGameMessage EndPhase CountWealth Click2)
                                , style "width" "20%"
                                , style "height" "10%"
                                , style "left" "40%"
                                , style "top" "80%"
                                , style "position" "absolute"
                                , style "font-size" "1vw"
                                , style "font-weight" "bold"
                                , buttonYes
                                ]
                                [ text "Oh..." ]
                        ]
                    }
                players =setAt model.currentPlayer jailPlayer model.players
                jailModel = {newModel | viewPopUp = viewPopUp, showPopUp = True, players = players}
                finalPlayers = updatePlayerJail jailModel
            in
                if player.policeAttention > 0.99 then
                    {jailModel | players = finalPlayers }
                else
                    ai newModel
        Click2 ->
            ai {model | showPopUp = False }
        _ ->
            model

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

prestigeCount: Model -> Float
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
        prestigeDecrease

policeAttentionCount: Model -> Float
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
        policeIncrease

policeAttentionBribe: Model -> Float
policeAttentionBribe model =
    let
        countLevel level=
            case level of
                Low -> 0.01
                Medium -> 0.02
                High -> 0.03
    in
        countLevel (get model.currentPlayer model.players).policeReduceLevel

popularWillCount: Model -> Float
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
        block = toFloat (List.length (List.filter (\x -> x.building == Block) controlTile))
        popularIncrease = List.sum (List.map (\x -> increasePerMarket x.building) controlTile)
        allBlock =
            if block > 6.0 then
                6 / 100
            else
                block / 100
    in
        if popularIncrease + allBlock < 0 then
            0
        else
            popularIncrease + allBlock

ownedTile: Model -> List Tile
ownedTile model =
    let
        judgeOwner: Tile -> Bool
        judgeOwner tile =
            case tile.owner of
                Just thisPlayer ->
                    if thisPlayer.character == (get model.currentPlayer model.players).character then
                        True
                    else
                        False
                _ ->
                    False
    in
        List.filter judgeOwner model.map

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

