export default function calculateActiveUser(store, firstPlayerId){
    let activeUser = firstPlayerId;

    let movesCount = store.filter((element) => element > 0);
    if(movesCount.length % 2 !== 0) {
        activeUser = 1+(2-firstPlayerId);
    }
    return activeUser;
}