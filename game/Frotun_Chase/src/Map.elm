module Map exposing (..)

import Debug exposing (toString)
import Definition exposing (..)
import Css exposing (..)
import Css.Animations exposing (Property, custom, keyframes)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, style)
import Html.Styled.Events exposing (onClick, onMouseOut, onMouseOver)
import Round exposing (roundNum)
import Tuple exposing (mapFirst, mapSecond)

initMember: List Tile -> List Tile
initMember map =
    let
        memberList: List (List Int)
        memberList = [----------------------up---------------------------
                      [10,0,0,0],[4,2,1,1],[0,0,0,0],[2,0,2,0] ,[0,0,0,0],[0,0,0,0],[1,2,3,2],[2,0,1,1]
                     ,[0,0,3,0],[1,2,2,0],[1,3,0,2],[1,0,4,2] ,[1,2,1,0],[2,2,0,1],[1,2,0,0],[2,3,1,1]
                     ,[2,4,1,0]
                     ----------------------right---------------------------
                     ,[0,10,0,0],[2,1,1,1],[1,0,2,1],[1,0,1,2] ,[2,1,0,2],[0,2,1,2],[3,0,1,1],[0,0,0,0]
                     ,[1,1,1,0],[2,1,2,1],[0,0,0,0],[3,1,1,3] ,[2,4,1,0],[1,1,1,0],[2,3,2,0],[3,2,1,1]
                     ,[1,1,3,0]
                     ----------------------down---------------------------
                     ,[0,0,10,0],[1,0,3,0],[2,0,2,3],[2,1,1,2] ,[2,3,2,0],[1,1,1,0],[2,4,1,0],[1,2,2,2]
                     ,[1,0,2,1],[0,2,1,2],[0,2,1,0],[4,1,3,2] ,[2,3,2,2],[3,2,1,2],[2,0,3,2],[1,2,1,3]
                     ,[1,3,2,3]
                     ----------------------left---------------------------
                     ,[0,0,0,10],[2,1,2,5],[1,1,1,3],[3,2,1,4] ,[1,0,3,0],[0,2,1,1],[0,2,2,0],[0,0,0,0]
                     ,[2,1,1,0],[1,0,1,3],[2,0,1,0],[0,0,0,0] ,[1,1,1,1],[1,1,2,1],[1,1,1,1],[2,1,4,0]
                     ,[1,2,2,1]
                     ]

        resetMap: Int -> Tile -> Tile
        resetMap index tile =
            {tile | familyMember = get index memberList}

     in
        List.indexedMap resetMap map

initStability: List Tile -> List Tile
initStability map =
    let
        stabilityList: List Int
        stabilityList = [----------------------up---------------------------
                         2, 4, 3, 4,    3, 3, 7, 2,    3, 5, 4, 5,    3, 3, 4, 4, 3

                         ----------------------right---------------------------
                        ,2, 4, 5, 6,    5, 2, 5, 100,    3, 3, 4, 3,    2, 3, 3, 2, 5

                        ----------------------down---------------------------
                        ,2, 2, 4, 6,    3, 4, 7, 3,    3, 3, 4, 4,    2, 4, 5, 5, 3

                        ----------------------left---------------------------
                        ,2, 4, 4, 7,    4, 2, 5, 100,    3, 3, 4, 2,    2, 7, 2, 3, 6
                        ]
        resetMap: Int -> Tile -> Tile
        resetMap index tile =
            {tile | stability = get index stabilityList}
    in
        List.indexedMap resetMap map

-- generate map by line
generateLine : (Int, Int) -> Int -> Int -> Int -> List Tile
generateLine startPos startIndex length direction = -- dir = 1: right, dir = 2: left, dir = 3: up, dir = 4: down
    let
        width =
            if direction == 1 || direction == 2 then
                5
            else
                10
        height =
            if direction == 1 || direction == 2 then
                10
            else
                5
        single : (Int, Int) -> Int -> Tile
        single thisPos thisIndex =
            { position = thisPos, index = thisIndex, stability = 2, familyMember = [ 0, 0, 0, 0 ], building = Block, owner = Nothing, direction = direction , status = NotSelf, score = [-1, -1, -1]}
        indexList = List.range startIndex (startIndex + length - 1)
        posList =
            let
                widthSpaceRight = List.map ((*) width) (List.range 0 (length - 1))
                widthSpaceLeft = List.map ((*) width) (List.range (1 - length) 0 |> List.reverse )
                heightSpaceUp = List.map ((*) height) (List.range (1 - length) 0 |> List.reverse )
                heightSpaceDown = List.map ((*) height) (List.range 0 (length - 1))
            in
                case direction of
                    1 ->
                        List.map (\a -> mapFirst (\b -> b + a) startPos) widthSpaceRight
                    2 ->
                        List.map (\a -> mapFirst (\b -> b + a) startPos) widthSpaceLeft
                    3 ->
                        List.map (\a -> mapSecond (\b -> b + a) startPos) heightSpaceUp
                    _ ->
                        List.map (\a -> mapSecond (\b -> b + a) startPos) heightSpaceDown
    in
        List.map2 single posList indexList

