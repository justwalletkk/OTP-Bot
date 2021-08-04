const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.calls = new Map();
  client.idtosid = new Map();
  client.prefix = config.prefix;
  client.db = require("quick.db");
  client.chs = new Map();
  client.owners = [
    "820248880956309535", // Tenzin
    "856254224995450931", // Akame
    "845001299925270579" // Galaxy
  ]
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();

module.exports.bot = client;