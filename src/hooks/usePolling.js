import React from "react";
import api from "../api";
import AppContext from "../contexts/AppContext";

export default function usePolling() {
    const {setStore, firstPlayerId, uidRef, setIsLoading, ajaxIsRunning} = React.useContext(AppContext);

    React.useEffect(function() {
        let intervalId = window.setInterval(function() {
            if(ajaxIsRunning.current) { return }

            ajaxIsRunning.current = true;
            setIsLoading(true);

            api.checkOtherUser(uidRef.current).then(function(result) {
                firstPlayerId.current = result.firstPlayerId;
                setStore(result.store);
            }).catch(function() {
                console.log("error checking other user");
            }).finally(function() {
                ajaxIsRunning.current = false;
                setIsLoading(false)
            })
        }, 1000)
        return function() {
            window.clearInterval(intervalId);
        }
    }, [])
}