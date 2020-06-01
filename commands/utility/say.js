/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'say',
	description: 'Say sumthing :shrug:.',
	aliases: [],
	category: 'utility',
	run: async (client, message) => {
		const args = message.content.split(' ').slice(1);
		message.delete();
		if (
			message.content.includes('@everyone') ||
			message.content.includes('@here')
		) {
			return message.channel.send('Nope!');
		}
		message.channel.send(args.join(' '));
	},
};
