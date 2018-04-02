const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find user.");
	let reason = args.join(" ").slice(22);

	let report = new Discord.RichEmbed()
	.setTitle("Report:")
	.setColor("#0000ff")
	.addField("Reported User:", `${rUser} with ID: ${rUser.id}`)
	.addField("Reported By:", `${message.author} with ID: ${message.author.id}`)
	.addField("Time:", message.createdAt)
	.addField("Reason:", reason);

	let reportschannel = message.guild.channels.find(`name`, "reports");
	if(!reportschannel) return message.channel.send("No reports channel");

	if(message.channel === message.guild.channels.find(`name`, "bot-commands")){
		message.delete().catch(O_o=>{});
		reportschannel.send(report)
	}

	if(message.channel != message.guild.channels.find(`name`, "bot-commands")){
		message.channel.send(`Please use commands in ${message.guild.channels.find(`name`, "bot-commands")}`)
		message.delete().catch(O_o=>{});
	}

	return;
}

module.exports.help = {
	name: "report"
}