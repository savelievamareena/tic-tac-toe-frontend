import React from "react";
import calculateActiveUser from "../utils/calculateActiveUser";
import checkWin from "../utils/checkWin";
import AppContext from "../contexts/AppContext";

export default function useCheckWin() {
    const {store, firstPlayerId, setActiveUser, setGameStatus} = React.useContext(AppContext);

    React.useEffect(function() {
        if(store.length < 1) {
            return
        }
        let activeUser = calculateActiveUser(store, firstPlayerId.current);
        setActiveUser(activeUser);
        checkWin(store, setGameStatus);
    }, [store])
}