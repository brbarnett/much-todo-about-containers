const axios = require('axios');
const service = httpService();

const apiUrl = process.env.API_URL;
console.log(apiUrl);

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
            console.log('getting all todos');
            axios
                .get(process.env.API_URL)
                .then(resp => {
                    resolve(resp.data);
                })
        });
    }

    function save(todos) {
        return new Promise(function (resolve, reject) {
            console.log('getting all todos');
            axios
                .post(process.env.API_URL, todos)
                .then(resp => {
                    resolve(null);
                })
        });
    }
}

function mockService() {
    let data = [{ "id": 1, "title": "this one", "completed": false }, { "id": 2, "title": "that one", "completed": false }, { "id": 3, "title": "another", "completed": false }, { "id": 4, "title": "here", "completed": false }];

    return {
        getAll: getAll,
        save: save
    };

    function getAll() {
        return new Promise(function (resolve, reject) {
            console.log('getting all todos');
            setTimeout(resolve, 100, data);
        });
    }

    function save(todos) {
        return new Promise(function (resolve, reject) {
            data = todos;
            console.log('set todos to' + JSON.stringify(todos));

            setTimeout(resolve, 100, null);
        })
    }
}