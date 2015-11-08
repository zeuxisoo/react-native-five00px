var queryString = require('query-string');

var DataService = function() {
    this.url          = 'https://api.500px.com/v1/';
    this.consumer_key = 'FJMbDPhcIxlx6srYLknTbdOIJRNRVkgOPiM80nMj';
};

DataService.prototype.query = function(url, parameter) {
    var apiUrl = url + '?' + queryString.stringify(parameter);

    return fetch(apiUrl);
};

DataService.prototype.fetchPhotos = function(page) {
    var endpoint = this.url + '/photos';

    return this.query(endpoint, {
        consumer_key: this.consumer_key,
        page        : page,
        image_size  : 21
    }).then(function(response) {
        return response.json()
    });
};

DataService.prototype.fetchBlogs = function(page) {
    var endpoint = this.url + '/blogs';

    return this.query(endpoint, {
        consumer_key: this.consumer_key,
        page        : page
    }).then(function(response) {
        return response.json()
    });
};

DataService.prototype.fetchBlogPost = function(id) {
    var endpoint = this.url + '/blogs/' + id;

    return this.query(endpoint, {
        consumer_key: this.consumer_key
    }).then(function(response) {
        return response.json()
    });
};

DataService.prototype.fetchUsers = function(page, term) {
    var endpoint = this.url + '/users/search';

    return this.query(endpoint, {
        consumer_key: this.consumer_key,
        term        : term,
        page        : page
    }).then(function(response) {
        return response.json()
    });
};

module.exports = new DataService;
