module Condition exposing (..)

import Definition exposing (..)
import List.Extra exposing (setAt, getAt)

regularRefresh: Model -> Model
regularRefresh model =
    let
        modelOwner = refreshOwner model
        modelInfluence = changeInfluence modelOwner
        modelLose = judgeLose modelInfluence
        modelWin = judgeWin modelLose
        modelMember = countMember modelWin
    in
        noOverFlow modelMember

noOverFlow: Model -> Model
noOverFlow model =
    let
        players = model.players
        newPlayers = List.map refreshPlayer players
    in
        {model | players = newPlayers }

            
countMember: Model -> Model
countMember model =
    let
        p0 = get 0 model.players
        p1 = get 1 model.players
        p2 = get 2 model.players
        p3 = get 3 model.players

        np0 = {p0 | family = List.sum (List.map (\x -> get 0 x.familyMember) model.map)}
        np1 = {p1 | family = List.sum (List.map (\x -> get 1 x.familyMember) model.map)}
        np2 = {p2 | family = List.sum (List.map (\x -> get 2 x.familyMember) model.map)}
        np3 = {p3 | family = List.sum (List.map (\x -> get 3 x.familyMember) model.map)}

        newPlayers = [np0, np1, np2, np3]
    in
        {model | players = newPlayers}

judgeWin: Model -> Model
judgeWin model =
    let
        model1 = judgeOneWin (get 0 model.players) model
        model2 = judgeOneWin (get 1 model.players) model1
        model3 = judgeOneWin (get 2 model.players) model2
        model4 = judgeOneWin (get 3 model.players) model3

        pointList = [generalPoint (get 0 model.players) model4, generalPoint (get 1 model.players) model4, generalPoint (get 2 model.players) model4, generalPoint (get 3 model.players) model4]
        maxPointIndex = elemIndexSure (maxSure pointList) pointList
    in
        if model.round.index > 100 then
            {model | state = Over100, winnerIndex = maxPointIndex }
        else
            model4

-- if over 100 turns, use this to decide the winner
generalPoint : Player -> Model -> Float
generalPoint player model =
    let
        familyPercent =
           let
               existPlayer = List.filter (\x -> x.exist) model.players
               totalFamily = List.map (\x -> x.family) existPlayer |> List.sum |> toFloat
           in
               toFloat player.family / totalFamily
        attributeList = [ player.prestige, familyPercent, player.influence, player.popularWill, player.policeAttention ]
        weight = [ 0.25, 0.2, 0.3, 0.15, 0.1 ]
        withWeightSum = List.map2 (*) attributeList weight |> List.sum
    in
        if player.exist == True then
            player.wealth * withWeightSum / List.sum attributeList
        else
            0

judgeLose: Model -> Model
judgeLose model =
    let
        model1 = judgeOneLoser (get 0 model.players) model
        model2 = judgeOneLoser (get 1 model.players) model1
        model3 = judgeOneLoser (get 2 model.players) model2

    in
        judgeOneLoser (get 3 model.players) model3

changeInfluence: Model -> Model
changeInfluence model =
    let
        model1 = changeOneInfluence (get 0 model.players) model
        model2 = changeOneInfluence (get 1 model.players) model1
        model3 = changeOneInfluence (get 2 model.players) model2

    in
        changeOneInfluence (get 3 model.players) model3


judgeOneLoser : Player -> Model -> Model
judgeOneLoser player model =
    let
        currentPlayerIndex = player.order
        losePlayer = { player | exist = False }
    in
        if player.wealth <= 0 || player.influence <= 0 then
            if player.isHuman then
                { model | state = Lose, players = setAt currentPlayerIndex losePlayer model.players }
            else
                { model | players = setAt currentPlayerIndex losePlayer model.players }
        else
            model

judgeOneWin : Player -> Model -> Model
judgeOneWin player model =
    if player.influence >= 0.9 then
        { model | state = Win, winnerIndex = player.order }
    else
        model

removeLosePlayer : Model -> Model
removeLosePlayer model =
    let
        losePlayers = List.filter (\x -> not x.exist) model.players
        losePlayerIndices = List.map (\x -> x.order) losePlayers

        clearTile : Tile -> Tile
        clearTile thisTile =
            let
                single : Int -> Int -> Int
                single order _=
                    if List.member order losePlayerIndices then
                        0
                    else
                        get order thisTile.familyMember
                clearFamily = List.indexedMap single thisTile.familyMember
            in
                { thisTile | familyMember = clearFamily }

        clearOwner =
            let
                single : Tile -> Tile
                single thisTile =
                    case thisTile.owner of
                        Nothing ->
                            thisTile
                        Just thisPlayer ->
                            if List.member thisPlayer losePlayers then
                                { thisTile | owner = Nothing }
                            else
                                thisTile
            in
                List.map single model.map
        clearMap =
            List.map clearTile clearOwner
    in
        { model | map = clearMap }

changeOneInfluence: Player -> Model -> Model
changeOneInfluence player model =
    let
        index = elemIndexSure player model.players
        judgeOwner: Tile -> Bool
        judgeOwner tile =
            case tile.owner of
                Just current ->
                    if current.character == player.character then
                        True
                    else
                        False
                _ ->
                    False

        controlTile = List.filter judgeOwner model.map

        calculateInfluence: Tile -> Int
        calculateInfluence tile =
            tile.stability

        influenceInt = List.sum (List.map calculateInfluence controlTile)
        influenceAll = List.sum (List.map calculateInfluence model.map)

        newPlayer = {player | influence = Basics.toFloat (influenceInt) / Basics.toFloat (influenceAll) }
    in
        {model | players = setAt index newPlayer model.players}


refreshOwner: Model -> Model
refreshOwner model =
    let
        tiles = List.map judgeOwner model.map
        judgeOwner: Tile -> Tile
        judgeOwner tile =
            let
                family = tile.familyMember
                max =  maxSure family
                maxIndex = elemIndexSure max family
                otherMax = maxSure (setAt maxIndex -1 family)
            in
                if max - otherMax >= tile.stability then
                    {tile | owner = getAt maxIndex model.players}
                else
                    {tile | owner = Nothing}
    in
        {model | map = tiles }

maxSure: List comparable -> comparable
maxSure list =
    case List.maximum list of
        Just a ->
            a
        Nothing ->
            get 0 list