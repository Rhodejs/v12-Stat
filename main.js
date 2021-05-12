const Discord = require("discord.js");
const fs = require("fs");
const Settings = global.Settings = require("./Settings/Settings.json");

console.log("Launching bot...");
let _client = new Discord.Client();
if (Settings.Private_Server === true) {
    _client = new Discord.Client({
        fetchAllMembers: true
    });
}
const client = global.client = _client;

const Commands = global.Commands = new Map();
console.log("--------------------------------");
console.log("Komutlar Yükleniyor Akano!");
fs.readdirSync("./Commands", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Commands/${file}`);
    if (prop.conf.commands == undefined || prop.run == undefined) return console.error(`[COMMAND] ${file} is not load.`);
    if (prop.conf.commands && prop.conf.commands.length > 0) {
        prop.conf.commands.forEach(aliase => Commands.set(aliase, prop));
    }
    if (prop.onLoad != undefined && typeof (prop.onLoad) == "function") prop.onLoad(client);
    console.log(`[COMMAND] A total of ${prop.conf.commands.length} supporters have been installed for ${file}.`);
});
console.log("--------------------------------");
console.log("Eventler Yükleniyor");
fs.readdirSync("./Events", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Events/${file}`);
    client.on(prop.conf.event, prop.execute);
    console.log(`[EVENT] ${file} is loaded.`);
});

console.log("--------------------------------");
console.log("| Preparation has been completed. Starting the bot now |");

require("./bot.js");


client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "V12 STAT BOT RHODE" }, status: "online" });

});