const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Sorry, no perms.");
	let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rMember) return message.channel.send("No user specified");
	let role = args.join(" ").slice(22);
	if(!role) return message.reply("Specify a role!");
	let gRole = message.guild.roles.find(`name`, role);
	if(!gRole) return message.channel.send("Couldn't find that role.");

	if(rMember.roles.has(gRole.id));
	await(rMember.removeRole(gRole.id));

	try{
		await rMember.send(`You have been removed from the role ${gRole.name}.`);
	}catch(e){
	message.channel.send(`<@${rMember.id}> since you turned off your DMs you have losed the ${gRole.name} role.`);
}
}

module.exports.help = {
	name: "removerole"
}


