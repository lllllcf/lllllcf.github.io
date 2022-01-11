module Model exposing (..)

import Browser.Dom exposing (getViewport)
import Css.Animations exposing (custom)
import Definition exposing (..)
import Map exposing (..)
import Task
import Css.Animations exposing (Property, custom)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style)
import Html.Styled.Events exposing (onClick)
import Map exposing (..)
import Style exposing (..)
import Event.Event1_10 exposing (..)

init : String -> (Model, Cmd Msg)
init flag =
    let
        initMap = Map.initMap
        player1 =
            { currentIndex = 0
            , currentPos = (0, 0)
            , frameList = [ (0, [custom "left" "0%", custom "top" "0%"]), (100, [custom "left" "0%", custom "top" "0%"]) ]
            , order = 0
            , character = Lance
            , wealth = 20000
            , prestige = 0.2 -- percent
            , family = 20
            , influence = 0.5  -- percent
            , policeAttention = 0.1 -- percent
            , popularWill = 0.2
            , isHuman = False
            , familyLevel = Medium
            , policeReduceLevel = Medium
            , exist = True
            , jailRound = -1
            , dice = 3
            , storyRound = 0
            }
        player2 =
            { currentIndex = 17
            , currentPos = (90, 0)
            , frameList = [ (0, [custom "left" "90%", custom "top" "0%"]), (100, [custom "left" "90%", custom "top" "0%"]) ]
            , order = 1
            , character = Gorman
            , wealth = 20000
            , prestige = 0.2 -- percent
            , family = 20
            , influence = 0.2  -- percent
            , policeAttention = 0.1 -- percent
            , popularWill = 0.2
            , isHuman = False
            , familyLevel = Medium
            , policeReduceLevel = Medium
            , exist = True
            , jailRound = -1
            , dice = 3
            , storyRound = 0
            }
        player3 =
            { currentIndex = 34
            , currentPos = (90, 90)
            , frameList = [ (0, [custom "left" "90%", custom "top" "90%"]), (100, [custom "left" "90%", custom "top" "90%"]) ]
            , order = 2
            , character = Doherty
            , wealth = 20000
            , prestige = 0.2 -- percent
            , family = 20
            , influence = 0.2  -- percent
            , policeAttention = 0.1 -- percent
            , popularWill = 0.2
            , isHuman = False
            , familyLevel = Medium
            , policeReduceLevel = Medium
            , exist = True
            , jailRound = -1
            , dice = 3
            , storyRound = 0
            }
        player4 =
            { currentIndex = 51
            , currentPos = (0, 90)
            , frameList = [ (0, [custom "left" "0%", custom "top" "90%"]), (100, [custom "left" "0%", custom "top" "90%"]) ]
            , order = 3
            , character = Blair
            , wealth = 20000
            , prestige = 0.2 -- percent
            , family = 20
            , influence = 0.2  -- percent
            , policeAttention = 0.1 -- percent
            , popularWill = 0.2
            , isHuman = False
            , familyLevel = Medium
            , policeReduceLevel = Medium
            , exist = True
            , jailRound = -1
            , dice = 3
            , storyRound = 0
            }
        round =
            { index = 1
            , playerIndex = 0
            , phase = PreparationPhase
            }
        event =
            { description = "1_1"
            , optionDescription = ["I am lcf.", "I am lllllcf."]
            , optionFunc = [optionFunc1_1_1, optionFunc1_1_2]
            , hint = ["wowowo"]
            }
        viewPopUp =
            { backgroundImage = "url(./src/image/event.jpg)"
            , title = "Welcome to  Fortun Chase"
            , descriptionText = "Welcome to Fortun! Since you have come here, there is no chance to escape, because you no longer represent yourself, but more represent the fate and future of your family. Defeat all your opponents and avenge our decades of suffering!"
            , buttons = [
                button [ onClick (StartGameMessage PreparationPhase LetUsStart Click1)
                       , style "width" "20%"
                       , style "height" "10%"
                       , style "left" "40%"
                       , style "top" "80%"
                       , style "position" "absolute"
                       , style "font-size" "1vw"
                       , style "font-weight" "bold"
                       , buttonYes
                       ]
                       [ text "Let's Go!!!" ]
            ]
            }
        model =
            { map = initMap
            , dice = 1
            , players = [ player1, player2, player3, player4 ]
            , canClick = True
            , showPopUp = True
            , showDice = NoDice
            , isMoving = False
            , currentPlayer = 0
            , totalPlayer = 4
            , round = round
            , state = Play
            , event = event
            , actionDice = [NoActionDice, NoActionDice, NoActionDice]
            , viewPopUp = viewPopUp
            , diceState = NotShowDice
            , showActionDice = False
            , showActionDiceRespectively = [False, False, False]
            , sideState = NoSide
            , topState = NoTop
            , control = []
            , mapMoveX = 0
            , mapMoveY = 0
            , canSelectTile = False
            , fightButtonNumber = -1
            , selectedTileIndex = -1
            , character = judgeFlag flag
            , randomNumber = 32
            , actionDiceNumber = [-1,-1,-1]
            , windowSize = (1920, 1080) --default
            , viewDetailed = False
            , detailTileIndex = 0
            , canClickEndAction = True
            , showEndButton = False
            , highlight = False
            , battleHighlight = False
            , aiRandomNumber = List.repeat 10000 0
            , aiRandomNumberIndex = 0
            , winnerIndex = -1
            , fightIndicator = -1
            , addOrFight = "no"
            , bgm = False
            , reformSE = False
            , moveSE = False
            , fightSE = False
            , addSE = False
            , aiAction = [aiAction, aiAction, aiAction]
            , aiRecord = ""
            }
    in
        (model, Task.perform GetSize getViewport)

aiAction =
    { order = -1
    , move = 0
    , upgrade = -1
    , count = (0, 0)
    , add = [(0, 0), (0, 0), (0, 0)]
    , fight = [(-1, 0, True), (-1, 0, True), (-1, 0, True)]
    }

judgeFlag: String -> Character
judgeFlag flag =
    case flag of
        "Lance" -> Lance
        "Gorman" -> Gorman
        "Doherty"-> Doherty
        "Blair" -> Blair
        _ -> Lance

initPerspective : Model -> (Float, Float)
initPerspective model =
    case model.character of
        Lance -> (0, 0)
        Gorman -> (-(1440 - 0.8 * toFloat (Tuple.first model.windowSize)), 0)
        Blair-> (0, -(1440 - 0.8 * toFloat (Tuple.second model.windowSize)))
        Doherty->  (-(1440 - 0.8 * toFloat (Tuple.first model.windowSize)), -(1440 - 0.8 * toFloat (Tuple.second model.windowSize)))
        _ -> (0, 0)