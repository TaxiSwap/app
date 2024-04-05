module.exports = {
  apps: [
    {
      name: "taxi-prod",
      script: "yarn start",
      env: {
        PORT: 3000,
      },
    },
    {
      name: "taxi-testnet",
      script: "yarn start",
      env: {
        PORT: 3001,
        TESTNET: "true",
      },
    },
    {
      name: "worker",
      script: "npx",
      args: "tsx queue/workers.ts",
    },
  ],
};
