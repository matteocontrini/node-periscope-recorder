# node-periscope-recorder
Get Periscope lives from Twitter and record them

## Install
```js
npm install node-periscope-recorder
```

## Use
```js
var Recorder = require('node-periscope-recorder');
var config = {
	consumer_key: '',
	consumer_secret: '',
	access_token: '',
	access_token_secret: ''
};
var rec = new Recorder(config);

var userId = '265363897';
rec.start(userId);
```
