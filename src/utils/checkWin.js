export default function checkWin(combinations, store, setGameStat) {
    let winnerId = undefined;

    for(let i= 0; i < combinations.length; i++) {
        let combination = combinations[i];
        if(store[combination[0]] !== 0
            && store[combination[0]] === store[combination[1]]
            && store[combination[1]] === store[combination[2]]
        ) {
            winnerId = store[combination[0]];
            break;
        }
    }

    let winnerStatus = 0;

    if(winnerId !== undefined) {
        winnerStatus = winnerId;
    }else if(store.includes(0) === false) {
        winnerStatus = 3;
    }

    setGameStat(ps => ({...ps, status: winnerStatus}))
}