var React = require('react');
var Router = require('react-router');
var Button = require('material-ui/lib/raised-button');
var GridTile = require('material-ui/lib/grid-list/grid-tile');
var ActionFavorite = require('material-ui/lib/svg-icons/action/favorite');
var IconButton = require('material-ui/lib/icon-button');
var Colors = require('material-ui/lib/styles/colors');
var PlayCircleOutline =
    require('material-ui/lib/svg-icons/av/play-circle-outline');
require('./preview.scss');

module.exports = React.createClass({
    mixins: [
        Router.History
    ],
    getInitialState: function() {
        return {
            hover: false
        };
    },
    render: function() {
        return <GridTile
                className='grid-tile'
                title={this.props.title || ' '}
                subtitle={this.props.description || ' '}
                titlePosition='bottom'
                cols={1}
                rows={1}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
                >
                    {
                        this.props.animated && this.state.hover ?
                        this.renderVideo() : this.renderImage()
                    }
                    {
                        this.props.animated && !this.state.hover ?
                        this.playIcon() : null
                    }
                </GridTile>;
    },
    playIcon: function() {
        return <PlayCircleOutline color={Colors.lightWhite} />;
    },
    renderImage: function() {
        return <img src={'http://i.imgur.com/' + this.props.id + 'h.jpg'} />;
    },
    renderVideo: function() {
        return (
            <video
                preload='auto'
                autoPlay='autoplay'
                loop='loop'
                webkit-playsinline
            >
                <source type='video/mp4' src={this.props.mp4}></source>
            </video>
        );
    },
    handleMouseEnter: function() {
        this.setState({
            hover: true
        });
    },
    handleMouseLeave: function() {
        this.setState({
            hover: false
        });
    },
    handleClick: function() {
        this.history.pushState(null, '/images/' + this.props.id);
    }
});
