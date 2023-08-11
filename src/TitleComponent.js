import React from "react";
import AppContext from "./contexts/AppContext";

export default function TitleComponent(props) {
    const {gameStatus} = React.useContext(AppContext);

    return(
        <div className="title-field">
            <h1 id="title">{(gameStatus === 1 && "USER 1 WIN!!!") || (gameStatus === 2 && "USER 2 WIN!!!")
                || (gameStatus === 0 && "Let's go") || (gameStatus === 3 && "DRAW")
            }</h1>
        </div>
    )
}
