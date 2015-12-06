var React = require('react');
var Reflux = require('reflux');
var GalleryStore = require('../stores/gallery.jsx');
var WindowStore = require('../stores/window.jsx');
var Actions = require('../actions.jsx');
var GridList = require('material-ui/lib/grid-list/grid-list');
var Preview = require('./preview/preview.jsx');

module.exports =  React.createClass({
    mixins: [
        Reflux.listenTo(GalleryStore, 'onChange'),
        Reflux.listenTo(WindowStore, 'onChange')
    ],
    getInitialState: function() {
        return {
            images: [],
            columns: 3
        }
    },
    componentWillMount: function() {
        Actions.getGallery(this.props.params.id);
        Actions.getWindowSize();
    },
    componentWillReceiveProps: function(nextProps) {
        Actions.getGallery(nextProps.params.id);
    },
    render: function(){
        return      <GridList
                    cols={this.state.columns}
                    cellHeight={400}>
                        {this.renderImages()}
                    </GridList>
    },
    renderImages: function(){
        return this.state.images.map(function(image){
           return <Preview key={image.id} {...image} />

        });
    },
    onChange: function() {
        var columns = this.state.columns;
        switch(WindowStore.size){
            case "xs": columns = 1; break;
            case "sm": columns = 2; break;
            case "md": columns = 3; break;
            case "lg": columns = 4; break;
            case "xl": columns = 8; break;
        }
        this.setState({
            images: GalleryStore.gallery,
            columns: columns
        });
    }
});
