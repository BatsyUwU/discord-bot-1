const Discord = require("discord.js");
// eslint-disable-next-line no-unused-vars
const client = new Discord.Client();
const config = require("../config.json");

module.exports = {
  name: "avatar",
  description: "Displays user avatar",
  aliases: ["avatar", "icon", "pfp"],
  category: "utility",
  usage: "b!avatar @user",
  cooldown: 5,
  // eslint-disable-next-line no-unused-vars
  execute(message, args) {
    const member = message.mentions.users.first() || message.author;
    const avEmbedPing = new Discord.MessageEmbed()
      .setTitle("Hewe's " + member.username + "'s awatar uwu")
      .setColor("a029e6")
      .setImage(member.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(
        "Made with ❤︎ by " + config.maker,
        "https://cdn.discordapp.com/avatars/335394597763153920/1dc7ec97e4fc9c5e08d29d974c2f28ad.webp"
      );

    const avEmbed = new Discord.MessageEmbed()
      .setTitle("Hewe's " + message.author.username + "'s awatar uwu")
      .setColor("a029e6")
      .setImage(message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(
        "Made with ❤︎ by " + config.maker,
        "https://cdn.discordapp.com/avatars/335394597763153920/1dc7ec97e4fc9c5e08d29d974c2f28ad.webp"
      );

    if (message.mentions.users.first()) {
      // eslint-disable-next-line no-inline-comments
      message.channel.send(avEmbedPing); // This part is totally useless but whatever
    } else {
      message.channel.send(avEmbed);
    }
  },
};
