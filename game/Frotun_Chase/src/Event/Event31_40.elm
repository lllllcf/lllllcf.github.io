module Event.Event31_40 exposing (..)

import String exposing (..)
import Definition exposing (..)

-------------------------------------------------31--------------------------------------
judgeEvent_1_31: Player -> (Bool, String)
judgeEvent_1_31 player =
    if player.currentIndex == 58 then
        (True, "1_31")
    else
        (False, "1_31")

event_1_31: Model -> Model
event_1_31 model =
    let
        description = "Mr.Sheriff said: 'Welcome to my place! If you want to continue to engage in your shameful activities, pay the hush fee obediently and I'll let you go.'"
        optionDescription = ["Fine, and get out of my face.", "I don't give a care, police is nothing."]
        hint = ["Wealth -3000", "Police attention +15%"]
        event = Event description optionDescription [optionFunc1_31_1, optionFunc1_31_2] hint
    in
        {model | event = event}

optionFunc1_31_1: Player -> Player
optionFunc1_31_1 player =
    {player | wealth = player.wealth - 3000 }

optionFunc1_31_2: Player -> Player
optionFunc1_31_2 player =
    {player | policeAttention = player.policeAttention + 0.15 }

-------------------------------------------------32--------------------------------------
judgeEvent_1_32: Player -> (Bool, String)
judgeEvent_1_32 player =
    if player.family > 200 then
        (True, "1_32")
    else
        (False, "1_32")

event_1_32: Model -> Model
event_1_32 model =
    let
        description = "We are extremely proud of our current prosperity. Fifty years ago, we were just inconspicuous hooligans. Let us celebrate tonight!"
        optionDescription = ["Let's have a tea party.", "Hey you! Go to the shooting range and keep practicing!"]
        hint = ["Wealth -1000, PopularWill +2%", "Prestige +2%, PopularWill -1%"]
        event = Event description optionDescription [optionFunc1_32_1, optionFunc1_32_2] hint
    in
        {model | event = event}

optionFunc1_32_1: Player -> Player
optionFunc1_32_1 player =
    {player | wealth = player.wealth - 1000, popularWill = player.popularWill + 0.02 }

optionFunc1_32_2: Player -> Player
optionFunc1_32_2 player =
    {player | prestige = player.prestige + 0.02, popularWill = player.popularWill - 0.01 }

-------------------------------------------------33--------------------------------------
judgeEvent_1_33: Player -> (Bool, String)
judgeEvent_1_33 player =
    if player.family < 120 && player.prestige < 0.1 then
        (True, "1_33")
    else
        (False, "1_33")

event_1_33: Model -> Model
event_1_33 model =
    let
        description = "The influence of our family is no longer powerful. Members of our family either died in battle, or betrayed and left us. It's time to do something to change this situation."
        optionDescription = ["Give out booklets to regain my prestige.", "Help those in jails to escape."]
        hint = ["Wealth -1500, Prestige +3%", "PoliceAttention +4%, prestige +4%"]
        event = Event description optionDescription [optionFunc1_33_1, optionFunc1_33_2] hint
    in
        {model | event = event}

optionFunc1_33_1: Player -> Player
optionFunc1_33_1 player =
    {player | wealth = player.wealth - 1500, prestige = player.prestige + 0.03 }

optionFunc1_33_2: Player -> Player
optionFunc1_33_2 player =
    {player | policeAttention = player.policeAttention + 0.04, prestige = player.prestige + 0.04 }

-------------------------------------------------34--------------------------------------
judgeEvent_1_34: Player -> (Bool, String)
judgeEvent_1_34 player =
    if player.prestige > 0.7 && player.wealth < 10000 then
        (True, "1_34")
    else
        (False, "1_34")

event_1_34: Model -> Model
event_1_34 model =
    let
        description = "Even though I am the incarnation of God in the eyes of our members, there is still no way to change the fact that I am a leader of beggar gangs."
        optionDescription = ["Plunder from our nice people.", "Extort my beloved family members."]
        hint = ["Wealth +1500, PopularWill -3%", "Wealth +1500, prestige -3%"]
        event = Event description optionDescription [optionFunc1_34_1, optionFunc1_34_2] hint
    in
        {model | event = event}

optionFunc1_34_1: Player -> Player
optionFunc1_34_1 player =
    {player | wealth = player.wealth + 1500, popularWill = player.popularWill - 0.03 }

optionFunc1_34_2: Player -> Player
optionFunc1_34_2 player =
    {player | wealth = player.wealth + 1500, prestige = player.prestige - 0.03 }

-------------------------------------------------35--------------------------------------
judgeEvent_1_35: Player -> (Bool, String)
judgeEvent_1_35 player =
    if player.policeAttention < 0.2 && player.prestige > 0.7 then
        (True, "1_35")
    else
        (False, "1_35")

event_1_35: Model -> Model
event_1_35 model =
    let
        description = "We play such a decisive role in Fortun that the police are afraid of us. But there's a rumor that a rigorous chief will arrive this town very soon..."
        optionDescription = ["Fine, I've well prepared for that"]
        hint = ["PoliceAttention +3%"]
        event = Event description optionDescription [optionFunc1_35_1] hint
    in
        {model | event = event}

optionFunc1_35_1: Player -> Player
optionFunc1_35_1 player =
    {player | policeAttention = player.policeAttention + 0.03 }

