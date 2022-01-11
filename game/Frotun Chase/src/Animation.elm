module Animation exposing (..)
import Css exposing (..)
import Css.Animations exposing (Property, custom, keyframes)
import Debug exposing (toString)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, src, style)
import List.Extra exposing (getAt)
import Maybe exposing (withDefault)
import String exposing (fromChar, fromInt)
import Definition exposing (..)

--convert list of data to frame list
convertToFrame : List Int -> List Tile -> List(Int, List Property)
convertToFrame indexList map =
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

-- render dice animations
diceAnimation : Model -> Html Msg
diceAnimation model =
    case model.showDice of
        NoDice ->
            div [] []
        FinalDice ->
            div [ style "left" "40%"
                , style "top" "40%"
                , style "width" "20%"
                , style "height" "20%"
                , style "position" "absolute"
                ]
                [
                img [ style "left" "50%"
                    , style "top" "50%"
                    , style "width" "15%"
                    , style "height" "25%"
                    , style "position" "absolute"
                    , src ("./src/image/dice/dice" ++ toString model.dice ++ ".png")
                    , css [ animationName (keyframes [(0, [custom "opacity" "1"]), (100, [custom "opacity" "0"])])
                          , animationDuration (sec(2))
                          , animationDelay (sec(1))
                          , property "animation-fill-mode" "forwards" --allows the object to stay at the last frame
                          ]
                    ]
                    []
                ]
        RollingDice ->
            div [ style "left" "40%"
                , style "top" "40%"
                , style "width" "20%"
                , style "height" "20%"
                , style "position" "absolute"
                ]
                [ img [ style "left" "50%"
                      , style "top" "50%"
                      , style "width" "15%"
                      , style "height" "25%"
                      , style "position" "absolute"
                      , src "./src/image/dice/dice.gif"
                      ]
                      []
                ]
        RollingMoreDice ->
            div [ style "left" "20%"
                , style "top" "40%"
                , style "width" "60%"
                , style "height" "20%"
                , style "position" "absolute"
                ]
                [
                img [ style "left" "20%"
                    , style "top" "50%"
                    , style "width" "6%"
                    , style "height" "30%"
                    , style "position" "absolute"
                    , src "./src/image/dice/dice.gif"
                    ]
                    [],
                img [ style "left" "50%"
                    , style "top" "50%"
                    , style "width" "6%"
                    , style "height" "30%"
                    , style "position" "absolute"
                    , src "./src/image/dice/dice.gif"
                    ]
                    [],
                img [ style "left" "80%"
                    , style "top" "50%"
                    , style "width" "6%"
                    , style "height" "30%"
                    , style "position" "absolute"
                    , src "./src/image/dice/dice.gif"
                    ]
                    []
                ]

        FinalMoreDice ->
            let
                newModel = handleDiceForAction model
            in
                div [ style "left" "20%"
                    , style "top" "40%"
                    , style "width" "60%"
                    , style "height" "20%"
                    , style "position" "absolute"
                    ]
                    [
                    img [ style "left" "20%"
                        , style "top" "50%"
                        , style "width" "6%"
                        , style "height" "30%"
                        , style "position" "absolute"
                        , src ("./src/image/dice/dice" ++ toString (get 0 newModel.actionDiceNumber) ++ ".png")
                        , css [ animationName (keyframes [(0, [custom "opacity" "1"]), (100, [custom "opacity" "0"])])
                            , animationDuration (sec(2))
                            , animationDelay (sec(1))
                            , property "animation-fill-mode" "forwards" --allows the object to stay at the last frame
                            ]
                        ]
                        [],
                    img [ style "left" "50%"
                        , style "top" "50%"
                        , style "width" "6%"
                        , style "height" "30%"
                        , style "position" "absolute"
                        , src ("./src/image/dice/dice" ++ toString (get 1 newModel.actionDiceNumber) ++ ".png")
                        , css [ animationName (keyframes [(0, [custom "opacity" "1"]), (100, [custom "opacity" "0"])])
                            , animationDuration (sec(2))
                            , animationDelay (sec(1))
                            , property "animation-fill-mode" "forwards" --allows the object to stay at the last frame
                            ]
                        ]
                        [],
                    img [ style "left" "80%"
                        , style "top" "50%"
                        , style "width" "6%"
                        , style "height" "30%"
                        , style "position" "absolute"
                        , src ("./src/image/dice/dice" ++ toString (get 2 newModel.actionDiceNumber) ++ ".png")
                        , css [ animationName (keyframes [(0, [custom "opacity" "1"]), (100, [custom "opacity" "0"])])
                            , animationDuration (sec(2))
                            , animationDelay (sec(1))
                            , property "animation-fill-mode" "forwards" --allows the object to stay at the last frame
                            ]
                        ]
                        []
                    ]

handleDiceForAction: Model -> Model
handleDiceForAction model =
    let
        number = model.dice
        number1 = number // 36 + 1
        number2 = (number - 36 * (number1 - 1)) // 6 + 1
        number3 = max 1 (number - 36 * (number1 - 1) - 6 * (number2 - 1))
    in
        {model | actionDiceNumber = [number1, number2, number3], actionDice = [toDiceKind number1, toDiceKind number2, toDiceKind number3]}

toDiceKind: Int -> DiceKind
toDiceKind number =
    case number of
        1 -> AddDice
        2 -> FightDice
        3 -> AddDice
        4 -> FightOrAdd
        5 -> Lucky
        6 -> Reform
        _ -> AddDice

