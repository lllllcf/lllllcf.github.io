module Paddle exposing (..)

import Debug exposing (toString)
import Svg exposing (Svg, image)
import Svg.Attributes exposing (height, width, x, xlinkHref, y)
import Debug exposing (toString)
import List exposing (..)

import Model exposing (..)

--Move our paddle
movePaddle : Model -> Model
movePaddle model =
    let
        old = model.paddle
        newLeft = { old | xPos = model.paddle.xPos - model.diffClass.paddleSpeed }
        newRight = { old | xPos = model.paddle.xPos + model.diffClass.paddleSpeed }
        rLeft = { old | xPos = -model.paddle.width}
        rRight = { old | xPos = 75 }
        gameControl = List.head model.gameControl
        command =
            case gameControl of
                Just value ->
                    case value of
                        Control string ->
                            string
                        Character _ ->
                            ""
                Nothing ->
                    ""
    in
        if command == "ArrowRight" then
            if model.paddle.xPos <= 74 then
                { model | paddle = newRight, moveRight = True, moveLeft = False }
            else if model.paddle.xPos >= 74.5 then
                { model | paddle = rLeft, moveRight = True, moveLeft = False }
            else
                { model | moveRight = False, moveLeft = False }
        else if command == "ArrowLeft" then
            if model.paddle.xPos >= -model.paddle.width then
                { model | paddle = newLeft, moveLeft = True, moveRight = False }
            else if model.paddle.xPos <= -model.paddle.width - 0.5 then
                { model | paddle = rRight, moveLeft = True, moveRight = False }
            else
                { model | moveRight = False, moveLeft = False }
        else
            { model | moveRight = False, moveLeft = False }

--Show the paddle to polayers
svgPaddle : Paddle -> List (Svg msg)
svgPaddle paddle =
    [
    image
        [ x (toString paddle.xPos)
        , y (toString paddle.yPos)
        , xlinkHref paddle.texture
        , width (toString paddle.width)
        , height "1.2"
        ]
        []
    ]
