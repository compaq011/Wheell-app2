const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const tokens = JSON.parse(fs.readFileSync("tokens.json", "utf8"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const token = req.query.token;
  if (!token || !tokens[token]) {
    return res.status(403).send("Token geçersiz veya bağlantı süresi doldu.");
  }

  if (tokens[token] === true) {
    return res.status(403).send("Token zaten kullanıldı.");
  }

  tokens[token] = true;
  fs.writeFileSync("tokens.json", JSON.stringify(tokens, null, 2));

  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
