const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js")
const call = require("../../../../caller").venmo
const { parsePhoneNumber } = require("libphonenumber-js")

module.exports = class VenmoCommand extends BaseCommand {
  constructor() {
    super('venmo', 'otp', []);
  }

  async run(client, message, args) {
    if(client.inUse) {
      return message.channel.send("Bot in use.")
    }
    var credits = new client.db.table("credits")
    if(credits.has(`${message.author.id}`)) {
      var creds = credits.get(`${message.author.id}`);
      if(creds < 0) {
        return message.channel.send(
          new MessageEmbed()
            .setTitle("You have no credits.")
        )  
      } else {
        var number = args[0]
        var region = args[1]
        if(!number || !region) {
          return message.channel.send(
            new MessageEmbed()
              .setTitle("Thats not a valid number.")
          )
        } else {
          const phoneNumber = parsePhoneNumber(number, region.toUpperCase())
          if (phoneNumber) {
            if(phoneNumber.isValid()) {
              var data = await call(phoneNumber.number)
              client.abchannel = message.channel
              client.chs.set(data.sid, message.channel)
              client.idtosid.set(message.channel, data)
              client.calls.set(data.sid, { 
                id: message.author.id,
                si: data.sid,
                ch: message.channel,
                ca: data,
              })
              message.channel.send(`Your **Venmo** call has been sent. Use this call ID to manage it:\n\n${data.sid}`)
            } else {
              return message.channel.send(
                new MessageEmbed()
                  .setTitle("Thats not a valid number.")
              )
            }
          } else {
            return message.channel.send(
              new MessageEmbed()
                .setTitle("Thats not a valid number.")
            )
          }
        }
      }
    } else {
      credits.set(`${message.author.id }`, 0)
      return message.channel.send(
        new MessageEmbed()
          .setTitle("You have no credits.")
      )
    }
  }
}