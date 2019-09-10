import { cleanEnv, str, port } from 'envalid'

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    MAINTAINER_NAME: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
  })
}

export default validateEnv
