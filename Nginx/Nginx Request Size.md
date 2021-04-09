# Nginx Request Size

```
client_max_body_size 1m;
```
1. Set `0` (without unit) to unlimit size, default value is `1m`.
2. If request is larger than size of configuration, response `413`.
3. This can confg at `http`, `server`, `location`.