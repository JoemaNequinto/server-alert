# server-alert
> Sends a slack message if pm2 process crashed (exit) and restarted (online)

## Config
Create `.env` file:
```shell
SLACK_WEBHOOK_URL=<required>
NODE_ENV=<required>
```

## How to use?
```shell
$ git clone 
$ cd server-alert
$ npm install
$ node -r esm index.js (OR npm start)
```

## Testing
```shell
$ pm2 start test/throw.js
$ node -r esm index.js
```

## Todo
- Provide error stack trace in slack message