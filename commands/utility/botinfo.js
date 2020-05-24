/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const client = new Discord.Client();

module.exports = class test {
	constructor() {
		(this.name = 'Bot_Info'),
		(this.alias = ['botinfo', 'bi', 'bot', 'botinformation', 'binfo', 'binformation']),
		(this.usage = 'b!botinfo');
	}

	// eslint-disable-next-line no-unused-vars
	// eslint-disable-next-line no-shadow
	run(client, message, args) {
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		let uptime = `${days} day(s), ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
		const botembed = new Discord.MessageEmbed()
			.setTitle('Bot Info')
			.setColor('a029e6')
			.setFooter('Made with ❤︎ by ' + config.maker)
			.setThumbnail(client.user.displayAvatarURL())
			.addField('Bot Name: ', '```' + client.user.username + '```')
			.addField('Created on:', '```' + client.user.createdAt + '```')
			.addField('Currently in:', '```' + client.guilds.cache.size + ' server(s)```')
			.addField('Bot Creator:', '```' + config.maker + '```')
			.addField('Bot Uptime:', '```' + uptime + '```');

		return message.channel.send(botembed);
	}
};
