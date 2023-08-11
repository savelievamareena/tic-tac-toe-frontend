import React from "react";
import api from "../api";
import AppContext from "../contexts/AppContext";

export default function useInit() {
    const {setStore, uidRef, firstPlayerId, ajaxIsRunning, setShowBlockingUiSpinner} = React.useContext(AppContext);

    React.useEffect(function() {
        const urlParams = new URLSearchParams(window.location.search);
        uidRef.current = parseInt(urlParams.get('uid'));

        api.init(uidRef.current).then(function(result) {
            firstPlayerId.current = result.firstPlayerId;
            setStore(result.store);
        }).catch(function() {
            console.log("Not allowed to move");
        }).finally(function() {
            ajaxIsRunning.current = false;
            setShowBlockingUiSpinner(false);
        })
    }, [])
}