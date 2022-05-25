
module.exports = {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_NAME,
    "host": process.env.POSTGRES_HOST,
    "port": process.env.POSTGRES_PORT,
    "dialect": "postgres",
    sequelizeParams: {
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      logging: false,
      port: process.env.POSTGRES_PORT,
      // native: true,
     // ssl: true,
     /* dialectOptions: {
        useUTC: false,
        dateStrings: true,
        ssl: {
          //require: true,
          rejectUnauthorized: false,
        },
      },
      */
      timezone: "+01:00",
    },
} 