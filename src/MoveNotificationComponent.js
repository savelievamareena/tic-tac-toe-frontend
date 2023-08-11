import React from "react";
import AppContext from "./contexts/AppContext";

export default function MoveNotificationComponent(props) {
    const {activeUser, uidRef, gameStatus} = React.useContext(AppContext);

    return(
        <div className="dialogue">
            {(activeUser === uidRef.current && gameStatus === 0) ? <span>Your Move</span> : <span>Move Forbidden</span>}
        </div>
    )
}