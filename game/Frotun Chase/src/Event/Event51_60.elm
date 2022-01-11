module Event.Event51_60 exposing (..)

import String exposing (..)
import Definition exposing (..)

-------------------------------------------------51--------------------------------------
judgeEvent_1_51: Player -> (Bool, String)
judgeEvent_1_51 player =
    if player.currentIndex == 24 then
        (True, "1_51")
    else
        (False, "1_51")

event_1_51: Model -> Model
event_1_51 model =
    let
        description = "You pass by the gate of the jail and catch a glimpse of the brother who once fought with you. You insist on going forward and trying to talk to the security guard."
        optionDescription = ["Who's that guy?", "I want to bail him out."]
        hint = ["", ""]
        event = Event description optionDescription [optionFunc1_51_1, optionFunc1_51_2] hint
    in
        {model | event = event}

optionFunc1_51_1: Player -> Player
optionFunc1_51_1 player =
    player

optionFunc1_51_2: Player -> Player
optionFunc1_51_2 player =
    {player | wealth = player.wealth - 2000, prestige = player.prestige + 0.04 }

-------------------------------------------------52--------------------------------------
judgeEvent_1_52: Player -> (Bool, String)
judgeEvent_1_52 player =
    if player.dice < 4 then
        (True, "1_52")
    else
        (False, "1_52")

event_1_52: Model -> Model
event_1_52 model =
    let
        description = "You come across a diary belonged to your subordinate. It records a lot of trickery."
        optionDescription = ["Got it.", "Tear if off in his face."]
        hint = ["Wealth +500, PopularWill -2%", "Prestige -1%"]
        event = Event description optionDescription [optionFunc1_52_1, optionFunc1_52_2] hint
    in
        {model | event = event}

optionFunc1_52_1: Player -> Player
optionFunc1_52_1 player =
    {player | wealth = player.wealth + 500, popularWill = player.popularWill - 0.02 }

optionFunc1_52_2: Player -> Player
optionFunc1_52_2 player =
    {player | prestige = player.prestige - 0.01 }

-------------------------------------------------53--------------------------------------
judgeEvent_1_53: Player -> (Bool, String)
judgeEvent_1_53 player =
    if player.dice > 3 then
        (True, "1_53")
    else
        (False, "1_53")

event_1_53: Model -> Model
event_1_53 model =
    let
        description = "The richest man in Fortun had a grand party, but your name wasn't on the invitation and you felt really angry at him."
        optionDescription = ["Steal his property.", "Call on brothers to ruin this feast."]
        hint = ["Guess what", "Guess what"]
        event = Event description optionDescription [optionFunc1_53_1, optionFunc1_53_2] hint
    in
        {model | event = event}

optionFunc1_53_1: Player -> Player
optionFunc1_53_1 player =
    {player | wealth = player.wealth + 2000, prestige = player.prestige - 0.04 }

optionFunc1_53_2: Player -> Player
optionFunc1_53_2 player =
    {player | policeAttention = player.policeAttention + 0.03, prestige = player.prestige + 0.03, popularWill = player.popularWill - 0.01 }

-------------------------------------------------54--------------------------------------
judgeEvent_1_54: Player -> (Bool, String)
judgeEvent_1_54 player =
    if player.dice < 4 then
        (True, "1_54")
    else
        (False, "1_54")

event_1_54: Model -> Model
event_1_54 model =
    let
        description = "You are in the car, on the way to your noble residence. Suddenly, in a dark corner, a robber is committing murder."
        optionDescription = ["Stop and kill that murderer.", "Pretend nothing happens."]
        hint = ["Wise choice", "Wise choice"]
        event = Event description optionDescription [optionFunc1_54_1, optionFunc1_54_2] hint
    in
        {model | event = event}

optionFunc1_54_1: Player -> Player
optionFunc1_54_1 player =
    {player | popularWill = player.popularWill + 0.01, policeAttention = player.policeAttention - 0.01 }

optionFunc1_54_2: Player -> Player
optionFunc1_54_2 player =
    {player | policeAttention = player.policeAttention - 0.02 }

-------------------------------------------------55--------------------------------------
judgeEvent_1_55: Player -> (Bool, String)
judgeEvent_1_55 player =
    if player.dice > 3 then
        (True, "1_55")
    else
        (False, "1_55")

event_1_55: Model -> Model
event_1_55 model =
    let
        description = "The storm is coming, but your eldest son is still negotiating with the enemy."
        optionDescription = ["Tell him to take care of himself and come back.", "Push him to a negotiation that is in our favor."]
        hint = ["Prestige +2%", "Prestige -2%, Wealth +1000"]
        event = Event description optionDescription [optionFunc1_55_1, optionFunc1_55_2] hint
    in
        {model | event = event}

optionFunc1_55_1: Player -> Player
optionFunc1_55_1 player =
    {player | prestige = player.prestige + 0.02 }

