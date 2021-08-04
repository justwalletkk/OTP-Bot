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
  client.owners = config.owners
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();

module.exports.bot = client;