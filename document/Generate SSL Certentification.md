# Generate SSL Certification

## Tools
Using OpenSSL or other software which include it:
- Apache httpd
  - /bin/openssl.exe
  - /conf/openssl.cnf
- Git for Windows
  - /usr/bin/openssl.exe
  - /usr/ssl/openssl.cnf

## Configuration
Change configuration file `openssl.cnf`:
```ini

# ...

req_extensions = v3_req

# ...

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
# Same name as IP and domain configuration.
subjectAltName = @subject_alt_names

# Allow multiple IP or domain, following the format.
[ subject_alt_names ]
IP.1 = 127.0.0.1
DNS.2 = localhost

# ...

```

## Generatation Script
```bat
openssl.exe req ^
-sha256 ^
-newkey rsa:2048 ^
-nodes ^
-x509 ^
-config openssl.cnf ^
-extensions v3_req ^
-days 3650 ^
-keyout cert.key ^
-out cert.pem ^
```
- -days 3650: available days
- -keyout cert.key: key filename
- -out cert.pem: pen filename