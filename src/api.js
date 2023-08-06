export default {

    url: "https://be3ec052db76.ngrok.app",

    handleMove: function(uid, cellIndex) {
        return fetch(`${this.url}/handle-move?uid=${uid}&cellIndex=${cellIndex}`);
    },
    init: function(uid) {
        return fetch(`${this.url}/init?uid=${uid}`)
            .then(function (response) {
                return response.json()
            })
    },
    checkOtherUser: function (uid) {
        return fetch(`${this.url}/get-stat?uid=${uid}`)
            .then(function (response) {
                return response.json()
            })
    },
    refreshGame: function(uid) {
        return fetch(`${this.url}/refresh-game?uid=${uid}`);
    }
}
