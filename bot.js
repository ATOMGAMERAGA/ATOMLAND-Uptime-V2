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

/*                         KEEPALIVE (REPLIT)                              */

// Express modülü ile bir HTTP sunucusu ekliyoruz
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("ATOMLAND Uptime Yaşıyor!");
});

app.listen(8000, () => {
  console.log("[+] KeepAlive sunucusu çalışıyor.");
});

// Hata işleyicileri
process
  .on("uncaughtException", (error) => {
    console.error("Beklenmeyen bir hata oluştu:", error);
  })
  .on("unhandledRejection", (reason) => {
    console.error("Promise reddedildi:", reason);
  });

// Botu başlat
try {
  client.login(token);
} catch (error) {
  console.error("Giriş sırasında bir hata oluştu:", error);
  if (error.code === "TokenInvalid") {
    console.error("Hata: Sağlanan token geçersiz. Lütfen doğru bir token kullanın.");
  } else {
    console.error("Bilinmeyen bir hata oluştu. Hata kodu:", error.code);
  }
}
