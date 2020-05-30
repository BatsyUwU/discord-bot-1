/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');

module.exports = {
	name: 'cuddle',
	description: 'Cuddle someone!',
	aliases: [],
	category: 'actions',
	run: async (client, message, args) => {
		superagent
			.get('https://nekos.life/api/v2/img/cuddle')
			.end((err, response) => {
				const member = message.mentions.users.first() || message.author;
				if (member == message.mentions.users.first()) {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`${message.author.username} is cuddling ${member.username}!\nThey're so cute together!`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
				else {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`Aww, ${message.author.username}, here's a cuddle for u! uwu`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
			});
	},
};
