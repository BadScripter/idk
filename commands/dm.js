const Discord = require("discord.js");

module.exports.run = async(bot,message,args) => {
	let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!tomute) return message.channel.send("No user specified.");
	let text = args.join(" ").slice(22);
	if(!text) return message.channel.send("You didn't specify a message");
	let i = 0
	let amount = args[1];
	let newtext = text.split(`${amount}`).pop();
	if(!amount) return message.channel.send("You didn't specify the amount of messages");
		if(amount % 1 === 0) {
			while (i < amount) {
				i += 1;
				tomute.send(newtext);
			}	 
		}else{
			return message.channel.send("HAS TO BE AN INTEGER!!!");
	}
}

module.exports.help = {
	name: "dm"
}