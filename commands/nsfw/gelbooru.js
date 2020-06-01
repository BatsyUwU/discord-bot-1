/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'gelbooru',
	description: 'Porn!!',
	aliases: [],
	category: 'nsfw',
	usage:
		'\n[$] Searchs random images, can be nsfw.\n [$tag] Searchs for a tag.\n[$tag -5] Search for a tag and get 5 results at once.\n [$tag rating:questionable/$tag rating:safe] search for safe/questionable content\nExampli gratia:\nb!gelbooru $furry; b!gelbooru $ $5; b!gelbooru $ rating:questionable.\nHere\'s the list of tags:\nhttps://gelbooru.com/index.php?page=tags&s=list',
	run: async (client, message, args) => {
		if (!message.channel.nsfw) {
			return message.channel.send(
				'Try using this command in an nsfw channel :/',
			);
		}
		else {
			const imgLimit = message.content.includes('-5') ? 5 : 1;
			const data = message.content
				.replace('-5', '')
				.replace(' ', '')
				.split('$');
			const tags = data[1].replace(' ', '+');
			const pid = Math.floor(Math.random() * 5000 + 1);

			axios
				.get(
					`https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=${imgLimit}&tags=${tags}&pid=${pid}`,
				)
				// eslint-disable-next-line no-shadow
				.then((data) => {
					data.data.forEach((image) => {
						if (image !== undefined) {
							const embed = {
								title: 'Go to image source on Gelbooru',
								description:
									tags === ''
										? 'No tags.'
										: `You searched for: ${tags}`,
								url: `https://gelbooru.com/index.php?page=post&s=view&id=${image.id}`,
								color: 'a029e6',
								image: {
									url: `${image.file_url}`,
								},
							};
							message.reply({ embed });
						}
					});
				})
				.catch((error) => {
					message.reply(
						'Sorry, there was an unexpected error.\nTry with another tag, u may have inserted an invalid one.',
					);
					console.error(error);
				});
		}
	},
};
