# TAXISWAP: Frontend

## Getting Started

Copy the .env and .env.local and fill your details:
```bash
cp .env.example .env
cp .env.local.example .env.local
```

First run the databases:

```bash
docker-compose up
```

Then run the worker:
```bash
yarn run worker:start
```

And finaly run the application server:

```bash
yarn dev
```

Or, if on production:
```bash
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

