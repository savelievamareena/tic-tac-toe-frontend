import React from "react";
import './App.css';
import SquareComponent from "./SquareComponent";
import api from "./api";
import calculateActiveUser from "./utils/calculateActiveUser.js";
import checkWin from "./utils/checkWin.js";
import TitleComponent from "./TitleComponent";
import MoveNotificationComponent from "./MoveNotificationComponent";

function App() {
    const combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    const uidRef = React.useRef(0);
    let uid = uidRef.current;
    const ajaxIsRunning= React.useRef(true);
    const firstPlayerId= React.useRef(1);

    const [gameStatus, setGameStatus] = React.useState(0);
    const [showBlockingUiSpinner, setShowBlockingUiSpinner] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [store, setStore] = React.useState([]);
    const [activeUser, setActiveUser] = React.useState(1);

    function handleRefreshGame() {
        setShowBlockingUiSpinner(true);
        api.refreshGame(uid).catch(function() {
            console.log("reset game failed")
        }).finally(function() {
            setShowBlockingUiSpinner(false);
        })
    }

    function checkIsFilled(squareIndex) {
        return store[squareIndex] !== 0;
    }

    function handleMove(cellIndex, e) {
        let skip = (gameStatus !== 0) || checkIsFilled(cellIndex) || (uid !== activeUser);
        if(skip) { return; }

        setShowBlockingUiSpinner(true);
        api.handleMove(uid, cellIndex).catch(function () {
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

    // init
    React.useEffect(function() {
        const urlParams = new URLSearchParams(window.location.search);
        uid = uidRef.current = parseInt(urlParams.get('uid'));

        api.init(uid).then(function(result) {
            firstPlayerId.current = result.firstPlayerId;
            setStore(result.store);
        }).catch(function() {
            console.log("Not allowed to move");
        }).finally(function() {
            ajaxIsRunning.current = false;
            setShowBlockingUiSpinner(false);
        })
    }, [])

    // polling interval
    React.useEffect(function() {
        let intervalId = window.setInterval(function() {
            if(ajaxIsRunning.current) { return }

            ajaxIsRunning.current = true;
            setIsLoading(true)
            api.checkOtherUser(uid).then(function(result) {
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

    //set active user and check win
    React.useEffect(function() {
        if(store.length < 1) {
            return
        }
        let activeUser = calculateActiveUser(store, firstPlayerId.current);
        setActiveUser(activeUser);
        checkWin(combinations, store, setGameStatus);
    }, [store])

    return (
        <div className="App">
            <TitleComponent status={gameStatus} />

            <div className="game-field">
                {createSquaresWithArrayFrom()}
            </div>

            <div>
                {gameStatus !== 0 &&
                    <button type="button" className="button" onClick={handleRefreshGame}>Start game</button>
                }
            </div>

            <MoveNotificationComponent isUserActive={activeUser === uid} isGameInProgress={gameStatus === 0} />

            {showBlockingUiSpinner && <div className="loading">Loading&#8230;</div>}
            <div style={{minHeight: 50}}>{isLoading && "Refreshing..."}</div>
        </div>
    );
}

export default App;
