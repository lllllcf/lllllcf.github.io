module Subscriptions exposing (..)

import Browser.Events exposing (onKeyDown, onKeyUp)
import Json.Decode as Decode

import Model exposing (..)

--Subscriptions
subscriptions : Model-> Sub Msg
subscriptions model=
   Sub.batch
           [ onKeyDown (Decode.map AddKey keyDecoder)
           , onKeyUp (Decode.map RemoveKey keyDecoder)
           , Browser.Events.onAnimationFrameDelta Frame
           ]