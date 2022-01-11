module Update exposing (..)

import List exposing (..)
import Task
import Time exposing (Posix)
import Random

import Ball exposing (..)
import Paddle exposing (..)
import Block exposing (Special(..), addSpecial)
import Model exposing (..)
import View exposing (..)
import Skill exposing (..)
import Fire exposing (..)

--Update
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model.state of
        Pause ->
            continue msg model
        Play ->
            playing msg model
        Win ->
            restart msg model
        Lose ->
            restart msg model
        WaitStart ->
            restart msg model
        LoseOneLife ->
            respawn msg model
        WaitNextStage ->
            next msg model
        GUI ->
            cds msg model

--Update: Pause state
continue : Msg -> Model -> (Model, Cmd Msg)
continue msg model =
    case msg of
        AddKey value->
            case value of
                Control string ->
                    if string == "Enter" then
                        ({ model | state = Play }, Cmd.none)
                    else
                        (model, Cmd.none)
                Character _ ->
                    (model, Cmd.none)
        Zone zone ->
            ({ model | zone = zone }, Task.perform Now Time.now)
        Now now ->
            ({ model | now = now }, Cmd.none)
        ChangeDisplayState state ->
            (checkStateToBegin (Tuple.first (init ())) state, Cmd.none)
        _ ->
             (model, Cmd.none)

--Update: Play state
playing : Msg -> Model -> (Model, Cmd Msg)
playing msg model =
    let
        movedBallModel = moveBalls (movePaddle model)
        scoreSkillModel = scoreSkill movedBallModel
        movedModel = moveFires scoreSkillModel
        checkWinModelAnimation =
            if List.isEmpty movedModel.blocks then
                { movedModel | state = Win }
            else
                movedModel
        checkWinModel =
            if List.isEmpty model.blocks then
                if model.stage < 6 then
                    { model | state = WaitNextStage }
                else
                    { model | state = Win }
            else
                { model | state = movedModel.state }
    in
        case msg of
            AddKey value ->
                case value of
                    Control string ->
                        if string == "Enter" then
                            ({ checkWinModel | state = Pause }, Cmd.none)
                        else
                            ({ checkWinModel | gameControl = [value] }, Cmd.none)
                    Character character ->
                        if character == 'a' then
                            ({checkWinModel | typeOfSkills = FiveBall, useSkill = True}, Cmd.none)
                        else if character == 's' then
                            ({checkWinModel | typeOfSkills = LongPaddle, useSkill = True}, Cmd.none)
                        else if character == 'd' then
                            ({checkWinModel | typeOfSkills = LongLife, useSkill = True}, Cmd.none)
                        else
                            (checkWinModel, Cmd.none)
            RemoveKey _ ->
                ({ checkWinModel | gameControl = [] }, Cmd.none)
            Zone zone ->
                ({ checkWinModel | zone = zone }, Task.perform Now Time.now )
            Now now ->
                ({ checkWinModel | now = now }, Cmd.none )
            ChangeDisplayState state ->
                (checkStateToBegin model state, Cmd.none)
            _ ->
                (checkWinModelAnimation, Cmd.none)

--Update: Win/Lose/WaitStart state
restart : Msg -> Model -> (Model, Cmd Msg)
restart msg model =
    case msg of
        AddKey value->
            case value of
                Control string ->
                    if string == "Enter" then
                        let
                            initModel = Tuple.first (init ())
                            restartModel = { initModel | state = Play, seed = Random.initialSeed (Time.toSecond model.zone model.now), displayState = DisplayGame, numberOfSkills = skillWrtDiff model }
                            difficultyModel = { restartModel | difficulty = model.difficulty }
                            specialModel = { difficultyModel | blocks = addSpecial difficultyModel.seed difficultyModel.blocks }
                            updateScore: List Block.Block -> Int -> List Block.Block
                            updateScore blocks scale =
                                List.map (\x -> Block.Block x.textureList (x.eachScore * scale) x.xPos x.yPos x.exist x.special) blocks
                            finalModel =
                                case specialModel.difficulty of
                                    Easy ->
                                        specialModel
                                    Medium ->
                                        { specialModel | blocks = updateScore specialModel.blocks 2 }
                                    Difficult ->
                                        { specialModel | blocks = updateScore specialModel.blocks 3 }
                        in
                            (finalModel , Cmd.none)
                    else
                        (model, Cmd.none)
                Character _ ->
                    (model, Cmd.none)
        Zone zone ->
            ({ model | zone = zone }, Task.perform Now Time.now)
        Now now ->
            ({ model | now = now }, Cmd.none)
        EasyMsg ->
            ({ model | difficulty = Easy }, Cmd.none)
        MediumMsg ->
            ({ model | difficulty = Medium }, Cmd.none)
        DifficultMsg ->
            ({ model | difficulty = Difficult }, Cmd.none)
        ChangeDisplayState state ->
            (checkStateToBegin (Tuple.first (init ())) state, Cmd.none)
        _ ->
            (model, Cmd.none)

