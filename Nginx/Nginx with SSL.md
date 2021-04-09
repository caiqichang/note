# Nginx with SSL

## Create SSL Certification.
1. Tools
- Apache Httpd: 
  - Apache24/bin/openssl.exe
  - Apache24/conf/openssl.cnf

or 
- Git for Windows:
  - git/usr/bin/openssl.exe
  - git/usr/ssl/openssl.cnf

2. Config openssl.cnf.
```ini
req_extensions = v3_req

# ...

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names # same name as next configuration

# allow to config multi IP or DNS
[ alt_names ]
IP.1 = 127.0.0.1
DNS.2 = localhost
```

3. Generate Command.
- -days 3650: available days
- -keyout server.key: key file name
- -out server.crt: certification file name
```
openssl.exe req -sha256 -newkey rsa:2048 -nodes -keyout  server.key -x509 -days 3650 -out server.crt -config openssl.cnf -extensions v3_req
```

## Nginx Config
```ini
server {
    listen       443 ssl;
    server_name  localhost;

    # path relative to nginx.conf
    ssl_certificate      ../ssl/server.crt;
    ssl_certificate_key  ../ssl/server.key;

    # ... 
}
```