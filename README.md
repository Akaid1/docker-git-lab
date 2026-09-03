# ping-tool

Imagem Docker baseada em Ubuntu com utilitário `ping` instalado, criada
para fins de diagnóstico de rede.

## Build

```bash
docker build -t ping-tool:1.0 .
```

## Uso

```bash
docker run -it --rm ping-tool:1.0
```

Dentro do container:

```bash
ping -c 4 8.8.8.8
ping -c 4 google.com
exit
```
