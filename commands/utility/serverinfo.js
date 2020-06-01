const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'serverinfo',
	description: 'Displays Server Infos.',
	aliases: ['si', 'serverinfo', 'sinfo'],
	category: 'utility',
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		let emojis;
		if (message.guild.emojis.cache.size === 0) {
			emojis = 'None';
		}
		else {
			emojis = message.guild.emojis.cache.size;
		}
		const serverembed = new Discord.MessageEmbed()
			.setTitle('Server Info')
			.setColor('a029e6')
			.setThumbnail(message.guild.iconURL())
			.setFooter(
				'Created with ❤︎ by ' + config.maker,
				'https://cdn.discordapp.com/avatars/335394597763153920/1dc7ec97e4fc9c5e08d29d974c2f28ad.webp',
			)
			.addField('Server Name: ', '```' + message.guild.name + '```')
			.addField('ID', '```' + message.guild.id + '```', true)
			.addField(
				'Server Owner',
				'```' +
					`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}` +
					'```',
			)
			.addField('Created on:', '```' + message.guild.createdAt + '```')
			.addField(
				'User Count',
				'```' + message.guild.memberCount + '```',
				true,
			)
			.addField(
				'Member Count',
				'```' +
					message.guild.members.cache.filter((m) => !m.user.bot)
						.size +
					'```',
				true,
			)
			.addField(
				'Bot Count',
				'```' +
					message.guild.members.cache.filter((m) => m.user.bot).size +
					'```',
				true,
			)
			.addField(
				'Total Channels: ',
				'```' + message.guild.channels.cache.size + '```',
			)
			.addField(
				'Total Roles:',
				'```' + message.guild.roles.cache.size + '```',
			)
			.addField(
				'Verification Level',
				'```' + message.guild.verificationLevel + '```',
				true,
			)
			.addField('Emojis', '```' + `${emojis}/100` + '```', true)
			.addField('Region', '```' + message.guild.region + '```', true);
		return message.channel.send(serverembed);
	},
};
