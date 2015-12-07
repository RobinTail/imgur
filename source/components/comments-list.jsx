var React = require('react');
var Comment = require('./comment/comment.jsx');
var AnimatedDiv = require('./animated-div/animated-div.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <AnimatedDiv>
            {this.renderComments()}
            </AnimatedDiv>
        );

    },
    renderComments: function() {
        return this.props.comments
            .filter(function(comment) {
                return comment.show;
            }).map(function(comment) {
                return <Comment {...comment} key={comment.id} />;
            });
    }
});
