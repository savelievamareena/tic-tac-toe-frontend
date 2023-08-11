import React from "react";

export default React.createContext({
    store: [],
    setStore: ()=>{},
    activeUser: 1,
    setActiveUser: ()=>{},
    isLoading: true,
    setIsLoading: ()=>{},
    showBlockingUiSpinner: true,
    setShowBlockingUiSpinner: ()=>{},
    gameStatus: 0,
    setGameStatus: ()=>{},
    firstPlayerId: {},
    ajaxIsRunning: {},
    uidRef: {}
});
