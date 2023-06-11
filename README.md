## Dev2Dev Backend

### Setup

1. Prisma Useful

```bash
prisma generate

prisma migrate

prisma studio

prisma migrate dev --name init --preview-feature
```

2. Triggers -> Add triggers to Postgres
   -> Connect using docker

```bash
docker exec -it postgresdb-image-name psql -U postgres -W db-name
```
