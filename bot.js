// @ts-check

require("dotenv").config();

const { client } = require("./client");
require("moment-duration-format");
require("./slash")(client);

// Çevresel değişkenlerden tokeni al
const token = process.env.TOKEN;

// Tokenin mevcut olup olmadığını kontrol et
if (!token) {
  console.error("Hata: TOKEN değişkeni .env dosyasında bulunamadı.");
  process.exit(1); // Programı hatayla sonlandır
}

// Hata işleyicileri
process
  .on("uncaughtException", console.error)
  .on("unhandledRejection", console.error);

// Botu başlat
client.login(token);
