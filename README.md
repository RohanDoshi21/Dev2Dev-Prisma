<h1 align="center">Welcome to Dev 2 Dev</h1>

> Dev 2 Dev is a forum for asking company specific questions. So that your internal knowledge can be kept within your company.
> This is the Backend for the Dev 2 Dev project. It is built using NodeJs, Express, Postgres, Prisma.
Link to the backend: https://github.com/RohanDoshi21/Dev2Dev-Frontend

### 🏠 [Homepage](https://dev-2-dev.vercel.app/) https://dev-2-dev.vercel.app/

###  📘 [Documentation](https://documenter.getpostman.com/view/19071589/2s93sc5sex#7cdd83a5-ef2e-493f-9936) (Postman Documentation)

## Install

```sh
npm install

# Prisma setup
npx prisma generate
npx prisma migrate dev
```

## Usage

```sh
npm run dev

# Prisma
npx prisma studio

# Postgres Docker Container
docker compose -f "docker-compose.only-db-test.yml" up -d --build
```

## Author

👤 **Rohan Doshi**

* Github: [@RohanDoshi21](https://github.com/RohanDoshi21)

👤 **Samarth Kamble**

* Github: [@Samarth7212](https://github.com/Samarth7212)

## Show your support

Give a ⭐️ if this project helped you!