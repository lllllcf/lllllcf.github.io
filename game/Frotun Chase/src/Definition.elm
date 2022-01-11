module Definition exposing (..)

import Browser.Dom exposing (Viewport)
import Debug exposing (toString)
import Html.Styled exposing (..)
import Css.Animations exposing (Property, custom)
import Json.Decode as Decode
import Time exposing (Posix)
import Random exposing (..)
import List.Extra exposing (..)
import String exposing (..)

-------------------------Map---------------------------------
type alias Tile =
    { stability : Int
    , familyMember : List Int
    , building : Building
    , position : (Int, Int)
    , index : Int
    , owner : Maybe Player
    , direction : Int --1: right, 2: left, 3: up,4: down
    , status: TileStatus
    , score: List Int
    }

type Building
    = Casino Int -- int means level
    | Disco Int
    | NightMarket Int
    | BoxingGym Int
    | PoliceStation
    | Jail
    | Block

type TileStatus
    = FreeBoth
    | FreeLeft
    | FreeRight
    | Surrounded
    | Safe
    | Controlled
    | NotSelf
    | ToControl
    | LeftToControl
    | RightToControl

------------------------Player--------------------------------------
type alias Player =
    { currentIndex : Int
    , currentPos : (Int, Int)
    , frameList : List (Int, List Property)
    , order : Int
    , character : Character
    , wealth : Float
    , prestige : Float -- percent
    , family : Int
    , influence : Float -- percent
    , policeAttention : Float -- percent
    , popularWill : Float
    , isHuman : Bool
    , familyLevel : Level
    , policeReduceLevel : Level
    , exist : Bool
    , jailRound : Int
    , dice : Int
    , storyRound : Int
    }

type Level
    = Low
    | Medium
    | High

-- player special talent
type SpecialBonus
    = Wealth Float
    | Prestige Float
    | Police Float
    | Family Float

type Character
    = Lance
    | Gorman
    | Doherty
    | Blair
    | Dummy

-------------------------Event------------------------

type alias Event =
    { description : String
    , optionDescription : List String
    , optionFunc : List (Player -> Player)
    , hint : List String
    }

------------------------Round-------------------------
type alias Round =
    { index : Int
    , playerIndex: Int
    , phase : RoundPhase
    }

type RoundPhase
    = PreparationPhase
    | MovePhase
    | ImplementationPhase
    | EndPhase

type SubRoundPhase
    = LetUsStart
    | AdjustMoneyFamily Level
    | AdjustMoneyPolice Level
    ----------------
    | Move
    | ManageEvent
    | AfterMove
    | AttackAfterMove
    | UpgradeAfterMove
    ----------------
    | RollActionDice
    | UseActionDice DiceKind Int
    ----------------
    | CountWealth

type DiceKind
    = NoActionDice
    | MoveDice
    | FightDice
    | AddDice
    | FightOrAdd
    | Lucky
    | Reform

------------------------Message------------------------------

type Msg
    = Roll
    | StopRoll
    | Frame Float
    | NewFace Int
    | Yes
    | No
    | SelectTile Int Int
    | ReselectTile Int Int String
    | StartGameMessage RoundPhase SubRoundPhase ClickState
    | RollAction
    | NewFaceAction Int
    | StopRollAction
    | SpecialMoveNewFace Int
    | SpecialMoveStopRoll
    | Side
    | Top
    | AddKey KeyValue
    | RemoveKey KeyValue
    | RandomNumber Int
    | UpdateSize Int Int
    | GetSize Viewport
    | ViewDetailedTile Int
    | NoDetail
    | NoOp
    | EndAction
    | AiRandomNumber (List Int)
    | Restart
    | OnJailCount
    | LoadNextRound

------------------------Model--------------------------

type alias Model =
    { map : List Tile
    , dice : Int
    , canClick: Bool
    , showPopUp : Bool
    , showDice : ShowDice
    , isMoving : Bool
    , players : List Player
    , currentPlayer : Int
    , totalPlayer : Int
    , round : Round
    , state : State
    , event : Event
    , actionDice : List DiceKind
    , viewPopUp : ViewPopUp
    , diceState : DiceState
    , showActionDice : Bool
    , showActionDiceRespectively : List Bool
    , sideState : SideState
    , topState : TopState
    , mapMoveX : Float
    , mapMoveY : Float
    , control : List KeyValue
    , canSelectTile : Bool
    , fightButtonNumber : Int
    , selectedTileIndex : Int
    , character : Character
    , randomNumber : Int
    , actionDiceNumber : List Int
    , windowSize : (Int, Int)
    , viewDetailed : Bool
    , detailTileIndex : Int
    , canClickEndAction : Bool
    , showEndButton : Bool
    , highlight : Bool
    , battleHighlight : Bool
    , aiRandomNumber: List Int
    , aiRandomNumberIndex: Int
    , winnerIndex : Int
    , fightIndicator : Int
    , addOrFight : String
    , bgm : Bool
    , reformSE : Bool
    , moveSE : Bool
    , fightSE : Bool
    , addSE : Bool
    , aiAction : List AiAction
    , aiRecord : String
    }

