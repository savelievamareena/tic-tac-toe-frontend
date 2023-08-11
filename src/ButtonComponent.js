import React from "react";
import api from "./api";
import AppContext from "./contexts/AppContext";

export default function ButtonComponent() {
    const {setShowBlockingUiSpinner, uidRef, gameStatus} = React.useContext(AppContext);

    function handleRefreshGame() {
        setShowBlockingUiSpinner(true);
        api.refreshGame(uidRef.current).catch(function() {
            console.log("reset game failed")
        }).finally(function() {
            setShowBlockingUiSpinner(false);
        })
    }

    return(
        <div>
            {gameStatus !== 0 &&
                <button type="button" className="button" onClick={handleRefreshGame}>Start game</button>
            }
        </div>
    )
}