-- initialize the map
initMap : List Tile
initMap =
    let
        player1spawn = [ Tile 2 [ 10, 0, 0, 0 ] Block (0, 0) 0 Nothing 1 NotSelf [-1, -1, -1]]
        player2spawn = [ Tile 2 [ 0, 0, 0, 0 ] Block (90, 0) 17 Nothing 4 NotSelf [-1, -1, -1]]
        player3spawn = [ Tile 2 [ 0, 0, 0, 0 ] Block (90, 90) 34 Nothing 2 NotSelf [-1, -1, -1]]
        player4spawn = [ Tile 2 [ 0, 0, 0, 0 ] Block (0, 90) 51 Nothing 3 NotSelf [-1, -1, -1]]
        mapWithoutBuilding =
            player1spawn ++
            generateLine (10, 0) 1 16 1 ++
            player2spawn ++
            generateLine (90, 10) 18 16 4 ++
            player3spawn ++
            generateLine (85, 90) 35 16 2 ++
            player4spawn ++
            generateLine (0, 85) 52 16 3

        addBuilding : Tile -> Tile
        addBuilding thisTile =
            if List.member thisTile.index [ 3, 15, 20, 32, 37, 49, 54, 66 ] then
                { thisTile | building = Casino 1 }
            else if List.member thisTile.index [ 6, 23, 40, 57 ] then
                { thisTile | building = Disco 1 }
            else if List.member thisTile.index [ 9, 26, 43, 60 ] then
                { thisTile | building = BoxingGym 1 }
            else if List.member thisTile.index [ 12, 29, 46, 63 ] then
                { thisTile | building = NightMarket 1 }
            else if thisTile.index == 24 then
                { thisTile | building = Jail }
            else if thisTile.index == 58 then
                { thisTile | building = PoliceStation }
            else
                { thisTile | building = Block }

        newTiles = List.map addBuilding mapWithoutBuilding
        tiles1 = initMember newTiles
    in
       initStability tiles1

