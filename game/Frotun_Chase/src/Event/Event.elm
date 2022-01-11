module Event.Event exposing (..)

import String exposing (..)
import Definition exposing (..)
import Event.Event1_10 exposing (..)
import Event.Event11_20 exposing (..)
import Event.Event21_30 exposing (..)
import Event.Event31_40 exposing (..)
import Event.Event41_50 exposing (..)
import Event.Event51_60 exposing (..)
import Event.SEvent2 exposing (..)
import Event.SEvent3 exposing (..)
import Event.SEvent4 exposing (..)
import Event.SEvent5 exposing (..)

--------------------merge---------------------------
chooseAnEvent: Model -> Model
chooseAnEvent model =
      chooseStoryEvent (chooseRandomEvent (get model.currentPlayer model.players) model)

aiChooseEvent: Player -> Model -> Model
aiChooseEvent player model =
    chooseRandomEvent player model

--------------------random events---------------------------
chooseRandomEvent: Player -> Model -> Model
chooseRandomEvent player model =
    let
        judgeEventList = [judgeEvent_1_1, judgeEvent_1_2, judgeEvent_1_3, judgeEvent_1_4, judgeEvent_1_5
                        , judgeEvent_1_6, judgeEvent_1_7, judgeEvent_1_8, judgeEvent_1_9, judgeEvent_1_10
                        , judgeEvent_1_11, judgeEvent_1_12, judgeEvent_1_13, judgeEvent_1_14, judgeEvent_1_15
                        , judgeEvent_1_16, judgeEvent_1_17, judgeEvent_1_18, judgeEvent_1_19, judgeEvent_1_20
                        , judgeEvent_1_21, judgeEvent_1_22, judgeEvent_1_23, judgeEvent_1_24, judgeEvent_1_25
                        , judgeEvent_1_26, judgeEvent_1_27, judgeEvent_1_28, judgeEvent_1_29, judgeEvent_1_30
                        , judgeEvent_1_31, judgeEvent_1_32, judgeEvent_1_33, judgeEvent_1_34, judgeEvent_1_35
                        , judgeEvent_1_36, judgeEvent_1_37, judgeEvent_1_38, judgeEvent_1_39, judgeEvent_1_40
                        , judgeEvent_1_41, judgeEvent_1_42, judgeEvent_1_43, judgeEvent_1_44, judgeEvent_1_45
                        , judgeEvent_1_46, judgeEvent_1_47, judgeEvent_1_48, judgeEvent_1_49, judgeEvent_1_50
                        , judgeEvent_1_51, judgeEvent_1_52, judgeEvent_1_53, judgeEvent_1_54, judgeEvent_1_55
                        , judgeEvent_1_56, judgeEvent_1_57, judgeEvent_1_58, judgeEvent_1_59, judgeEvent_1_60
                        ]
        filteredList = List.filter (\func -> Tuple.first (func player)) judgeEventList
        eventList = [event_1_1, event_1_2, event_1_3, event_1_4, event_1_5
                   , event_1_6, event_1_7, event_1_8, event_1_9, event_1_10
                   , event_1_11, event_1_12, event_1_13, event_1_14, event_1_15
                   , event_1_16, event_1_17, event_1_18, event_1_19, event_1_20
                   , event_1_21, event_1_22, event_1_23, event_1_24, event_1_25
                   , event_1_26, event_1_27, event_1_28, event_1_29, event_1_30
                   , event_1_31, event_1_32, event_1_33, event_1_34, event_1_35
                   , event_1_36, event_1_37, event_1_38, event_1_39, event_1_40
                   , event_1_41, event_1_42, event_1_43, event_1_44, event_1_45
                   , event_1_46, event_1_47, event_1_48, event_1_49, event_1_50
                   , event_1_51, event_1_52, event_1_53, event_1_54, event_1_55
                   , event_1_56, event_1_57, event_1_58, event_1_59, event_1_60
                    ]
    in
        case List.length filteredList of
            0 ->
                noEvent model
            _ ->
                let
                    randomIndex = modBy (List.length filteredList) model.randomNumber
                    randomEventJudge = get randomIndex filteredList
                    indicator = Tuple.second (randomEventJudge player)
                    event = indicatorToEvent indicator eventList
                in
                    event model

indicatorToEvent: String -> List (Model -> Model) -> (Model -> Model)
indicatorToEvent indicator event =
    let
        indicatorList = split "_" indicator
        part2 = toIntSure (get 1 indicatorList)
    in
        get (part2 - 1) event

noEvent: Model -> Model
noEvent model =
    let
        description = "Nothing happened in this round. Please cherish the rare peaceful days..."
        optionDescription = ["Cheers!"]
        hint = ["No special effect."]
        event = Event description optionDescription [optionFuncNo] hint
    in
        {model | event = event}

optionFuncNo: Player -> Player
optionFuncNo player =
        player

-----------------------------------------story events-----------------------------------------
chooseStoryEvent: Model -> Model
chooseStoryEvent model =
    let
        player = get model.currentPlayer model.players
        judgeEventList = [judgeEvent_2_1, judgeEvent_2_2, judgeEvent_2_3, judgeEvent_2_4, judgeEvent_2_5
                        , judgeEvent_3_1, judgeEvent_3_2, judgeEvent_3_3, judgeEvent_3_4, judgeEvent_3_5
                        , judgeEvent_4_1, judgeEvent_4_2, judgeEvent_4_3, judgeEvent_4_4, judgeEvent_4_5
                        , judgeEvent_5_1, judgeEvent_5_2, judgeEvent_5_3, judgeEvent_5_4, judgeEvent_5_5
                        ]
        filteredList = List.filter (\func -> Tuple.first (func player)) judgeEventList
        eventList = [event_2_1, event_2_2, event_2_3, event_2_4, event_2_5
                   , event_3_1, event_3_2, event_3_3, event_3_4, event_3_5
                   , event_4_1, event_4_2, event_4_3, event_4_4, event_4_5
                   , event_5_1, event_5_2, event_5_3, event_5_4, event_5_5
                    ]
    in
        case List.length filteredList of
            0 ->
                model
            _ ->
                let
                    randomIndex = modBy (List.length filteredList) model.randomNumber
                    randomEventJudge = get randomIndex filteredList
                    indicator = Tuple.second (randomEventJudge player)
                    event = storyIndicatorToEvent indicator eventList
                in
                    event model

storyIndicatorToEvent: String -> List (Model -> Model) -> (Model -> Model)
storyIndicatorToEvent indicator event =
    let
        indicatorList = split "_" indicator
        part1 = toIntSure (get 0 indicatorList)
        part2 = toIntSure (get 1 indicatorList)
    in
        get ((part1 - 2) * 5 + (part2 - 1)) event