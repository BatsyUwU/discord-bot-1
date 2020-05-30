/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');
const image = superagent.get('https://e621.net/post/popular_by_day.json');

module.exports = {
	name: 'e621',
	description: 'Furry!',
	aliases: ['e6', 'esix'],
	category: 'nsfw',
	run: async (client, message, args) => {
		if (!message.channel.nsfw) {
			return message.channel.send(
				'You can only use this command in an NSFW Channel!',
			);
		}
		else {
			const lewdembed = new Discord.MessageEmbed()
				.setTitle('Girly')
				.setImage(image)
				.setColor('#a029e6')
				.setFooter('Tags: Girly')
			message.channel.send(lewdembed);
		}
	},
};
