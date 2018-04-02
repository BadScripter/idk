const Discord = require("discord.js");

module.exports.run = async(bot,message,args) => {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No permission :b:");
	let activity = args.join(" ");
	let type = args[0];
	let newactivity = activity.split(`${type}`).pop();
	if(!activity) return message.channel.send("NO ACTIVITY SPECIFIED!"); 
	if(!type) return message.channel.send("Specify a type please!");
	bot.user.setActivity(`${activity}`);
	return;
}

module.exports.help = {
	name: "activity"
}