module Event.Event21_30 exposing (..)

import String exposing (..)
import Definition exposing (..)

-------------------------------------------------21--------------------------------------
judgeEvent_1_21: Player -> (Bool, String)
judgeEvent_1_21 player =
    if player.dice < 4 then
        (True, "1_21")
    else
        (False, "1_21")

event_1_21: Model -> Model
event_1_21 model =
    let
        description = "Tripped over a can on the way down, fell down the stairs and had to make a 'spending' trip to the hospital."
        optionDescription = ["OK."]
        hint = ["Wealth -1000"]
        event = Event description optionDescription [optionFunc1_21_1] hint
    in
        {model | event = event}

optionFunc1_21_1: Player -> Player
optionFunc1_21_1 player =
    {player | wealth = player.wealth - 1000 }

-------------------------------------------------22--------------------------------------
judgeEvent_1_22: Player -> (Bool, String)
judgeEvent_1_22 player =
    if player.dice < 4 then
        (True, "1_22")
    else
        (False, "1_22")
event_1_22: Model -> Model
event_1_22 model =
    let
        description = "You was unfortunately bitten by a dog, then you subconsciously hit it, and soon was mistaken for a dog abuser."
        optionDescription = ["OK."]
        hint = ["Prestige -2%"]
        event = Event description optionDescription [optionFunc1_22_1] hint
    in
        {model | event = event}
optionFunc1_22_1: Player -> Player
optionFunc1_22_1 player =
    {player | prestige = player.prestige - 2/100 }

-------------------------------------------------23--------------------------------------
judgeEvent_1_23: Player -> (Bool, String)
judgeEvent_1_23 player =
    if player.dice > 3 then
        (True, "1_23")
    else
        (False, "1_23")
event_1_23: Model -> Model
event_1_23 model =
    let
        description = "Being threatened by a lunkhead, you called your followers to frighten him immediately, people who know you become more."
        optionDescription = ["OK."]
        hint = ["Prestige +1%"]
        event = Event description optionDescription [optionFunc1_23_1] hint
    in
        {model | event = event}
optionFunc1_23_1: Player -> Player
optionFunc1_23_1 player =
    {player | prestige = player.prestige + 1/100 }

-------------------------------------------------24--------------------------------------
judgeEvent_1_24: Player -> (Bool, String)
judgeEvent_1_24 player =
    if player.dice > 3 then
        (True, "1_24")
    else
        (False, "1_24")
event_1_24: Model -> Model
event_1_24 model =
    let
        description = "You won a small prize in the lottery."
        optionDescription = ["OK."]
        hint = ["Wealth +500"]
        event = Event description optionDescription [optionFunc1_24_1] hint
    in
        {model | event = event}
optionFunc1_24_1: Player -> Player
optionFunc1_24_1 player =
    {player | wealth = player.wealth + 500 }

-------------------------------------------------25--------------------------------------
judgeEvent_1_25: Player -> (Bool, String)
judgeEvent_1_25 player =
    if player.dice > 3 then
        (True, "1_25")
    else
        (False, "1_25")
event_1_25: Model -> Model
event_1_25 model =
    let
        description = "There have been ups and downs in the stock market recently. You bought a piece of stock and make a lucky fortune."
        optionDescription = ["OK."]
        hint = ["Wealth +1000"]
        event = Event description optionDescription [optionFunc1_25_1] hint
    in
        {model | event = event}
optionFunc1_25_1: Player -> Player
optionFunc1_25_1 player =
    {player | wealth = player.wealth + 1000 }

-------------------------------------------------26--------------------------------------
judgeEvent_1_26: Player -> (Bool, String)
judgeEvent_1_26 player =
    if player.dice < 4 then
        (True, "1_26")
    else
        (False, "1_26")
event_1_26: Model -> Model
event_1_26 model =
    let
        description = "The stock market has been up and down recently. You bought a stock to play, but lost your money."
        optionDescription = ["OK."]
        hint = ["Wealth -1000"]
        event = Event description optionDescription [optionFunc1_26_1] hint
    in
        {model | event = event}
optionFunc1_26_1: Player -> Player
optionFunc1_26_1 player =
    {player | wealth = player.wealth - 1000 }

-------------------------------------------------27--------------------------------------
judgeEvent_1_27: Player -> (Bool, String)
judgeEvent_1_27 player =
    if player.dice > 3 then
        (True, "1_27")
    else
        (False, "1_27")
event_1_27: Model -> Model
event_1_27 model =
    let
        description = "You were unfortunately bitten by a dog, and through careful observation of the dog tag, you found it was a big man's pet, so you succeeded in bonding with him."
        optionDescription = ["OK."]
        hint = ["Wealth -1000, Prestige +2%"]
        event = Event description optionDescription [optionFunc1_27_1] hint
    in
        {model | event = event}
optionFunc1_27_1: Player -> Player
optionFunc1_27_1 player =
    {player | wealth = player.wealth - 1000 , prestige = player.prestige + 2/100 }

-------------------------------------------------28--------------------------------------
judgeEvent_1_28: Player -> (Bool, String)
judgeEvent_1_28 player =
    if player.dice > 3 then
        (True, "1_28")
    else
        (False, "1_28")
event_1_28: Model -> Model
event_1_28 model =
    let
        description = "By chance, you make a good friend who turns out to be a policeman finally, and you can avoid the spots where the police have been searching recently."
        optionDescription = ["OK."]
        hint = ["Police Attention -2%"]
        event = Event description optionDescription [optionFunc1_28_1] hint
    in
        {model | event = event}
optionFunc1_28_1: Player -> Player
optionFunc1_28_1 player =
    {player | policeAttention = player.policeAttention - (2 / 100) }

-------------------------------------------------29--------------------------------------
judgeEvent_1_29: Player -> (Bool, String)
judgeEvent_1_29 player =
    if player.dice < 4 then
        (True, "1_29")
    else
        (False, "1_29")
event_1_29: Model -> Model
event_1_29 model =
    let
        description = "By chance, you make a good friend who already knows who you are, he swindled you out of a sum of money and ran away."
        optionDescription = ["OK."]
        hint = ["Wealth -1500"]
        event = Event description optionDescription [optionFunc1_29_1] hint
    in
        {model | event = event}
optionFunc1_29_1: Player -> Player
optionFunc1_29_1 player =
    {player | wealth = player.wealth - 1500 }

-------------------------------------------------30--------------------------------------
judgeEvent_1_30: Player -> (Bool, String)
judgeEvent_1_30 player =
    if player.dice < 4 then
        (True, "1_30")
    else
        (False, "1_30")
event_1_30: Model -> Model
event_1_30 model =
    let
        description = "You got a fever. When being given an injection, the nerve in your leg was hurt. It caused a short period of numbness in your leg. So you neglected managing during this time."
        optionDescription = ["OK."]
        hint = ["Wealth -1000"]
        event = Event description optionDescription [optionFunc1_30_1] hint
    in
        {model | event = event}
optionFunc1_30_1: Player -> Player
optionFunc1_30_1 player =
    {player | wealth = player.wealth - 1000 }









