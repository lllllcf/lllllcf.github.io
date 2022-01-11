module Main exposing (main)

import Browser
import Browser.Events exposing (onKeyDown, onKeyUp)
import Condition exposing (generalPoint)
import Css exposing (animationDuration, animationName, property, px, sec, transforms, translate2)
import Css.Animations exposing (keyframes)
import Debug exposing (toString)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (autoplay, controls, css, loop, src, style, title)
import Html.Styled.Events exposing (onClick)
import Json.Decode as Decode
import Round
import Map exposing (renderDetailedTile)
import Style exposing (..)
import Model exposing (..)
import Animation exposing (..)
import PopUp exposing (..)
import Definition exposing (..)
import Update exposing (..)

main : Program String Model Msg
main =
    Browser.element
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }

subscriptions : Model-> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta Frame
        , onKeyDown (Decode.map AddKey keyDecoder)
        , onKeyUp (Decode.map RemoveKey keyDecoder)
        , Browser.Events.onResize (\w h -> UpdateSize w h)
        ]

view : Model -> Html Msg
view model =
    div [ style "width" "100%"
        , style "height" "100%"
        , style "left" "0%"
        , style "top" "0%"
        , style "position" "absolute"
        , style "background" "url(./src/image/background.png)"
        , style "background-size" "100% 100%"
        , style "z-index" "-1"
        ]
        (
        -- List.append
        [ if model.bgm then audio [ src "./src/audio/bgm.mp3", autoplay True, controls False, loop True ] [] else div [] [] --bgm
        , if model.reformSE then audio [ src "./src/audio/Reform.wav", autoplay True, controls False, loop False ] [] else div [] [] --reform sound effect
        , if model.addSE then audio [ src "./src/audio/Add.wav", autoplay True, controls False, loop False ] [] else div [] [] --add sound effect
        , if model.fightSE then audio [ src "./src/audio/Fight.wav", autoplay True, controls False, loop False ] [] else div [] [] --fight sound effect
        , if model.moveSE then  audio [ src "./src/audio/Move.wav", autoplay True, controls False, loop False ] [] else div [] [] --move sound effect
        -- head bar division --
        , renderHeadBar model,
        -- upper dice point division --
        div [ style "width" "50%"
            , style "height" "10%"
            , style "left" "20%"
            , style "top" "0%"
            , style "position" "absolute"
            , style "text-align" "center"
            , style "color" "white"
            , style "font-size" "3vw"
            ]
            [ text ( case model.showDice of
                        FinalDice ->
                            "Move forwards: " ++ toString model.dice ++ " tiles"
                        FinalMoreDice ->
                            "Action dice points: " ++ toString (get 0 model.actionDiceNumber) ++ " "
                                                   ++ toString (get 1 model.actionDiceNumber) ++ " "
                                                   ++ toString (get 2 model.actionDiceNumber)
                        RollingDice ->
                            "Rolling..."
                        RollingMoreDice ->
                            "Rolling..."
                        NoDice ->
                            ""
            )
            ],
        -- button and status division --
        div [ style "width" "15%"
            , style "height" "90%"
            , style "left" "83%"
            , style "top" "5%"
            , style "position" "absolute"
            ]
            (
            [
            chooseDiceModel model,
            showDiceNumber model,
            judgeEndButton model
            ]
            ++
            showActionDice model
            ),
         -- board division --
        div [ style "width" "80%"
            , style "height" "80%"
            , style "left" "2%"
            , style "top" "10%"
            , style "position" "absolute"
            , style "border-width" "3px"
            , style "border-style" "solid"
            , css [ property "overflow" "hidden"
                  , property "box-shadow" "0px 0px 10px #888888"
                  ]
            ]
            [ div [ style "width" "1440px"
                  , style "height" "1440px"
                  , style "left" "0%"
                  , style "top" "0%"
                  , style "position" "absolute"
                  , css [ property "transform-origin" "50% 50%"
                        , transforms [ translate2 (px model.mapMoveX) (px model.mapMoveY) ]
                        ]
                  ]
                  (Map.renderMap model.map model ++ playersAnimation model)
            , renderDetailedTile model
            , diceAnimation model
            ],
        renderPopUp model,
        renderSideBar model,
        renderAILog model
        ]
        )

