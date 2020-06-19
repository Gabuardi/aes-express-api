const express = require('express');
const crypto = require('crypto');

const serverApp = express();
serverApp.use(express.json());

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}


serverApp.get('/encrypt/:value', (req, res) => {
  const requestValue = req.params.value;
  console.log('encrypting data...');
  res.json(encrypt(Buffer.from(requestValue, 'utf-8')));
});

serverApp.post('/decrypt/:value', (req, res) => {
  const requestValue = req.body;
  console.log('decrypting data...');
  res.json({
    decryptedValue: decrypt(requestValue),
  });
});


serverApp.listen(8080, () => {
  console.log('Sever Up! --> http://localhost:8080');
});
