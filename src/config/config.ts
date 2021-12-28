require('dotenv').config();
export default {
    jwtSecret: "@QEGTUI4PPB34R"
};

const PROD = {
    "type": process.env.DB_DRIVER,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "synchronize": false,
    "logging": false,
    "entities": [
        "build/entity/**/*.js"
    ],
    "migrations": [
        "build/migration/**/*.js"
    ],
    "subscribers": [
        "build/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": "build/entity",
        "migrationsDir": "build/migration",
        "subscribersDir": "build/subscriber"
    },
    "ssl": true,
    "extra": {
        "ssl": {
            "rejectUnauthorized": false
        }
    }
}

const DEV = {
    "type": process.env.DB_DRIVER,
    "database": process.env.DB_NAME || "service",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "654321",
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}

export const developmentConfig = Object(DEV)

export function config() {
    if (process.env.hasOwnProperty("NODE_ENV") && process.env.NODE_ENV.indexOf("dev") !== -1) {
        return Object(DEV);
    }
    else
        return Object(PROD);
}
