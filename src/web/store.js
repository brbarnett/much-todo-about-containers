const axios = require('axios');
const service = httpService();

const apiUrl = '/api/';
console.log('API:', apiUrl);

module.exports = todoStorage = {
    fetch: service.getAll,
    save: service.save
};

function httpService() {
    return {
        getAll: getAll,
        save: save
    };

    function getAll() {
        return new Promise(function (resolve, reject) {
            axios
                .get(apiUrl)
                .then(resp => {
                    resolve(resp.data);
                })
        });
    }

    function save(todos) {
        return new Promise(function (resolve, reject) {
            axios
                .post(apiUrl, todos)
                .then(resp => {
                    resolve(null);
                })
        });
    }
}