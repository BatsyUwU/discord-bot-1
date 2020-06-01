module.exports = {
	name: 'f',
	description: 'Press F to pay respect.',
	aliases: ['respect'],
	category: 'actions',
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args) => {
		message.channel.send(`${message.author.username} has paid their respect!`);
	},
};
