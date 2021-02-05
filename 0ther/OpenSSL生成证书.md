# OpenSSL生成STL证书步骤

Apache Httpd 文件对应位置 <br/>
openssl.cnf -> Apache24/conf/openssl.cnf <br/>
openssl.exe -> Apache24/bin/openssl.exe <br/>

## 1. 配置文件
```ini
# 开启v3版本
req_extensions = v3_req
```
```ini
# v3配置
[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

# 配置可信任的域名、IP
[ alt_names ]
IP.1 = 127.0.0.1
DNS.2 = localhost
```

## 2. cmd命令
```
openssl.exe req -sha256 -newkey rsa:2048 -nodes -keyout  server.key -x509 -days 3650 -out server.crt -config openssl.cnf -extensions v3_req
```
