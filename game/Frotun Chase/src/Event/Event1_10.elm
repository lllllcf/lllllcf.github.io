module Event.Event1_10 exposing (..)

import String exposing (..)
import Definition exposing (..)

-------------------------------------------------1--------------------------------------
judgeEvent_1_1: Player -> (Bool, String)
judgeEvent_1_1 player =
    if player.prestige < 20/100 then
        (True, "1_1")
    else
        (False, "1_1")

event_1_1: Model -> Model
event_1_1 model =
    let
        description = "Because of our low prestige, we lost control of our family members, making the neighborhood under our protection full of corruption and extortion of local residents."
        optionDescription = ["Turn a blind eye.","We can also corrupt together."]
        hint = ["Wealth -1000, Popular Will -3%", "Wealth +1000, Popular Will -7%"]
        event = Event description optionDescription [optionFunc1_1_1, optionFunc1_1_2] hint
    in
        {model | event = event}

optionFunc1_1_1: Player -> Player
optionFunc1_1_1 player =
    {player | wealth = player.wealth - 1000, popularWill = player.popularWill - 0.03 }

optionFunc1_1_2: Player -> Player
optionFunc1_1_2 player =
    {player | wealth = player.wealth + 1000, popularWill = player.popularWill - 0.07 }

-------------------------------------------------2--------------------------------------
judgeEvent_1_2: Player -> (Bool, String)
judgeEvent_1_2 player =
    if player.policeAttention > 30/100 then
        (True, "1_2")
    else
        (False, "1_2")

event_1_2: Model -> Model
event_1_2 model =
    let
        description = "Because of the recent spate of activities, the police have been looking into all aspects of the legality of our actions."
        optionDescription = ["Bribed the director.","They're doing the same thing but they're keeping a low profile."]
        hint = ["Wealth -2500, Police Attention -5%", "Police Attention +3%"]
        event = Event description optionDescription [optionFunc1_2_1, optionFunc1_2_2] hint
    in
        {model | event = event}

optionFunc1_2_1: Player -> Player
optionFunc1_2_1 player =
    {player | wealth = player.wealth - 2500, policeAttention = player.policeAttention - 5/100 }

optionFunc1_2_2: Player -> Player
optionFunc1_2_2 player =
    {player | policeAttention = player.policeAttention + 3/100 }

-------------------------------------------------3--------------------------------------
judgeEvent_1_3: Player -> (Bool, String)
judgeEvent_1_3 player =
    if player.wealth < 5000 && player.prestige < 20/100 then
        (True, "1_3")
    else
        (False, "1_3")

event_1_3: Model -> Model
event_1_3 model =
    let
        description = "A combination of recent business failures and a failure to establish enough prestige among followers has given followers an idea to take over."
        optionDescription = ["Punish someone as a warning to others.","Too busy to take care of it."]
        hint = ["Prestige +2%", "Prestige -5%, Popular Will +5%"]
        event = Event description optionDescription [optionFunc1_3_1, optionFunc1_3_2] hint
    in
        {model | event = event}

optionFunc1_3_1: Player -> Player
optionFunc1_3_1 player =
    {player | prestige = player.prestige + 2/100 }

optionFunc1_3_2: Player -> Player
optionFunc1_3_2 player =
    {player | prestige = player.prestige - 5/100, popularWill = player.popularWill + 5/100 }

-------------------------------------------------4--------------------------------------
judgeEvent_1_4: Player -> (Bool, String)
judgeEvent_1_4 player =
    if player.policeAttention > 90/100 then
        (True, "1_4")
    else
        (False, "1_4")

event_1_4: Model -> Model
event_1_4 model =
    let
        description = "Your extravagant actions have given the police the evidence they want and you are about to be arrested."
        optionDescription = ["To get away with using money and relationships.","Disappear, and work behind the scenes."]
        hint = ["Wealth -10000, Police Attention -20%", "Prestige -10%"]
        event = Event description optionDescription [optionFunc1_4_1, optionFunc1_4_2] hint
    in
        {model | event = event}

optionFunc1_4_1: Player -> Player
optionFunc1_4_1 player =
    {player | wealth = player.wealth - 10000, policeAttention = player.policeAttention - 20/100 }

optionFunc1_4_2: Player -> Player
optionFunc1_4_2 player =
    {player | prestige = player.prestige - 10/100 }

-------------------------------------------------5--------------------------------------
judgeEvent_1_5: Player -> (Bool, String)
judgeEvent_1_5 player =
    if player.wealth > 30000 then
        (True, "1_5")
    else
        (False, "1_5")

event_1_5: Model -> Model
event_1_5 model =
    let
        description = "The region's affluence draws in people but squeezes out the locals."
        optionDescription = ["Select fewer but better people.","Charging a large fee for registered permanent residence would also reduce the number of migrants."]
        hint = ["Prestige +5%, Popular Will +5%", "Wealth +5000"]
        event = Event description optionDescription [optionFunc1_5_1, optionFunc1_5_2] hint
    in
        {model | event = event}

optionFunc1_5_1: Player -> Player
optionFunc1_5_1 player =
    {player | prestige = player.prestige + 5/100 , popularWill = player.popularWill + 5/100 }

optionFunc1_5_2: Player -> Player
optionFunc1_5_2 player =
    {player | wealth = player.wealth + 5000}

