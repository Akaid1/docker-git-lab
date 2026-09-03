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

## Fase 2 - Servidor Web (Nginx)

Site estático (HTML/CSS/JS) servido por um container Nginx (imagem `nginx:1.27-alpine`).

### Opção A - Build com COPY (imagem autocontida)

```bash
cd web
docker build -t web-server:1.0 .
docker run -d -p 8080:80 --name meu-site web-server:1.0
```

Acesse: http://localhost:8080

### Opção B - Bind Mount (desenvolvimento, sem rebuild)

```bash
cd web
docker run -d -p 8080:80 \
  -v $(pwd)/site:/usr/share/nginx/html \
  --name site-dev nginx:1.27-alpine
```

Qualquer alteração em `web/site/` é refletida instantaneamente ao atualizar o navegador.

| Característica       | COPY (Build-Time)          | Bind Mount (Runtime)          |
|-----------------------|-----------------------------|--------------------------------|
| Momento de inserção   | Durante o `docker build`   | Durante o `docker run` (`-v`) |
| Atualização de código | Requer reconstrução         | Refletida em tempo real       |
| Portabilidade         | Alta (imagem autocontida)  | Baixa (depende do host)       |
| Uso recomendado       | Produção & Staging         | Desenvolvimento local         |

## Ambiente Docker Compose (Postgres + pgAdmin)

O arquivo `docker-compose.yml` sobe dois containers na mesma rede (`lab-network`):
Postgres e pgAdmin, permitindo administrar o banco pela interface web.

```bash
docker compose up -d
```

- Postgres: porta `5432` (usuário `admin`, senha `admin123`, banco `meubanco`)
- pgAdmin: http://localhost:5050 (login `admin@admin.com` / senha `admin123`)

No pgAdmin, ao cadastrar o servidor Postgres, use como *Host name/address* o nome
do serviço na rede Docker: `postgres`.

Para derrubar o ambiente:

```bash
docker compose down
```

