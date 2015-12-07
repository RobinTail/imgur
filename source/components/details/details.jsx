var React = require('react');
var Reflux = require('reflux');
var GalleryStore = require('../../stores/gallery.jsx');
var CommentsStore = require('../../stores/comments.jsx');
var Actions = require('../../actions.jsx');
var CommentsList = require('./../comments-list.jsx');
var Loading = require('../loading.jsx');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardMedia = require('material-ui/lib/card/card-media');
var CardText = require('material-ui/lib/card/card-text');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');

require('./details.scss');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(GalleryStore, 'onChange'),
        Reflux.listenTo(CommentsStore, 'onChange')
    ],
    getInitialState: function() {
        return {
            image: null,
            comments: null
        };
    },
    componentWillMount: function() {
        Actions.getImage(this.props.params.id);
    },
    render: function() {
        if (this.state.image) {
            return this.renderContent();
        } else {
            return <Loading />;
        }
    },
    renderContent: function() {
        var info =  <div className='details-stats'>
                        <FontIcon className='material-icons'>
                            thumb_up
                        </FontIcon>
                        &nbsp;{this.state.image.ups}
                        &nbsp;&nbsp;&nbsp;
                        <FontIcon className='material-icons'>
                            thumb_down
                        </FontIcon>
                        &nbsp;{this.state.image.downs}
                    </div>;
        return (
            <div>
                <Card>
                    <CardHeader
                        title={this.state.image.title}
// jscs:disable maximumLineLength
                        subtitle={this.state.image.account_url} // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                        avatar={<Avatar>{this.state.image.account_url[0]}</Avatar>} // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
// jscs:enable maximumLineLength
                    />
                    <CardMedia>
                        {this.renderImage()}
                    </CardMedia>
                    <CardText>
                        {info}
                        <p>{this.state.image.description}</p>
                    </CardText>
                </Card>
                <h3>Comments</h3>
                {this.renderComments()}
            </div>
        );
    },
    renderComments: function() {
        if (this.state.comments) {
            return <CommentsList comments={this.state.comments} />;
        } else {
            return <Loading />;
        }
    },
    renderImage: function() {
        if (this.state.image.animated) {
            return (
                <video
                    preload='auto'
                    autoPlay='autoplay'
                    loop='loop'
                    webkit-playsinline
                >
                    <source
                        type='video/mp4'
                        src={this.state.image.mp4}
                    >
                    </source>
                </video>
            );
        } else {
            return <img src={this.state.image.link} />;
        }
    },
    onChange: function() {
        this.setState({
            image: GalleryStore.find(this.props.params.id),
            comments: CommentsStore.comments
        });
    }
});