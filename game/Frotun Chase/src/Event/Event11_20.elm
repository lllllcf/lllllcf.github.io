module Event.Event11_20 exposing (..)

import String exposing (..)
import Definition exposing (..)

-------------------------------------------------11--------------------------------------
judgeEvent_1_11: Player -> (Bool, String)
judgeEvent_1_11 player =
    if player.wealth < 10000 && player.wealth > 5000  then
        (True, "1_11")
    else
        (False, "1_11")

event_1_11: Model -> Model
event_1_11 model =
    let
        description = "The impoverishment of the region made life miserable, and inflation and wages stagnated. "
        optionDescription = ["I can't change existing policies.", "Take money out of the tight coffers for a living allowance."]
        hint = ["Popular Will -5%", "Wealth -5000, Popular Will +5%"]
        event = Event description optionDescription [optionFunc1_11_1, optionFunc1_11_2] hint
    in
        {model | event = event}

optionFunc1_11_1: Player -> Player
optionFunc1_11_1 player =
    {player | popularWill = player.popularWill - 0.05 }

optionFunc1_11_2: Player -> Player
optionFunc1_11_2 player =
    {player | popularWill = player.popularWill + 0.05, wealth = player.wealth - 5000 }

-------------------------------------------------12--------------------------------------
judgeEvent_1_12: Player -> (Bool, String)
judgeEvent_1_12 player =
    if player.popularWill < 0.2  then
        (True, "1_12")
    else
        (False, "1_12")

event_1_12: Model -> Model
event_1_12 model =
    let
        description = "Your management makes people feel depressed and desperate, and finally they can't stand it anymore. They start to demonstrate and march, and things get worse and worse."
        optionDescription = ["Stay out of the limelight", "Try to make a change, but it won't work in the short term."]
        hint = ["Popular Will -5%", "Wealth -5000, Popular Will +5%"]
        event = Event description optionDescription [optionFunc1_12_1, optionFunc1_12_2] hint
    in
        {model | event = event}

optionFunc1_12_1: Player -> Player
optionFunc1_12_1 player =
    {player | popularWill = player.popularWill - 0.05 }

optionFunc1_12_2: Player -> Player
optionFunc1_12_2 player =
    {player | popularWill = player.popularWill + 0.05, wealth = player.wealth - 5000 }

-------------------------------------------------13--------------------------------------
judgeEvent_1_13: Player -> (Bool, String)
judgeEvent_1_13 player =
    if player.influence > 0.3  then
        (True, "1_13")
    else
        (False, "1_13")

event_1_13: Model -> Model
event_1_13 model =
    let
        description = "Your great prestige has also made your little brother swell and become aggressive to the people."
        optionDescription = ["Rectify the people's minds and educate them", "I think this is a good change."]
        hint = ["Popular Will +5%", "Wealth -1000, Prestige +2%, Popular Will -5%"]
        event = Event description optionDescription [optionFunc1_13_1, optionFunc1_13_2] hint
    in
        {model | event = event}

optionFunc1_13_1: Player -> Player
optionFunc1_13_1 player =
    {player | popularWill = player.popularWill + 0.05 }

optionFunc1_13_2: Player -> Player
optionFunc1_13_2 player =
    {player | wealth = player.wealth - 1000, popularWill = player.popularWill - 0.05, prestige = player.prestige + 0.02 }

-------------------------------------------------14--------------------------------------
judgeEvent_1_14: Player -> (Bool, String)
judgeEvent_1_14 player =
    if player.influence > 0.4  then
        (True, "1_14")
    else
        (False, "1_14")

event_1_14: Model -> Model
event_1_14 model =
    let
        description = "Your enormous prestige also causes the followers arrogant and begin to try to oust other family members in the area."
        optionDescription = ["Strongly in favor of.", "Prefer to cooperate with them."]
        hint = ["Prestige +3%", "Wealth +2000"]
        event = Event description optionDescription [optionFunc1_14_1, optionFunc1_14_2] hint
    in
        {model | event = event}

optionFunc1_14_1: Player -> Player
optionFunc1_14_1 player =
    {player | influence = player.prestige + 0.03 }

optionFunc1_14_2: Player -> Player
optionFunc1_14_2 player =
    {player | wealth = player.wealth + 1500 }

-------------------------------------------------15--------------------------------------
judgeEvent_1_15: Player -> (Bool, String)
judgeEvent_1_15 player =
    if player.popularWill > 0.7 then
        (True, "1_15")
    else
        (False, "1_15")

event_1_15: Model -> Model
event_1_15 model =
    let
        description = "Good weather for the crops, people live happily, and the economy has been rapid growth."
        optionDescription = ["OK."]
        hint = ["Wealth +1000"]
        event = Event description optionDescription [optionFunc1_15_1] hint
    in
        {model | event = event}

