# Nginx Config Proxy Server and SPA

## Proxy Server
```
location ^~ /context {
    proxy_pass http://ip:port/context;
}
```

## SPA
```ini
location ^~ /context { 
    # root path of static files, relative to nginx's root path.
    # use absolute path on Linux.
    alias ../web/;
    index index.html;
    error_page 404 = /context/;
}
```