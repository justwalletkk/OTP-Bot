const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    client.abchlog = await client.channels.fetch("866288224350634004", true, true)
    console.log(client.abchlog)
  }
}