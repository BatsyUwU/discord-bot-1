const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const { CommandHandler } = require('djs-commands');
const CH = new CommandHandler({
	folder: __dirname + '/commands/',
	prefix: ['b!'],
});

client.on('message', (message) => {

	if(message.channel.type === 'dm') return;
	if(message.author.type === 'bot') return;
	const args = message.content.split(' ');
	const command = args[0];
	const cmd = CH.getCommand(command);
	if(!cmd) return;

	try{
		cmd.run(client, message, args);
	}
	catch(e) {
		console.log(e);
	}

});

client.on('ready', () => {
	console.log(client.user.username + ' is now online.');
	client.user.setActivity('idle');
	client.user.setActivity('Getting filled with cum by Daddy Sach uwu');
});

client.login(config.token);