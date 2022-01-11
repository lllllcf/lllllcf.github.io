module Event.Event41_50 exposing (..)

import String exposing (..)

import Definition exposing (..)

-------------------------------------------------41--------------------------------------
judgeEvent_1_41: Player -> (Bool, String)
judgeEvent_1_41 player =
    if player.dice == 6 then
        (True, "1_41")
    else
        (False, "1_41")

event_1_41: Model -> Model
event_1_41 model =
    let
        description = "Under your wise leadership, our family is prosperous and strong!"
        optionDescription = ["Fine."]
        hint = ["Wealth +1500, Police Attention +1%"]
        event = Event description optionDescription [optionFunc1_41_1] hint
    in
        {model | event = event}

optionFunc1_41_1: Player -> Player
optionFunc1_41_1 player =
    {player | wealth = player.wealth + 1500, policeAttention = player.policeAttention + 1/100 }

-------------------------------------------------42--------------------------------------
judgeEvent_1_42: Player -> (Bool, String)
judgeEvent_1_42 player =
    if player.dice < 4 && player.character /= Gorman then
        (True, "1_42")
    else
        (False, "1_42")

event_1_42: Model -> Model
event_1_42 model =
    let
        description = "Brian Golman was in charge of the Golman family's Casino in the west of the town. A few days ago, his right leg was broken by the patriarch because he was found to be corrupt. Now he has come here secretly. What should we do with him?"
        optionDescription = ["Welcome! My faithful friend.", "I hate the traitor. Get rid of him!"]
        hint = ["Prestige +3%", "Prestige -2%, Wealth +1200"]
        event = Event description optionDescription [optionFunc1_42_1, optionFunc1_42_2] hint
    in
        {model | event = event}

optionFunc1_42_1: Player -> Player
optionFunc1_42_1 player =
    {player | prestige = player.prestige + 3/100 }

optionFunc1_42_2: Player -> Player
optionFunc1_42_2 player =
    {player | prestige = player.prestige - 2/100, wealth = player.wealth + 1200 }

-------------------------------------------------43--------------------------------------
judgeEvent_1_43: Player -> (Bool, String)
judgeEvent_1_43 player =
    if player.dice < 3 then
        (True, "1_43")
    else
        (False, "1_43")

event_1_43: Model -> Model
event_1_43 model =
    let
        description = "An old man kneels in front of you, claiming that his son was killed without cause by one of your loyal member, who immediately denied it. You look at the old man's poor tears and decide..."
        optionDescription = ["Find out the matter thoroughly.", "Pretend to promise him."]
        hint = ["Wealth -2000, Popular Will +2%", "Police Attention +3%"]
        event = Event description optionDescription [optionFunc1_43_1, optionFunc1_43_2] hint
    in
        {model | event = event}

optionFunc1_43_1: Player -> Player
optionFunc1_43_1 player =
    {player | wealth = player.wealth - 2000, popularWill = player.popularWill + 2/100 }

optionFunc1_43_2: Player -> Player
optionFunc1_43_2 player =
    {player | policeAttention = player.policeAttention + 3/100 }

-------------------------------------------------44--------------------------------------
judgeEvent_1_44: Player -> (Bool, String)
judgeEvent_1_44 player =
    if player.dice == 1 then
        (True, "1_44")
    else
        (False, "1_44")

event_1_44: Model -> Model
event_1_44 model =
    let
        description = "A gambling game called ‘Cuatro‘ has sprung up in the town and you are addicted to it. Your loyal family members have tried to dissuade you many times, but you have never been able to get rid of it..."
        optionDescription = ["Cuatro！"]
        hint = ["Wealth -600, Prestige -5%"]
        event = Event description optionDescription [optionFunc1_44_1] hint
    in
        {model | event = event}

optionFunc1_44_1: Player -> Player
optionFunc1_44_1 player =
    {player | wealth = player.wealth - 600, prestige = player.prestige - 5/100 }

-------------------------------------------------45--------------------------------------
judgeEvent_1_45: Player -> (Bool, String)
judgeEvent_1_45 player =
    if player.dice < 7 then
        (True, "1_45")
    else
        (False, "1_45")

event_1_45: Model -> Model
event_1_45 model =
    let
        description = "A young horse keeper brought an excellent horse from the West. The horse was tall and strong with smooth, shiny fur.You love the horse very much, but your uncle reminds you to focus on something more important."
        optionDescription = ["A good horse is born for hero.", "My uncle is right"]
        hint = ["Wealth -800, Prestige +1%", "Popular Will -1%"]
        event = Event description optionDescription [optionFunc1_45_1, optionFunc1_45_2] hint
    in
        {model | event = event}

optionFunc1_45_1: Player -> Player
optionFunc1_45_1 player =
    {player | wealth = player.wealth - 800, prestige = player.prestige + 1/100 }

optionFunc1_45_2: Player -> Player
optionFunc1_45_2 player =
    {player | popularWill = player.popularWill - 1000 }

-------------------------------------------------46--------------------------------------
judgeEvent_1_46: Player -> (Bool, String)
judgeEvent_1_46 player =
    if player.character == Lance || player.character == Doherty then
        (True, "1_46")
    else
        (False, "1_46")