judgeEndButton: Model -> Html Msg
judgeEndButton model =
    if model.showEndButton == True then
         button [ onClick EndAction
             , style "width" "80%"
             , style "height" "10%"
             , style "left" "10%"
             , style "top" "80%"
             , style "position" "absolute"
             , style "font-size" "1.5vw"
             , Html.Styled.Attributes.disabled (not model.canClickEndAction)
             , button1
                 ]
             [ text "End" ]
    else
        div [] []

showDiceNumber: Model -> Html Msg
showDiceNumber model =
    case model.diceState of
        Dice ->
            div [ style "color" "#000000"
                , style "font-family" "SWGothe, Arial, sans-serif"
                , style "font-size" "2vw"
                , style "left" "40%"
                , style "top" "30%"
                , style "position" "absolute"
                , style "display" "block"
                , style "width" "20%"
                , style "height" "5%"
                , style "text-align" "center"
                ]
                []
        _ ->
            div [] []

renderAILog : Model -> Html Msg
renderAILog model =
    div [ style "width" "30%"
        , style "height" "50%"
        , style "left" "10%"
        , style "position" "absolute"
        , style "z-index" "1"
        , case model.topState of
            ShowTop ->
                css [ animationName (keyframes [ (0, [ Css.Animations.custom "transform" "translateY(-95%)" ]), (100, [ Css.Animations.custom "transform" "translateY(0%)" ]) ])
                    , animationDuration (sec(1))
                    , property "animation-fill-mode" "forwards"
                    , property "background" "-moz-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-webkit-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-o-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-linear-gradient(top, black 95%, transparent 5%)"
                    ]
            HideTop ->
                css [ animationName (keyframes [ (0, [ Css.Animations.custom "transform" "translateY(0%)" ]), (100, [ Css.Animations.custom "transform" "translateY(-95%)" ]) ])
                    , animationDuration (sec(1))
                    , property "animation-fill-mode" "forwards"
                    , property "background" "-moz-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-webkit-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-o-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-linear-gradient(top, black 95%, transparent 5%)"
                    ]
            NoTop ->
                css [ property "transform" "translateY(-95%)"
                    , property "background" "-moz-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-webkit-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-o-linear-gradient(top, black 95%, transparent 5%)"
                    , property "background" "-linear-gradient(top, black 95%, transparent 5%)"
                    ]
        ]
        [ button [ onClick Top
                 , style "width" "15%"
                 , style "height" "8%"
                 , style "top" "94%"
                 , style "left" "0%"
                 , style "position" "absolute"
                 , style "text-align" "center"
                 , style "font-size" "1vw"
                 , buttonTop
                 ]
                 [ text "LOG" ]
        , textarea [ style "left" "10%"
                   , style "top" "15%"
                   , style "width" "80%"
                   , style "height" "70%"
                   , style "position" "absolute"
                   , style "font-size" "1vw"
                   , Html.Styled.Attributes.disabled True
                   , style "resize" "none"
                   ]
                   [ text model.aiRecord ]
        , div [ style "left" "10%"
              , style "top" "3%"
              , style "width" "80%"
              , style "height" "4%"
              , style "position" "absolute"
              , style "font-size" "2vw"
              , style "color" "white"
              , style "text-align" "center"
              ]
              [ text "RECORD" ]
        ]