optionFunc1_55_2: Player -> Player
optionFunc1_55_2 player =
    {player | prestige = player.prestige - 0.02, wealth = player.wealth + 1000 }

-------------------------------------------------56--------------------------------------
judgeEvent_1_56: Player -> (Bool, String)
judgeEvent_1_56 player =
    if player.dice < 3 then
        (True, "1_56")
    else
        (False, "1_56")

event_1_56: Model -> Model
event_1_56 model =
    let
        description = "When you are enjoying the scenery on the balcony, a family member suddenly rushes in front of you and pushes you down. Fortunately, you caught hold of the railing and didn't fall down."
        optionDescription = ["Kill the traitor!"]
        hint = ["Police Attention + 3%"]
        event = Event description optionDescription [optionFunc1_56_1] hint
    in
        {model | event = event}

optionFunc1_56_1: Player -> Player
optionFunc1_56_1 player =
    {player | policeAttention = player.policeAttention + 3/100 }

-------------------------------------------------57--------------------------------------
judgeEvent_1_57: Player -> (Bool, String)
judgeEvent_1_57 player =
    if player.dice > 4 then
        (True, "1_57")
    else
        (False, "1_57")

event_1_57: Model -> Model
event_1_57 model =
    let
        description = "The assistant of the minister in the town comes to your home late at night, and he comes up with a large sum of money for you to help kill the minister."
        optionDescription = ["Money is power!", "Get out of here!"]
        hint = ["Wealth +2000, Police Attention +5%", "Prestige +1%"]
        event = Event description optionDescription [optionFunc1_57_1, optionFunc1_57_2] hint
    in
        {model | event = event}

optionFunc1_57_1: Player -> Player
optionFunc1_57_1 player =
    {player | policeAttention = player.policeAttention + 5/100, wealth = player.wealth + 2000 }

optionFunc1_57_2: Player -> Player
optionFunc1_57_2 player =
    {player | prestige = player.prestige + 1/100 }

-------------------------------------------------58--------------------------------------
judgeEvent_1_58: Player -> (Bool, String)
judgeEvent_1_58 player =
    if player.dice > 4 then
        (True, "1_58")
    else
        (False, "1_58")

event_1_58: Model -> Model
event_1_58 model =
    let
        description = "The police station has recently been in financial crisis, which is a good opportunity to infiltrate the police station."
        optionDescription = ["Send them money.", "This is a good opportunity to expand."]
        hint = ["Wealth -1800, Police Attention -5%", "Police Attention +2%"]
        event = Event description optionDescription [optionFunc1_58_1, optionFunc1_58_2] hint
    in
        {model | event = event}

optionFunc1_58_1: Player -> Player
optionFunc1_58_1 player =
    {player | wealth = player.wealth - 1800, policeAttention = player.policeAttention - 5/100 }

optionFunc1_58_2: Player -> Player
optionFunc1_58_2 player =
    {player | policeAttention = player.policeAttention + 2/100 }

-------------------------------------------------59--------------------------------------
judgeEvent_1_59: Player -> (Bool, String)
judgeEvent_1_59 player =
    if player.dice < 6 then
        (True, "1_59")
    else
        (False, "1_59")

event_1_59: Model -> Model
event_1_59 model =
    let
        description = "A lot of things I've been through recently have inspired me to publish a book."
        optionDescription = ["Write a book about financial management", "Write a book about the history of the family!"]
        hint = ["Wealth -600 Prestige +2%", "Wealth -1100 Prestige +4%"]
        event = Event description optionDescription [optionFunc1_59_1, optionFunc1_59_2] hint
    in
        {model | event = event}

optionFunc1_59_1: Player -> Player
optionFunc1_59_1 player =
    {player | wealth = player.wealth - 600, prestige = player.prestige + 2/100 }

optionFunc1_59_2: Player -> Player
optionFunc1_59_2 player =
    {player | wealth = player.wealth - 1100, prestige = player.prestige + 4/100 }

-------------------------------------------------60--------------------------------------
judgeEvent_1_60: Player -> (Bool, String)
judgeEvent_1_60 player =
    if player.dice < 5 then
        (True, "1_60")
    else
        (False, "1_60")

event_1_60: Model -> Model
event_1_60 model =
    let
        description = "My son has recently become addicted to alchemy. He keeps himself in his backyard hut all day, claiming that he will one day make a lot of gold."
        optionDescription = ["Get him out of there!", "Persuading him as a father."]
        hint = ["Will he be angry?", "Will he listen to you?"]
        event = Event description optionDescription [optionFunc1_60_1, optionFunc1_60_2] hint
    in
        {model | event = event}

optionFunc1_60_1: Player -> Player
optionFunc1_60_1 player =
    {player | popularWill = player.popularWill - 2/100, prestige = player.prestige + 1/100 }

optionFunc1_60_2: Player -> Player
optionFunc1_60_2 player =
    {player | popularWill = player.prestige - 1/100 }