-- render the map
renderMap : List Tile -> Model -> List (Html Msg)
renderMap map model=
    let
        currentPlayer = get model.currentPlayer model.players
        renderTile : Tile -> Html Msg
        renderTile thisTile =
            let
                owner = thisTile.owner
                adjacentTiles = [ get (modBy (List.length model.map) (thisTile.index - 1)) model.map
                                , thisTile
                                , get (modBy (List.length model.map) (thisTile.index + 1)) model.map
                                ]
                adjacentOwnedNum =
                    if (get 0 adjacentTiles).owner == Just currentPlayer && (get 2 adjacentTiles).owner == Just currentPlayer then
                        2
                    else if (get 0 adjacentTiles).owner /= Just currentPlayer && (get 2 adjacentTiles).owner /= Just currentPlayer then
                        0
                    else
                        1
                familyEachTile : Tile -> Int
                familyEachTile aTile =
                    get model.currentPlayer aTile.familyMember
                familyAdjacent =
                    List.map familyEachTile adjacentTiles
                battleJudge =
                    let
                        listExceptCurrent = List.take model.currentPlayer thisTile.familyMember
                                         ++ List.drop (model.currentPlayer + 1) thisTile.familyMember
                    in
                        if get model.currentPlayer thisTile.familyMember /= 0 && List.any (\x -> x /= 0) listExceptCurrent then
                            True
                        else
                            False
                dirParsing = toString thisTile.direction ++ ".png"
                widthHeight =
                    if List.member thisTile.index [0, 17, 34, 51] then
                        ("10%", "10%")
                    else
                        if thisTile.direction == 1 || thisTile.direction == 2 then
                            ("5%", "10%")
                        else
                            ("10%", "5%")
                stripeWidthHeight =
                    if thisTile.direction == 1 || thisTile.direction == 2 then
                        ("100%", "10%")
                    else
                        ("10%", "100%")
                stripeLeftTop =
                    if thisTile.direction == 1 || thisTile.direction == 2 then
                        ("0%", "50%")
                    else
                        ("50%", "0%")
                url =
                    case thisTile.building of
                        Casino _->
                            "./MapElement/C_Source/C_Casino/C_Casino" ++ dirParsing
                        Disco _->
                            "./MapElement/C_Source/C_Disco/C_Disco" ++ dirParsing
                        NightMarket _->
                            "./MapElement/C_Source/C_NightMarket/C_NightMarket" ++ dirParsing
                        BoxingGym _->
                            "./MapElement/C_Source/C_BoxingGym/C_BoxingGym" ++ dirParsing
                        PoliceStation ->
                            "./MapElement/C_Source/C_Police/C_PoliceStation.png"
                        Jail ->
                            "./MapElement/C_Source/C_Jail/C_Jail.png"
                        Block ->
                            case thisTile.index of
                                0 ->
                                    "./MapElement/C_Source/C_Spawning/Lhome.png"
                                17 ->
                                    "./MapElement/C_Source/C_Spawning/Ghome.png"
                                34 ->
                                    "./MapElement/C_Source/C_Spawning/Dhome.png"
                                51 ->
                                    "./MapElement/C_Source/C_Spawning/Bhome.png"
                                _ ->
                                    "./MapElement/C_Source/C_Block/C_Block" ++ dirParsing
                skew_ =
                    case thisTile.direction of
                        1 ->
                            property "transform" "skewY(10deg)"
                        2 ->
                            property "transform" "skewY(10deg)"
                        3 ->
                            property "transform" "skewX(10deg)"
                        4 ->
                            property "transform" "skewX(10deg)"
                        _ ->
                            property "" ""
                colorSet =
                    case owner of
                        Just thisPlayer ->
                            case thisPlayer.character of
                                Lance ->
                                    property "background-image" "linear-gradient(135deg, #fff, #fff 25%, #DAA520 25%, #DAA520 50%, #fff 50%, #fff 75%, #DAA520 75%, #DAA520 100%)"
                                Gorman ->
                                    property "background-image" "linear-gradient(135deg, #fff, #fff 25%, #e60073 25%, #e60073 50%, #fff 50%, #fff 75%, #e60073 75%, #e60073 100%)"
                                Doherty ->
                                    property "background-image" "linear-gradient(135deg, #fff, #fff 25%, #6495ED 25%, #6495ED 50%, #fff 50%, #fff 75%, #6495ED 75%, #6495ED 100%)"
                                Blair ->
                                    property "background-image" "linear-gradient(135deg, #fff, #fff 25%, #FFA07A 25%, #FFA07A 50%, #fff 50%, #fff 75%, #FFA07A 75%, #FFA07A 100%)"
                                _ ->
                                    property "" ""
                        Nothing ->
                            property "" ""
                ownerHint =
                    case owner of
                        Just thisPlayer ->
                            if thisPlayer.exist && not (List.member thisTile.index [0, 17, 34, 51]) then
                                div [ style "width" (Tuple.first stripeWidthHeight)
                                    , style "height" (Tuple.second stripeWidthHeight)
                                    , style "left" (Tuple.first stripeLeftTop)
                                    , style "top" (Tuple.second stripeLeftTop)
                                    , style "position" "absolute"
                                    , css [ skew_
                                          , colorSet
                                          , property "opacity" "0.9"
                                          , property "background-size" "100px 100px"
                                          , animationName (keyframes [(0, [])
                                                                     ,(100, [custom "background-position" "100px 0"])
                                                                     ])
                                          , animationDuration (sec(2))
                                          , property "animation-iteration-count" "infinite"
                                          , property "animation-timing-function" "linear"
                                          ]
                                    ]
                                    []
                            else
                                div [] []
                        Nothing ->
                                div [] []
                highlight1 =
                    css [ Css.property "left" (toString (Tuple.first thisTile.position) ++ "%")
                        , Css.property "top" (toString (Tuple.second thisTile.position) ++ "%")
                        , animationName (keyframes [ (0, [ custom "box-shadow" "0px 0px 10px 10px #4169E1" ])
                                                   , (100, [ custom "box-shadow" "0px 0px 10px 10px #000080" ])
                                                   ])
                        , animationDuration (sec(1))
                        , property "animation-iteration-count" "infinite"
                        , property "animation-timing-function" "ease-in-out"
                        , property "animation-direction" "alternate"
                        ]
                highlight2 =
                    css [ Css.property "left" (toString (Tuple.first thisTile.position) ++ "%")
                        , Css.property "top" (toString (Tuple.second thisTile.position) ++ "%")
                        , animationName (keyframes [ (0, [ custom "box-shadow" "0px 0px 10px 10px #DC143C" ])
                                                   , (100, [ custom "box-shadow" "0px 0px 10px 10px #B22222" ])
                                                   ])
                        , animationDuration (sec(1))
                        , property "animation-iteration-count" "infinite"
                        , property "animation-timing-function" "ease-in-out"
                        , property "animation-direction" "alternate"
                        ]
                highlight0 =
                    css [ Css.property "left" (toString (Tuple.first thisTile.position) ++ "%")
                        , Css.property "top" (toString (Tuple.second thisTile.position) ++ "%")
                        , animationName (keyframes [ (0, [ custom "box-shadow" "0px 0px 10px 10px #BDBDBD" ])
                                                   , (100, [ custom "box-shadow" "0px 0px 10px 10px #FFFFFF" ])
                                                   ])
                        , animationDuration (sec(1))
                        , property "animation-iteration-count" "infinite"
                        , property "animation-timing-function" "ease-in-out"
                        , property "animation-direction" "alternate"
                        ]
                noHighlight =
                    css [ Css.property "left" (toString (Tuple.first thisTile.position) ++ "%")
                        , Css.property "top" (toString (Tuple.second thisTile.position) ++ "%")
                        ]
                battleHighlight =
                    if model.battleHighlight then
                        if battleJudge then
                            case adjacentOwnedNum of
                                1 ->
                                    highlight1
                                2 ->
                                    highlight2
                                _ ->
                                    highlight0
                        else
                            noHighlight
                    else
                        noHighlight
                highlightEffect =
                    if model.highlight then
                        case owner of
                            Just thisPlayer ->
                                if List.any (\x -> x /= 0) familyAdjacent then
                                    if thisPlayer == currentPlayer then
                                        highlight2
                                    else
                                        highlight1
                                else
                                    noHighlight
                            _ ->
                                if List.any (\x -> x /= 0) familyAdjacent then
                                    highlight2
                                else
                                    noHighlight
                    else
                        noHighlight
            in
                div [ whenSelectTile model thisTile model.addOrFight
                    , onMouseOver (ViewDetailedTile thisTile.index)
                    , onMouseOut NoDetail
                    , style "width" (Tuple.first widthHeight)
                    , style "height" (Tuple.second widthHeight)
                    , style "background-image" ("url(" ++ url ++ ")")
                    , style "position" "absolute"
                    , style "background-size" "100% 100%"
                    , highlightEffect
                    , battleHighlight
                    ]
                    [ ownerHint
                    ]
    in
        List.map renderTile map

