# EDUCATIONAL PURPOSES STRICLY!

# Requirements

- Visual Studio & its Desktop C++ Workload
- An ngrok account
- A Twilio account
- A Twilio number 
- A Discord bot token


# Usage

UPDATE YOUR VARIABLES IN .env AND bot/slappey.json

MAKE SURE YOU ALSO UPDATE THE NUMBERS INSIDE caller.js

IN bot/src/events/ready/ReadyEvent.js EDIT THE DISCORD CHANNEL ID TO YOURS!

```
npm install -g yarn
yarn install
yarn bot:prod
```
In a seperate prompt
```
# Make sure you have ngrok installed and located at C:\ngrok.exe
yarn ngrok
```
Once ngrok is live, copy the ngrok tunnel and paste it in .env
