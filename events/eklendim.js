// @ts-check

const { EmbedBuilder } = require("discord.js");
const { sendLog } = require("../functions/general");
const { Event } = require("../functions/event");

module.exports = new Event({
  name: "guildCreate",
  async execute(guild, client) {
    const Eklendim = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Bir sunucuya eklendim")
      .addFields({
        name: ` **Sunucu adı**`,
        value: `${guild}`,
      })
      .addFields({
        name: ` **Sunucu id**`,
        value: `${guild.id}`,
      })
      .addFields({
        name: ` **Toplam sunucu**`,
        value: `${client.guilds.cache.size}`,
      })
      .addFields({
        name: ` **Toplam kullanıcı**`,
        value: `${client.users.cache.size}`,
      });
    return sendLog("guildLogChannel", { embeds: [Eklendim] });
  },
});
