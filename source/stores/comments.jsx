var Reflux = require('reflux');
var Actions = require('../actions.jsx');
var Api = require('../api.jsx');

module.exports = Reflux.createStore({
    listenables: [Actions],
    comments: [],
    getImage: function(id) {
        Api.get('gallery/' + id + '/comments').
            then(function(json) {
                this.comments = [];
                this.fillRecursive(json.data);
                this.triggerUpdate();
            }.bind(this));
    },
    fillRecursive: function(comments, depth=0) {
        _.forEach(comments, function(comment) {
            // fill the children quantity
            comment.childrenCount =
                (comment.children ? comment.children.length : 0);
            // fill the depth
            comment.depth = depth;
            // fill initial show state
            comment.show = (depth ? false : true);
            // save the copy of comment without children (flatten)
            this.comments.push(_.omit(comment, 'children'));
            // recursion
            this.fillRecursive(comment.children, depth + 1);
        }.bind(this));
    },
    showChildren: function(id) {
        _.forEach(
            _.filter(this.comments, {'parent_id': id}),
            function(comment) {
                comment.show = true;
            });
        this.triggerUpdate();
    },
    hideChildren: function(id) {
        function hideRecursive(vault, id) {
            _.forEach(
                _.filter(vault, {'parent_id': id}),
                function(comment) {
                    comment.show = false;
                    hideRecursive(vault, comment.id);
                });
        }
        hideRecursive(this.comments, id);
        this.triggerUpdate();
    },
    triggerUpdate: function() {
        this.trigger('change', this.comments);
    }
});