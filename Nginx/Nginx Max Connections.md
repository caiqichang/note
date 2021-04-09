# Nginx Max Connections

## Config Parameters
- worker_processes: max number of processes
- worker_connections: max connections of each process
- max connections = worker_processes * worker_connections

## Attentions
1. Max connections also depend on `worker_rlimit_nofile` 
-- max files of each process witch is depend on `Operating System`.
2. Max connections include both `Client-Nginx` and `Nginx-ProxyServer`.