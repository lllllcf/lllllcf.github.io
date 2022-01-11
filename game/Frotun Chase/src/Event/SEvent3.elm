module Event.SEvent3 exposing (..)

import String exposing (..)
import Definition exposing (..)

--------------------------------1---------------------------------------------
judgeEvent_3_1: Player -> (Bool, String)
judgeEvent_3_1 player =
    if player.character == Gorman && player.storyRound == 4 then
        (True, "3_1")
    else
        (False, "3_1")

event_3_1: Model -> Model
event_3_1 model =
    let
        description = "Grandpa used to say, \"When you hit a bottleneck, open my secret safe.\" You think that time has come at last. You got a dead cell phone, and you decided just to charge it up and come back later."
        optionDescription = ["OK."]
        hint = ["Nothing happens"]
        event = Event description optionDescription [optionFunc3_1] hint
    in
        {model | event = event}

optionFunc3_1: Player -> Player
optionFunc3_1 player =
     player

--------------------------------2---------------------------------------------
judgeEvent_3_2: Player -> (Bool, String)
judgeEvent_3_2 player =
    if player.character == Gorman && player.storyRound == 8 then
        (True, "3_2")
    else
        (False, "3_2")

event_3_2: Model -> Model
event_3_2 model =
    let
        description = "You suddenly recall the old days of grandpa, and now under your leadership, the family is not as good as before, which let you miss and feel a little ashamed. \"Grandpa disappeared for no apparent reason. If he were still here...\" At the same time you are reminded of what he had taught you."
        optionDescription = ["OK."]
        hint = ["Popular Will +3%"]
        event = Event description optionDescription [optionFunc3_2] hint
    in
        {model | event = event}

optionFunc3_2: Player -> Player
optionFunc3_2 player =
      { player | popularWill = player.popularWill + ( 3 / 100 ) }

--------------------------------3---------------------------------------------
judgeEvent_3_3: Player -> (Bool, String)
judgeEvent_3_3 player =
    if player.character == Gorman && player.storyRound == 12 then
        (True, "3_3")
    else
        (False, "3_3")

event_3_3: Model -> Model
event_3_3 model =
    let
        description = "You suddenly thought back to the phone. When you opened it, it's just a phone number in your address book. You dialed the number and all you hear was the phrase \"Not yet...\", the call was then hung up, but you received a text message that turned out to be some of your family's hidden assets."
        optionDescription = ["OK."]
        hint = ["Wealth +2000"]
        event = Event description optionDescription [optionFunc3_3] hint
    in
        {model | event = event}

optionFunc3_3: Player -> Player
optionFunc3_3 player =
      { player | wealth = player.wealth + 2000 }

--------------------------------4---------------------------------------------
judgeEvent_3_4: Player -> (Bool, String)
judgeEvent_3_4 player =
    if player.character == Gorman && player.storyRound == 16 then
        (True, "3_4")
    else
        (False, "3_4")

event_3_4: Model -> Model
event_3_4 model =
    let
        description = "Some time later, you received another text message, revealing some of the family's old relationships. You became more and more curious about who this person is..."
        optionDescription = ["OK."]
        hint = ["Prestige +3%"]
        event = Event description optionDescription [optionFunc3_4] hint
    in
        {model | event = event}

optionFunc3_4: Player -> Player
optionFunc3_4 player =
      { player | prestige = player.prestige + ( 3 / 100 ) }

--------------------------------5---------------------------------------------
judgeEvent_3_5: Player -> (Bool, String)
judgeEvent_3_5 player =
    if player.character == Gorman && player.storyRound == 20 then
        (True, "3_5")
    else
        (False, "3_5")

event_3_5: Model -> Model
event_3_5 model =
    let
        description = "One day, you received a MMS message. It was a photo of your grandfather at the beach. \"It turned out to be my grandfather pretending to be missing but actually running away.\" And the more confident you became in the management of your family."
        optionDescription = ["OK."]
        hint = ["Prestige * 1.05"]
        event = Event description optionDescription [optionFunc3_5] hint
    in
        {model | event = event}

optionFunc3_5: Player -> Player
optionFunc3_5 player =
      { player | prestige = player.prestige * 1.05 }