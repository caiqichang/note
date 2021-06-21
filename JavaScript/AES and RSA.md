# AES and RSA

## AES
> based on `crypto-js`

```javascript
/**
 * Generate AES key by keyword and salt.
 * @param {String} keyword keyword
 * @param {String} salt salt
 * @returns Base64 AES key
 */
const generateAesKey = (keyword, salt) => {
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.PBKDF2(keyword, salt, {
            iterations: 1000,
        })
    );
};

/**
 * Generate random AES key, size is 128
 * @returns Base64 AES key
 */
const generateRandomAesKey = () => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(128 / 8));
};

/**
 * Encrypt content by AES key, mode is ECB and padding is PKCS7.
 * @param {String} content content to encrypt
 * @param {String} aesKeyBase64 Base64 AES key
 * @returns Base64 result
 */
const encryptByAes = (content, aesKeyBase64) => {
    return CryptoJS.AES.encrypt(content, CryptoJS.enc.Base64.parse(aesKeyBase64), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.format.Base64);
};

/**
 * Decrypt content by AES key, mode is ECB and padding is PKCS7.
 * @param {String} content Base64 content to decrypt
 * @param {String} aesKeyBase64 Base64 AES key
 * @returns result
 */
const decryptByAes = (content, aesKeyBase64) => {
    return CryptoJS.enc.Utf8.stringify(
        CryptoJS.AES.decrypt(content, CryptoJS.enc.Base64.parse(aesKeyBase64), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })
    );
};
```

## RSA
> based on `node-forge`

```javascript
/**
 * Initialization
 * @param {Object} crypto CryptoJS instance
 */
const init = (cryptojs, nodeforge) => {
    CryptoJS = cryptojs;
    NodeForge = nodeforge;
};

/**
 * Generate RSA key pair, size is 1024.
 * @returns RSA key pair
 */
const generateRsaKeyPair = () => {
    return NodeForge.pki.rsa.generateKeyPair(1024);
};

/**
 * Get PEM format of RSA public key. (X509)
 * @param {Object} publicKey public key of RSA key pair 
 * @returns RSA public key
 */
const getRsaPublicKeyPem = (publicKey) => {
    return NodeForge.pki.publicKeyToPem(publicKey);
};

/**
 * Get PEM format of RSA private key. (PKCS8)
 * @param {Object} privateKey private key of RSA key pair 
 * @returns RSA private key
 */
const getRsaPrivateKeyPem = (privateKey) => {
    return NodeForge.pki.privateKeyInfoToPem(
        NodeForge.pki.wrapRsaPrivateKey(NodeForge.pki.privateKeyToAsn1(privateKey))
    );
};

/**
 * Encrypt content by RSA public key.
 * @param {String} content content to encrypt
 * @param {String} publicKeyPem PEM format of public key (X509)
 * @returns Base64 result
 */
const encryptByRsaPublicKeyPem = (content, publicKeyPem) => {
    return window.btoa(NodeForge.pki.publicKeyFromPem(publicKeyPem).encrypt(content));
};

/**
 * Decrypt content by RSA private key.
 * @param {String} content Base64 content to decrypt
 * @param {String} privateKeyPem PEM format of private key (PKCS8)
 * @returns result
 */
const decryptByRsaPrivateKeyPem = (content, privateKeyPem) => {
    return NodeForge.pki.privateKeyFromPem(privateKeyPem).decrypt(window.atob(content));
};
```