whenSelectTile: Model -> Tile -> String -> Attribute Msg
whenSelectTile model tile fightOrAdd =
    let
        judgeInJail: Int -> Int -> Int
        judgeInJail index member =
            if (get index model.players).jailRound > 0 then 0
            else
                member

        judgeFightCase: String
        judgeFightCase =
            if tile.building == PoliceStation then
                "policeStation"
            else if tile.building == Jail then
                "jail"
            else if get model.currentPlayer tile.familyMember == 0 then
                "noMember"
            else if List.sum (List.indexedMap judgeInJail tile.familyMember) == get model.currentPlayer tile.familyMember then
                "noOthers"
            else
                "Nothing"
    in
        case fightOrAdd of
            "fight" ->
                if model.canSelectTile == True then
                    case judgeFightCase of
                        "policeStation" ->
                            onClick (ReselectTile tile.index model.fightButtonNumber "policeStation")
                        "jail" ->
                            onClick (ReselectTile tile.index model.fightButtonNumber "jail")
                        "noOthers" ->
                            onClick (ReselectTile tile.index model.fightButtonNumber "noOthers")
                        "noMember" ->
                            onClick (ReselectTile tile.index model.fightButtonNumber "noMember")
                        _ ->
                            onClick (SelectTile tile.index model.fightButtonNumber)
                else
                    onClick NoOp
            "add" ->
                if model.canSelectTile == True then
                    case tile.building of
                        PoliceStation ->
                            onClick (ReselectTile tile.index model.fightButtonNumber "policeStation")
                        Jail ->
                            onClick (ReselectTile tile.index model.fightButtonNumber "jail")
                        _ ->
                            onClick (SelectTile tile.index model.fightButtonNumber)
                else
                    onClick NoOp
            _ ->
                onClick NoOp

