const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
// eslint-disable-next-line no-unused-vars

module.exports = {
	name: 'help',
	aliases: ['h', 'commands', 'c'],
	category: 'utility',
	description: 'Returns all commands, or one specific command info',
	run: async (client, message, args) => {
		// If there's an args found
		// Send the info of that command found
		// If no info found, return not found embed.
		if (args[0]) {
			return getCMD(client, message, args[0]);
		}
		else {
			// Otherwise send all the commands available
			// Without the cmd info
			return getAll(client, message);
		}
	},
};

function getAll(client, message) {
	const embed = new MessageEmbed()
		.setColor('a029e6')
		.setTitle('Help Menu')
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter('To see command descriptions and usage type b!help [CMD Name]');

	// Map all the commands
	// with the specific category
	const commands = (category) => {
		return client.commands
			.filter((cmd) => cmd.category === category)
			.map((cmd) => `\`${cmd.name}\``)
			.join(', ');
	};

	// Map all the categories
	const info = client.categories
		.map(
			(cat) =>
				stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(
					cat,
				)}`,
		)
		.reduce((string, category) => string + '\n' + category);

	message.reply('sent help to dms');
	// .then(msg => {
	// msg.delete(3000)
	// })

	return message.author.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
	const embed = new MessageEmbed();

	// Get the cmd by the name or alias
	const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

	let info = `No information found for command **${input.toLowerCase()}**`;

	// If no cmd is found, send not found embed
	if (!cmd) {
		return message.channel.send(embed.setColor('a029e6').setDescription(info));
	}

	// Add all cmd info to the embed
	if (cmd.name) info = `**Command name**: ${cmd.name}`;
	if (cmd.aliases) {info += `\n**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(', ')}`;}
	if (cmd.description) info += `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${cmd.usage}`;
		embed.setFooter('Syntax: <> = required, [] = optional');
	}

	return message.channel.send(embed.setColor('a029e6').setDescription(info));
}
