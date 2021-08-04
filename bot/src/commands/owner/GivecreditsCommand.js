const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class GivecreditsCommand extends BaseCommand {
  constructor() {
    super('gc', 'owner', []);
  }

  run(client, message, args) {
    if(client.owners.includes(message.author.id)) {
      if(!message.mentions.users.first() || !args[1]) {
        return message.channel.send("Failed. Include a member mention and amount to give")
      }
      if(isNaN(args[1])) {
        return message.channel.send("Failed. Include a member mention and amount to give")
      }
      var credits = new client.db.table("credits")
      var am = Number.parseInt(args[1])
      if(credits.has(`${message.mentions.users.first().id}`)) {
        var creds = credits.get(`${message.mentions.users.first().id}`);
        credits.set(`${message.mentions.users.first().id}`, Math.floor(creds + am))
        return message.channel.send("Done.")
      } else {
        credits.add(`${message.mentions.users.first().id}`, am)
        return message.channel.send("Done.")
      }
    }
  }
}