-------------------------------------------------36--------------------------------------
judgeEvent_1_36: Player -> (Bool, String)
judgeEvent_1_36 player =
    if player.dice > 3 then
        (True, "1_36")
    else
        (False, "1_36")

event_1_36: Model -> Model
event_1_36 model =
    let
        description = "In the evening, you and your most trusted subordinates were walking down the street. In the dim light, a child bumped into you accidentally. Your subordinates were going to teach this careless boy a lesson."
        optionDescription = ["Stop! Let him pass.", "Turn a blind eye to that."]
        hint = ["PopularWill +2%, Prestige -1%", "Prestige +1%, PopularWill -2%"]
        event = Event description optionDescription [optionFunc1_36_1, optionFunc1_36_2] hint
    in
        {model | event = event}

optionFunc1_36_1: Player -> Player
optionFunc1_36_1 player =
    {player | popularWill = player.popularWill + 0.02, prestige = player.prestige - 0.01 }

optionFunc1_36_2: Player -> Player
optionFunc1_36_2 player =
    {player | prestige = player.prestige + 0.01, popularWill = player.popularWill - 0.02 }

-------------------------------------------------37--------------------------------------
judgeEvent_1_37: Player -> (Bool, String)
judgeEvent_1_37 player =
    if player.dice < 4 then
        (True, "1_37")
    else
        (False, "1_37")

event_1_37: Model -> Model
event_1_37 model =
    let
        description = "Your nice afternoon tea time was broken by a strange middle-aged lady. She begged you to uphold justice for her husband who had been bullied to death."
        optionDescription = ["It's my pleasure and duty to help the weak.", "How dare you ruin my day!? My brothers are watching!"]
        hint = ["PopularWill +2%, policeAttention +1%", "PopularWill -3%, prestige +1%"]
        event = Event description optionDescription [optionFunc1_37_1, optionFunc1_37_2] hint
    in
        {model | event = event}

optionFunc1_37_1: Player -> Player
optionFunc1_37_1 player =
    {player | popularWill = player.popularWill + 0.02, policeAttention = player.policeAttention + 0.01 }

optionFunc1_37_2: Player -> Player
optionFunc1_37_2 player =
    {player | popularWill = player.popularWill - 0.03, prestige = player.prestige + 0.01 }

-------------------------------------------------38--------------------------------------
judgeEvent_1_38: Player -> (Bool, String)
judgeEvent_1_38 player =
    if player.dice > 3 then
        (True, "1_38")
    else
        (False, "1_38")

event_1_38: Model -> Model
event_1_38 model =
    let
        description = "The streets are full of wanted notices of four big families in Fortun. You feel so much about it."
        optionDescription = ["Tear down these notices and slip away.", "Swagger and pretend nothing happens."]
        hint = ["PoliceAttention -2%", "PoliceAttention +2%, Prestige +1%"]
        event = Event description optionDescription [optionFunc1_38_1, optionFunc1_38_2] hint
    in
        {model | event = event}

optionFunc1_38_1: Player -> Player
optionFunc1_38_1 player =
    {player | policeAttention = player.policeAttention - 0.02 }

optionFunc1_38_2: Player -> Player
optionFunc1_38_2 player =
    {player | policeAttention = player.policeAttention + 0.02, prestige = player.prestige + 0.01 }

-------------------------------------------------39--------------------------------------
judgeEvent_1_39: Player -> (Bool, String)
judgeEvent_1_39 player =
    if player.dice < 4 then
        (True, "1_39")
    else
        (False, "1_39")

event_1_39: Model -> Model
event_1_39 model =
    let
        description = "You're tossing and turning in bed, filled with the face of your first love 20 years ago. You decide to get out of bed and do something."
        optionDescription = ["Tell my brothers about it.", "Write a diary."]
        hint = ["I like it.", "I love it."]
        event = Event description optionDescription [optionFunc1_39_1, optionFunc1_39_2] hint
    in
        {model | event = event}

optionFunc1_39_1: Player -> Player
optionFunc1_39_1 player =
    {player | prestige = player.prestige - 0.01 }

optionFunc1_39_2: Player -> Player
optionFunc1_39_2 player =
    player

-------------------------------------------------40--------------------------------------
judgeEvent_1_40: Player -> (Bool, String)
judgeEvent_1_40 player =
    if player.dice > 3 then
        (True, "1_40")
    else
        (False, "1_40")

event_1_40: Model -> Model
event_1_40 model =
    let
        description = "The monthly exhibition day of the town is coming, and a large number of tourists from inland come to visit this border town."
        optionDescription = ["Take this opportunity to propagate.", "Tell these ignorant people Fortun is totally bullshit."]
        hint = ["I like it.", "I love it."]
        event = Event description optionDescription [optionFunc1_40_1, optionFunc1_40_2] hint
    in
        {model | event = event}

optionFunc1_40_1: Player -> Player
optionFunc1_40_1 player =
    { player | prestige = player.prestige + 0.02, popularWill = player.popularWill - 0.01, policeAttention = player.policeAttention + 0.02 }

optionFunc1_40_2: Player -> Player
optionFunc1_40_2 player =
    { player | popularWill = player.popularWill - 0.02, policeAttention = player.policeAttention + 0.01 }