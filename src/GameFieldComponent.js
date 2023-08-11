import React from "react";
import SquareComponent from "./SquareComponent";
import api from "./api";
import AppContext from "./contexts/AppContext";

export default function GameFieldComponent() {
    const {store, gameStatus, uidRef, activeUser, setShowBlockingUiSpinner} = React.useContext(AppContext);

    function checkIsFilled(squareIndex) {
        return store[squareIndex] !== 0;
    }

    function handleMove(cellIndex, e) {
        let skip = (gameStatus !== 0) || checkIsFilled(cellIndex) || (uidRef.current !== activeUser);
        if(skip) { return; }

        setShowBlockingUiSpinner(true);
        api.handleMove(uidRef.current, cellIndex).catch(function () {
            console.log("Move forbidden from backend");
        }).finally(function() {
            setShowBlockingUiSpinner(false);
        })
    }
    function createSquaresWithArrayFrom() {
        let squareIndex = -1;
        return Array.from({length: 3}, (v, i) => (
            <div className="row" key={i}>{
                Array.from({length: 3}, (v, j) => {
                    squareIndex++;
                    return <SquareComponent
                        state={store[squareIndex]}
                        key={j}
                        handleMove={handleMove}
                        squareIndex={squareIndex}
                    />
                })
            }</div>
        ));
    }

    return(
        <div className="game-field">
            {createSquaresWithArrayFrom()}
        </div>
    )
}