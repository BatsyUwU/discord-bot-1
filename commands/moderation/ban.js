const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Ban a member',
	category: 'moderation',
	alias: [],
	usage: 'b!ban (userID) (reason)',
	run: (client, message) => {
		const args = message.content.split(' ').slice(1);

		if (!args[0]) {
			return message.channel.send(
				'U forgot to mention the user to ban :/',
			);
		}

		const user = message.guild.members.cache.get(args[0]);

		if (user == message.author.id) {
			return message.channel.send('U can\'t just ban yourself, right?...');
		}

		// cambia l'id qui giù con quello del tuo bot
		if (user == '688554909070655493') {
			return message.channel.send('Why do u want to ban me? :(');
		}

		// cambia l'id qui giù con il tuo id
		if (user == '335394597763153920') {
			return message.channel.send('How dare u try to ban my daddy? >:(');
		}

		if (!user) {
			return message.channel.send(
				'Either the user isn\'t in the server, or u didn\'t provide the user id.',
			);
		}
		const reason = message.content.split(`b!ban ${user.id} `);
		if (!args[1]) {
			return message.channel.send('U forgot the reason :/');
		}
		if (!reason) {
			return message.channel.send('U forgot the reason :/');
		}
		if (!message.member.permissions.has('BAN_MEMBERS')) {
			return message.channel.send(
				'You do not have the perms to do so :/',
			);
		}
		user.ban();

		const modlogChannelID = '716429741305102346';
		if (modlogChannelID.length !== 0) {
			// vede se l'id è vero e blah blah
			if (!client.channels.cache.get(modlogChannelID)) return undefined;
			const embed = new Discord.MessageEmbed()
				.setColor('#a029e6')
				.setTimestamp()
				.addField('Action:', '```' + 'Ban' + '```')
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
				.addField('Action:', '```' + 'Ban' + '```')
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
