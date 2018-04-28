const axios = require('axios');
const service = mockService();

module.exports = todoStorage = {
    fetch: service.getAll,
    save: service.save
};

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