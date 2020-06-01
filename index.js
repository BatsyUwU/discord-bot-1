const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Client({
	disableEveryone: true,
});

const http = require('http');
const express = require('express');
const app = express();
app.get('/', (request, response) => {
	console.log(Date.now() + ' Ping Received');
	response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync('./commands/');

// eslint-disable-next-line no-unused-vars
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
	if (!message.member) {
		message.member = await message.guild.fetchMember(message);
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	try {
		if (command) {
			command.run(client, message, args);
		}
	}
	catch (error) {
		console.error(error);
		message.reply(
			`There was an error trying to execute that command!\n${error}`,
		);
	}
});

return client.login(config.token);
