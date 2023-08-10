import React from "react";

export default function MoveNotificationComponent(props) {

    return(
        <div className="dialogue">
            {(props.isUserActive && props.isGameInProgress) ? <span>Your Move</span> : <span>Move Forbidden</span>}
        </div>
    )
}