var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var List = require('material-ui/lib/lists/list');
require("./animated-list.scss");

module.exports = React.createClass({
    render: function() {
        return <ReactCSSTransitionGroup
            component={List}
            className="animated-list"
            transitionName="animation"
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionLeave={true}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}>
                {this.props.children}
        </ReactCSSTransitionGroup>
    }
});
