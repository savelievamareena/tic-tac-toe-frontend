export default {
    url: "https://b1f6ed60061f.ngrok.app",

    handleMove: function(uid, cellIndex) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/handlemove?uid=${uid}&cellIndex=${cellIndex}`)
                .then(function (response) {
                    return response.json()
                })
                .then(
                    (result) => {
                        resolve(result)
                    },
                    (error) => {
                        console.log(error)
                        reject();
                    }
                )
        });
    },
    init: function(uid) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/init?uid=${uid}`)
                .then(function (response) {
                    return response.json()
                })
                .then(
                    (result) => {
                        resolve(result)
                    },
                    (error) => {
                        console.log(error)
                        reject();
                    }
                )
        });
    },
    checkOtherUser: function () {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/getStat`)
                .then(function (response) {
                    return response.json()
                })
                .then(
                    (result) => {
                        resolve(result)
                    },
                    (error) => {
                        console.log(error)
                        reject();
                    }
                )
        });
    }
}