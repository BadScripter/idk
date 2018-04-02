const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot,message,args) => {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No permissions.");
	let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	if(wUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Can't warn em.");
	if(!wUser) return message.channel.send("Specify a user please.");
	let reason = args.join(" ").slice(22);

	if(!warns[wUser.id]) warns[wUser.id] = {
		warns: 0
	};

	warns[wUser.id].warns++;

	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if(err) console.log(err);
	});

	let warnEmbed = new Discord.RichEmbed()
	.setDescription("Warns")
	.setAuthor(message.author.username)
	.setColor("#00ff00")
	.addField("Warned User:", `<@${wUser.id}>`)
	.addField("Number of Warnings:", warns[wUser.id].warns)
	.addField("Reason:", reason);

	let warnchannel = message.guild.channels.find(`name`, "bot-logs");
	if (!warnchannel) return message.channel.send("No bot-logs channel");

	warnchannel.send(warnEmbed);

	if(warns[wUser.id].warns == 2){
		let muterole = message.guild.roles.find(`name`, "muted");
		if(!muterole){
			try{
				muterole = await message.guild.createRole({
					name: "muted",
					color: "#000000",
					permissions:[]
				})
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			}	catch(e){
				console.log(e.stack);
			}
		}
		//end of creating mute role
		let mutetime = "1d";
		await(wUser.addRole(muterole.id));
		message.channel.send(`<@${wUser.id}> has been muted for 1 day for having 2 warnings`);

		setTimeout(function(){
			wUser.removeRole(muterole.id);
			warnchannel.send(`<@${wUser.id}> has been unmuted.`)		
		}, ms(mutetime));
		if(warns[wUser.id].warns == 3){
			message.guild.member(wUser).ban(reason);
			warnchannel.send(`<@${wUser.id}> has been banned!`);
		}

	}
}

module.exports.help = {
	name: "warn"
}