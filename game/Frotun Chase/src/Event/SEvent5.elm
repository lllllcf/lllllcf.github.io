module Event.SEvent5 exposing (..)

import String exposing (..)
import Definition exposing (..)

--------------------------------1---------------------------------------------
judgeEvent_5_1: Player -> (Bool, String)
judgeEvent_5_1 player =
    if player.character == Blair && player.storyRound == 4 then
        (True, "5_1")
    else
        (False, "5_1")

event_5_1: Model -> Model
event_5_1 model =
    let
        description = "There is a medium in your family, and he has got along well with the family since the generation of his grandfather, but you do not believe his words, you do not know why the family get along with him."
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc5_1] hint
    in
        {model | event = event}

optionFunc5_1: Player -> Player
optionFunc5_1 player =
      player

--------------------------------2---------------------------------------------
judgeEvent_5_2: Player -> (Bool, String)
judgeEvent_5_2 player =
    if player.character == Blair && player.storyRound == 8 then
        (True, "5_2")
    else
        (False, "5_2")

event_5_2: Model -> Model
event_5_2 model =
    let
        description = "\"The Lord is too young...\" You heard the medium talking to your followers, and you felt angry because you felt that he thought you were too young to take on great responsibilities. You were being belittled."
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc5_2] hint
    in
        {model | event = event}

optionFunc5_2: Player -> Player
optionFunc5_2 player =
      player

--------------------------------3---------------------------------------------
judgeEvent_5_3: Player -> (Bool, String)
judgeEvent_5_3 player =
    if player.character == Blair && player.storyRound == 12 then
        (True, "5_3")
    else
        (False, "5_3")

event_5_3: Model -> Model
event_5_3 model =
    let
        description = "One day, you see him in the street \"bamboozle people\", you felt contempt for him. But you were moved when seeing the relief on people's faces after they questioned him."
        optionDescription = ["OK."]
        hint = ["Popular Will +3%"]
        event = Event description optionDescription [optionFunc5_3] hint
    in
        {model | event = event}

optionFunc5_3: Player -> Player
optionFunc5_3 player =
      { player | popularWill = player.popularWill + ( 3 / 100) }

--------------------------------4---------------------------------------------
judgeEvent_5_4: Player -> (Bool, String)
judgeEvent_5_4 player =
    if player.character == Blair && player.storyRound == 16 then
        (True, "5_4")
    else
        (False, "5_4")

event_5_4: Model -> Model
event_5_4 model =
    let
        description = "You began to wonder why your neighborhood was always less grumpy and more calm than other gangs. You decided to have a good talk with the medium one day."
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc5_4] hint
    in
        {model | event = event}

optionFunc5_4: Player -> Player
optionFunc5_4 player =
       player

--------------------------------5---------------------------------------------
judgeEvent_5_5: Player -> (Bool, String)
judgeEvent_5_5 player =
    if player.character == Blair && player.storyRound == 20 then
        (True, "5_5")
    else
        (False, "5_5")

event_5_5: Model -> Model
event_5_5 model =
    let
        description = "After talking to him, you realized that it was obviously better to call him a psychologist, even though he's all babbling. Although he appeared as a medium, his purpose is to comfort other's heart. You see the importance of taking people's moods into account."
        optionDescription = ["OK."]
        hint = ["Popular Will * 1.05"]
        event = Event description optionDescription [optionFunc5_5] hint
    in
        {model | event = event}

optionFunc5_5: Player -> Player
optionFunc5_5 player =
      { player | popularWill = player.popularWill * 1.05 }