event_1_46: Model -> Model
event_1_46 model =
    let
        description = "Gorman and Blair have been working together to make trouble in our protected neighborhood. Radical family members suggest that we should fight back immediately, but is it really a good idea to fight back against both families at the same time?"
        optionDescription = ["If this can be tolerated, what cannot?", "Use money to break up their relationship."]
        hint = ["Prestige +3%, Police Attention +2%, Popular Will -2%", "Wealth -1000, Popular Will +3%, prestige -2%"]
        event = Event description optionDescription [optionFunc1_46_1, optionFunc1_46_2] hint
    in
        {model | event = event}

optionFunc1_46_1: Player -> Player
optionFunc1_46_1 player =
    {player | wealth = player.wealth - 1000, policeAttention = player.policeAttention + 2/100, popularWill = player.popularWill - 2/100 }

optionFunc1_46_2: Player -> Player
optionFunc1_46_2 player =
    {player | wealth = player.wealth - 1000, popularWill = player.popularWill + 3/100 }

-------------------------------------------------47--------------------------------------
judgeEvent_1_47: Player -> (Bool, String)
judgeEvent_1_47 player =
    if player.character == Gorman || player.character == Blair then
        (True, "1_47")
    else
        (False, "1_47")

event_1_47: Model -> Model
event_1_47 model =
    let
        description = "Lance and Doherty have been working together to make trouble in our protected neighborhood. Radical family members suggest that we should fight back immediately, but is it really a good idea to fight back against both families at the same time?"
        optionDescription = ["If this can be tolerated, what cannot?", "Use money to break up their relationship."]
        hint = ["Prestige +3%, Police Attention +2%, Popular Will -2%", "Wealth -1000, Popular Will +3%, prestige -2%"]
        event = Event description optionDescription [optionFunc1_47_1, optionFunc1_47_2] hint
    in
        {model | event = event}

optionFunc1_47_1: Player -> Player
optionFunc1_47_1 player =
    {player | wealth = player.wealth - 1000, policeAttention = player.policeAttention + 2/100, popularWill = player.popularWill - 2/100 }

optionFunc1_47_2: Player -> Player
optionFunc1_47_2 player =
    {player | wealth = player.wealth - 1000, popularWill = player.popularWill + 3/100 }

-------------------------------------------------48--------------------------------------
judgeEvent_1_48: Player -> (Bool, String)
judgeEvent_1_48 player =
    if player.dice < 4 && player.character /= Gorman then
        (True, "1_48")
    else
        (False, "1_48")

event_1_48: Model -> Model
event_1_48 model =
    let
        description = "Your son is in love, but unfortunately, he is in love with the eldest daughter of the Gorman family. You feel sad for the trick of fate, but on second thought, is this an opportunity?"
        optionDescription = ["Let me figure out how much Gorman's going to lose!", "They may be able to improve the relationship between the two families."]
        hint = ["Prestige -3%, Wealth +1000", "Popular +1%, Prestige -2%"]
        event = Event description optionDescription [optionFunc1_48_1, optionFunc1_48_2] hint
    in
        {model | event = event}

optionFunc1_48_1: Player -> Player
optionFunc1_48_1 player =
    {player | wealth = player.wealth + 1000, prestige = player.prestige - 3/100 }

optionFunc1_48_2: Player -> Player
optionFunc1_48_2 player =
    {player | prestige = player.prestige - 2/100, popularWill = player.popularWill + 1/100 }

-------------------------------------------------49--------------------------------------
judgeEvent_1_49: Player -> (Bool, String)
judgeEvent_1_49 player =
    if player.dice > 4 then
        (True, "1_49")
    else
        (False, "1_49")

event_1_49: Model -> Model
event_1_49 model =
    let
        description = "Twenty years ago, you saved a child from the dock in port Nuren. It has already been forgotten by you, but when your family member brought a picture of the new police chief yesterday, you feel a little familiar..."
        optionDescription = ["I should make good use of that.", "I can't betray myself."]
        hint = ["Police Attention -5%, Prestige -3%", "Prestige +3%"]
        event = Event description optionDescription [optionFunc1_49_1, optionFunc1_49_2] hint
    in
        {model | event = event}

optionFunc1_49_1: Player -> Player
optionFunc1_49_1 player =
    {player | policeAttention = player.policeAttention - 5/100, prestige = player.prestige - 3/100 }

optionFunc1_49_2: Player -> Player
optionFunc1_49_2 player =
    {player | prestige = player.prestige + 3/100 }

-------------------------------------------------50--------------------------------------
judgeEvent_1_50: Player -> (Bool, String)
judgeEvent_1_50 player =
    if player.dice < 7 then
        (True, "1_50")
    else
        (False, "1_50")

event_1_50: Model -> Model
event_1_50 model =
    let
        description = "A man in black claims to be the devil's servant, and he says he can give you control of some supernatural power. This power sounds tempting, but what is the price?"
        optionDescription = ["What kind of fool would believe him?", "Come in , please!"]
        hint = ["He left swearing.", "Maybe you can learn some witchcraft someday"]
        event = Event description optionDescription [optionFunc1_50_1, optionFunc1_50_2] hint
    in
        {model | event = event}

optionFunc1_50_1: Player -> Player
optionFunc1_50_1 player =
    {player | prestige = player.prestige + 2/100}

optionFunc1_50_2: Player -> Player
optionFunc1_50_2 player =
    {player | wealth = player.wealth - 1000}