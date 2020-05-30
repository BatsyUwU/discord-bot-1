/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');

module.exports = {
	name: 'poke',
	description: 'Poke someone!',
	aliases: [],
	category: 'actions',
	run: async (client, message, args) => {
		superagent
			.get('https://nekos.life/api/v2/img/poke')
			.end((err, response) => {
				const member = message.mentions.users.first() || message.author;
				if (member == message.mentions.users.first()) {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`${message.author.username} pokes ${member.username}!`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
				else {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							`${message.author.username} is poking himself...?`,
						)
						.setImage(response.body.url)
						.setColor('#a029e6')
						.setURL(response.body.url);
					message.channel.send(embed);
				}
			});
	},
};
