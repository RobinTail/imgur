var React = require('react');
var ReactDOM = require('react-dom');
var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/';
var Settings = require('./settings.jsx');
var Actions = require('./actions.jsx');

module.exports = window.api = {
    get: function(url) {
        return fetch(rootUrl + url, {
            headers: {
                'Authorization': 'Client-ID ' + Settings.apiKey
            }
        })
        .then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                var error = new Error(res.statusText);
                error.res = res;
                throw error;
            }
        })
        .then(function(res) {
            return res.json();
        })
        .catch(function(e) {
            //alert("Fetch error: " + e.message);
            Actions.updateModal('Api error', 'Fetch failed: ' + e.message);
            console.log(e);
            return {data: []};
        });
    }
};
