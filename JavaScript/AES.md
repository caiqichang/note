# AES

> based on `crypto-js`

```javascript
/**
 * Create constant AES key.
 * @param {String} password password
 * @param {String} salt salt
 * @returns AES key
 */
const generateAesKey = (password, salt) => {
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.PBKDF2(password, salt, {
            iterations: 1000,
        })
    );
};

/**
 * Create random AES key.
 * @returns AES key
 */
const generateRandomAesKey = () => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(128 / 8));
};

/**
 * Encrypt content by AES
 * @param {String} source content to be encrypted 
 * @param {String} aesKey AES key
 * @returns encrypted result
 */
const encryptByAes = (source, aesKey) => {
    return CryptoJS.AES.encrypt(source, CryptoJS.enc.Base64.parse(aesKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.format.Base64);
};

/**
 * Decrypted content by AES
 * @param {String} base64 content to be decrypted 
 * @param {String} aesKey AES key
 * @returns decrypted result
 */
const decryptByAes = (base64, aesKey) => {
    return CryptoJS.enc.Utf8.stringify(
        CryptoJS.AES.decrypt(base64, CryptoJS.enc.Base64.parse(aesKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })
    );
};
```