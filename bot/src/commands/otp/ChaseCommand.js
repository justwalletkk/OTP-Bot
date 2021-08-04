const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ChaseCommand extends BaseCommand {
  constructor() {
    super('chase', 'otp', []);
  }

  run(client, message, args) {
    message.channel.send('chase command works');
  }
}