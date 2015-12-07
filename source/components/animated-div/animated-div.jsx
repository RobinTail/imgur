var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('./animated-div.scss');

module.exports = React.createClass({
    render: function() {
        return (
            <ReactCSSTransitionGroup
                component='div'
                className='animated-div'
                transitionName='animation'
                transitionEnter={true}
                transitionEnterTimeout={500}
                transitionLeave={true}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
                {this.props.children}
            </ReactCSSTransitionGroup>
        );
    }
});
