// @ts-check

const commands = [];
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Collection, Client } = require("discord.js");
const { Routes } = require("discord-api-types/v10");
require("dotenv").config(); // Çevresel değişkenleri yükle

const commandsPath = path.join(__dirname, "./komutlar");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
const eventsPath = path.join(__dirname, "./events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

const botId = process.env.BOT_ID; // Çevresel değişkenden bot ID al
const token = process.env.TOKEN; // Çevresel değişkenden token al

if (!botId || !token) {
  console.error("Hata: BOT_ID veya TOKEN çevresel değişkeni bulunamadı.");
  process.exit(1);
}

/**
 * @param {Client} client
 */
module.exports = (client) => {
  // @ts-ignore
  client.commands = new Collection();
  // @ts-ignore
  client.slashcommands = new Collection();

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    const registerer = (event.once ? client.once : client.on).bind(client);
    registerer(event.name, (...args) => event.execute(...args, client));
  }

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.slash) {
      // @ts-ignore
      client.slashcommands.set(command.data.name, command);
      commands.push(command.data.toJSON());
      continue;
    }

    for (let i = 0; i < command.name.length; i++) {
      // @ts-ignore
      client.commands.set(command.name[i], command);
    }
  }
  console.log(`Tüm Komutlar Yüklendi`);
};

const rest = new REST({ version: "10" }).setToken(token);

setTimeout(() => {
  rest
    .put(Routes.applicationCommands(botId), { body: commands })
    .then(() => console.log("Komutlar başarıyla yüklendi."))
    .catch(console.error);
}, 500);
