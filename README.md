# Imgur
Sample Imgur client

# Features
* Express webserver
* React (with React-Router)
* Flux (with Reflux)
* Material-UI (Material Degisn UI)
* ES6 and JSX
* SASS styles (SCSS)
* Fetch
* Dynamic grid columns with window size handler

# Requirements
* NPM
* Due to security reasons this repository does not contain Imgur API key, so you have to register your own.

# Installation
* Clone this repository
* Follow the URL: [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient)
* Fill the form. Select the option "Anonymous usage without user authentication"
* Create new file /source/settings.jsx
* Fill it with this text (where YOUR_API_KEY is the API key given by Imgur):
```
module.exports = {
    apiKey: 'YOUR_API_KEY'
};
```
* Execute these commands (this will install required modules and Webpack CLI)
```
npm install
```
```
* Execute command (this will launch webserver on port 8080)
```
npm start
```
* Follow the URL: [http://localhost:8080](http://localhost:8080) and have fun ^_^
