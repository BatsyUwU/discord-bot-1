/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a member.',
	aliases: ['kick', 'k', 'expel'],
	usage: 'b!kick',
	category: 'moderation',
	cooldown: 5,
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		message.channel.send('Work in progress...');
	},
};
