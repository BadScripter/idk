const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser) return message.channel.send("No user specified.");
	let kReason = args.join(" ").slice(22);
	let inperm = new Discord.RichEmbed()
	.setTitle("Error:")
	.setDescription("Faggot you don't got permissions")
	.setAuthor("Johnny Rebel", message.member.avatar_url)
	.setColor("#ff0000");
	if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(inperm);

	let permed = new Discord.RichEmbed()
	.setTitle("Kicked")
	.setColor("#00ff00");

	if(message.channel === message.guild.channels.find(`name`, "bot-commands")){
		message.delete().catch(O_o=>{});
		message.guild.member(kUser).kick(kReason);
		message.channel.send(permed);
		return;
	}

	if(message.channel != message.guild.channels.find(`name`, "bot-commands")){
		message.channel.send(`Please use commands in ${message.guild.channels.find(`name`, "bot-commands")}`)
		message.delete().catch(O_o=>{});
		return;
	}
}

module.exports.help = {
	name: "kick"
}