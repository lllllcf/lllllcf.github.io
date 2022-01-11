module Event.SEvent2 exposing (..)

import String exposing (..)
import Definition exposing (..)

--------------------------------1---------------------------------------------
judgeEvent_2_1: Player -> (Bool, String)
judgeEvent_2_1 player =
    if player.character == Lance && player.storyRound == 4 then
        (True, "2_1")
    else
        (False, "2_1")

event_2_1: Model -> Model
event_2_1 model =
    let
        description = "You found grandfather's notepad, which recorded a series of business methods, and got the key hidden in the pages, you do not know which door to open..."
        optionDescription = ["OK."]
        hint = ["Wealth +1000"]
        event = Event description optionDescription [optionFunc2_1] hint
    in
        {model | event = event}

optionFunc2_1: Player -> Player
optionFunc2_1 player =
    {player | wealth = player.wealth + 1000 }

--------------------------------2---------------------------------------------
judgeEvent_2_2: Player -> (Bool, String)
judgeEvent_2_2 player =
    if player.character == Lance && player.storyRound == 8 then
        (True, "2_2")
    else
        (False, "2_2")

event_2_2: Model -> Model
event_2_2 model =
    let
        description = "After a long absence, you stepped into grandfather's study. You wanted to see the book that grandfather had mentioned to you all the time. Unexpectedly, it was a mechanism on the shelf, and I opened the secret door after the shelf with the key found last time."
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc2_2] hint
    in
        {model | event = event}

optionFunc2_2: Player -> Player
optionFunc2_2 player =
     player

--------------------------------3---------------------------------------------
judgeEvent_2_3: Player -> (Bool, String)
judgeEvent_2_3 player =
    if player.character == Lance && player.storyRound == 12 then
        (True, "2_3")
    else
        (False, "2_3")

event_2_3: Model -> Model
event_2_3 model =
    let
        description = "You contacted grandfather's once most trusted follower, but he did not trust your ability, and did not want to help you, trying to prove yourself!"
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc2_3] hint
    in
        {model | event = event}

optionFunc2_3: Player -> Player
optionFunc2_3 player =
     player

--------------------------------4---------------------------------------------
judgeEvent_2_4: Player -> (Bool, String)
judgeEvent_2_4 player =
    if player.character == Lance && player.storyRound == 16 then
        (True, "2_4")
    else
        (False, "2_4")

event_2_4: Model -> Model
event_2_4 model =
    let
        description = "After a period of time, the head of followers contacted you actively, and you got his recognition. He began to support you in public, the old man in the underworld obviously know him, and your followers trust you more."
        optionDescription = ["OK."]
        hint = ["Prestige +4%"]
        event = Event description optionDescription [optionFunc2_4] hint
    in
        {model | event = event}

optionFunc2_4: Player -> Player
optionFunc2_4 player =
    {player | prestige = player.prestige + ( 4 / 100 ) }

--------------------------------5---------------------------------------------
judgeEvent_2_5: Player -> (Bool, String)
judgeEvent_2_5 player =
    if player.character == Lance && player.storyRound == 20 then
        (True, "2_5")
    else
        (False, "2_5")

event_2_5: Model -> Model
event_2_5 model =
    let
        description = "This period of time the head's management makes you business go to a higher level. You think the future will also be able to go on so smoothly..."
        optionDescription = ["OK."]
        hint = ["Wealth * 1.05"]
        event = Event description optionDescription [optionFunc2_5] hint
    in
        {model | event = event}

optionFunc2_5: Player -> Player
optionFunc2_5 player =
    {player | wealth = player.wealth * 1.05 }
