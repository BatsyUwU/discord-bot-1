/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');

module.exports = {
	name: 'baka',
	description: 'Is someone a baka?!?',
	aliases: ['stupid'],
	category: 'actions',
	run: async (client, message, args) => {
		superagent
			.get('https://nekos.life/api/v2/img/cuddle')
			.end((err, response) => {
				const member = message.mentions.users.first() || message.author;
				if (member == message.mentions.users.first()) {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`${member.username} is a baka1`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
				else {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`Ahahah!\n ${message.author.username}, you're a baka!`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
			});
	},
};