renderHeadBar : Model -> Html Msg
renderHeadBar model =
    div [ style "width" "35%"
        , style "height" "5%"
        , style "left" "65%"
        , style "top" "0%"
        , style "position" "absolute"
        , style "background" "#4169E1"
        , style "border-radius" "3px"
        , style "box-shadow" "-3px 3px 5px white"
        ]
        [ img [ style "width" "5%"
              , style "height" "90%"
              , style "left" "1%"
              , style "top" "5%"
              , style "position" "absolute"
              , src "./src/status/wealth.png"
              ]
              []
        , div [ style "width" "9%"
              , style "height" "20%"
              , style "left" "7%"
              , style "top" "40%"
              , style "position" "absolute"
              , style "color" "white"
              , style "font-size" "0.8vw"
              , style "text-align" "center"
              , style "line-height" "100%"
              , style "vertical-align" "middle"
              ]
              [ text (Round.round 0 (get model.currentPlayer model.players).wealth) ]
        , img [ style "width" "5%"
              , style "height" "90%"
              , style "left" "17%"
              , style "top" "5%"
              , style "position" "absolute"
              , src "./src/status/prestige.png"
              ]
              []
        , div [ style "width" "9%"
              , style "height" "20%"
              , style "left" "23%"
              , style "top" "40%"
              , style "position" "absolute"
              , style "color" "white"
              , style "font-size" "0.8vw"
              , style "text-align" "center"
              , style "line-height" "100%"
              , style "vertical-align" "middle"
              ]
              [ text (Round.round 0 ((get model.currentPlayer model.players).prestige * 100) ++ " %") ]
        , img [ style "width" "5%"
              , style "height" "90%"
              , style "left" "35%"
              , style "top" "5%"
              , style "position" "absolute"
              , src "./src/status/family.png"
              ]
              []
        , div [ style "width" "9%"
              , style "height" "20%"
              , style "left" "41%"
              , style "top" "40%"
              , style "color" "white"
              , style "position" "absolute"
              , style "font-size" "0.8vw"
              , style "text-align" "center"
              , style "line-height" "100%"
              , style "vertical-align" "middle"
              ]
              [ text (toString (get model.currentPlayer model.players).family) ]
        , img [ style "width" "5%"
              , style "height" "90%"
              , style "left" "51%"
              , style "top" "5%"
              , style "position" "absolute"
              , src "./src/status/influence.png"
              ]
              []
        , div [ style "width" "9%"
              , style "height" "20%"
              , style "left" "57%"
              , style "top" "40%"
              , style "color" "white"
              , style "position" "absolute"
              , style "font-size" "0.8vw"
              , style "text-align" "center"
              , style "line-height" "100%"
              , style "vertical-align" "middle"
              ]
              [ text (Round.round 0 ((get model.currentPlayer model.players).influence * 100) ++ " %") ]
        , img [ style "width" "5%"
              , style "height" "90%"
              , style "left" "67%"
              , style "top" "5%"
              , style "position" "absolute"
              , if (get model.currentPlayer model.players).popularWill < 0.2 then
                    src "./src/status/angry.png"
                else
                    src "./src/status/smile.png"
              ]
              []
        , div [ style "width" "9%"
              , style "height" "20%"
              , style "left" "73%"
              , style "top" "40%"
              , style "color" "white"
              , style "position" "absolute"
              , style "font-size" "0.8vw"
              , style "text-align" "center"
              , style "line-height" "100%"
              , style "vertical-align" "middle"
              ]
              [ text (Round.round 0 ((get model.currentPlayer model.players).popularWill * 100) ++ " %") ]
        , img [ style "width" "5%"
              , style "height" "90%"
              , style "left" "83%"
              , style "top" "5%"
              , style "position" "absolute"
              , src "./src/status/police.png"
              ]
              []
        , div [ style "width" "9%"
              , style "height" "20%"
              , style "left" "89%"
              , style "top" "40%"
              , style "color" "white"
              , style "position" "absolute"
              , style "font-size" "0.8vw"
              , style "text-align" "center"
              , style "line-height" "100%"
              , style "vertical-align" "middle"
              ]
              [ text (Round.round 0 ((get model.currentPlayer model.players).policeAttention * 100) ++ " %") ]
        ]

