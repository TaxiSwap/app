# TAXISWAP: Frontend

## Getting Started

Copy the .env and .env.local and fill your details:
```bash
cp .env.example .env
cp .env.local.example .env.local
```

First run the database:

```bash
docker-compose up
```
If it is the first time you run it, initialize it once:
```bash
yarn run db:init
```
Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

