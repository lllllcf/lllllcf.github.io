module PopUp exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (style)
import Definition exposing (..)

renderPopUp : Model -> Html Msg
renderPopUp model =
    generalRenderPopUp model model.viewPopUp.backgroundImage model.viewPopUp.title model.viewPopUp.descriptionText model.viewPopUp.buttons

generalRenderPopUp : Model -> String -> String -> String -> List (Html Msg) -> Html Msg
generalRenderPopUp model backgroundImage title descriptionText buttons=
    case model.showPopUp of
        True ->
            div [ style "width" "40%"
                , style "height" "50%"
                , style "left" "30%"
                , style "top" "25%"
                , style "background-image" backgroundImage
                , style "background-size" "100% 100%"
                , style "position" "absolute"
                , style "border-radius" "5px"
                , style "border-width" "1px"
                , style "z-index" "2"
                ]
                (List.append buttons
                [
                div [ style "left" "5%"
                    , style "top" "2%"
                    , style "width" "90%"
                    , style "height" "50%"
                    , style "position" "absolute"
                    ]
                    [
                    h1 [ style "text-align" "center"
                       , style "font-size" "2vw"
                       , style "color" "#fff"
                       ]
                       [ text title],
                    div [ style "left" "5%", style "width" "90%", style "height" "2%", style "background" "gray", style "position" "absolute" ] [],
                    div [ style "left" "5%", style "width" "90%", style "height" "2%", style "background" "gray", style "position" "absolute" ] [],
                    div [ style "height" "0.5%" ] [],
                    p [ style "text-indent" "2em"
                      , style "font-size" "1.2vw"
                      , style "color" "#fff"
                      ]
                      [ text descriptionText ],
                    div [ style "left" "5%", style "width" "90%", style "height" "2%", style "background" "gray", style "position" "absolute" ] [],--hr [ style "width" "2%", style "size" "2px" ] [],--css [ property "border-top" "2% solid #708090", property "border-bottom" "0px" ] ] [],
                    div [ style "left" "5%", style "width" "90%", style "height" "2%", style "background" "gray", style "position" "absolute" ] []--hr [ style "width" "2%", style "size" "2px" ] []--css [ property "border-top" "2% solid #708090", property "border-bottom" "0px" ] ] []
                    ]
                ]
                )
        False ->
            div [] []

