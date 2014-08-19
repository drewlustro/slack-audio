# slack-audio

Small CLI app that employs webhooks to broadcast your current iTunes or Spotify song to a Slack channel.

### Installation for hacking
```bash
git clone git@github.com:maxrelax/slack-audio.git
cd slack-audio
sudo gem install bundler # if you don't already have the bundle command
bundle install # installs ruby dependencies from Gemfile
npm install # installs node dependencies from package.json
```

### Usage for hacking
```
./app.js --user USERNAME --url WEBHOOKSURL [--channel BOTCHANNEL --bot BOTNAME]
```

- - -

### Installing globally
*Note: this doesn't work yet.*
```bash
npm install -g slack-audio
```

### Usage if installed globally
```bash
slack-audio --user USERNAME --url WEBHOOKSURL [--channel BOTCHANNEL --bot BOTNAME]
```

<br><br>

### License

MIT
