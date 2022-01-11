module Update exposing (..)

import Browser.Dom exposing (getViewport)
import List.Extra exposing (getAt)
import Model exposing (initPerspective)
import Random
import Delay exposing (TimeUnit(..))
import List.Extra exposing (..)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style)
import Html.Styled.Events exposing (onClick)
import List.Extra exposing (getAt)
import Map exposing (..)
import Round
import Style exposing (..)
import Debug exposing (..)
import Definition exposing (..)
import Phase.Prepare exposing (..)
import Phase.Move exposing (..)
import Animation exposing (..)
import Phase.Implementation exposing (..)
import Phase.End exposing (..)
import Task

--Update---------------------------------------------------------------
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model.state of
        Play ->
            play msg model
        Win ->
            win msg model
        Lose ->
            lose msg model
        Over100 ->
            over100 msg model

over100: Msg -> Model -> ( Model, Cmd Msg )
over100 _ model =
    let
        winner = get model.winnerIndex model.players
        viewPopUp1 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Win!"
            , descriptionText = "Under your wise leadership and hard work, we have defeated all the enemies and regained the leadership of the town. A new road is ahead!"
            , buttons = [
                button [ onClick Restart
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
        viewPopUp2 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Lose"
            , descriptionText = (name model.winnerIndex) ++ "'s power in the town obviously overthrew us. We had to choose to retreat. The car to the East is ready."
            , buttons = [
                button [ onClick Restart
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "I'll be back one day!" ]
                ]
            }

    in
        if winner.isHuman then
            ({model | viewPopUp = viewPopUp1, showPopUp = True, state = Play }, Cmd.none)
        else
            ({model | viewPopUp = viewPopUp2, showPopUp = True, state = Play }, Cmd.none)

lose: Msg -> Model -> ( Model, Cmd Msg )
lose msg model =
    let
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Lose"
            , descriptionText = "The enemy's power in the town obviously overthrew us. We had to choose to retreat. The car to the East is ready."
            , buttons = [
                button [ onClick Restart
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "I'll be back one day!" ]
                ]
            }
     in
        ({model | viewPopUp = viewPopUp, showPopUp = True, state = Play }, Cmd.none)

