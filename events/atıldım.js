// @ts-check

const { EmbedBuilder } = require("discord.js");
const { sendLog } = require("../functions/general");
const { Event } = require("../functions/event");

module.exports = new Event({
  name: "guildDelete",
  async execute(guild, client) {
    const Atıldım = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Bir sunucudan atıldım")
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
    return sendLog("guildLogChannel", { embeds: [Atıldım] });
  },
});
