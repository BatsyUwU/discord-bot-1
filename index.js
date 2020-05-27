const { Client, Collection } = require('discord.js');

const config = require('./config.json');
const fs = require('fs');
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
const cooldowns = new Discord.Collection();

client.categories = fs.readdirSync('./commands/');

['command'].forEach((handler) => {
	require('./handler/command')(client);
});

client.on('ready', () => {
	console.log(`Hi, ${client.user.username} is now online!`);

	client.user.setActivity('b!help', { type: 'WATCHING' });
});

client.on('message', async (message) => {
	const prefix = 'b!';

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) {message.member = await message.guild.fetchMember(message);}

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`please wait ${timeLeft.toFixed(
					1,
				)} more second(s) before reusing the \`${command.name}\` command.`,
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		if (command) {
			command.run(client, message, args);
		}
	}
	catch (error) {
		console.error(error);
		message.reply(
			`There was an error trying to execute that command!\n ${error}`,
		);
	}
});

client.login(config.token);
