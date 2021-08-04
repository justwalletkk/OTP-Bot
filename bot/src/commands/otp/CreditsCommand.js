const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CreditsCommand extends BaseCommand {
  constructor() {
    super('c', 'otp', ['credits']);
  }

  async run(client, message, args) {
    var credits = new client.db.table("credits");
    if(credits.has(`${message.author.id}`)) {
      var creds = await credits.get(`${message.author.id}`);
      return message.channel.send(`You have: **${creds}** credits.`)
    } else {
      credits.add(`${message.author.id}`, 0);
      return message.channel.send(`You have: **0** credits.`)  
    }
  }
}