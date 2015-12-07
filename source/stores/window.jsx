var Reflux = require('reflux');
var Actions = require('../actions.jsx');

const sizeSettings = {
    xs: {min: 0,       max: 768},
    sm: {min: 769,     max: 992},
    md: {min: 993,     max: 1200},
    lg: {min: 1201,    max: 1920},
    xl: {min: 1921,    max: 4 * 1920}
};
const sizeKeys = Object.keys(sizeSettings);

module.exports = Reflux.createStore({
    size: sizeKeys[2], // md
    listenables: [Actions],
    init: function() {
        window.addEventListener('resize', this.getWindowSize);
    },
    getWindowSize: function() {
        for (var i = 0; i < sizeKeys.length; i++) {
            var test = sizeSettings[ sizeKeys[i] ];
            if (
                window.innerWidth >= test.min &&
                window.innerWidth <= test.max
            ) {
                if (this.size != sizeKeys[i]) {
                    this.size = sizeKeys[i];
                    this.triggerChange();
                }
            }
        }
    },
    triggerChange: function() {
        this.trigger('change', this.size);
    }
});
