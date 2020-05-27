const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "serverinfo",
  description: "Displays Server Infos.",
  aliases: ["si", "serverinfo", "sinfo"],
  category: "utility",
  // eslint-disable-next-line no-unused-vars
  run: async (client, message, args) => {
    const serverembed = new Discord.MessageEmbed()
      .setTitle("Server Info")
      .setColor("a029e6")
      .setThumbnail(message.guild.iconURL())
      .setFooter(
        "Created with ❤︎ by " + config.maker,
        "https://cdn.discordapp.com/avatars/335394597763153920/1dc7ec97e4fc9c5e08d29d974c2f28ad.webp"
      )
      .addField("Server Name: ", "```" + message.guild.name + "```")
      .addField("Server Owner: ", "```" + message.guild.author + "```")
      .addField("Created on:", "```" + message.guild.createdAt + "```")
      .addField("Total Members: ", "```" + message.guild.memberCount + "```")
      .addField(
        "Total Channels: ",
        "```" + message.guild.channels.cache.size + "```"
      )
      .addField("Total Roles:", "```" + message.guild.roles.cache.size + "```");
    return message.channel.send(serverembed);
  },
};
