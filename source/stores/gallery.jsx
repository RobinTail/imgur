var Api = require('../api.jsx');
var Reflux = require('reflux');
var Actions = require('../actions.jsx');
var _ = require('lodash');

module.exports = Reflux.createStore({
    listenables: [Actions],
    gallery: [],
    getGallery: function(id){
        return Api.get('topics/' + id)
            .then(function(json){
                this.gallery = _.reject(json.data, function(image) {
                    return image.is_album
                });
                this.triggerChange();
            }.bind(this));
    },
    getImage: function(id)
    {
        return Api.get('gallery/image/' + id)
            .then(function(json){
                if (this.images){
                    this.images.push(json.data);
                } else {
                    this.images = [json.data]
                }
                this.triggerChange();
            }.bind(this));
    },
    find: function(id){
        var image = _.findWhere(this.images, {id: id});
        if (image) {
            return image;
        } else {
            this.getImage(id);
            return null;
        }
    },
    triggerChange: function() {
        this.trigger('change', this.gallery);
    }
});