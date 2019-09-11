import { cleanEnv, str, port, bool } from 'envalid'

function validateEnv() {
  cleanEnv(process.env, {
    APP_PORT: port(),
    APP_HOST: str(),
    APP_MAINTAINER: str(),
    TYPEORM_CONNECTION: str(),
    TYPEORM_HOST: str(),
    TYPEORM_PORT: port(),
    TYPEORM_USERNAME: str(),
    TYPEORM_PASSWORD: str(),
    TYPEORM_DATABASE: str(),
    TYPEORM_SYNCHRONIZE: bool(),
  })
}

export default validateEnv
