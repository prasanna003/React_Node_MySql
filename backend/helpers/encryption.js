const CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Base64.parse("#rGHnfspBtrEnc1DeckEypKtrV#");
var iv = CryptoJS.enc.Base64.parse("#rGHnfspBtrEnc1DeciVpKtrV#");

exports.encrypt = (value) => {
  var cipher = CryptoJS.AES.encrypt(value, key, {
    iv: iv
  }).toString();
  return cipher;
};

exports.decrypt = (value) => {
  var decipher = CryptoJS.AES.decrypt(value, key, {
    iv: iv
  });
  var decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
  return decrypt_val;
};