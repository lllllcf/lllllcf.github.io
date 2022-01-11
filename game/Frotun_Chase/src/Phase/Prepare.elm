module Phase.Prepare exposing (..)

import List.Extra exposing (..)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style, title)
import Html.Styled.Events exposing (onClick)
import List.Extra exposing (getAt)
import Style exposing (..)
import Model exposing (..)
import Definition exposing (..)
import Condition exposing (..)

----------------------preparePhase-----------------------------------------------------------
preparePhase: Model -> SubRoundPhase -> ClickState -> Model
preparePhase model subPhase clickState=
    case subPhase of
        LetUsStart ->
           regularRefresh (letUsStart model clickState)
        AdjustMoneyFamily _ ->
           regularRefresh (adjustMoneyFamily model clickState)
        AdjustMoneyPolice _ ->
           regularRefresh (adjustMoneyPolice model clickState)
        _ ->
          model

reInit: Model -> Model
reInit model =
    let
        changeFirstPlayer =
            case model.character of
                Lance -> 0
                Gorman -> 1
                Doherty-> 2
                Blair -> 3
                _ -> 3
        player = get changeFirstPlayer model.players
        newPlayer = {player | isHuman = True}
        judgeHuman =
            setAt changeFirstPlayer newPlayer model.players
        newModel = {model | currentPlayer = changeFirstPlayer, players = judgeHuman, showEndButton = False}
        controlModel = initControl newModel
    in
        controlModel

initControl: Model -> Model
initControl model =
    let
        home1 = get 0 model.map
        home2 = get 17 model.map
        home3 = get 34 model.map
        home4 = get 51 model.map
        map1 = setAt 0 {home1 | owner = getAt 0 model.players} model.map
        map2 = setAt 17 {home2 | owner = getAt 1 model.players} map1
        map3 = setAt 34 {home3 | owner = getAt 2 model.players} map2
        map4 = setAt 51 {home4 | owner = getAt 3 model.players} map3
    in
        {model | map = map4}

letUsStart: Model -> ClickState -> Model
letUsStart model clickState =
    let
        resetModel = reInit model
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Adjust Family member maintenance cost."
            , descriptionText = "Click to adjust your money spending on maintaining your family member."
            , buttons = [
                button [ onClick (StartGameMessage PreparationPhase (AdjustMoneyFamily Low) Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "10%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Low" ],
                button [ onClick (StartGameMessage PreparationPhase (AdjustMoneyFamily Medium) Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Medium" ],
                button [ onClick (StartGameMessage PreparationPhase (AdjustMoneyFamily High) Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "70%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "High" ]
            ]
            }
        characterDescription: String
        characterDescription =
            case resetModel.character of
                Lance ->
                       "Our family's ancestors accumulated huge wealth and capital and controlled half of the town's trade and we firmly believe that the power of money was infinite. Now, we’ve endured for too many years, and it's time to defeat them with endless wealth."
                Gorman ->
                        "Thirty years ago, our family was the ruler of the town, but the cursed capitalists, slaves and robbers took everything out of my family’s control. Now, I'm back, with the honor and mission that my family has given me, claiming everything that belongs to my family."
                Doherty ->
                        "My father and brother died in the gunfight, which made me have to take over the family. After a series of suffering and failure, I learned the skills of building strong relationship network and dealing with different forces. The town will soon succumb to my charm."
                Blair ->
                        "As the oldest family in the town, the Blair family has lived and thrived on this land for hundreds of years. Kings, parliaments, revolutionaries, capitalists, we witnessed their coming and leaving one after another, growing our family day after day. Quantity is the king of war, and the countless members will wipe out all opposition."
                _ -> " "
        motto: String
        motto =
            case resetModel.character of
                Lance ->
                    "Money is Power!"
                Gorman ->
                    "Nobility is my sword!"
                Doherty ->
                    "Only a fool goes to prison."
                Blair ->
                    "Quantity is the king of war."
                _ ->
                    " "
        viewPopUp2 =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = characterName resetModel
            , descriptionText = characterDescription
            , buttons = [
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click2)
                       , style "width" "40%"
                       , style "height" "10%"
                       , style "left" "30%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , title "I'm the King!"
                       , buttonYes
                       ]
                       [ text motto ]
            ]
            }
    in
        case clickState of
            Click2 ->
                {model | viewPopUp = viewPopUp, bgm = True, showEndButton = False }
            Click1 ->
                {resetModel | viewPopUp = viewPopUp2, bgm = True, showEndButton = False }
            ------------------restart--------------------------
            Click3 -> --Lance
                Tuple.first (Model.init "Lance")
            Click4 -> --Gorman
                Tuple.first (Model.init "Gorman")
            Click5 -> --Doherty
                Tuple.first (Model.init "Doherty")
            Click6 -> --Blair
                Tuple.first (Model.init "Blair")
            _ ->
                resetModel

adjustMoneyFamily: Model -> ClickState -> Model
adjustMoneyFamily model clickState=
    let
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Adjust police bribery costs."
            , descriptionText = "Click to adjust your money spending on bribing the police."
            , buttons = [
                button [ onClick (StartGameMessage PreparationPhase (AdjustMoneyPolice Low) Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "10%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Low" ],
                button [ onClick (StartGameMessage PreparationPhase (AdjustMoneyPolice Medium) Click2)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Medium" ],
                button [ onClick (StartGameMessage PreparationPhase (AdjustMoneyPolice High) Click3)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "70"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "High" ]
            ]
            }
        player = get model.currentPlayer model.players
    in
        case clickState of
            Click1 -> --low
                {model | viewPopUp = viewPopUp, players = setAt model.currentPlayer {player | familyLevel = Low} model.players, showEndButton = False }
            Click2 -> --medium
                {model | viewPopUp = viewPopUp, players = setAt model.currentPlayer {player | familyLevel = Medium} model.players, showEndButton = False }
            Click3 -> --high
                {model | viewPopUp = viewPopUp, players = setAt model.currentPlayer {player | familyLevel = High} model.players, showEndButton = False }
            _ ->
                model

adjustMoneyPolice: Model -> ClickState -> Model
adjustMoneyPolice model clickState =
    let
        player = get model.currentPlayer model.players
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Jail"
            , descriptionText = "Life in the Jail is not easy..."
            , buttons = [
                button [ onClick (OnJailCount)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "I‘ll be back!" ]
            ]
            }
    in
        case clickState of
            Click1 -> --low
                if player.jailRound > 0 then
                    {model | viewPopUp = viewPopUp, showPopUp = True, players = setAt model.currentPlayer {player | policeReduceLevel = Low, jailRound = player.jailRound - 1} model.players, canClick = False }
                else
                    {model | showPopUp = False, players = setAt model.currentPlayer {player | policeReduceLevel = Low} model.players, diceState = Dice }
            Click2 -> --medium
                if player.jailRound > 0 then
                    {model | viewPopUp = viewPopUp, showPopUp = True, players = setAt model.currentPlayer {player | policeReduceLevel = Medium, jailRound = player.jailRound - 1} model.players, canClick = False }
                else
                    {model | showPopUp = False, players = setAt model.currentPlayer {player | policeReduceLevel = Medium} model.players, diceState = Dice }
            Click3 -> --high
                if player.jailRound > 0 then
                    {model | viewPopUp = viewPopUp, showPopUp = True, players = setAt model.currentPlayer {player | policeReduceLevel = High, jailRound = player.jailRound - 1} model.players, canClick = False }
                else
                    {model | showPopUp = False, players = setAt model.currentPlayer {player | policeReduceLevel = High} model.players, diceState = Dice }
            _ ->
                model