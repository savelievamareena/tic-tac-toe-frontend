import React from "react";
import './App.css';
import TitleComponent from "./TitleComponent";
import MoveNotificationComponent from "./MoveNotificationComponent";
import usePolling from "./hooks/usePolling";
import useInit from "./hooks/useInit";
import useCheckWin from "./hooks/useCheckWin";
import GameFieldComponent from "./GameFieldComponent";
import ButtonComponent from "./ButtonComponent";
import AppContext from "./contexts/AppContext";

function ContentComponent() {
    const {showBlockingUiSpinner, isLoading} = React.useContext(AppContext);

    useInit();
    usePolling()
    useCheckWin()

    return (
        <>
            <TitleComponent />
            <GameFieldComponent />
            <ButtonComponent />
            <MoveNotificationComponent />

            {showBlockingUiSpinner && <div className="loading">Loading&#8230;</div>}
            <div style={{minHeight: 50}}>{isLoading && "Refreshing..."}</div>
        </>
    );
}

export default ContentComponent;
