module.exports.config = {
	name: "offbott",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "SINGU-💌💌",
	description: "Tắt Bot.",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("Bye Bitch ✅",event.threadID, () =>process.exit(0))