--Update: LoseOneLife state
respawn : Msg -> Model -> (Model, Cmd Msg)
respawn msg model =
    case msg of
        AddKey value ->
            case value of
                Control string ->
                    if string == "Enter" then
                        ({ model | balls = [createBall 37.4 51 0.25 -0.25 True PaddleToBlock, createBall -100 500 0.25 -0.25 False PaddleToBlock, createBall -110 500 0.25 -0.25 False PaddleToBlock, createBall -120 500 0.25 -0.25 False PaddleToBlock, createBall -90 500 0.25 -0.25 False PaddleToBlock, createBall -80 500 0.25 -0.25 False PaddleToBlock, createBall -70 500 0.25 -0.25 False PaddleToBlock ]
                                 , paddle = initPaddle
                                 , state = Play
                                  }
                        , Cmd.none)
                    else
                        (model, Cmd.none)
                Character _ ->
                    (model, Cmd.none)
        Zone zone ->
            ({ model | zone = zone }, Task.perform Now Time.now)
        Now now ->
            ({ model | now = now }, Cmd.none)
        ChangeDisplayState state ->
            (checkStateToBegin (Tuple.first (init ())) state, Cmd.none)
        _ ->
             (model, Cmd.none)

--Update: WaitNextStage state
next : Msg -> Model -> (Model, Cmd Msg)
next msg model =
    case msg of
        NextStage ->
            let
                nextStage = model.stage + 1
                nextModel = { model | state = Play,
                                      seed = Random.initialSeed (Time.toSecond model.zone model.now),
                                      stage = nextStage,
                                      blocks = Block.initBlock nextStage,
                                      paddle = initPaddle,
                                      balls = [createBall 37.4 51 0.25 -0.25 True PaddleToBlock, createBall -100 500 0.25 -0.25 False PaddleToBlock, createBall -110 500 0.25 -0.25 False PaddleToBlock, createBall -120 500 0.25 -0.25 False PaddleToBlock, createBall -90 500 0.25 -0.25 False PaddleToBlock, createBall -80 500 0.25 -0.25 False PaddleToBlock, createBall -70 500 0.25 -0.25 False PaddleToBlock ],
                                      numberOfSkills = model.numberOfSkills + 2
                            }
                specialModel = { nextModel | blocks = addSpecial nextModel.seed nextModel.blocks }
            in
                (specialModel , Cmd.none)
        Zone zone ->
            ({ model | zone = zone }, Task.perform Now Time.now)
        Now now ->
            ({ model | now = now }, Cmd.none)
        ChangeDisplayState state ->
            (checkStateToBegin (Tuple.first (init ())) state, Cmd.none)
        _ ->
            (model, Cmd.none)

--Update: GUI state
cds : Msg -> Model -> (Model, Cmd Msg)
cds msg model =
    case msg of
        ChangeDisplayState state ->
            (checkStateToBegin model state, Cmd.none)
        EasyMsg ->
            ({ model | difficulty = Easy, numberOfSkills = 1 }, Cmd.none)
        MediumMsg ->
            ({ model | difficulty = Medium, numberOfSkills = 2 }, Cmd.none)
        DifficultMsg ->
            ({ model | difficulty = Difficult, numberOfSkills = 3 }, Cmd.none)
        Zone zone ->
            ({ model | zone = zone }, Task.perform Now Time.now)
        Now now ->
            ({ model | now = now }, Cmd.none)
        ChangeSkillShown skill->
            ({model | typeOfSkills = skill} ,Cmd.none)
        _ ->
            (model, Cmd.none)