renderSideBar : Model -> Html Msg
renderSideBar model =
    div [ style "width" "30%"
        , style "height" "100%"
        , style "position" "absolute"
        , style "z-index" "2"
        , case model.sideState of
            ShowSide ->
                css [ animationName (keyframes [ (0, [ Css.Animations.custom "transform" "translateX(-95%)" ]), (100, [ Css.Animations.custom "transform" "translateX(0%)" ]) ])
                    , animationDuration (sec(1))
                    , property "animation-fill-mode" "forwards"
                    , property "background" "-moz-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-webkit-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-o-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-linear-gradient(left, black 95%, transparent 5%)"
                    ]
            HideSide ->
                css [ animationName (keyframes [ (0, [ Css.Animations.custom "transform" "translateX(0%)" ]), (100, [ Css.Animations.custom "transform" "translateX(-95%)" ]) ])
                    , animationDuration (sec(1))
                    , property "animation-fill-mode" "forwards"
                    , property "background" "-moz-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-webkit-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-o-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-linear-gradient(left, black 95%, transparent 5%)"
                    ]
            NoSide ->
                css [ property "transform" "translateX(-95%)"
                    , property "background" "-moz-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-webkit-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-o-linear-gradient(left, black 95%, transparent 5%)"
                    , property "background" "-linear-gradient(left, black 95%, transparent 5%)"
                    ]
        ]
        [ button [ onClick Side
                 , style "width" "5%"
                 , style "height" "8%"
                 , style "left" "95%"
                 , style "top" "0%"
                 , style "position" "absolute"
                 , style "text-align" "center"
                 , style "font-size" "1vw"
                 , buttonSide
                 ]
                 [ if model.sideState == ShowSide then text "◀" else text "▶" ]
        , div [ style "width" "40%"
              , style "height" "40%"
              , style "left" "5%"
              , style "top" "5%"
              , style "position" "absolute"
              ]
              (renderPlayerAttributes model (get 0 model.players))
        , div [ style "width" "40%"
              , style "height" "40%"
              , style "left" "50%"
              , style "top" "5%"
              , style "position" "absolute"
              ]
              (renderPlayerAttributes model (get 1 model.players))
        , div [ style "width" "40%"
              , style "height" "40%"
              , style "left" "5%"
              , style "top" "50%"
              , style "position" "absolute"
              ]
              (renderPlayerAttributes model (get 2 model.players))
        , div [ style "width" "40%"
              , style "height" "40%"
              , style "left" "50%"
              , style "top" "50%"
              , style "position" "absolute"
              ]
              (renderPlayerAttributes model (get 3 model.players))
        ]

renderPlayerAttributes : Model -> Player -> List (Html Msg)
renderPlayerAttributes model player =
    let
        color =
            case player.character of
                Lance ->
                    "gold"
                Gorman ->
                    "#ad1453"
                Doherty ->
                    "#4169E1"
                Blair ->
                    "orange"
                _ ->
                    " "
        name =
            if player.exist then
                text (playerName player)
            else
                s [] [ text (playerName player) ]
    in
        [ h1 [ style "color" color, style "text-align" "center", style "font-size" "2vw", glowing player ] [ name ]
        , li [ style "color" "white", style "font-size" "1vw" ] [ text ("Wealth: " ++ Round.round 0 player.wealth) ]
        , li [ style "color" "white", style "font-size" "1vw" ] [ text ("Prestige: " ++ (Round.round 0 (player.prestige * 100)) ++ "%") ]
        , li [ style "color" "white", style "font-size" "1vw" ] [ text ("Family Members: " ++ toString player.family) ]
        , li [ style "color" "white", style "font-size" "1vw" ] [ text ("Influence: " ++ (Round.round 0 (player.influence * 100)) ++ "%") ]
        , li [ style "color" "white", style "font-size" "1vw" ] [ text ("Popular Will: " ++ (Round.round 0 (player.popularWill * 100)) ++ "%") ]
        , li [ style "color" "white", style "font-size" "1vw" ] [ text ("Police Attention: " ++ (Round.round 0 (player.policeAttention * 100)) ++ "%") ]
        , h2 [ style "color" "white", style "text-align" "center", style "font-size" "1.5vw" ] [ text ("Point: " ++ Round.round 0 (generalPoint player model)) ]
        ]

chooseDiceModel: Model -> Html Msg
chooseDiceModel model =
    case model.diceState of
        Dice ->
            button [ onClick Roll
                , style "width" "80%"
                , style "height" "10%"
                , style "left" "10%"
                , style "top" "20%"
                , style "position" "absolute"
                , style "font-size" "1.5vw"
                , Html.Styled.Attributes.disabled (not model.canClick)
                , title "Click and ROCK'N'ROLL!"
                , button1
                    ]
                [ text "MOVE" ]

        ActionDice ->
            button [ onClick RollAction
                , style "width" "80%"
                , style "height" "10%"
                , style "left" "10%"
                , style "top" "20%"
                , style "position" "absolute"
                , style "font-size" "1.5vw"
                , Html.Styled.Attributes.disabled (not model.canClick)
                , title (if model.canClick then
                            "Click to get different available actions."
                         else
                            "You've done that. How dare you!"
                        )
                , button1
                    ]
                [ text "Action" ]
        NotShowDice ->
            button [] []

