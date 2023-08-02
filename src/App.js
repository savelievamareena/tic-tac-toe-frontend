import React from "react";
import './App.css';
import Square from "./Square";
import api from "./api";

const urlParams = new URLSearchParams(window.location.search);
const uid = parseInt(urlParams.get('uid'));

function App() {
    const combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const [gameStat, setGameStat] = React.useState({
        activeUser: 1,
        status: 0,
        store: Array(9).fill(0),
        showSpinner: true
    })

    function handleResetGame() {
        setGameStat({
            activeUser: 1,
            status: 0,
            store: Array(9).fill(0)
        })
    }

    function checkWin() {
        let winnerId = undefined;

        for(let i= 0; i < combinations.length; i++) {
            let combination = combinations[i];
            if(gameStat.store[combination[0]] !== 0
                && gameStat.store[combination[0]] === gameStat.store[combination[1]]
                && gameStat.store[combination[1]] === gameStat.store[combination[2]]
            ) {
                winnerId = gameStat.store[combination[0]];
                break;
            }
        }

        if(winnerId !== undefined) {
            setGameStat(ps => ({...ps, status: winnerId}))
        }else if(gameStat.store.includes(0) === false) {
            setGameStat(ps => ({...ps, status: 3}))
        }
    }

    function checkIsFilled(squareIndex) {
        return gameStat.store[squareIndex] !== 0;
    }

    function handleMove(cellIndex, e) {
        let skip = (gameStat.status !== 0) || checkIsFilled(cellIndex) || (id !== gameStat.activeUser);
        if(skip) { return; }

        setGameStat(ps => ({...ps, showSpinner: false}))
        api.handleMove(uid, cellIndex).then(function (result) {
            setGameStat(prevState => {
                prevState.store[cellIndex] = prevState.activeUser;
                return {
                    ...prevState,
                    activeUser: result.activeUser,
                    store: [...prevState.store]
                }
            })
        }).catch(function () {
            console.log("Move forbidden from backend");
        }).finally(function() {
            setGameStat(ps => ({...ps, showSpinner: false}))
        })
    }

    function createSquaresWithForLoop() {
        let rowsArr = [];
        let squareIndex = 0;
        for(let i = 0; i < 3; i++) {
            let squaresArr = [];
            for (let j = 0; j < 3; j++) {
                squaresArr.push(<div className="square" key={j}
                                     onClick={handleMove.bind(undefined, squareIndex)}></div>)
                squareIndex++;
            }
            rowsArr.push(<div className="row" key={i}>{squaresArr}</div>)
        }
        return rowsArr;
    }

    function createSquaresWithArrayFrom() {
        let squareIndex = -1;
        return Array.from({length: 3}, (v, i) => (
            <div className="row" key={i}>{
                Array.from({length: 3}, (v, j) => {
                    squareIndex++;

                    return <Square
                        state={gameStat.store[squareIndex]}
                        key={j}
                        handleMove={handleMove}
                        squareIndex={squareIndex}
                    />
                })
            }</div>
        ));
    }

    React.useEffect(function() {
        api.init(uid).then(function(result) {
            console.log("resolved")
            setGameStat(ps => {
                return {
                    ...ps,
                    activeUser: result.activeUser
                }
            })
            setGameStat(ps => ({...ps, showSpinner: false}))
        }).catch(function() {
            console.log("Not allowed to move")
        })
    }, [])

    React.useEffect(checkWin, [gameStat.store])

    console.log(uid)
    console.log(gameStat.activeUser)
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
                    <button type="button" className="button" onClick={handleResetGame}>Start game</button>}
            </div>
            <div className="dialogue">
                {gameStat.activeUser === uid ? <span>Your Move</span> : <span>Move Forbidden</span>}
            </div>
            {gameStat.showSpinner && <div className="loading">Loading&#8230;</div>}
        </div>
    );
}

export default App;