win: Msg -> Model -> ( Model, Cmd Msg )
win msg model =
    let
        winner = get model.winnerIndex model.players
        viewPopUp1 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Win!"
            , descriptionText = "Under your wise leadership and hard work, we have defeated all the enemies and regained the leadership of the town. A new road is ahead!"
            , buttons = [
                button [ onClick Restart
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
        viewPopUp2 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Lose"
            , descriptionText = (name model.winnerIndex) ++ "'s power in the town obviously overthrew us. We had to choose to retreat. The car to the East is ready."
            , buttons = [
                button [ onClick Restart
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "I'll be back one day!" ]
                ]
            }

    in
        if winner.isHuman then
            ({model | viewPopUp = viewPopUp1, showPopUp = True, state = Play }, Cmd.none)
        else
            ({model | viewPopUp = viewPopUp2, showPopUp = True, state = Play }, Cmd.none)

name: Int -> String
name int =
    case int of
        0 ->
            "Lance"
        1 ->
            "Gorman"
        2 ->
            "Doherty"
        3 ->
            "Blair"
        _ ->
            "Dummy"


chooseCmdMsgForImp: SubRoundPhase -> Cmd Msg
chooseCmdMsgForImp subRoundPhase =
    if subRoundPhase == (UseActionDice MoveDice 0) || subRoundPhase == (UseActionDice MoveDice 1) || subRoundPhase == (UseActionDice MoveDice 2) then
        Cmd.batch [ Random.generate SpecialMoveNewFace (Random.int 1 6)
                  , Delay.after 3 Second SpecialMoveStopRoll
                  ]
    else
        Cmd.batch [ Random.generate RandomNumber (Random.int 1 100)]

randomNumber: Cmd Msg
randomNumber = Cmd.batch [ Random.generate RandomNumber (Random.int 1 100)]

chooseMsgForInit: SubRoundPhase -> ClickState -> Cmd Msg
chooseMsgForInit subPhase clickState =
    if subPhase == LetUsStart && (clickState == Click3 || clickState == Click4 ||clickState == Click5 || clickState == Click6) then
        Cmd.batch [ Task.perform GetSize getViewport,  Random.generate RandomNumber (Random.int 1 100) ]
    else
        Cmd.batch [ Random.generate RandomNumber (Random.int 1 100) ]

play: Msg -> Model -> ( Model, Cmd Msg )
play msg model =
    let movedModel = checkMap model
    in
    case msg of
        StartGameMessage phase subPhase clickState->
            case phase of
                PreparationPhase ->
                    (preparePhase movedModel subPhase clickState, chooseMsgForInit subPhase clickState)
                MovePhase ->
                    (movePhase movedModel subPhase clickState, Cmd.batch [ Random.generate RandomNumber (Random.int 1 100),Random.generate AiRandomNumber (Random.list 10000 (Random.int 1 6))])
                ImplementationPhase ->
                    (implementPhase movedModel subPhase clickState, chooseCmdMsgForImp subPhase)
                EndPhase ->
                    (endPhase movedModel subPhase clickState, Cmd.batch [ Random.generate AiRandomNumber (Random.list 100 (Random.int 1 6))])
        Roll ->
            ({ movedModel | canClick = False, showDice = RollingDice }, Cmd.batch [ Random.generate NewFace (Random.int 1 6), Delay.after 3 Second StopRoll ])
        NewFace newFace ->
            ({ movedModel | dice = newFace, players = playerDice movedModel }, randomNumber)
        StopRoll ->
            ({ movedModel | moveSE = True, players = changeDice (updatePlayer movedModel) movedModel, isMoving = True, showDice = FinalDice }, Delay.after 2 Second (StartGameMessage MovePhase Move NotClick))

        RollAction ->
            ({ movedModel | canClick = False, showDice = RollingMoreDice, showActionDiceRespectively = [True, True, True] }, Cmd.batch [ Random.generate NewFaceAction (Random.int 1 216) , Delay.after 3 Second StopRollAction ])
        NewFaceAction newFace ->
            ({ movedModel | dice = newFace }, randomNumber)
        StopRollAction ->
            let
                newModel = handleDiceForAction movedModel
            in
                ({ newModel | isMoving = True, showDice = FinalMoreDice, showActionDice = True, showEndButton = True, canClickEndAction = True }, Cmd.none)
        Side ->
            if movedModel.sideState == NoSide || movedModel.sideState == HideSide then
                ({ movedModel | sideState = ShowSide }, randomNumber)
            else
                ({ movedModel | sideState = HideSide }, randomNumber)
        Top ->
            if movedModel.topState == NoTop || movedModel.topState == HideTop then
                ({ movedModel | topState = ShowTop }, randomNumber)
            else
                ({ movedModel | topState = HideTop }, randomNumber)
        SpecialMoveNewFace newFace ->
            ({ movedModel | dice = newFace }, randomNumber)
        SpecialMoveStopRoll ->
            ({ movedModel | players = updatePlayer movedModel, isMoving = True, showDice = FinalDice }, Delay.after 2 Second (StartGameMessage ImplementationPhase (UseActionDice NoActionDice 10) Click6))
        AddKey value ->
            ({ movedModel | control = [value] }, randomNumber)
        RemoveKey _ ->
            ({ movedModel | control = [] }, randomNumber)
        SelectTile tileIndex buttonNumber->
            ( selectTile model tileIndex buttonNumber, randomNumber)
        ReselectTile tileIndex buttonNumber indicator->
            ( reselectTile model tileIndex buttonNumber indicator, randomNumber)
        RandomNumber number ->
            ({model | randomNumber = number}, Cmd.none)
        GetSize viewport ->
            let
                gotSizeModel = { movedModel | windowSize = (round viewport.viewport.width, round viewport.viewport.height) }
                x = gotSizeModel |> initPerspective |> Tuple.first
                y = gotSizeModel |> initPerspective |> Tuple.second
            in
                ({ gotSizeModel | mapMoveX = x, mapMoveY = y }, Cmd.none)
        UpdateSize w h ->
            ({ movedModel | windowSize = (w, h) }, Cmd.none)
        ViewDetailedTile index->
            ({ movedModel | viewDetailed = True, detailTileIndex = index }, Cmd.none)

        NoDetail ->
            ({ movedModel | viewDetailed = False }, Cmd.none)
        EndAction ->
            ({model | showActionDiceRespectively = [False, False, False], viewPopUp = endPopUp model, showPopUp = True, showEndButton = False},randomNumber)
        AiRandomNumber list ->
            ({model | aiRandomNumber = list}, Cmd.none)
        Restart ->
            (restart model, Cmd.none)
        OnJailCount ->
            (onJailCount movedModel, randomNumber)
        LoadNextRound ->
            ({ movedModel | viewPopUp = loading, showEndButton = False }, Cmd.batch [Delay.after 2 Second (StartGameMessage EndPhase CountWealth Click1) ])
        _ ->
            (movedModel, Cmd.none)

changeDice: List Player -> Model -> List Player
changeDice players model =
    List.map (\player -> {player | dice = model.dice}) players
    
loading =
    { backgroundImage = "url(./src/image/event.jpg)"
    , title = "Loading"
    , descriptionText = "Load next round."
    , buttons = []
    }

playerDice: Model -> List Player
playerDice model =
    let
       players = model.players
       newPlayers = List.map (\player -> {player | dice = model.dice}) players
    in
        newPlayers

onJailCount: Model -> Model
onJailCount model =
    let
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Count Wealth"
            , descriptionText = "Income: \n Protection fee: " ++ Round.round 0 (Phase.Implementation.calculatePF model) ++ " \n Expenditure: familyCost: -" ++ Round.round 0 ((familyCost (get model.currentPlayer model.players)) / 3) ++ " \n Bribe: -" ++ toString (policeReduceCost (get model.currentPlayer model.players))

                                ++ "          " ++ Phase.Implementation.prestigeCount model ++ Phase.Implementation.policeAttentionCount model ++ Phase.Implementation.popularWillCount model ++ Phase.Implementation.policeAttentionBribe model
            , buttons = [
                button [ onClick (StartGameMessage EndPhase CountWealth Click1)
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
    in
        {model | viewPopUp = viewPopUp, showPopUp = True }

endPopUp: Model -> ViewPopUp
endPopUp model=
        { backgroundImage = "url(./src/image/event.jpg)"
        , title = "Count Wealth"
        , descriptionText = "Income: \n Protection fee: " ++ Round.round 0 (Phase.Implementation.calculatePF model) ++ " \n Expenditure: Family cost: -" ++ Round.round 0 ((familyCost (get model.currentPlayer model.players)) / 3) ++ " \n Bribe: -" ++ toString (policeReduceCost (get model.currentPlayer model.players))
                          ++ "          " ++ Phase.Implementation.prestigeCount model ++ Phase.Implementation.policeAttentionCount model ++ Phase.Implementation.popularWillCount model ++ Phase.Implementation.policeAttentionBribe model
        , buttons = [
            button [ onClick LoadNextRound
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

restart: Model -> Model
restart model =
    let
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Restart"
            , descriptionText = "Which family do you want to choose?"
            , buttons = [
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "4%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonNo
                       ]
                       [ text "Lance" ],
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click4)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "28%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonNo
                       ]
                       [ text "Gorman" ],
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click5)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "52%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonNo
                       ]
                       [ text "Doherty" ],
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click6)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "76%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonNo
                       ]
                       [ text "Blair" ]
                ]
            }
    in
        {model | viewPopUp = viewPopUp, showPopUp = True}


