const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'Botinfo',
	description: 'Display bot info.',
	aliases: ['bi', 'binfo', 'boti'],
	category: 'utility',
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		const days = Math.floor(client.uptime / 86400000);
		const hours = Math.floor(client.uptime / 3600000) % 24;
		const minutes = Math.floor(client.uptime / 60000) % 60;
		const seconds = Math.floor(client.uptime / 1000) % 60;
		const uptime = `${days} day(s), ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
		const botembed = new Discord.MessageEmbed()
			.setTitle('Bot Info')
			.setColor('a029e6')
			.setFooter('Made with ❤︎ by ' + config.maker)
			.setThumbnail(client.user.displayAvatarURL())
			.addField('Bot Name: ', '```' + client.user.username + '```')
			.addField('Created on:', '```' + client.user.createdAt + '```')
			.addField(
				'Currently in:',
				'```' + client.guilds.cache.size + ' server(s)```',
			)
			.addField('Bot Creator:', '```' + config.maker + '```')
			.addField('Bot Uptime:', '```' + uptime + '```');

		return message.channel.send(botembed);
	},
};
