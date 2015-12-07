var React = require('react');
var Reflux = require('reflux');
var Store = require('../stores/topics.jsx');
var Actions = require('../actions.jsx');
var Router = require('react-router');
var AnimatedList = require('./animated-list/animated-list.jsx');
var ListItem = require('material-ui/lib/lists/list-item');
var Loading = require('./loading.jsx');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(Store, 'onChange'),
        Router.History
    ],
    getInitialState: function() {
        return {
            isLoaded: false,
            topics: []
        };
    },
    componentWillMount: function() {
        Actions.getTopics();
    },
    render: function() {
        return (
            <AnimatedList>
                {this.renderTopics()}
            </AnimatedList>
        );
    },
    renderTopics: function() {
        if (this.state.isLoaded) {
            if (this.state.topics.length) {
                return this.state.topics.map(function(topic) {
                    return (
                        <ListItem
                            onClick={this.handleClick.bind(null, topic.id)}
                            key={topic.id}
                            primaryText={topic.name}
                            secondaryText={topic.description}
                        />
                    );
                }.bind(this));
            } else {
                return (
                    <ListItem
                        primaryText='Nothing to show'
                        secondaryText='Maybe something went wrong'
                    />
                );

            }
        } else {
            return <Loading />;
        }
    },
    onChange: function(event, data) {
        this.setState({
            isLoaded: true,
            topics: data
        });
    },
    handleClick: function(id) {
        this.history.pushState(null, '/topics/' + id);
    }
});
