/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');

module.exports = {
	name: 'slap',
	description: 'Slap someone!',
	aliases: [],
	category: 'actions',
	run: async (client, message, args) => {
		superagent
			.get('https://nekos.life/api/v2/img/slap')
			.end((err, response) => {
				const member = message.mentions.users.first() || message.author;
				if (member == message.mentions.users.first()) {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`${message.author.username} slapped ${member.username}!`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
				else {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`${message.author.username} is slapping himself...?`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
			});
	},
};
