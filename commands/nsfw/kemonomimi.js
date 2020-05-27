const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "kemonomimi",
  description: "Kemonomimi lol.",
  aliases: ["yiff", "furry", "kemo", "kemonomimi"],
  category: "nsfw",
  run: async (client, message, args) => {
    if (!message.channel.nsfw)
      return message.channel.send(
        "You can only use this command in an NSFW Channel!"
      );
    superagent
      .get("https://nekos.life/api/v2/img/kemonomimi")
      .end((err, response) => {
        const lewdembed = new Discord.MessageEmbed()
          .setTitle("Kemonomimi")
          .setImage(response.body.url)
          .setColor(`#a029e6`)
          .setFooter(`Tags: kemonomimi`)
          .setURL(response.body.url);
        message.channel.send(lewdembed);
      });
  },
};