renderDetailedTile : Model -> Html Msg
renderDetailedTile model =
    let
        stabilityPrompt = toString (get model.detailTileIndex model.map).stability
        family = (get model.detailTileIndex model.map).familyMember
        familyPrompt = List.map (\a -> playerName (get a model.players) ++ ": " ++ toString (get a family) ++ " people") (List.range 0 3)
        buildingName = Tuple.first (Definition.buildingLevel model.map model.detailTileIndex)
        buildingColor =
            case buildingName of
                "Casino" ->
                    "blue"
                "Disco" ->
                    "green"
                "Boxing Gym" ->
                    "red"
                "Night Market" ->
                    "purple"
                "Block" ->
                    "silver"
                "Police Station" ->
                    "gold"
                _ ->
                    "black"
        tollPrompt =
            if buildingName == "Police Station" || buildingName == "Jail" then
                ""
            else
                "Toll: " ++ ((get model.detailTileIndex model.map).building |> assetBasicToll |>toString)
        incomePrompt =
            if buildingName == "Police Station" || buildingName == "Jail" then
                ""
            else
                "Income: " ++ ((get model.detailTileIndex model.map).building |> assetBasicIncome |>toString)
        levelPrompt = Tuple.second (Definition.buildingLevel model.map model.detailTileIndex)
        owner = (get model.detailTileIndex model.map).owner
        ownerName =
            case owner of
                Just player ->
                    Definition.playerName player
                Nothing ->
                    "No"
        ownerColor =
            case ownerName of
                "Lance" ->
                    property "background" "linear-gradient(-45deg, #FFB404, #FCC201, #FFF77A, #DC9202)"
                "Gorman" ->
                    property "background" "linear-gradient(-45deg, #E60073, #EE1A84, #F73395, #FF4DA6)"
                "Doherty" ->
                    property "background" "linear-gradient(-45deg, #000080, #2132A4, #4363C9, #6495ED)"
                "Blair" ->
                    property "background" "linear-gradient(-45deg, #FF7F50, #FF8A5E, #FF956C, #FFA07A)"
                "No" ->
                    property "background" "linear-gradient(-45deg, #DBE4EB, #D3DBE1, #CCD3D8, #C4CACE)"
                _ ->
                    property "background" "linear-gradient(-45deg, #DBE4EB, #D3DBE1, #CCD3D8, #C4CACE)"
    in
        case model.viewDetailed of
            True ->
                div [ style "width" "20%"
                    , style "height" "60%"
                    , style "left" "15%"
                    , style "top" "20%"
                    , style "position" "absolute"
                    , css [ animationName (keyframes [ (0, [custom "opacity" "0"]), (100, [custom "opacity" "1"]) ])
                          , property "background-size" "400% 400%"
                          , animationDuration (sec(0.5))
                          , property "animation-fill-mode" "forwards"
                          , property "border-radius" "10px"
                          , property "z-index" "3"
                          ]
                    ]
                    [ div [ style "width" "100%"
                          , style "height" "100%"
                          , style "position" "absolute"
                          , style "box-shadow" "10px 10px 20px grey"
                          , css [ ownerColor
                                , property "background-size" "400% 400%"
                                , animationName (keyframes [ (0, [custom "background-position" "0% 50%"])
                                                           , (50, [custom "background-position" "100% 50%"])
                                                           , (100, [custom "background-position" "0% 50%"])
                                                           ])
                                , animationDuration (sec(6))
                                , property "animation-iteration-count" "infinite"
                                , property "border-radius" "10px"
                                ]
                          ]
                          [ div [ style "width" "100%"
                                , style "top" "4%"
                                , style "position" "absolute"
                                , style "background" "white"
                                ]
                                [ h1 [ style "text-align" "center", style "font-size" "1.7vw", style "color" buildingColor ] [ text buildingName ] ]
                          , div [ style "top" "21%"
                                , style "width" "100%"
                                , style "position" "absolute"
                                ]
                                [ h1 [ style "text-align" "center", style "font-size" "1.3vw" ] [ text levelPrompt ]
                                ]
                          , div [ style "top" "30%"
                                , style "width" "100%"
                                , style "position" "absolute"
                                , style "line-height" "0.5vw"
                                ]
                                [ p [ style "text-align" "center", style "font-size" "1vw" ] [ text ("Index: " ++ toString model.detailTileIndex) ]
                                , p [ style "text-align" "center", style "font-size" "1vw" ] [ text ("Owner: " ++ ownerName) ]
                                , p [ style "text-align" "center", style "font-size" "1vw" ] [ text ("Stability: " ++ stabilityPrompt) ]
                                ]
                          , div [ style "width" "100%"
                                , style "top" "50%"
                                , style "position" "absolute"
                                , style "line-height" "0.5vw"
                                ]
                                [ h2 [ style "text-align" "center", style "font-size" "1.4vw" ] [ text "Family Members" ]
                                , p [ style "text-align" "center", style "font-size" "1vw" ] [ text (get 0 familyPrompt) ]
                                , p [ style "text-align" "center", style "font-size" "1vw" ] [ text (get 1 familyPrompt) ]
                                , p [ style "text-align" "center", style "font-size" "1vw" ] [ text (get 2 familyPrompt) ]
                                , p [ style "text-align" "center", style "font-size" "1vw" ] [ text (get 3 familyPrompt) ]
                                ]
                          , div [ style "width" "100%"
                                , style "top" "83%"
                                , style "position" "absolute"
                                ]
                                [ p [ style "font-size" "1.2vw", style "text-align" "center" ] [ text (tollPrompt ++ " " ++ incomePrompt) ] ]
                          ]
                    ]

            False ->
                div [] []

