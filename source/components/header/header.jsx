var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Actions = require('../../actions.jsx');
var TopicStore = require('../../stores/topics.jsx');
var AppBar = require('material-ui/lib/app-bar');
var IconMenu = require('material-ui/lib/menus/icon-menu');
var IconButton = require('material-ui/lib/icon-button');
var MenuItem = require('material-ui/lib/menus/menu-item');
var FontIcon = require('material-ui/lib/font-icon');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange'),
        Router.History
    ],
    getInitialState: function() {
        return {
            topics: []
        };
    },
    componentWillMount: function() {
        Actions.getTopics();
    },
    render: function() {
        return (
            <AppBar
                style={{marginBottom: 10}}
                title='ImgUr'
                iconElementLeft={
                    <IconButton onClick={this.handleHomeClick}>
                        <FontIcon className='material-icons'>home</FontIcon>
                    </IconButton>
                }
                iconElementRight={
                    <IconMenu iconButtonElement={
                        <IconButton>
                            <FontIcon className='material-icons'>menu</FontIcon>
                        </IconButton>
                    }>
                        {this.renderTopics()}
                    </IconMenu>
                }
            />
        );
    },
    onChange: function(event, data) {
        this.setState({
            topics: data
        });
    },
    renderTopics: function() {
        if (this.state.topics.length) {
            return this.state.topics.map(function(topic) {
                return (
                    <MenuItem
                        key={topic.id}
                        primaryText={topic.name}
                        onClick={this.handleTopicClick.bind(null, topic.id)}
                    />
                );
            }.bind(this));
        } else {
            return <MenuItem primaryText='Nothing to show' />;
        }
    },
    handleHomeClick: function() {
        this.history.pushState(null, '/');
    },
    handleTopicClick: function(id) {
        this.history.pushState(null, '/topics/' + id);
    }
});