const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const validTokens = ['abc123'];

app.use(express.json());

app.use((req, res, next) => {
const token = req.query.token;
if (!token || !validTokens.includes(token)) {
return res.status(403).send('Geçersiz veya eksik token.');
}
next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/winner', (req, res) => {
const winnerData = req.body;
const filePath = path.join(__dirname, 'winners.json');
fs.readFile(filePath, 'utf8', (err, data) => {
let winners = [];
if (!err && data) {
winners = JSON.parse(data);
}
winners.push(winnerData);
fs.writeFile(filePath, JSON.stringify(winners, null, 2), () => {
res.status(200).send({ message: 'Kazanan kaydedildi.' });
});
});
});

app.listen(PORT, () => {
console.log(`Sunucu ${PORT} portunda çalışıyor`)
});
