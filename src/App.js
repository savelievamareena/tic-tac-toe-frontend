import React from "react";
import './App.css';
import Square from "./Square";
import api from "./api";
import calculateActiveUser from "./utils/calculateActiveUser.js";
import checkWin from "./utils/checkWin.js";

function App() {
    const combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    const uidRef = React.useRef(0);
    let uid = uidRef.current;
    const ajaxIsRunning= React.useRef(true);
    const firstPlayerId= React.useRef(1);

    const [gameStat, setGameStat] = React.useState({
        status: 0,
        showBlockingUiSpinner: true
    })
    const [isLoading, setIsLoading] = React.useState(true);
    const [store, setStore] = React.useState([]);
    const [activeUser, setActiveUser] = React.useState(1);

    function handleRefreshGame() {
        setGameStat(ps => ({...ps, showBlockingUiSpinner: true}));
        api.refreshGame(uid).catch(function() {
            console.log("reset game failed")
        }).finally(function() {
            setGameStat(ps => ({...ps, showBlockingUiSpinner: false}));
        })
    }

    function checkIsFilled(squareIndex) {
        return store[squareIndex] !== 0;
    }

    function handleMove(cellIndex, e) {
        let skip = (gameStat.status !== 0) || checkIsFilled(cellIndex) || (uid !== activeUser);
        if(skip) { return; }

        setGameStat(ps => ({...ps, showBlockingUiSpinner: true}))
        api.handleMove(uid, cellIndex).catch(function () {
            console.log("Move forbidden from backend");
        }).finally(function() {
            setGameStat(ps => ({...ps, showBlockingUiSpinner: false}))
        })
    }

    function createSquaresWithArrayFrom() {
        let squareIndex = -1;
        return Array.from({length: 3}, (v, i) => (
            <div className="row" key={i}>{
                Array.from({length: 3}, (v, j) => {
                    squareIndex++;

                    return <Square
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
            setGameStat(ps => ({...ps, showBlockingUiSpinner: false}))
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

    React.useEffect(function() {
        if(store.length < 1) {
            return
        }
        let activeUser = calculateActiveUser(store, firstPlayerId.current);
        setActiveUser(activeUser);
        checkWin(combinations, store, setGameStat);
    }, [store])

    return (
        <div className="App">
            <div className="title-field">
                <h1 id="title">{(gameStat.status === 1 && "USER 1 WIN!!!")
                    || (gameStat.status === 2 && "USER 2 WIN!!!")
                    || (gameStat.status === 0 && "Let's go")
                    || (gameStat.status === 3 && "DRAW")
                }</h1>
            </div>

            <div className="game-field">
                {createSquaresWithArrayFrom()}
            </div>

            <div>
                {gameStat.status !== 0 &&
                    <button type="button" className="button" onClick={handleRefreshGame}>Start game</button>
                }
            </div>
            <div className="dialogue">
                {activeUser === uid && gameStat.status === 0 ? <span>Your Move</span> : <span>Move Forbidden</span>}
            </div>
            {gameStat.showBlockingUiSpinner && <div className="loading">Loading&#8230;</div>}
            <div>{isLoading && "Refreshing..."}</div>
        </div>
    );
}

export default App;
