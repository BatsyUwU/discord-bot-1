/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a member.',
	aliases: ['kick', 'k', 'expel'],
	usage: 'b!kick',
	category: 'moderation',
	// eslint-disable-next-line no-unused-vars
	run: async (client, message) => {
		const args = message.content.split(' ').slice(1);
		const reason = args.slice(1).join(' ');

		const user = message.mentions.users.first();

		if (!args[0]) {
			return message.reply('you must mention someone to kick them.');
		}

		if (user.id === message.author.id) {
			return message.reply('U can\'t kick yourself lmao');
		}
		// cambia l'id qui giù con quello del tuo bot
		if (user.id == '688554909070655493') {
			return message.channel.send('Why do u want to kick me? :(');
		}

		// cambia l'id qui giù con il tuo id
		if (user.id == '335394597763153920') {
			return message.channel.send('How dare u try to kick my daddy? >:(');
		}

		if (!user) {
			return message.channel.send(
				'Either the user isn\'t in the server, or u didn\'t provide the user id.',
			);
		}

		if (!message.guild.member(user).kickable) {
			return message.reply('I cannot kick that member');
		}

		if (!args[1]) {
			return message.channel.send('U forgot the reason :/');
		}

		if (!message.member.permissions.has('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the perms to do so :/',
			);
		}
		message.guild.member(user).kick(reason);

		const modlogChannelID = '716429741305102346';
		if (modlogChannelID.length !== 0) {
			// vede se l'id è vero e blah blah
			if (!client.channels.cache.get(modlogChannelID)) return undefined;
			const embed = new Discord.MessageEmbed()
				.setColor('#a029e6')
				.setTimestamp()
				.addField('Action:', '```' + 'Kick' + '```')
				.addField(
					'User:',
					'```' +
						`${client.users.cache.get(user.id).username}#${
							client.users.cache.get(user.id).discriminator
						} (${user.id})` +
						'```',
				)
				.addField(
					'Moderator:',
					'```' +
						`${message.author.username}#${message.author.discriminator}` +
						'```',
				)
				.setThumbnail(
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.addField('Reason:', '```' + reason + '```');
			message.channel.send({ embed: embed });
			client.channels.cache.get(modlogChannelID).send({
				embed: embed,
			});
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setColor('#a029e6')
				.setTimestamp()
				.addField('Action:', '```' + 'Kick' + '```')
				.addField(
					'User:',
					'```' +
						`${client.users.cache.get(user.id).username}#${
							client.users.cache.get(user.id).discriminator
						} (${user.id})` +
						'```',
				)
				.addField(
					'Moderator:',
					'```' +
						`${message.author.username}#${message.author.discriminator}` +
						'```',
				)
				.setThumbnail(
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.addField('Reason:', '```' + reason + '```');
			message.channel.send({ embed: embed });
		}
	},
};