reselectTile: Model -> Int -> Int -> String -> Model
reselectTile model tileIndex buttonNumber indicator=
    let
        addOrFight =
            if (get buttonNumber model.actionDice) == FightDice then
                "fight"
            else
                "add"
        title =
            case addOrFight of
                "fight" -> "Can't launch a battle here."
                "add" -> "Can't send members here."
                _ -> " "
        description =
            case indicator of
                "policeStation" -> "You can't select police station to add member or fight."
                "jail" -> "You can't select jail to add member pr fight."
                "noOthers" -> "No one can fight with you here!"
                "noMember" -> "You have no member here."
                _ -> " "
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = title
            , descriptionText = description ++ " Click to give up."
            , buttons = [
                button [ if (get buttonNumber model.actionDice) == FightDice then onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click5)
                         else onClick (StartGameMessage ImplementationPhase (UseActionDice AddDice buttonNumber) Click5)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonNo
                       ]
                       [ text "OK" ]
                ]
            }
    in
        {model | viewPopUp = viewPopUp, canSelectTile = False, showPopUp = True, selectedTileIndex = tileIndex}

selectTile: Model -> Int -> Int -> Model
selectTile model tileIndex buttonNumber=
    let
        playerIndex = model.currentPlayer
        tile = get tileIndex model.map
        preTile = get (modBy (List.length model.map) (tileIndex - 1)) model.map
        nextTile = get (modBy (List.length model.map) (tileIndex + 1)) model.map
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Do you want to select this tile?"
            , descriptionText = "Click to confirm or give up."
            , buttons = [
                button [ if (get buttonNumber model.actionDice) == FightDice then onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click4)
                        else onClick (StartGameMessage ImplementationPhase (UseActionDice AddDice buttonNumber) Click4)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "30%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Yes" ],
                button [ if (get buttonNumber model.actionDice) == FightDice then onClick (StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click5)
                         else onClick (StartGameMessage ImplementationPhase (UseActionDice AddDice buttonNumber) Click5)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "50%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonNo
                       ]
                       [ text "No" ]
                ]
            }
        viewPopUpCanNotAdd =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Can't send members here"
            , descriptionText = "You can't send family to this tile since we don't have enough influence around there."
            , buttons = [
                button [onClick (StartGameMessage ImplementationPhase (UseActionDice AddDice buttonNumber) Click5)
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
        judgeCanAdd = ((get playerIndex preTile.familyMember) + (get playerIndex nextTile.familyMember) + (get playerIndex tile.familyMember)) /= 0
    in
        if ((get buttonNumber model.actionDice) == AddDice && judgeCanAdd ) || ((get buttonNumber model.actionDice) == FightDice) then
            {model | viewPopUp = viewPopUp, canSelectTile = False, showPopUp = True, selectedTileIndex = tileIndex}
        else
            {model | viewPopUp = viewPopUpCanNotAdd, canSelectTile = False, showPopUp = True, selectedTileIndex = tileIndex}
        
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