-- The basic income of an asset
assetBasicIncome : Building -> Float
assetBasicIncome building =
    case building of
        Casino level ->
            case level of
                1 ->
                    50
                2 ->
                    100
                3 ->
                    150
                _ ->
                    150
        Disco level ->
            case level of
                1 ->
                    40
                2 ->
                    80
                3 ->
                    120
                _ ->
                    120
        NightMarket level ->
            case level of
                1 ->
                    30
                2 ->
                    60
                3 ->
                    100
                _ ->
                    100
        BoxingGym level ->
            case level of
                1 ->
                    30
                2 ->
                    60
                3 ->
                    100
                _ ->
                    100
        Block ->
            20
        _ ->
            0

-- The basic toll of an asset
assetBasicToll : Building -> Float
assetBasicToll building =
    case building of
        Casino level ->
            case level of
                1 ->
                    300
                2 ->
                    600
                3 ->
                    1000
                _ ->
                    1000
        Disco level ->
            case level of
                1 ->
                    200
                2 ->
                    500
                3 ->
                    800
                _ ->
                    800
        NightMarket level ->
            case level of
                1 ->
                    150
                2 ->
                    400
                3 ->
                    700
                _ ->
                    700
        BoxingGym level ->
            case level of
                1 ->
                    150
                2 ->
                    400
                3 ->
                    700
                _ ->
                    70
        Block ->
            100
        _ ->
            0

-- Upgrading cost of an asset
assetUpgrade : Building -> (Float, Building)
assetUpgrade building =
    case building of
        Casino level ->
            case level of
                1 ->
                    (2000, Casino 2)
                2 ->
                    (3000, Casino 3)
                _ ->
                    (0, Casino 3)
        Disco level ->
            case level of
                1 ->
                    (1800, Disco 2)
                2 ->
                    (2500, Disco 3)
                _ ->
                    (0, Disco 3)
        NightMarket level ->
            case level of
                1 ->
                    (1500, NightMarket 2)
                2 ->
                    (2000, NightMarket 3)
                _ ->
                    (0, NightMarket 3)
        BoxingGym level ->
            case level of
                1 ->
                    (1200, BoxingGym 2)
                2 ->
                    (1800, BoxingGym 3)
                _ ->
                    (0, BoxingGym 3)
        _ ->
            (0, Block)

-- Family maintenance per turn
familyCost : Player -> Float
familyCost player =
    let
        costBonus =
            case player.character of
                Blair ->
                    1.3
                _ ->
                    1
        basic = 1.2 * toFloat player.family / costBonus
    in
        case player.familyLevel of
            Low ->
                basic / 2
            Medium ->
                basic
            High ->
                basic * 1.5

-- Police bribe per turn
policeReduceCost : Player -> Float
policeReduceCost player =
    let
        bribeReduce =
            case player.character of
                Doherty ->
                    1.3
                _ ->
                    1
        basic = (2 ^ player.policeAttention - 1) * 600 / bribeReduce
    in
        case player.policeReduceLevel of
            Low ->
                roundNum 0 (basic / 2)
            Medium ->
                roundNum 0 basic
            High ->
                roundNum 0 (basic * 1.5)