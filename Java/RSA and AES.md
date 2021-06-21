# RSA and AES

## 1. RSA
- Public key (PK) encrypt and private key (SK) decrypt, or private key encrypt and public key decrypt.
- Private key for self only and public key for others.
- Length of encryptive content is 128, so RSA always used for AES key.
```plantuml
@startuml
skinparam Monochrome reverse
A -> B : A uses B's PK encrypt message, B uses its SK to decrypt
A <- B : B uses A's PK encrypt message, A uses its SK to decrypt
@enduml
```

- Generate Public Key and Private Key
```java
KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
keyPairGenerator.initialize(1024);
KeyPair keyPair = keyPairGenerator.generateKeyPair();
PublicKey publicKey = keyPair.getPublic();
PrivateKey privateKey = keyPair.getPrivate();
```

- Encrypt and Decrypt
```java
// Public Key Encrypt
Cipher cipher = Cipher.getInstance("RSA");
cipher.init(Cipher.ENCRYPT_MODE, publicKey);
cipher.doFinal(content);
// Private Key Decrypt
Cipher cipher = Cipher.getInstance("RSA");
cipher.init(Cipher.DECRYPT_MODE, privateKey);
cipher.doFinal(code);

// Private Key Encrypt
Cipher cipher = Cipher.getInstance("RSA");
cipher.init(Cipher.ENCRYPT_MODE, privateKey);
cipher.doFinal(content);
// Public Key Decrypt
Cipher cipher = Cipher.getInstance("RSA");
cipher.init(Cipher.DECRYPT_MODE, publicKey);
cipher.doFinal(code);
```
trans key to byte[] (take easy to storing)
```java 
// trans to byte[]
byte[] pk = publicKey.getEncoded();
byte[] sk = privateKey.getEncoded();

// retrans form byte[]
PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(pk));
PrivateKey privateKey = KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(sk));
```

## 2. AES
- length of key cloud be: 128, 192, 256

- Generate random AES key
```java
KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
keyGenerator.init(128, new SecureRandom());
SecretKey secretKey = keyGenerator.generateKey();
```

- Use PBE to generate state aes key according to password and salt.
```java
SecretKey secretKey = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1").generateSecret(
        new PBEKeySpec(password.toCharArray(), salt.getBytes(StandardCharsets.UTF_8), 1000, 128)
);
```

- Encrypt and Decrypt
  - iv: third param of cipher.init(), prevent that same content are encrypted to same result, always set to random.
  - ECB Mode do not need iv.
  - CBC Mode need same iv when encrypting and decrypting, available to get iv from cipher.getIV().
```java
// encrypt
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, aesKey);
cipher.doFinal(content);

// decrypt
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, aesKey);
cipher.doFinal(content);
```

