module.exports = {
    apps: [
      {
        name: 'taxi-prod',
        script: 'yarn start',
        env: {
          PORT: 3000, 
        }
      },
      {
        name: 'taxi-admin',
        script: 'yarn start',
        env: {
          PORT: 3001, 
          ADMIN_FLAG: 'true', 
        }
      }
    ]
  };
  