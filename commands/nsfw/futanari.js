/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');

module.exports = {
	name: 'futanari',
	description: 'Futa!',
	aliases: ['futa', 'dickgirl'],
	category: 'nsfw',
	run: async (client, message, args) => {
		if (!message.channel.nsfw) {
			return message.channel.send(
				'You can only use this command in an NSFW Channel!',
			);
		}
		superagent
			.get('https://nekos.life/api/v2/img/futanari')
			.end((err, response) => {
				const lewdembed = new Discord.MessageEmbed()
					.setTitle('Futanari')
					.setImage(response.body.url)
					.setColor('#a029e6')
					.setFooter('Tags: futanari')
					.setURL(response.body.url);
				message.channel.send(lewdembed);
			});
	},
};
