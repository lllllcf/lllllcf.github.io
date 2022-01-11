module Event.SEvent4 exposing (..)

import String exposing (..)
import Definition exposing (..)

--------------------------------1---------------------------------------------
judgeEvent_4_1: Player -> (Bool, String)
judgeEvent_4_1 player =
    if player.character == Doherty && player.storyRound == 4 then
        (True, "4_1")
    else
        (False, "4_1")

event_4_1: Model -> Model
event_4_1 model =
    let
        description = "Your family has got along well with the police for generations. In this case, as the family motto goes, \"Only a fool goes to prison.\""
        optionDescription = ["OK."]
        hint = ["Police Attention -2%"]
        event = Event description optionDescription [optionFunc4_1] hint
    in
        {model | event = event}

optionFunc4_1: Player -> Player
optionFunc4_1 player =
      { player | policeAttention = player.policeAttention - ( 2 / 100 ) }

--------------------------------2---------------------------------------------
judgeEvent_4_2: Player -> (Bool, String)
judgeEvent_4_2 player =
    if player.character == Doherty && player.storyRound == 8 then
        (True, "4_2")
    else
        (False, "4_2")

event_4_2: Model -> Model
event_4_2 model =
    let
        description = "Although it is good for the family, you actually despise the policemen who are good friends with the family, because they cannot stand up for their own justice as policemen."
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc4_2] hint
    in
        {model | event = event}

optionFunc4_2: Player -> Player
optionFunc4_2 player =
       player

--------------------------------3---------------------------------------------
judgeEvent_4_3: Player -> (Bool, String)
judgeEvent_4_3 player =
    if player.character == Doherty && player.storyRound == 12 then
        (True, "4_3")
    else
        (False, "4_3")

event_4_3: Model -> Model
event_4_3 model =
    let
        description = "Your bad attitude towards the police also affects the relationship between the family and the police to some extent."
        optionDescription = ["OK."]
        hint = ["Police Attention +2%"]
        event = Event description optionDescription [optionFunc4_3] hint
    in
        {model | event = event}

optionFunc4_3: Player -> Player
optionFunc4_3 player =
      { player | policeAttention = player.policeAttention + ( 2 / 100 ) }

--------------------------------4---------------------------------------------
judgeEvent_4_4: Player -> (Bool, String)
judgeEvent_4_4 player =
    if player.character == Doherty && player.storyRound == 16 then
        (True, "4_4")
    else
        (False, "4_4")

event_4_4: Model -> Model
event_4_4 model =
    let
        description = "On the road, you saw the police enforcing the law impartially, and you wondered, \"Is this bullying? Just like what we do?\" Have they really lost the sense of justice that they had when working as the police at first?"
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc4_4] hint
    in
        {model | event = event}

optionFunc4_4: Player -> Player
optionFunc4_4 player =
     player

--------------------------------5---------------------------------------------
judgeEvent_4_5: Player -> (Bool, String)
judgeEvent_4_5 player =
    if player.character == Doherty && player.storyRound == 20 then
        (True, "4_5")
    else
        (False, "4_5")

event_4_5: Model -> Model
event_4_5 model =
    let
        description = "You heard the young police ask, \"Why do we know what the gang have done but don't disclose them?\" The old police officer said, \"Because this will only lead to more chaos, not just in the gangs, but in all the people.\" So is this also a kind of justice? Your recognition of them has strengthened."
        optionDescription = ["OK."]
        hint = ["Police Attention * 0.95"]
        event = Event description optionDescription [optionFunc4_5] hint
    in
        {model | event = event}

optionFunc4_5: Player -> Player
optionFunc4_5 player =
      { player | policeAttention = player.policeAttention * 0.95 }
