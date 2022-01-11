module Main exposing (..)


import Browser exposing (element)

import Model exposing (..)
import Update exposing (..)
import View exposing (..)
import Subscriptions exposing (..)

--I am Main function!!
main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }




