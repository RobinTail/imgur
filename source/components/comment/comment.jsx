var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions.jsx');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var Avatar = require('material-ui/lib/avatar');
var Colors = require('material-ui/lib/styles/colors');
var FontIcon = require('material-ui/lib/font-icon');
require('./comment.scss');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            collapsed: true
        };
    },
    render: function() {
        var rate = (
                    <span className='comment-rate'>
                        <FontIcon
                            className='material-icons'
                        >
                            thumb_up
                        </FontIcon>
                        &nbsp;{this.props.ups}<br />
                        {this.renderChildrenCount()}
                    </span>
        );
        return (
                <Card
                    className='comment'
                    style={{
                        marginLeft: (
                            this.props.depth > 3 ?
                            3 : this.props.depth
                        ) * 50 + 'px',
                        cursor: this.props.childrenCount ? 'pointer' : 'auto'
                    }}
                    onClick={this.toggleCollapse}
                >
                    {rate}
                    <CardHeader
                        title={this.props.author}
                        avatar={<Avatar>{this.props.author[0]}</Avatar>}
                    />
                    <CardText style={{paddingTop: 0}}>
                        <div>{this.props.comment}</div>
                    </CardText>
                </Card>
        );
    },
    renderChildrenCount: function() {
        if (this.props.childrenCount) {
            return (
                <span>
                    <FontIcon
                        className='material-icons'
                    >
                        chat_bubble
                    </FontIcon>
                    &nbsp;{this.props.childrenCount}
                </span>
            );
        } else {
            return null;
        }
    },
    toggleCollapse: function() {
        if (this.state.collapsed) {
            Actions.showChildren(this.props.id);
        } else {
            Actions.hideChildren(this.props.id);
        }
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

});