-------------------------------------------------6--------------------------------------
judgeEvent_1_6: Player -> (Bool, String)
judgeEvent_1_6 player =
    if player.influence < 10/100 then
        (True, "1_6")
    else
        (False, "1_6")

event_1_6: Model -> Model
event_1_6 model =
    let
        description = "The men you once befriended no longer show you respect as they look at your waning influence, and perhaps not relentlessly beating the dogs in the water is their greatest kindness..."
        optionDescription = ["Forbear to be calm for a while, lest things should go wrong.","Make an agreement with some celebrities to exchange goods in order to form the alliance."]
        hint = ["Prestige -3%", "Wealth -3000, Prestige +3%"]
        event = Event description optionDescription [optionFunc1_6_1, optionFunc1_6_2] hint
    in
        {model | event = event}

optionFunc1_6_1: Player -> Player
optionFunc1_6_1 player =
    {player | prestige = player.prestige - 3/100 }

optionFunc1_6_2: Player -> Player
optionFunc1_6_2 player =
    {player | wealth = player.wealth - 3000, prestige = player.prestige + 3/100 }


-------------------------------------------------7--------------------------------------
judgeEvent_1_7: Player -> (Bool, String)
judgeEvent_1_7 player =
    if player.influence < 20/100 && player.wealth > 30000 then
        (True, "1_7")
    else
        (False, "1_7")

event_1_7: Model -> Model
event_1_7 model =
    let
        description = "You have a lot of money, but you don't have enough influence."
        optionDescription = ["Spend the money to get along with the celebrities.","Spend money to build up a good reward and punishment system within the gang."]
        hint = ["Wealth -2500, Popular Will +5%", "Wealth -2500, Prestige +5%"]
        event = Event description optionDescription [optionFunc1_7_1, optionFunc1_7_2] hint
    in
        {model | event = event}

optionFunc1_7_1: Player -> Player
optionFunc1_7_1 player =
    {player | wealth = player.wealth - 2500, popularWill = player.popularWill + 5/100 }

optionFunc1_7_2: Player -> Player
optionFunc1_7_2 player =
    {player | wealth = player.wealth - 2500, prestige = player.prestige + 5/100 }


-------------------------------------------------8--------------------------------------
judgeEvent_1_8: Player -> (Bool, String)
judgeEvent_1_8 player =
    if player.influence < 20/100 then
        (True, "1_8")
    else
        (False, "1_8")

event_1_8: Model -> Model
event_1_8 model =
    let
        description = "The lack of influence brought him into conflict with the local gangs, and a battle was imminent."
        optionDescription = ["Put in all your troops to maximize your profits.", "Fight and retreat in search of more."]
        hint = ["Wealth +4000, Popular Will -3%, Prestige -3%", "Wealth +1000"]
        event = Event description optionDescription [optionFunc1_8_1, optionFunc1_8_2] hint
    in
        {model | event = event}

optionFunc1_8_1: Player -> Player
optionFunc1_8_1 player =
    {player | prestige = player.prestige - 3/100 , popularWill = player.popularWill - 3/100 , wealth = player.wealth + 4000 }

optionFunc1_8_2: Player -> Player
optionFunc1_8_2 player =
    {player | wealth = player.wealth + 1000 }

-------------------------------------------------9--------------------------------------
judgeEvent_1_9: Player -> (Bool, String)
judgeEvent_1_9 player =
    if player.wealth > 40000 then
        (True, "1_9")
    else
        (False, "1_9")

event_1_9: Model -> Model
event_1_9 model =
    let
        description = "The wealth of assets has led many in the gang to indulge in entertainment."
        optionDescription = ["Admonish them.", "Invest money to create exclusive entertainment measures for them, but only open for fixed hours."]
        hint = ["Prestige +3%", "Wealth -1000, Prestige +5%"]
        event = Event description optionDescription [optionFunc1_9_1, optionFunc1_9_2] hint
    in
        {model | event = event}

optionFunc1_9_1: Player -> Player
optionFunc1_9_1 player =
    {player | prestige = player.prestige + 3/100 }

optionFunc1_9_2: Player -> Player
optionFunc1_9_2 player =
    {player | wealth = player.wealth - 1000 , prestige = player.prestige + 5/100 }

-------------------------------------------------10--------------------------------------
judgeEvent_1_10: Player -> (Bool, String)
judgeEvent_1_10 player =
    if player.wealth < 10000 then
        (True, "1_10")
    else
        (False, "1_10")

event_1_10: Model -> Model
event_1_10 model =
    let
        description = "Poor business conditions make your heart irritable, with a cigarette end carelessly thrown on the head of other people. "
        optionDescription = ["This is your own fault, explain it, and sincerely apologize", "I am a big man, cannot be so humble, so I ignored that."]
        hint = ["Popular Will +5%, Prestige +3%", "Prestige +2%, Popular Will -5%"]
        event = Event description optionDescription [optionFunc1_10_1, optionFunc1_10_2] hint
    in
        {model | event = event}

optionFunc1_10_1: Player -> Player
optionFunc1_10_1 player =
    {player | prestige = player.prestige + 3/100, popularWill = player.popularWill + 5/100 }

optionFunc1_10_2: Player -> Player
optionFunc1_10_2 player =
    {player | popularWill = player.popularWill - 5/100, prestige = player.prestige + 2/100 }