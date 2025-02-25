const crypto = require("crypto");

// Define encryption key and IV (must be 32 bytes for AES-256)
const SECRET_KEY = crypto.randomBytes(32); // Keep this secure
const IV = crypto.randomBytes(16); // Initialization vector

// Encrypt function
function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${IV.toString("hex")}:${encrypted}`;
}

// Decrypt function
function decrypt(encryptedText) {
  const parts = encryptedText.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedData = parts.join(":");
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
