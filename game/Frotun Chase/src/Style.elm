module Style exposing (..)

import Css exposing (..)
import Css.Animations exposing (custom, keyframes)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css)
import Definition exposing (..)

button1 : Attribute Msg
button1 =
    css [ property "background-color" "#DC143C"
        , property "top" "0px"
        , property "position" "relative"
        , property "display" "block"
        , property "cursor" "pointer"
        , property "text-align" "center"
        , property "text-decoration" "none"
        , property "outline" "none"
        , property "color" "#fff"
        , property "border" "none"
        , property "border-radius" "15px"
        , property "box-shadow" "0 9px #8B0000"
        , property "-webkit-transition-duration" "0.2s"
        , property "transition-duration" "0.2s"
        , property "overflow" "hidden"
        , property "cursor" "url(./src/img/cursor.cur),move"
        , hover [ property "background" "#B22222"
                , property "display" "block"
                , property "position" "absolute"
                ]
        , active [ property "background-color" "#B22222"
                 , property "box-shadow" "0 5px #800000"
                 , property "transform" "translateY(4px)"
                 , after [ property "padding" "0"
                         , property "margin" "0"
                         , property "opacity" "1"
                         , property "transition" "0s"
                         ]
                 ]
        ]

button2 : Attribute Msg
button2 =
    css [ property "background-color" "#708090"
        , property "top" "0px"
        , property "position" "relative"
        , property "display" "block"
        , property "cursor" "pointer"
        , property "text-align" "center"
        , property "text-decoration" "none"
        , property "outline" "none"
        , property "color" "#fff"
        , property "border" "none"
        , property "border-radius" "15px"
        , property "box-shadow" "0 9px #696969"
        , property "-webkit-transition-duration" "0.2s"
        , property "transition-duration" "0.2s"
        , property "overflow" "hidden"
        , property "cursor" "url(./src/img/cursor.cur),move"
        , hover [ property "background" "#696969"
                , property "display" "block"
                , property "position" "absolute"
                ]
        , active [ property "background-color" "#696969"
                 , property "box-shadow" "0 5px #2F4F4F"
                 , property "transform" "translateY(4px)"
                 , after [ property "padding" "0"
                         , property "margin" "0"
                         , property "opacity" "1"
                         , property "transition" "0s"
                         ]
                 ]
        ]

buttonYes : Attribute Msg
buttonYes =
    css [ property "width" "220px"
        , property "height" "50px"
        , property "border" "none"
        , property "outline" "none"
        , property "color" "#fff"
        , property "background" "#111"
        , property "position" "relative"
        , property "z-index" "0"
        , property "border-radius" "10px"
        , property "cursor" "url(./src/img/cursor.cur),move"
        , before [ property "content" "''"
                 , property "background" "linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)"
                 , property "position" "absolute"
                 , property "top" "-2px"
                 , property "left" "-2px"
                 , property "background-size" "400%"
                 , property "z-index" "-1"
                 , property "filter" "blur(5px)"
                 , property "width" "calc(100% + 4px)"
                 , property "height" "calc(100% + 4px)"
                 , animationName ( keyframes [ (0, [ custom "background-position" "0 0" ])
                                             , (50, [ custom "background-position" "400% 0" ])
                                             , (100, [ custom "background-position" "0 0" ])
                                             ]
                                 )
                 , animationDuration (sec(30))
                 , property "animation-iteration-count" "infinite"
                 , property "opacity" "0"
                 , property "transition" "opacity .3s ease-in-out"
                 , property "border-radius" "10px"
                 ]
        , active [ property "color" "#000" ]
        , active [ after [ property "background" "transparent" ] ]
        , hover [ before [ property "opacity" "1" ] ]
        , after [ property "z-index" "-1"
                , property "content" "''"
                , property "position" "absolute"
                , property "width" "100%"
                , property "height" "100%"
                , property "background" "#111"
                , property "left" "0"
                , property "top" "0"
                , property "border-radius" "10-px"
                ]
        ]

buttonNo : Attribute Msg
buttonNo =
    css [ property "width" "220px"
        , property "height" "50px"
        , property "border" "none"
        , property "outline" "none"
        , property "color" "#111"
        , property "background" "#fff"
        , property "position" "relative"
        , property "z-index" "0"
        , property "border-radius" "10px"
        , property "cursor" "url(./src/img/cursor.cur),move"
        , before [ property "content" "''"
                 , property "background" "linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)"
                 , property "position" "absolute"
                 , property "top" "-2px"
                 , property "left" "-2px"
                 , property "background-size" "400%"
                 , property "z-index" "-1"
                 , property "filter" "blur(5px)"
                 , property "width" "calc(100% + 4px)"
                 , property "height" "calc(100% + 4px)"
                 , animationName ( keyframes [ (0, [ custom "background-position" "0 0" ])
                                             , (50, [ custom "background-position" "400% 0" ])
                                             , (100, [ custom "background-position" "0 0" ])
                                             ]
                                 )
                 , animationDuration (sec(30))
                 , property "animation-iteration-count" "infinite"
                 , property "opacity" "0"
                 , property "transition" "opacity .3s ease-in-out"
                 , property "border-radius" "10px"
                 ]
        , active [ property "color" "#fff" ]
        , active [ after [ property "background" "transparent" ] ]
        , hover [ before [ property "opacity" "1" ] ]
        , after [ property "z-index" "-1"
                , property "content" "''"
                , property "position" "absolute"
                , property "width" "100%"
                , property "height" "100%"
                , property "background" "#fff"
                , property "left" "0"
                , property "top" "0"
                , property "border-radius" "10-px"
                ]
        ]