--use keyboard to view the map
checkMap : Model -> Model
checkMap model =
    let control = List.head model.control
        command =
            case control of
                Just value ->
                    case value of
                        Control _ ->
                            ""
                        Character char ->
                            fromChar char
                Nothing ->
                    ""
    in
        case command of
            "w" ->
                { model | mapMoveY = min (model.mapMoveY + 10) 0 }
            "s" ->
                { model | mapMoveY = max (model.mapMoveY - 10) -(1440 - 0.8 * toFloat (Tuple.second model.windowSize)) }
            "d" ->
                { model | mapMoveX = max (model.mapMoveX - 10) -(1440 - 0.8 * toFloat (Tuple.first model.windowSize)) }
            "a" ->
                { model | mapMoveX = min (model.mapMoveX + 10) 0 }
            _ ->
                model

-- get the current player
getCurrentPlayer : Model -> Player
getCurrentPlayer model =
    model.players
        |> getAt model.currentPlayer
        |> withDefault
        dummyPlayer

convertFloatToPct : Float -> String
convertFloatToPct float =
    toString (float * 100) ++ "%"

-- render animation of an single player
playerAnimation : Model -> Player -> Html Msg
playerAnimation model player =
    let
        currentPlayer = getCurrentPlayer model
        playerAbbr =
            case player.character of
                Lance ->
                    "L"
                Gorman ->
                    "G"
                Blair ->
                    "B"
                Doherty ->
                    "D"
                _ ->
                    " "
        playerColor =
            if player.jailRound <= 0 then
                case player.character of
                    Lance ->
                        property "background" "linear-gradient(-45deg, #FFB404, #FCC201, #FFF77A, #DC9202)"
                    Gorman ->
                        property "background" "linear-gradient(-45deg, #E60073, #EE1A84, #F73395, #FF4DA6)"
                    Blair ->
                        property "background" "linear-gradient(-45deg, #FF7F50, #FF8A5E, #FF956C, #FFA07A)"
                    Doherty ->
                        property "background" "linear-gradient(-45deg, #000080, #2132A4, #4363C9, #6495ED)"
                    _ ->
                        property "background" "linear-gradient(-45deg, #000080, #2132A4, #4363C9, #6495ED)"
            else
                property "background-image" "linear-gradient(-45deg, #000000 0%, #CCCCCC 10%, #000000 20%, #CCCCCC 30%, #000000 40%, #CCCCCC 50%, #000000 60%, #CCCCCC 70%, #000000 80%, #CCCCCC 90%, #000000 100%)"
    in
        if player.exist then
            case model.isMoving of
                True ->
                    div [ style "width" "50px"
                        , style "height" "50px"
                        , style "border-radius" "100%"
                        , style "background-size" "100% 100%"
                        , style "box-shadow" "10px 10px 20px grey"
                        , style "position" "absolute"
                        , style "overflow" "hidden"
                        , css [ animationName (keyframes player.frameList)
                              , animationDuration (sec(1))
                              , property "animation-fill-mode" "forwards" --allows the object to stay at the last frame
                              ]
                        ]
                        [ div [ style "width" "100%"
                              , style "height" "100%"
                              , style "text-align" "center"
                              , style "line-height" "50px"
                              , style "color" "white"
                              , style "font-size" "1.8vw"
                              , css [ playerColor
                                    , property "background-size" "400% 400%"
                                    , animationName (keyframes [ (0, [custom "background-position" "0% 50%"])
                                                               , (50, [custom "background-position" "100% 50%"])
                                                               , (100, [custom "background-position" "0% 50%"])
                                                               ])
                                    , animationDuration (sec(6))
                                    , property "animation-iteration-count" "infinite"
                                    ]
                              ]
                              [ text playerAbbr ]
                        ]
                False ->
                    div [ style "width" "50px"
                        , style "height" "50px"
                        , style "border-radius" "100%"
                        , style "background-size" "100% 100%"
                        , style "box-shadow" "10px 10px 20px grey"
                        , style "position" "absolute"
                        , style "text-align" "center"
                        , style "line-height" "50px"
                        , style "color" "white"
                        , style "font-size" "1.8vw"
                        , css [ playerColor
                              , property "background-size" "400% 400%"
                              , animationName (keyframes [ (0, [custom "background-position" "0% 50%"
                                                               ,custom "left" (toString (Tuple.first player.currentPos) ++ "%")
                                                               ,custom "top" (toString (Tuple.second player.currentPos) ++ "%")
                                                               ])
                                                         , (50, [custom "background-position" "100% 50%"
                                                                ,custom "left" (toString (Tuple.first player.currentPos) ++ "%")
                                                                ,custom "top" (toString (Tuple.second player.currentPos) ++ "%")
                                                                ])
                                                         , (100, [custom "background-position" "0% 50%"
                                                                 ,custom "left" (toString (Tuple.first player.currentPos) ++ "%")
                                                                 ,custom "top" (toString (Tuple.second player.currentPos) ++ "%")
                                                                 ])
                                                         ])
                              , animationDuration (sec(6))
                              , property "animation-iteration-count" "infinite"
                              ]
                        ]
                        [ text playerAbbr ]
        else
            div [] []

playersAnimation : Model -> List (Html Msg)
playersAnimation model =
    List.map (playerAnimation model) model.players