var React = require('react');
var ReactRouter = require('react-router');
import createHistory from 'history/lib/createBrowserHistory';

var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var Main = require('./components/main.jsx');
var Gallery = require('./components/gallery.jsx');
var Details = require('./components/details/details.jsx');

module.exports = (
    <Router history={createHistory()}>
        <Route path='/' component={Main}>
            <Route path='topics/:id' component={Gallery} />
            <Route path='images/:id' component={Details} />
        </Route>
    </Router>
);