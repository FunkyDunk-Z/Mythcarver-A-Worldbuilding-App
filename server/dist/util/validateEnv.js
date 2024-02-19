import { cleanEnv } from 'envalid';
import { port, str } from 'envalid/dist/validators';
export default cleanEnv(process.env, {
    PORT: port(),
    DATABASE: str(),
    DATABASE_PASSWORD: str(),
    JWT_SECRET: str(),
    JWT_COOKIE_SECRET: str(),
    JWT_EXPIRES_IN: str(),
    JWT_COOKIE_EXPIRES_IN: str(),
    EMAIL_USERNAME: str(),
    EMAIL_PASSWORD: str(),
    EMAIL_HOST: str(),
    EMAIL_PORT: str(),
    EMAIL_FROM: str(),
    CLOUDINARY_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_SECRET: str(),
    USER_DEFAULT_AVATAR: str(),
});
