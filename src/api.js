export default {
    url: "https://a24e2d6cb46d.ngrok.app/",

    handleMove: function(uid, cellIndex) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}handlemove?uid=${uid}&cellIndex=${cellIndex}`)
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
            fetch(`${this.url}init?uid=${uid}`)
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