type alias AiAction =
    { order : Int
    , move : Int
    , upgrade : Int
    , count : (Int, Int)
    , add : List (Int, Int)
    , fight : List (Int, Int, Bool)
    }

seAllFalse: Model -> Model
seAllFalse model =
    {model | reformSE = False, moveSE = False, fightSE = False, addSE = False}

type KeyValue
    = Character Char
    | Control String

type SideState
    = NoSide
    | ShowSide
    | HideSide

type TopState
    = NoTop
    | ShowTop
    | HideTop

type DiceState
    = Dice
    | ActionDice
    | NotShowDice

type alias ViewPopUp =
    { backgroundImage : String
    , title : String
    , descriptionText : String
    , buttons : List (Html Msg)
    }

dummyPlayer : Player
dummyPlayer =
    { currentIndex = 0
    , currentPos = (0, 0)
    , frameList = [ (0, [custom "left" "0%", custom "top" "0%"]), (100, [custom "left" "0%", custom "top" "0%"]) ]
    , order = -1
    , character = Dummy
    , wealth = 0
    , prestige = 0 -- percent
    , family = 0
    , influence = 0  -- percent
    , policeAttention = 0 -- percent
    , popularWill = 0
    , isHuman = False
    , familyLevel = Medium
    , policeReduceLevel = Medium
    , exist = False
    , jailRound = -1
    , dice = 3
    , storyRound = 0
    }


type ShowDice
    = NoDice
    | FinalDice
    | RollingDice
    | RollingMoreDice
    | FinalMoreDice

type alias TimeSeed =
    { now : Posix
    , seed : Random.Seed
    , prob : Int
    }

type State
    = Play
    | Win
    | Lose
    | Over100

--------------------------------Message-------------------------------


type ClickState
    = NotClick
    | Click1
    | Click2
    | Click3
    | Click4
    | Click5
    | Click6
    | Click7
    | Click8
    | Click9

----------------------------Useful Function------------------------------
get: Int -> List a -> a
get index list =
    case getAt index list of
        Just current ->
            current
        _ ->
            get 1 list

toIntSure: String -> Int
toIntSure string =
    case toInt string of
        Just current ->
            current
        _ ->
            0

elemIndexSure: a -> List a -> Int
elemIndexSure a listA =
    case elemIndex a listA of
        Just current ->
            current
        _ ->
            -100

--key decoder--
keyDecoder : Decode.Decoder KeyValue
keyDecoder =
    Decode.map toKeyValue (Decode.field "key" Decode.string)


toKeyValue : String -> KeyValue
toKeyValue string =
    let
        _ =
            Debug.log string
    in
    case String.uncons string of
        Just ( char, "" ) ->
            Character char

        _ ->
            Control string

characterName: Model -> String
characterName model =
    case model.character of
        Lance ->
            "With a Silver Spoon -- Lance"
        Gorman ->
            "The Last Glorious -- Gorman"
        Doherty ->
            "Social Butterfly -- Doherty"
        Blair ->
            "Fertile -- Blair"
        _ ->
            "Dummy -- Dummy"

-- prompt --
playerName : Player -> String
playerName player =
    case player.character of
        Lance ->
            "Lance"
        Gorman ->
            "Gorman"
        Doherty ->
            "Doherty"
        Blair ->
            "Blair"
        _ ->
            "Dummy"


buildingLevel : List Tile -> Int -> (String, String)
buildingLevel map index =
    let
        tile = get index map
        building = tile.building
    in
        case building of
            Casino level ->
                ("Casino", "Level " ++ toString level)
            Disco level->
                ("Disco", "Level " ++ toString level)
            BoxingGym level->
                ("Boxing Gym", "Level " ++ toString level)
            NightMarket level ->
                ("Night Market", "Level " ++ toString level)
            Block ->
                ("Block", "No level")
            Jail ->
                ("Jail", "Public Space")
            PoliceStation ->
                ("Police Station", "Public Space")

------avoid overFlow-----------
refreshPlayer: Player -> Player
refreshPlayer player =
    let
        pr = player.prestige
        pw = player.popularWill
        pa = player.policeAttention
        prFresh: Player -> Player
        prFresh player0=
             if pr > 1 then
                 {player0 | popularWill = 1}
             else if pr < 0 then
                {player0 | popularWill = 0}
             else
                player0

        pwFresh: Player -> Player
        pwFresh player0=
            if pw > 1 then
                {player0 | prestige = 1}
            else if pw < 0 then
                {player0 | prestige = 0}
            else
                player0

        paFresh: Player -> Player
        paFresh player0=
            if pa > 1 then
                {player0 | policeAttention = 1}
            else if pa < 0 then
                {player0 | policeAttention = 0}
            else
                player0
    in
        paFresh ( pwFresh( prFresh player ))

