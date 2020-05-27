/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'userinfo',
	description: 'Displays User Infos.',
	aliases: ['ui', 'us', 'uinfo', 'useri', 'alias'],
	category: 'utility',
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const member = message.mentions.members.first() || message.author;

		if (message.mentions.users.first()) {
			const roles =
        member.roles.cache
        	.filter((r) => r.id !== message.guild.id)
        // eslint-disable-next-line no-mixed-spaces-and-tabs
        	.map((r) => r)
        // eslint-disable-next-line no-mixed-spaces-and-tabs
        	.join(', ') || 'none';
			const embed2 = new Discord.MessageEmbed()
				.setThumbnail(user.displayAvatarURL({ dynamic: true }))
				.setTitle('User Info')
				.setColor('a029e6')
				.setFooter(
					'Made with ❤︎ by  ' + config.maker,
					'https://cdn.discordapp.com/avatars/335394597763153920/1dc7ec97e4fc9c5e08d29d974c2f28ad.webp',
				)
				.addFields(
					{ name: 'User ID:', value: '```' + user.id + '```' },
					{ name: 'User Discord Tag:', value: '```' + user.tag + '```' },
					{ name: 'User Username:', value: '```' + user.username + '```' },
					{
						name: 'User joined the guild at:',
						value: '```' + member.joinedAt + '```',
					},
					{
						name: 'When was the user account created:',
						value: '```' + user.createdAt + '```',
					},
					{
						name: 'User Online Status:',
						value: '```' + user.presence.status + '```',
					},
					{ name: 'User Roles', value: roles },
				)
				.setTimestamp();
			message.channel.send(embed2);
		}
		else {
			const embed4 = new Discord.MessageEmbed()
				.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
				.setTitle('User Info')
				.setColor('a029e6')
				.setFooter(
					'Made with ❤︎ by  ' + config.maker,
					'https://cdn.discordapp.com/avatars/335394597763153920/1dc7ec97e4fc9c5e08d29d974c2f28ad.webp',
				)
				.addFields(
					{ name: 'User ID:', value: '```' + message.author.id + '```' },
					{
						name: 'User Discord Tag:',
						value: '```' + message.author.tag + '```',
					},
					{
						name: 'User Username:',
						value: '```' + message.author.username + '```',
					},
					{
						name: 'When User joined the server:',
						value: '```' + 'Use b!userinfo @(user) for more info!' + '```',
					},
					{
						name: 'When was the user account created:',
						value: '```' + message.author.createdAt + '```',
					},
					{
						name: 'User Online Status:',
						value: '```' + message.author.presence.status + '```',
					},
					{
						name: 'User Roles',
						value: '```' + 'Use b!userinfo @(user) for more info!' + '```',
					},
				)
				.setTimestamp();
			message.channel.send(embed4);
		}
	},
};