buttonSide : Attribute Msg
buttonSide =
    css [ property "color" "!important"
        , property "text-transform" "uppercase"
        , property "text-decoration" "none"
        , property "background" "#ffffff"
        , property "display" "inline-block"
        , property "cursor" "url(./src/img/cursor.cur),move"
        , animationName (keyframes [(0, [custom "background-color" "#2ba805", custom "box-shadow" "0 0 5px #2ba805"])
                                   ,(50, [custom "background-color" "#49e819", custom "box-shadow" "0 0 20px #49e819"])
                                   ,(100, [custom "background-color" "#2ba805", custom "box-shadow" "0 0 5px #2ba805"])
                                   ])
        , property "animation-iteration-count" "infinite"
        , animationDuration (sec(1.3))
        ]

buttonTop : Attribute Msg
buttonTop =
    css [ property "color" "white"
        , property "text-transform" "uppercase"
        , property "text-decoration" "none"
        , property "background" "#ffffff"
        , property "display" "inline-block"
        , property "cursor" "url(./src/img/cursor.cur),move"
        , animationName (keyframes [(0, [custom "background-color" "#8B0000", custom "box-shadow" "0 0 5px #8B0000"])
                                   ,(50, [custom "background-color" "#B22222", custom "box-shadow" "0 0 20px #B22222"])
                                   ,(100, [custom "background-color" "#8B0000", custom "box-shadow" "0 0 5px #8B0000"])
                                   ])
        , property "animation-iteration-count" "infinite"
        , animationDuration (sec(1.3))
        ]

glowing : Player -> Attribute Msg
glowing player =
    let
        color =
            if player.exist then
                case player.character of
                    Lance ->
                        ("0 0 10px #fff, 0 0 20px #fff, 0 0 30px #DAA520, 0 0 40px #DAA520, 0 0 50px #DAA520, 0 0 60px #DAA520, 0 0 70px #DAA520"
                        ,"0 0 20px #fff, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 50px #FFD700, 0 0 60px #FFD700, 0 0 70px #FFD700, 0 0 80px #FFD700"
                        )
                    Gorman ->
                        ("0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073"
                        ,"0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6"
                        )
                    Doherty ->
                        ("0 0 10px #fff, 0 0 20px #fff, 0 0 30px #000080, 0 0 40px #000080, 0 0 50px #000080, 0 0 60px #000080, 0 0 70px #000080"
                        ,"0 0 20px #fff, 0 0 30px #6495ED, 0 0 40px #6495ED, 0 0 50px #6495ED, 0 0 60px #6495ED, 0 0 70px #6495ED, 0 0 80px #6495ED"
                        )
                    Blair ->
                        ("0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF7F50, 0 0 40px #FF7F50, 0 0 50px #FF7F50, 0 0 60px #FF7F50, 0 0 70px #FF7F50"
                        ,"0 0 20px #fff, 0 0 30px #FFA07A, 0 0 40px #FFA07A, 0 0 50px #FFA07A, 0 0 60px #FFA07A, 0 0 70px #FFA07A, 0 0 80px #FFA07A"
                        )
                    _ ->
                        ("0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF7F50, 0 0 40px #FF7F50, 0 0 50px #FF7F50, 0 0 60px #FF7F50, 0 0 70px #FF7F50"
                        ,"0 0 20px #fff, 0 0 30px #FFA07A, 0 0 40px #FFA07A, 0 0 50px #FFA07A, 0 0 60px #FFA07A, 0 0 70px #FFA07A, 0 0 80px #FFA07A"
                        )
            else
                ("0 0 10px #fff, 0 0 20px #fff, 0 0 30px #8B0000, 0 0 40px #8B0000, 0 0 50px #8B0000, 0 0 60px #8B0000, 0 0 70px #8B0000"
                ,"0 0 20px #fff, 0 0 30px #FF0000, 0 0 40px #FF0000, 0 0 50px #FF0000, 0 0 60px #FF0000, 0 0 70px #FF0000, 0 0 80px #FF0000"
                )
    in
        css [ animationName (keyframes [(0, [custom "text-shadow" (Tuple.first color)])
                                       ,(100, [custom "text-shadow" (Tuple.second color)])
                                       ])
            , animationDuration (sec(1))
            , property "animation-iteration-count" "infinite"
            , property "animation-timing-function" "ease-in-out"
            , property "animation-direction" "alternate"
            ]