## 3. Util of AES and RSA Crypt
```java
public class CryptoUtils {
    private static final String RSA = "RSA";
    private static final String AES = "AES";
    private static final String AES_MODE_PADDING = "AES/ECB/PKCS5Padding";

    private static String encodeKeyToBase64(Key key) {
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

    /**
     * Generate random AES key, size is 128.
     *
     * @return Base64 AES key
     */
    public static String generateRandomAesKey() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance(AES);
            keyGenerator.init(128, new SecureRandom());
            return encodeKeyToBase64(keyGenerator.generateKey());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Generate AES key by keyword and salt, size is 128.
     *
     * @param keyword keyword
     * @param salt    salt
     * @return Base64 AES key
     */
    public static String generateAesKey(String keyword, String salt) {
        try {
            return encodeKeyToBase64(SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1").generateSecret(
                    new PBEKeySpec(keyword.toCharArray(), salt.getBytes(StandardCharsets.UTF_8), 1000, 128)
            ));
        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static Key getAesKeyFromBase64(String base64) {
        return new SecretKeySpec(Base64.getDecoder().decode(base64), AES);
    }

    /**
     * Encrypt content by AES.
     *
     * @param content      content to encrypt
     * @param aesKeyBase64 Base64 AES key
     * @return Base64 result
     */
    public static String encryptByAes(String content, String aesKeyBase64) {
        try {
            Cipher cipher = Cipher.getInstance(AES_MODE_PADDING);
            cipher.init(Cipher.ENCRYPT_MODE, getAesKeyFromBase64(aesKeyBase64));
            return Base64.getEncoder().encodeToString(cipher.doFinal(content.getBytes()));
        } catch (NoSuchAlgorithmException | InvalidKeyException | NoSuchPaddingException | BadPaddingException | IllegalBlockSizeException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Decrypt content by AES
     *
     * @param content      Base64 content
     * @param aesKeyBase64 Base64 AES key
     * @return result
     */
    public static String decryptByAes(String content, String aesKeyBase64) {
        try {
            Cipher cipher = Cipher.getInstance(AES_MODE_PADDING);
            cipher.init(Cipher.DECRYPT_MODE, getAesKeyFromBase64(aesKeyBase64));
            return new String(cipher.doFinal(Base64.getDecoder().decode(content)));
        } catch (NoSuchAlgorithmException | InvalidKeyException | NoSuchPaddingException | BadPaddingException | IllegalBlockSizeException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Generate RSA key pair, size is 1024.
     *
     * @return key pair
     */
    public static KeyPair generateRsaKeyPair() {
        try {
            KeyPairGenerator rsa = KeyPairGenerator.getInstance(RSA);
            rsa.initialize(1024);
            return rsa.generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String getPemFormat(Key key, String name) {
        return "-----BEGIN " + name + "-----\r\n"
                + Base64.getMimeEncoder().encodeToString(key.getEncoded()) + "\r\n"
                + "-----END " + name + "-----\r\n";
    }

    /**
     * Get RSA public key PEM.
     *
     * @param publicKey RSA public key
     * @return PEM format of RSA public key
     */
    public static String getRsaPublicKeyPem(PublicKey publicKey) {
        return getPemFormat(publicKey, "RSA PUBLIC KEY");
    }

    /**
     * Get RSA private key PEM.
     *
     * @param privateKey RSA private key
     * @return PEM format of RSA private key
     */
    public static String getRsaPrivateKeyPem(PrivateKey privateKey) {
        return getPemFormat(privateKey, "RSA PRIVATE KEY");
    }

    private static String readKeyFromPem(String pem) {
        return pem.replaceAll("-----(BEGIN|END)(.*)-----", "").replaceAll("\\r\\n", "").replaceAll("\\n", "");
    }

    private static PublicKey readRsaPublicKeyFromPem(String pem) {
        try {
            return KeyFactory.getInstance(RSA).generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(readKeyFromPem(pem))));
        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static PrivateKey readRsaPrivateKeyFromBase64(String pem) {
        try {
            return KeyFactory.getInstance(RSA).generatePrivate(new PKCS8EncodedKeySpec(Base64.getDecoder().decode(readKeyFromPem(pem))));
        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Encrypt content by RSA public key pem. (X509)
     *
     * @param content      content to encrypt
     * @param publicKeyPem RSA public key pem (X509)
     * @return Base64 result
     */
    public static String encryptByRsaPublishKey(String content, String publicKeyPem) {
        try {
            Cipher cipher = Cipher.getInstance(RSA);
            cipher.init(Cipher.ENCRYPT_MODE, readRsaPublicKeyFromPem(publicKeyPem));
            return Base64.getEncoder().encodeToString(cipher.doFinal(content.getBytes()));
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | BadPaddingException | IllegalBlockSizeException | InvalidKeyException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Decrypt content by RSA private key pem. (PKCS8)
     *
     * @param content       Base64 content to decrypt
     * @param privateKeyPem RSA private key pem (PKCS8)
     * @return result
     */
    public static String decryptByRsaPrivateKey(String content, String privateKeyPem) {
        try {
            Cipher cipher = Cipher.getInstance(RSA);
            cipher.init(Cipher.DECRYPT_MODE, readRsaPrivateKeyFromBase64(privateKeyPem));
            return new String(cipher.doFinal(Base64.getDecoder().decode(content)), StandardCharsets.UTF_8);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | BadPaddingException | IllegalBlockSizeException | InvalidKeyException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```
