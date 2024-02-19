"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, validators_1.port)(),
    DATABASE: (0, validators_1.str)(),
    DATABASE_PASSWORD: (0, validators_1.str)(),
    JWT_SECRET: (0, validators_1.str)(),
    JWT_COOKIE_SECRET: (0, validators_1.str)(),
    JWT_EXPIRES_IN: (0, validators_1.str)(),
    JWT_COOKIE_EXPIRES_IN: (0, validators_1.str)(),
    EMAIL_USERNAME: (0, validators_1.str)(),
    EMAIL_PASSWORD: (0, validators_1.str)(),
    EMAIL_HOST: (0, validators_1.str)(),
    EMAIL_PORT: (0, validators_1.str)(),
    EMAIL_FROM: (0, validators_1.str)(),
    CLOUDINARY_NAME: (0, validators_1.str)(),
    CLOUDINARY_API_KEY: (0, validators_1.str)(),
    CLOUDINARY_SECRET: (0, validators_1.str)(),
    USER_DEFAULT_AVATAR: (0, validators_1.str)(),
});