showActionDice: Model -> List (Html Msg)
showActionDice model =
    let
        actionDice1 =
            if get 0 model.showActionDiceRespectively then
                button [ onClick ((actionDiceMsg model 0) 0)
                    , style "width" "80%"
                    , style "height" "10%"
                    , style "left" "10%"
                    , style "top" "35%"
                    , style "position" "absolute"
                    , style "font-size" "1.5vw"
                    , title (actionDiceHint model 0)
                    , button2
                        ]
                    [ text (actionDiceText model 0) ]
            else
                div [] []
        actionDice2 =
            if get 1 model.showActionDiceRespectively then
                button [ onClick ((actionDiceMsg model 1) 1)
                    , style "width" "80%"
                    , style "height" "10%"
                    , style "left" "10%"
                    , style "top" "50%"
                    , style "position" "absolute"
                    , style "font-size" "1.5vw"
                    , title (actionDiceHint model 1)
                    , button2
                        ]
                    [ text (actionDiceText model 1) ]
            else
                div [] []
        actionDice3 =
            if get 2 model.showActionDiceRespectively then
                button [ onClick ((actionDiceMsg model 2) 2)
                    , style "width" "80%"
                    , style "height" "10%"
                    , style "left" "10%"
                    , style "top" "65%"
                    , style "position" "absolute"
                    , style "font-size" "1.5vw"
                    , title (actionDiceHint model 2)
                    , button2
                        ]
                    [ text (actionDiceText model 2) ]
            else
                div [] []
    in
        if model.showActionDice == True then
            [actionDice1, actionDice2, actionDice3]
        else
            [div [] []]

actionDiceText: Model -> Int -> String
actionDiceText model indicator =
    case get indicator model.actionDice of
        NoActionDice ->
            "NoActionDice"
        MoveDice ->
            "MoveDice"
        FightDice ->
            "Launch a fight"
        AddDice ->
            "Send families"
        FightOrAdd ->
            "Fight Or Send"
        Lucky ->
            "Willingness"
        Reform ->
            "Bonus"

actionDiceHint : Model -> Int -> String
actionDiceHint model indicator =
    case get indicator model.actionDice of
        NoActionDice ->
            ""
        MoveDice ->
            "Click to move."
        FightDice ->
            "Click a tile and select a rival to launch a fight.\n(You'll get considerable bonus on red tiles, minor bonus on blue tiles and no bonus on white tiles.)"
        AddDice ->
            "Click a tile and send our brothers there. (Red tiles for 2 members (3 for Blair) and blue tiles for only 1.)"
        FightOrAdd ->
            "Click to make another choice between launching a fight or sending members."
        Lucky ->
            "Click to make another choice between launching a fight, sending members or getting a bonus."
        Reform ->
            "Click to get a bonus from wealth, prestige, popular will or police attention."

actionDiceMsg: Model -> Int -> Int -> Msg
actionDiceMsg model indicator buttonNumber=
    case get indicator model.actionDice of
        NoActionDice ->
            StartGameMessage ImplementationPhase (UseActionDice NoActionDice buttonNumber) NotClick
        MoveDice ->
            StartGameMessage ImplementationPhase (UseActionDice MoveDice buttonNumber) NotClick
        FightDice ->
            StartGameMessage ImplementationPhase (UseActionDice FightDice buttonNumber) Click9
        AddDice ->
            StartGameMessage ImplementationPhase (UseActionDice AddDice buttonNumber) NotClick
        FightOrAdd ->
            StartGameMessage ImplementationPhase (UseActionDice FightOrAdd buttonNumber) NotClick
        Lucky ->
            StartGameMessage ImplementationPhase (UseActionDice Lucky buttonNumber) NotClick
        Reform ->
            StartGameMessage ImplementationPhase (UseActionDice Reform buttonNumber) NotClick