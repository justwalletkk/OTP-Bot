const BaseCommand = require('../../utils/structures/BaseCommand');
const accountSid = "AC1693d82b83b89de5662a1096ea4356b1";
const authToken = "2df86d883e71c75c203ce0e1022e649f";
const tc = require('twilio')(accountSid, authToken);
module.exports = class StatusCommand extends BaseCommand {
  constructor() {
    super('status', 'otp', []);
  }

  run(client, message, args) {
    var sid = args[0];
    if(client.calls.get(sid)) {
      tc.calls(sid)
        .fetch()
        .then((items) => {
          return message.channel.send(`
Call with ID: "${sid}"

Status: ${items.status}
Code: ${client.calls.get(sid).code}
To: ${items.to} 
Duration: ${items.duration}
          `)
        })
    }
  }
}