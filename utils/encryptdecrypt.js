import CryptoJS from "crypto-js";
const ivBase64 = "AAECAwQFBgcICQoLDA0ODw==";
function encryptData(plainText) {
  if (!plainText) {
    return null;
  }
  // const key = CryptoJS.MD5('SECRETKEY');
  const key = CryptoJS.MD5(process.env.NEXT_PUBLIC_SECRET_KEY);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  return encryptedHex;
}

function decryptData(encryptedText) {
  if (!encryptedText) {
    return null;
  }
  // const key = CryptoJS.MD5('SECRETKEY');
  const key = CryptoJS.MD5(process.env.NEXT_PUBLIC_SECRET_KEY);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const encryptedHex = CryptoJS.enc.Hex.parse(encryptedText);
  const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8) || null;
  } catch (error) {
    console.error("Decryption failed: ", error);
    return null;
  }
}

export default { encryptData, decryptData };
