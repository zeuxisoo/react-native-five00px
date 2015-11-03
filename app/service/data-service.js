var queryString = require('query-string');

var DataService = function() {
    this.url          = 'https://api.500px.com/v1/';
    this.consumer_key = 'FJMbDPhcIxlx6srYLknTbdOIJRNRVkgOPiM80nMj';
};

DataService.prototype.query = function(url, parameter) {
    var apiUrl = url + '?' + queryString.stringify(parameter);

    return fetch(apiUrl);
};

DataService.prototype.fetchPhotos = function() {
    var endpoint = this.url + '/photos';

    return this.query(endpoint, {
        consumer_key: this.consumer_key,
        image_size  : 21
    }).then(function(response) {
        return response.json()
    });
};

module.exports = new DataService;