optionFunc1_15_1: Player -> Player
optionFunc1_15_1 player =
    {player | wealth = player.wealth + 1000 }

-------------------------------------------------16--------------------------------------
judgeEvent_1_16: Player -> (Bool, String)
judgeEvent_1_16 player =
    if player.wealth > 50000  then
        (True, "1_16")
    else
        (False, "1_16")

event_1_16: Model -> Model
event_1_16 model =
    let
        description = "Nowadays, your business is good, and in your spare time you're hooked on puzzles. Today, you've come across a very difficult puzzle."
        optionDescription = ["I'm obsessed with puzzles.", "Struggle for a period of time without a start, self-abandon."]
        hint = ["Wealth -3000", "Nothing happens"]
        event = Event description optionDescription [optionFunc1_16_1, optionFunc1_16_2] hint
    in
        {model | event = event}

optionFunc1_16_1: Player -> Player
optionFunc1_16_1 player =
    {player | wealth = player.wealth - 3000 }

optionFunc1_16_2: Player -> Player
optionFunc1_16_2 player =
     player

-------------------------------------------------17--------------------------------------
judgeEvent_1_17: Player -> (Bool, String)
judgeEvent_1_17 player =
    if player.policeAttention < 0.2  then
        (True, "1_17")
    else
        (False, "1_17")

event_1_17: Model -> Model
event_1_17 model =
    let
        description = "You're surprised at how little attention the police give you, and you're able to do both in black and white, and you decide..."
        optionDescription = ["Increase the intensity of the search for money.", "Being frightened."]
        hint = ["Wealth +2500, Police Attention +5%", "Nothing happens"]
        event = Event description optionDescription [optionFunc1_17_1, optionFunc1_17_2] hint
    in
        {model | event = event}

optionFunc1_17_1: Player -> Player
optionFunc1_17_1 player =
    {player | wealth = player.wealth + 2500 , policeAttention = player.policeAttention + 0.05 }

optionFunc1_17_2: Player -> Player
optionFunc1_17_2 player =
     player

-------------------------------------------------18--------------------------------------
judgeEvent_1_18: Player -> (Bool, String)
judgeEvent_1_18 player =
    if player.wealth > 40000 && player.popularWill > 0.6 && player.prestige > 0.6 then
        (True, "1_18")
    else
        (False, "1_18")

event_1_18: Model -> Model
event_1_18 model =
    let
        description = "Everything is going so well that you feel like you've become the uncrowned king."
        optionDescription = ["Strengthen welfare and treat the people well.", "Don't be arrogant, as always is the best."]
        hint = ["Wealth -2500, Popular Will +5%", "Nothing happens"]
        event = Event description optionDescription [optionFunc1_18_1, optionFunc1_18_2] hint
    in
        {model | event = event}

optionFunc1_18_1: Player -> Player
optionFunc1_18_1 player =
    {player | popularWill = player.popularWill + 0.05, wealth = player.wealth - 2500 }

optionFunc1_18_2: Player -> Player
optionFunc1_18_2 player =
     player

-------------------------------------------------19--------------------------------------
judgeEvent_1_19: Player -> (Bool, String)
judgeEvent_1_19 player =
    if player.policeAttention > 0.8 && player.popularWill > 0.7 then
        (True, "1_19")
    else
        (False, "1_19")

event_1_19: Model -> Model
event_1_19 model =
    let
        description = "The police are paying close attention to you for a lot of recent activities, but your good opinion of the people makes them suspicious."
        optionDescription = ["They go to people and finally believe that you are a good man."]
        hint = ["Police Attention -10%"]
        event = Event description optionDescription [optionFunc1_19_1] hint
    in
        {model | event = event}

optionFunc1_19_1: Player -> Player
optionFunc1_19_1 player =
    {player | policeAttention = player.policeAttention - 0.1 }

-------------------------------------------------20--------------------------------------
judgeEvent_1_20: Player -> (Bool, String)
judgeEvent_1_20 player =
    if player.prestige < 0.3 && player.wealth > 30000 then
        (True, "1_20")
    else
        (False, "1_20")

event_1_20: Model -> Model
event_1_20 model =
    let
        description = "Even if you have good management skills, you are still unknown."
        optionDescription = ["Spending a lot of money at an auction.", "Believe that the peak in a certain field will make you famous."]
        hint = ["Wealth -2500, Prestige +5%", "Wealth +1500, Prestige -3%"]
        event = Event description optionDescription [optionFunc1_20_1, optionFunc1_20_2] hint
    in
        {model | event = event}

optionFunc1_20_1: Player -> Player
optionFunc1_20_1 player =
    {player | prestige = player.prestige + 0.05 , wealth = player.wealth - 2500 }

optionFunc1_20_2: Player -> Player
optionFunc1_20_2 player =
    {player | wealth = player.wealth + 1500 , prestige = player.prestige - 0.03 }