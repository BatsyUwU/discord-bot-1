const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Botinfo",
  description: "Display bot info.",
  aliases: ["bi", "binfo", "boti"],
  category: "utility",
  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let uptime = `${days} day(s), ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
    const botembed = new Discord.MessageEmbed()
      .setTitle("Bot Info")
      .setColor("a029e6")
      .setFooter("Made with ❤︎ by " + config.maker)
      .setThumbnail(client.user.displayAvatarURL())
      .addField("Bot Name: ", "```" + client.user.username + "```")
      .addField("Created on:", "```" + client.user.createdAt + "```")
      .addField(
        "Currently in:",
        "```" + client.guilds.cache.size + " server(s)```"
      )
      .addField("Bot Creator:", "```" + config.maker + "```")
      .addField("Bot Uptime:", "```" + uptime + "```");

    return message.channel.send(botembed);
  },
};
