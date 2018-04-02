const Discord = require("discord.js");
let Admin = 0

module.exports.run = async(bot,message,args) => {
	if(message.member.hasPermission("ADMINISTRATOR")) Admin = 1;
	if(Admin == 1) {
		let Embed = new Discord.RichEmbed()
		.setColor("#00ff00")
		.setAuthor(`${bot.user.username}`, bot.user.avatarURL)
		.addField("!ban [member] [reason]", "Bans a member, MUST POST A REASONABLE REASON!!!")
		.addField("!giverole [member] [role (don't tag, type the name!)]", "Gives a user the role suggested.");
		message.member.send(Embed);
		Admin = 0;
	}else{
		message.channel.send("gay");
	}
}

module.exports.help = {
	name: "cmds"
}