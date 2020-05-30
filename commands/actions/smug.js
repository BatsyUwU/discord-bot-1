/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');

module.exports = {
	name: 'smug',
	description: 'Do I have to make a description for this too lmao?',
	aliases: [],
	category: 'actions',
	run: async (client, message, args) => {
		superagent
			.get('https://nekos.life/api/v2/img/smug')
			.end((err, response) => {
				const smugEmbed = new Discord.MessageEmbed()
					.setTitle(`${message.author.username} is smug!`)
					.setImage(response.body.url)
					.setColor('#a029e6')
					.setURL(response.body.url);
				message.channel.send(smugEmbed);
			});
	},
};
