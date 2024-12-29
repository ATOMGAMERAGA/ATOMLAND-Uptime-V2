// @ts-check

require("dotenv").config();

const { getConfig, checkConfig } = require("./functions/config");
const { client } = require("./client");
require("moment-duration-format");

// Çevresel değişkenlerdeki token kontrol ediliyor
const token = process.env.token;
if (!token) {
  console.error("Error: Bot token is missing in environment variables.");
  process.exit(1); // Hata durumunda programı sonlandır
}

// Config kontrolü
try {
  checkConfig();
} catch (error) {
  console.error("Configuration error:", error);
  process.exit(1); // Hata durumunda programı sonlandır
}

// Slash komutları yükleniyor
try {
  require("./slash")(client);
} catch (error) {
  console.error("Error loading slash commands:", error);
  process.exit(1); // Hata durumunda programı sonlandır
}

// Hata yönetimi
process
  .on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  })
  .on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
  });

// Botu çalıştır
client
  .login(token)
  .then(() => {
    console.log("Bot successfully logged in.");
  })
  .catch((err) => {
    console.error("Error logging in:", err);
    process.exit(1); // Giriş hatasında programı sonlandır
  });
