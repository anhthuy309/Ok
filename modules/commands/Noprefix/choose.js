module.exports.config = {
  name: "choose",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SINGU-💌💌",
  description: "Nhờ bot chọn giúp một trong những thứ bạn cần làm ở bên dưới",
  commandCategory: "other",
  usages: "[Option 1] | [Option 2]",
  cooldowns: 5
};

module.exports.languages = {
  "vi": {
    "return": "%1 là lựa chọn của tôi 🗣️🔥 "
  },
  "en": {
    "return": "%1 is more suitable with you, I think so :thinking:"
  }
}

module.exports.run = async ({ api, event, args, getText }) => {
  const { threadID, messageID } = event;

  var input = args.join(" ").trim();
  if (!input) return global.utils.throwError(this.config.name, threadID, messageID);
  var array = input.split(" | ");
  return api.sendMessage(getText("return", array[Math.floor(Math.random() * array.length)]),threadID, messageID);
}